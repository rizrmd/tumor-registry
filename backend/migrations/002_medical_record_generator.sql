-- =====================================================
-- Migration: 002 - Medical Record Number Generator
-- Requirement: #2 - INAMSOS MR Number with Center Prefix
-- Date: 2025-12-28
-- =====================================================

-- Format: {CENTER_CODE}-{YEAR}-{SEQUENTIAL}
-- Example: SBY-2025-00001, JKT-2025-00142

-- =====================================================
-- STEP 1: Add MR prefix to centers table
-- =====================================================

-- Add columns for MR number generation
ALTER TABLE centers
ADD COLUMN IF NOT EXISTS "mrPrefix" VARCHAR(3),
ADD COLUMN IF NOT EXISTS "mrSequenceCounter" INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS "mrSequenceYear" INTEGER DEFAULT EXTRACT(YEAR FROM NOW());

-- Add unique constraint on mrPrefix
CREATE UNIQUE INDEX IF NOT EXISTS idx_centers_mr_prefix ON centers("mrPrefix") WHERE "mrPrefix" IS NOT NULL;

-- Add index for lookups
CREATE INDEX IF NOT EXISTS idx_centers_code ON centers(code);

COMMENT ON COLUMN centers."mrPrefix" IS 'Medical Record prefix (3 uppercase letters). Example: SBY, JKT, BDG';
COMMENT ON COLUMN centers."mrSequenceCounter" IS 'Current sequence counter for MR generation (resets yearly)';
COMMENT ON COLUMN centers."mrSequenceYear" IS 'Year of last sequence reset';

-- =====================================================
-- STEP 2: Set default MR prefixes for existing centers
-- =====================================================

-- Generate MR prefix from existing center codes or names
DO $$
DECLARE
  center_record RECORD;
  prefix VARCHAR(3);
BEGIN
  FOR center_record IN
    SELECT id, code, name FROM centers WHERE "mrPrefix" IS NULL
  LOOP
    -- Try to use existing code first
    IF center_record.code IS NOT NULL AND LENGTH(center_record.code) >= 3 THEN
      prefix := UPPER(SUBSTRING(center_record.code, 1, 3));
    ELSE
      -- Generate from name (first 3 letters)
      prefix := UPPER(SUBSTRING(REGEXP_REPLACE(center_record.name, '[^A-Za-z]', '', 'g'), 1, 3));
    END IF;

    -- Ensure uniqueness by adding number if needed
    WHILE EXISTS (SELECT 1 FROM centers WHERE "mrPrefix" = prefix AND id != center_record.id) LOOP
      -- If duplicate, try adding a number
      prefix := SUBSTRING(prefix, 1, 2) || (RANDOM() * 9 + 1)::INTEGER::TEXT;
    END LOOP;

    -- Update center
    UPDATE centers
    SET "mrPrefix" = prefix
    WHERE id = center_record.id;

    RAISE NOTICE 'Center % assigned prefix: %', center_record.name, prefix;
  END LOOP;
END $$;

-- =====================================================
-- STEP 3: Create medical_record_sequences table
-- =====================================================

