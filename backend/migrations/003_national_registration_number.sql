-- =====================================================
-- Migration: 003 - National Registration Number System
-- Description: Implement CC-YY-NNNNN format with offline support
-- Date: 2025-03-15
-- =====================================================

-- =====================================================
-- STEP 1: Add new columns to centers table
-- =====================================================

ALTER TABLE "system"."centers"
ADD COLUMN IF NOT EXISTS "registrationCode" VARCHAR(2),
ADD COLUMN IF NOT EXISTS "tempNumberPrefix" VARCHAR(1) DEFAULT 'T';

-- Add unique constraint on registrationCode
CREATE UNIQUE INDEX IF NOT EXISTS idx_centers_registration_code 
ON "system"."centers"("registrationCode") 
WHERE "registrationCode" IS NOT NULL;

COMMENT ON COLUMN "system"."centers"."registrationCode" IS '2-digit numeric code (01-99) for national registration format CC-YY-NNNNN';
COMMENT ON COLUMN "system"."centers"."tempNumberPrefix" IS 'Prefix for temporary offline numbers (default: T)';

-- =====================================================
-- STEP 2: Create national registration sequences table
-- =====================================================

CREATE TABLE IF NOT EXISTS "medical"."national_registration_sequences" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER UNIQUE NOT NULL, -- 2 digit year (e.g., 25 for 2025)
  "lastSequence" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

COMMENT ON TABLE "medical"."national_registration_sequences" IS 'Tracks national sequence for CC-YY-NNNNN format across all centers';

-- =====================================================
-- STEP 3: Create desktop sequence blocks table
-- =====================================================

CREATE TABLE IF NOT EXISTS "medical"."desktop_sequence_blocks" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "centerId" UUID NOT NULL REFERENCES "system"."centers"(id) ON DELETE CASCADE,
  "deviceId" VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL,
  "blockStart" INTEGER NOT NULL,
  "blockEnd" INTEGER NOT NULL,
  "currentSequence" INTEGER DEFAULT 0,
  "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "expiresAt" TIMESTAMP,
  
  CONSTRAINT valid_block CHECK ("blockEnd" > "blockStart")
);

CREATE INDEX IF NOT EXISTS idx_desktop_blocks_center_year 
ON "medical"."desktop_sequence_blocks"("centerId", year);

CREATE INDEX IF NOT EXISTS idx_desktop_blocks_device 
ON "medical"."desktop_sequence_blocks"("deviceId");

COMMENT ON TABLE "medical"."desktop_sequence_blocks" IS 'Reserved sequence blocks for offline desktop usage';

-- =====================================================
-- STEP 4: Add new columns to patients table
-- =====================================================

ALTER TABLE "medical"."patients"
ADD COLUMN IF NOT EXISTS "tempRecordNumber" VARCHAR(20),
ADD COLUMN IF NOT EXISTS "isTempNumber" BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS "numberAssignedAt" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "numberAssignedBy" VARCHAR(50);

-- Add unique constraint on tempRecordNumber
CREATE UNIQUE INDEX IF NOT EXISTS idx_patients_temp_number 
ON "medical"."patients"("tempRecordNumber") 
WHERE "tempRecordNumber" IS NOT NULL;

-- Add index for temp number lookups
CREATE INDEX IF NOT EXISTS idx_patients_is_temp 
ON "medical"."patients"("isTempNumber") 
WHERE "isTempNumber" = true;

COMMENT ON COLUMN "medical"."patients"."tempRecordNumber" IS 'Temporary number format CC-YY-T####T for offline desktop';
COMMENT ON COLUMN "medical"."patients"."isTempNumber" IS 'Flag indicating if patient has temporary number pending sync';
COMMENT ON COLUMN "medical"."patients"."numberAssignedAt" IS 'Timestamp when final number was assigned';
COMMENT ON COLUMN "medical"."patients"."numberAssignedBy" IS 'Identifier of who assigned the number (SERVER or deviceId)';

-- =====================================================
-- STEP 5: Assign registration codes to existing centers
-- =====================================================

-- Create a function to generate next available registration code
CREATE OR REPLACE FUNCTION generate_next_registration_code()
RETURNS VARCHAR(2) AS $$
DECLARE
  used_codes INTEGER[];
  next_code INTEGER;
BEGIN
  -- Get all used registration codes
  SELECT ARRAY_AGG(CAST("registrationCode" AS INTEGER))
  INTO used_codes
  FROM "system"."centers"
  WHERE "registrationCode" IS NOT NULL;
  
  -- Find first available code from 01-99
  FOR next_code IN 1..99 LOOP
    IF used_codes IS NULL OR NOT (next_code = ANY(used_codes)) THEN
      RETURN LPAD(next_code::TEXT, 2, '0');
    END IF;
  END LOOP;
  
  RAISE EXCEPTION 'All registration codes (01-99) are used';
