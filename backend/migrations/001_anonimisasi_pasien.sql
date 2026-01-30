-- =====================================================
-- Migration: 001 - Anonimisasi Data Pasien
-- Requirement: #1 - Remove patient names, add anonymousId
-- Date: 2025-12-28
-- =====================================================

-- IMPORTANT: BACKUP DATABASE BEFORE RUNNING THIS MIGRATION!
-- Command: pg_dump -U postgres -d tumor_registry > backup_before_anonymization_$(date +%Y%m%d_%H%M%S).sql

-- =====================================================
-- STEP 1: Create archive table for PII (Personal Identifiable Information)
-- =====================================================

CREATE TABLE IF NOT EXISTS patients_archived_pii (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,

  -- Archived data
  name VARCHAR(255),
  identity_number VARCHAR(50), -- NIK (plain text, will be deleted after verification)

  -- Metadata
  archived_at TIMESTAMP DEFAULT NOW(),
  archived_by UUID REFERENCES users(id),
  reason VARCHAR(100) DEFAULT 'ANONIMISASI_MIGRATION',

  -- Index
  CONSTRAINT unique_patient_archive UNIQUE(patient_id)
);

CREATE INDEX idx_archived_pii_patient ON patients_archived_pii(patient_id);
CREATE INDEX idx_archived_pii_date ON patients_archived_pii(archived_at);

COMMENT ON TABLE patients_archived_pii IS 'Archive table for patient PII data. Only accessible by SYSTEM_ADMIN for recovery purposes.';

-- =====================================================
-- STEP 2: Archive existing patient names and NIK
-- =====================================================

INSERT INTO patients_archived_pii (patient_id, name, identity_number, archived_by, reason)
SELECT
  id,
  name,
  "identityNumber",
  (SELECT id FROM users WHERE role = 'SYSTEM_ADMIN' LIMIT 1), -- System migration
  'ANONIMISASI_MIGRATION'
FROM patients
WHERE name IS NOT NULL
ON CONFLICT (patient_id) DO NOTHING;

-- Log the count
DO $$
DECLARE
  archived_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO archived_count FROM patients_archived_pii;
  RAISE NOTICE 'Archived % patient records to patients_archived_pii', archived_count;
END $$;

-- =====================================================
-- STEP 3: Add new columns to patients table
-- =====================================================

-- Add anonymousId column
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS "anonymousId" VARCHAR(50) UNIQUE;

-- Add index for fast lookups
CREATE INDEX IF NOT EXISTS idx_patients_anonymous_id ON patients("anonymousId");

COMMENT ON COLUMN patients."anonymousId" IS 'Anonymous patient identifier. Format: P-{centerCode}-{sequential}';

-- =====================================================
-- STEP 4: Generate anonymousId for existing patients
-- =====================================================

-- First, get center codes (assuming centers have a 'code' field)
-- If centers don't have codes yet, we'll use first 3 letters of name

DO $$
DECLARE
  patient_record RECORD;
  center_code VARCHAR(10);
  seq_num INTEGER;
  anonymous_id VARCHAR(50);
BEGIN
  -- Process each patient
  FOR patient_record IN
    SELECT p.id, p."treatmentCenter", c.code as center_code, c.name as center_name
    FROM patients p
    LEFT JOIN centers c ON c.id = p."treatmentCenter"
    WHERE p."anonymousId" IS NULL
    ORDER BY p."createdAt" ASC
  LOOP
    -- Get center code or generate from name
    IF patient_record.center_code IS NOT NULL AND patient_record.center_code != '' THEN
      center_code := patient_record.center_code;
    ELSIF patient_record.center_name IS NOT NULL THEN
      -- Use first 3 letters of center name, uppercase
      center_code := UPPER(SUBSTRING(patient_record.center_name, 1, 3));
    ELSE
      center_code := 'UNK'; -- Unknown center
    END IF;

    -- Get sequential number for this center
    SELECT COUNT(*) + 1 INTO seq_num
    FROM patients
    WHERE "treatmentCenter" = patient_record."treatmentCenter"
      AND "anonymousId" IS NOT NULL;

    -- Generate anonymous ID: P-{CODE}-{SEQUENTIAL}
    anonymous_id := 'P-' || center_code || '-' || LPAD(seq_num::TEXT, 5, '0');

    -- Update patient
    UPDATE patients
    SET "anonymousId" = anonymous_id
    WHERE id = patient_record.id;

  END LOOP;

  RAISE NOTICE 'Generated anonymousId for all patients';
END $$;

-- =====================================================
-- STEP 5: Encrypt identityNumber (NIK)
-- =====================================================

-- NOTE: This is a placeholder. In production, use pgcrypto or application-level encryption
-- For now, we'll just mark it as encrypted_at for tracking

ALTER TABLE patients
ADD COLUMN IF NOT EXISTS "identityNumberEncrypted" BOOLEAN DEFAULT FALSE;

-- In production, you would:
-- 1. Install pgcrypto extension: CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- 2. Encrypt existing data: UPDATE patients SET "identityNumber" = pgp_sym_encrypt("identityNumber", 'encryption_key');
-- 3. Set encrypted flag: UPDATE patients SET "identityNumberEncrypted" = TRUE;