CREATE TABLE IF NOT EXISTS medical_record_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "centerId" UUID NOT NULL REFERENCES centers(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  "lastSequence" INTEGER DEFAULT 0,

  -- Metadata
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW(),

  -- Unique constraint: one record per center per year
  CONSTRAINT unique_center_year UNIQUE("centerId", year)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_mr_seq_center ON medical_record_sequences("centerId");
CREATE INDEX IF NOT EXISTS idx_mr_seq_year ON medical_record_sequences(year);
CREATE INDEX IF NOT EXISTS idx_mr_seq_center_year ON medical_record_sequences("centerId", year);

COMMENT ON TABLE medical_record_sequences IS 'Sequence counter for INAMSOS Medical Record Number generation. One row per center per year.';

-- =====================================================
-- STEP 4: Add inamsosRecordNumber to patients table
-- =====================================================

-- Add new MR number column
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS "inamsosRecordNumber" VARCHAR(20) UNIQUE;

-- Rename old medicalRecordNumber to hospitalRecordNumber
ALTER TABLE patients
RENAME COLUMN "medicalRecordNumber" TO "hospitalRecordNumber";

-- Add indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_patients_inamsos_mr ON patients("inamsosRecordNumber") WHERE "inamsosRecordNumber" IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_patients_hospital_mr ON patients("hospitalRecordNumber") WHERE "hospitalRecordNumber" IS NOT NULL;

COMMENT ON COLUMN patients."inamsosRecordNumber" IS 'INAMSOS Medical Record Number. Format: {CENTER_CODE}-{YEAR}-{SEQUENTIAL}';
COMMENT ON COLUMN patients."hospitalRecordNumber" IS 'Hospital original Medical Record Number (optional, from center system)';

-- =====================================================
-- STEP 5: Generate INAMSOS MR Numbers for existing patients
-- =====================================================

-- Function to generate INAMSOS MR Number
CREATE OR REPLACE FUNCTION generate_inamsos_mr_number(
  p_center_id UUID,
  p_diagnosis_year INTEGER DEFAULT NULL
) RETURNS VARCHAR(20) AS $$
DECLARE
  v_center_prefix VARCHAR(3);
  v_year INTEGER;
  v_sequence INTEGER;
  v_mr_number VARCHAR(20);
  v_seq_record RECORD;
BEGIN
  -- Get center prefix
  SELECT "mrPrefix" INTO v_center_prefix
  FROM centers
  WHERE id = p_center_id;

  IF v_center_prefix IS NULL THEN
    RAISE EXCEPTION 'Center % does not have mrPrefix configured', p_center_id;
  END IF;

  -- Use diagnosis year or current year
  v_year := COALESCE(p_diagnosis_year, EXTRACT(YEAR FROM NOW())::INTEGER);

  -- Get or create sequence record (with locking for thread safety)
  SELECT * INTO v_seq_record
  FROM medical_record_sequences
  WHERE "centerId" = p_center_id AND year = v_year
  FOR UPDATE; -- Lock the row for update

  IF v_seq_record IS NULL THEN
    -- First patient for this center this year
    INSERT INTO medical_record_sequences ("centerId", year, "lastSequence")
    VALUES (p_center_id, v_year, 1)
    RETURNING "lastSequence" INTO v_sequence;
  ELSE
    -- Increment sequence
    UPDATE medical_record_sequences
    SET "lastSequence" = "lastSequence" + 1,
        "updatedAt" = NOW()
    WHERE "centerId" = p_center_id AND year = v_year
    RETURNING "lastSequence" INTO v_sequence;
  END IF;

  -- Format MR number: SBY-2025-00001
  v_mr_number := v_center_prefix || '-' || v_year || '-' || LPAD(v_sequence::TEXT, 5, '0');

  RETURN v_mr_number;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION generate_inamsos_mr_number IS 'Generate INAMSOS Medical Record Number. Thread-safe with row locking.';

-- =====================================================
-- STEP 6: Migrate existing patients to INAMSOS MR numbers
-- =====================================================

DO $$
DECLARE
  patient_record RECORD;
  mr_number VARCHAR(20);
  diagnosis_year INTEGER;
  migrated_count INTEGER := 0;
BEGIN
  RAISE NOTICE 'Starting INAMSOS MR number generation for existing patients...';

  FOR patient_record IN
    SELECT
      id,
      "treatmentCenter",
      "dateOfDiagnosis",
      "createdAt"
    FROM patients
    WHERE "inamsosRecordNumber" IS NULL
    ORDER BY "createdAt" ASC -- Maintain chronological order
  LOOP
    -- Get year from diagnosis date or creation date
    IF patient_record."dateOfDiagnosis" IS NOT NULL THEN
      diagnosis_year := EXTRACT(YEAR FROM patient_record."dateOfDiagnosis")::INTEGER;
    ELSE
      diagnosis_year := EXTRACT(YEAR FROM patient_record."createdAt")::INTEGER;
    END IF;

    -- Generate MR number
    mr_number := generate_inamsos_mr_number(
      patient_record."treatmentCenter",
      diagnosis_year
    );

    -- Update patient
    UPDATE patients
    SET "inamsosRecordNumber" = mr_number
    WHERE id = patient_record.id;

    migrated_count := migrated_count + 1;

    -- Log progress every 100 patients
    IF migrated_count % 100 = 0 THEN
      RAISE NOTICE 'Migrated % patients...', migrated_count;
    END IF;
  END LOOP;

  RAISE NOTICE 'INAMSOS MR number generation completed. Total: % patients', migrated_count;
END $$;

-- =====================================================
-- STEP 7: Make inamsosRecordNumber NOT NULL (after migration)
-- =====================================================

-- Set NOT NULL constraint (all patients should have MR number now)
ALTER TABLE patients
ALTER COLUMN "inamsosRecordNumber" SET NOT NULL;

RAISE NOTICE 'Set inamsosRecordNumber as NOT NULL';

-- =====================================================
-- STEP 8: Create helper functions and views
-- =====================================================

-- Function to validate MR number format
CREATE OR REPLACE FUNCTION validate_inamsos_mr_format(mr_number VARCHAR) RETURNS BOOLEAN AS $$
BEGIN
  -- Format: XXX-YYYY-NNNNN (3 letters, 4 digits, 5 digits)
  RETURN mr_number ~ '^[A-Z]{3}-\d{4}-\d{5}$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

COMMENT ON FUNCTION validate_inamsos_mr_format IS 'Validate INAMSOS MR number format: XXX-YYYY-NNNNN';

-- Function to parse MR number
CREATE OR REPLACE FUNCTION parse_inamsos_mr_number(mr_number VARCHAR)
RETURNS TABLE(center_prefix VARCHAR, year INTEGER, sequence INTEGER) AS $$
BEGIN
  RETURN QUERY
  SELECT
    SUBSTRING(mr_number, 1, 3)::VARCHAR,
    SUBSTRING(mr_number, 5, 4)::INTEGER,
    SUBSTRING(mr_number, 10, 5)::INTEGER;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

COMMENT ON FUNCTION parse_inamsos_mr_number IS 'Parse INAMSOS MR number into components';

-- View for MR number statistics per center
CREATE OR REPLACE VIEW mr_number_statistics AS
SELECT
  c.id as center_id,
  c.name as center_name,
  c."mrPrefix" as mr_prefix,
  COUNT(p.id) as total_patients,
  COUNT(p."inamsosRecordNumber") as with_inamsos_mr,
  COUNT(p."hospitalRecordNumber") as with_hospital_mr,
  MIN(p."createdAt") as first_patient_date,
  MAX(p."createdAt") as latest_patient_date
FROM centers c
LEFT JOIN patients p ON p."treatmentCenter" = c.id
GROUP BY c.id, c.name, c."mrPrefix";

COMMENT ON VIEW mr_number_statistics IS 'Statistics of MR number assignment per center';

-- =====================================================
-- STEP 9: Create trigger to auto-generate MR on insert
-- =====================================================

-- Trigger function to auto-generate INAMSOS MR number for new patients
CREATE OR REPLACE FUNCTION trg_generate_inamsos_mr()
RETURNS TRIGGER AS $$
DECLARE
  diagnosis_year INTEGER;
BEGIN
  -- Only generate if not provided
  IF NEW."inamsosRecordNumber" IS NULL THEN
    -- Get year from diagnosis or current year
    IF NEW."dateOfDiagnosis" IS NOT NULL THEN
      diagnosis_year := EXTRACT(YEAR FROM NEW."dateOfDiagnosis")::INTEGER;
    ELSE
      diagnosis_year := EXTRACT(YEAR FROM NOW())::INTEGER;
    END IF;

    -- Generate MR number
    NEW."inamsosRecordNumber" := generate_inamsos_mr_number(
      NEW."treatmentCenter",
      diagnosis_year
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists
DROP TRIGGER IF EXISTS trg_patient_inamsos_mr ON patients;

-- Create trigger
CREATE TRIGGER trg_patient_inamsos_mr
  BEFORE INSERT ON patients
  FOR EACH ROW
  EXECUTE FUNCTION trg_generate_inamsos_mr();

COMMENT ON TRIGGER trg_patient_inamsos_mr ON patients IS 'Auto-generate INAMSOS MR number on patient insert';

-- =====================================================
-- STEP 10: Verification queries
-- =====================================================

DO $$
DECLARE
  total_patients INTEGER;
  with_inamsos_mr INTEGER;
  total_centers INTEGER;
  centers_with_prefix INTEGER;
  total_sequences INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_patients FROM patients;
  SELECT COUNT(*) INTO with_inamsos_mr FROM patients WHERE "inamsosRecordNumber" IS NOT NULL;
  SELECT COUNT(*) INTO total_centers FROM centers;
  SELECT COUNT(*) INTO centers_with_prefix FROM centers WHERE "mrPrefix" IS NOT NULL;
  SELECT COUNT(*) INTO total_sequences FROM medical_record_sequences;

  RAISE NOTICE '===========================================';
  RAISE NOTICE 'MIGRATION VERIFICATION';
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'Total patients: %', total_patients;
  RAISE NOTICE 'With INAMSOS MR: %', with_inamsos_mr;
  RAISE NOTICE 'Total centers: %', total_centers;
  RAISE NOTICE 'Centers with prefix: %', centers_with_prefix;
  RAISE NOTICE 'MR sequences created: %', total_sequences;
  RAISE NOTICE '===========================================';

  IF with_inamsos_mr != total_patients THEN
    RAISE WARNING 'Not all patients have INAMSOS MR number!';
  END IF;

  IF centers_with_prefix != total_centers THEN
    RAISE WARNING 'Not all centers have MR prefix!';
  END IF;
END $$;

-- Show sample MR numbers
SELECT
  c.name as center,
  c."mrPrefix",
  p."inamsosRecordNumber",
  p."anonymousId",
  p."createdAt"
FROM patients p
JOIN centers c ON c.id = p."treatmentCenter"
ORDER BY p."createdAt" ASC
LIMIT 10;

-- =====================================================
-- COMPLETION
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'Migration 002 - Medical Record Generator';
  RAISE NOTICE 'Status: COMPLETED';
  RAISE NOTICE 'Date: %', NOW();
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'NEXT STEPS:';
  RAISE NOTICE '1. Verify MR numbers in patients table';
  RAISE NOTICE '2. Test trigger on new patient insert';
  RAISE NOTICE '3. Update backend services';
  RAISE NOTICE '4. Update frontend UI';
  RAISE NOTICE '===========================================';
END $$;