END;
$$ LANGUAGE plpgsql;

-- Assign registration codes to centers that don't have one
DO $$
DECLARE
  center_record RECORD;
  new_code VARCHAR(2);
BEGIN
  FOR center_record IN
    SELECT id, code, name, "mrPrefix"
    FROM "system"."centers"
    WHERE "registrationCode" IS NULL
    ORDER BY created_at ASC
  LOOP
    -- Try to generate code from center code (first 2 digits of numeric part)
    IF center_record.code ~ '^[A-Z]+[0-9]+$' THEN
      -- Extract numeric part and take first 2 digits
      SELECT SUBSTRING(REGEXP_REPLACE(center_record.code, '[^0-9]', '', 'g'), 1, 2)
      INTO new_code;
      
      -- Check if this code is already used
      IF EXISTS (SELECT 1 FROM "system"."centers" WHERE "registrationCode" = new_code) THEN
        new_code := generate_next_registration_code();
      END IF;
    ELSE
      -- Generate next available code
      new_code := generate_next_registration_code();
    END IF;
    
    -- Update center
    UPDATE "system"."centers"
    SET "registrationCode" = new_code
    WHERE id = center_record.id;
    
    RAISE NOTICE 'Assigned registration code % to center: %', new_code, center_record.name;
  END LOOP;
END $$;

-- =====================================================
-- STEP 6: Migrate existing patients to new format (optional)
-- =====================================================

-- Note: Existing inamsosRecordNumber will remain in old format
-- New patients will use the new CC-YY-NNNNN format
-- This maintains backward compatibility

-- Create a view to show both old and new format numbers
CREATE OR REPLACE VIEW patient_registration_numbers AS
SELECT 
  p.id,
  p."anonymousId",
  p."inamsosRecordNumber",
  p."tempRecordNumber",
  p."isTempNumber",
  p."hospitalRecordNumber",
  c.name as center_name,
  c."registrationCode",
  c."mrPrefix",
  CASE 
    WHEN p."inamsosRecordNumber" ~ '^\d{2}-\d{2}-\d{5}$' THEN 'NEW_NATIONAL'
    WHEN p."inamsosRecordNumber" ~ '^[A-Z]{3}-\d{4}-[A-Z0-9]{5}$' THEN 'LEGACY'
    ELSE 'UNKNOWN'
  END as number_format
FROM "medical"."patients" p
LEFT JOIN "system"."centers" c ON p."centerId" = c.id;

COMMENT ON VIEW patient_registration_numbers IS 'View showing patient registration numbers in both old and new formats';

-- =====================================================
-- STEP 7: Create function to generate national registration number
-- =====================================================

CREATE OR REPLACE FUNCTION generate_national_registration_number(
  p_center_id UUID,
  p_year INTEGER DEFAULT NULL
) RETURNS VARCHAR(20) AS $$
DECLARE
  v_registration_code VARCHAR(2);
  v_year INTEGER;
  v_sequence INTEGER;
  v_seq_record RECORD;
BEGIN
  -- Get center registration code
  SELECT "registrationCode" INTO v_registration_code
  FROM "system"."centers"
  WHERE id = p_center_id;
  
  IF v_registration_code IS NULL THEN
    RAISE EXCEPTION 'Center % does not have registrationCode configured', p_center_id;
  END IF;
  
  -- Use provided year or current year (2 digit)
  v_year := COALESCE(p_year, EXTRACT(YEAR FROM NOW())::INTEGER % 100);
  
  -- Get or create sequence record
  SELECT * INTO v_seq_record
  FROM "medical"."national_registration_sequences"
  WHERE year = v_year
  FOR UPDATE;
  
  IF v_seq_record IS NULL THEN
    -- First patient nationally this year
    INSERT INTO "medical"."national_registration_sequences" (year, "lastSequence")
    VALUES (v_year, 1)
    RETURNING "lastSequence" INTO v_sequence;
  ELSE
    -- Increment national sequence
    UPDATE "medical"."national_registration_sequences"
    SET "lastSequence" = "lastSequence" + 1,
        "updatedAt" = NOW()
    WHERE id = v_seq_record.id
    RETURNING "lastSequence" INTO v_sequence;
  END IF;
  
  -- Format: CC-YY-NNNNN
  RETURN v_registration_code || '-' || LPAD(v_year::TEXT, 2, '0') || '-' || LPAD(v_sequence::TEXT, 5, '0');
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION generate_national_registration_number IS 'Generate new national registration number in CC-YY-NNNNN format';

-- =====================================================
-- STEP 8: Create function to generate temporary number
-- =====================================================