COMMENT ON COLUMN patients."identityNumberEncrypted" IS 'Flag indicating if identityNumber is encrypted';

-- =====================================================
-- STEP 6: Drop the 'name' column (CRITICAL - IRREVERSIBLE)
-- =====================================================

-- SAFETY CHECK: Verify all names are archived
DO $$
DECLARE
  patients_count INTEGER;
  archived_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO patients_count FROM patients WHERE name IS NOT NULL;
  SELECT COUNT(*) INTO archived_count FROM patients_archived_pii;

  IF patients_count > archived_count THEN
    RAISE EXCEPTION 'SAFETY CHECK FAILED: Not all patient names are archived. Aborting name column drop.';
  END IF;

  RAISE NOTICE 'Safety check passed. % patients, % archived', patients_count, archived_count;
END $$;

-- Drop name column (UNCOMMENT AFTER VERIFICATION)
-- WARNING: This is irreversible! Make sure backup exists!
-- ALTER TABLE patients DROP COLUMN IF EXISTS name;

-- For now, we'll just rename it as deprecated (safer approach)
ALTER TABLE patients RENAME COLUMN name TO name_deprecated_do_not_use;

-- Make it nullable and clear the data
UPDATE patients SET name_deprecated_do_not_use = NULL;

COMMENT ON COLUMN patients.name_deprecated_do_not_use IS 'DEPRECATED - Data moved to patients_archived_pii. Will be dropped in future migration.';

-- =====================================================
-- STEP 7: Update emergency contact encryption
-- =====================================================

-- Emergency contact names should also be encrypted
-- For now, we'll add a flag. In production, encrypt the JSONB field

ALTER TABLE patients
ADD COLUMN IF NOT EXISTS "emergencyContactEncrypted" BOOLEAN DEFAULT FALSE;

COMMENT ON COLUMN patients."emergencyContactEncrypted" IS 'Flag indicating if emergency contact data is encrypted';

-- =====================================================
-- STEP 8: Create view for authorized access to PII
-- =====================================================

-- Only SYSTEM_ADMIN and NATIONAL_ADMIN should access this view
CREATE OR REPLACE VIEW patients_with_pii AS
SELECT
  p.id,
  p."anonymousId",
  p."inamsosRecordNumber",
  p."medicalRecordNumber",
  pii.name as archived_name, -- From archive, for recovery only
  p."dateOfBirth",
  p.gender,
  p."treatmentCenter",
  p."createdAt",
  p."updatedAt"
FROM patients p
LEFT JOIN patients_archived_pii pii ON pii.patient_id = p.id;

COMMENT ON VIEW patients_with_pii IS 'Restricted view - Only for SYSTEM_ADMIN to recover PII data. Log all access.';

-- =====================================================
-- STEP 9: Verification queries
-- =====================================================

-- Run these to verify migration
DO $$
DECLARE
  total_patients INTEGER;
  with_anonymous_id INTEGER;
  archived_pii INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_patients FROM patients;
  SELECT COUNT(*) INTO with_anonymous_id FROM patients WHERE "anonymousId" IS NOT NULL;
  SELECT COUNT(*) INTO archived_pii FROM patients_archived_pii;

  RAISE NOTICE '===========================================';
  RAISE NOTICE 'MIGRATION VERIFICATION';
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'Total patients: %', total_patients;
  RAISE NOTICE 'With anonymousId: %', with_anonymous_id;
  RAISE NOTICE 'PII archived: %', archived_pii;
  RAISE NOTICE '===========================================';

  IF with_anonymous_id != total_patients THEN
    RAISE WARNING 'Not all patients have anonymousId!';
  END IF;

  IF archived_pii = 0 THEN
    RAISE WARNING 'No PII data archived!';
  END IF;
END $$;

-- =====================================================
-- ROLLBACK INSTRUCTIONS (Emergency Only)
-- =====================================================

-- IF YOU NEED TO ROLLBACK (before name column is dropped):
-- 1. Restore name from archive:
--    UPDATE patients p
--    SET name_deprecated_do_not_use = pii.name
--    FROM patients_archived_pii pii
--    WHERE p.id = pii.patient_id;
--
-- 2. Rename column back:
--    ALTER TABLE patients RENAME COLUMN name_deprecated_do_not_use TO name;
--
-- 3. Drop anonymousId:
--    ALTER TABLE patients DROP COLUMN "anonymousId";
--
-- 4. Drop archive table:
--    DROP TABLE patients_archived_pii CASCADE;

-- =====================================================
-- COMPLETION
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'Migration 001 - Anonimisasi Pasien';
  RAISE NOTICE 'Status: COMPLETED';
  RAISE NOTICE 'Date: %', NOW();
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'NEXT STEPS:';
  RAISE NOTICE '1. Verify data in patients_archived_pii';
  RAISE NOTICE '2. Test application with anonymousId';
  RAISE NOTICE '3. After verification, uncomment DROP COLUMN name';
  RAISE NOTICE '4. Run migration 002 for MR Generator';
  RAISE NOTICE '===========================================';
END $$;