CREATE OR REPLACE FUNCTION generate_temporary_number(
  p_center_id UUID,
  p_local_sequence INTEGER
) RETURNS VARCHAR(20) AS $$
DECLARE
  v_registration_code VARCHAR(2);
  v_temp_prefix VARCHAR(1);
  v_year INTEGER;
BEGIN
  -- Get center info
  SELECT "registrationCode", COALESCE("tempNumberPrefix", 'T')
  INTO v_registration_code, v_temp_prefix
  FROM "system"."centers"
  WHERE id = p_center_id;
  
  IF v_registration_code IS NULL THEN
    RAISE EXCEPTION 'Center % does not have registrationCode configured', p_center_id;
  END IF;
  
  v_year := EXTRACT(YEAR FROM NOW())::INTEGER % 100;
  
  -- Format: CC-YY-T####T
  RETURN v_registration_code || '-' || 
         LPAD(v_year::TEXT, 2, '0') || '-' || 
         v_temp_prefix || 
         LPAD(p_local_sequence::TEXT, 4, '0') || 
         v_temp_prefix;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION generate_temporary_number IS 'Generate temporary registration number in CC-YY-T####T format for offline use';

-- =====================================================
-- STEP 9: Validation functions
-- =====================================================

CREATE OR REPLACE FUNCTION validate_national_format(p_number VARCHAR)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN p_number ~ '^\d{2}-\d{2}-\d{5}$';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validate_temporary_format(p_number VARCHAR)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN p_number ~ '^\d{2}-\d{2}-T\d{4}T$';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validate_registration_code(p_code VARCHAR)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN p_code ~ '^\d{2}$' AND CAST(p_code AS INTEGER) BETWEEN 1 AND 99;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- STEP 10: Create trigger to auto-generate registration number
-- =====================================================

CREATE OR REPLACE FUNCTION trg_generate_national_registration_number()
RETURNS TRIGGER AS $$
DECLARE
  v_year INTEGER;
BEGIN
  -- Only generate if inamsosRecordNumber is null and it's not a temp number
  IF NEW."inamsosRecordNumber" IS NULL AND 
     (NEW."isTempNumber" IS NULL OR NEW."isTempNumber" = false) THEN
    
    v_year := EXTRACT(YEAR FROM COALESCE(NEW."dateOfDiagnosis", NOW()))::INTEGER % 100;
    NEW."inamsosRecordNumber" := generate_national_registration_number(NEW."centerId", v_year);
    NEW."numberAssignedAt" := NOW();
    NEW."numberAssignedBy" := 'SERVER';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS trg_patient_national_registration ON "medical"."patients";

-- Create trigger
CREATE TRIGGER trg_patient_national_registration
  BEFORE INSERT ON "medical"."patients"
  FOR EACH ROW
  EXECUTE FUNCTION trg_generate_national_registration_number();

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check centers with registration codes
-- SELECT id, name, code, "registrationCode", "mrPrefix" FROM "system"."centers" ORDER BY "registrationCode";

-- Check national sequence
-- SELECT * FROM "medical"."national_registration_sequences" ORDER BY year;

-- Check patient number formats
-- SELECT number_format, COUNT(*) FROM patient_registration_numbers GROUP BY number_format;

-- =====================================================
-- ROLLBACK SCRIPT (if needed)
-- =====================================================
/*
-- Drop trigger
DROP TRIGGER IF EXISTS trg_patient_national_registration ON "medical"."patients";
DROP FUNCTION IF EXISTS trg_generate_national_registration_number();

-- Drop functions
DROP FUNCTION IF EXISTS generate_national_registration_number(UUID, INTEGER);
DROP FUNCTION IF EXISTS generate_temporary_number(UUID, INTEGER);
DROP FUNCTION IF EXISTS validate_national_format(VARCHAR);
DROP FUNCTION IF EXISTS validate_temporary_format(VARCHAR);
DROP FUNCTION IF EXISTS validate_registration_code(VARCHAR);
DROP FUNCTION IF EXISTS generate_next_registration_code();

-- Drop view
DROP VIEW IF EXISTS patient_registration_numbers;

-- Drop tables
DROP TABLE IF EXISTS "medical"."desktop_sequence_blocks";
DROP TABLE IF EXISTS "medical"."national_registration_sequences";

-- Drop columns from patients
ALTER TABLE "medical"."patients" 
DROP COLUMN IF EXISTS "tempRecordNumber",
DROP COLUMN IF EXISTS "isTempNumber",
DROP COLUMN IF EXISTS "numberAssignedAt",
DROP COLUMN IF EXISTS "numberAssignedBy";

-- Drop columns from centers
ALTER TABLE "system"."centers"
DROP COLUMN IF EXISTS "registrationCode",
DROP COLUMN IF EXISTS "tempNumberPrefix";
*/
