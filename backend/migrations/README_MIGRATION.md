# Database Migration Guide
**Phase 1: Anonimisasi & Medical Record Generator**

## ⚠️ CRITICAL: Pre-Migration Checklist

### 1. Backup Database
```bash
# PostgreSQL backup
pg_dump -U postgres -d tumor_registry > backup_$(date +%Y%m%d_%H%M%S).sql

# Or if using Docker
docker exec -t tumor-registry-db pg_dump -U postgres tumor_registry > backup_$(date +%Y%m%d_%H%M%S).sql
```

### 2. Verify Backup
```bash
# Check file size (should not be 0)
ls -lh backup_*.sql

# Verify content (should show CREATE TABLE, INSERT, etc)
head -100 backup_*.sql
```

### 3. Stop Application
```bash
# Stop backend to prevent writes during migration
cd backend
npm run stop  # or kill the process
```

## 📋 Migration Execution

### Step 1: Run Migration 001 (Anonimisasi)

```bash
# Connect to database
psql -U postgres -d tumor_registry

# Or via Docker
docker exec -it tumor-registry-db psql -U postgres -d tumor_registry
```

```sql
-- Run migration script
\i /path/to/migrations/001_anonimisasi_pasien.sql

-- Or copy-paste the entire script
```

**What it does:**
- ✅ Creates `patients_archived_pii` table for backup
- ✅ Archives existing patient names & NIK
- ✅ Adds `anonymousId` column
- ✅ Generates anonymous IDs for all patients
- ✅ Renames `name` to `name_deprecated_do_not_use`
- ✅ Clears name data (but keeps column for safety)

**Verification:**
```sql
-- Check archived data
SELECT COUNT(*) FROM patients_archived_pii;

-- Check anonymous IDs
SELECT "anonymousId", "treatmentCenter", "createdAt"
FROM patients
LIMIT 10;

-- Verify no patient names visible
SELECT COUNT(*) FROM patients WHERE name_deprecated_do_not_use IS NOT NULL;
-- Should return 0
```

### Step 2: Run Migration 002 (MR Generator)

```sql
-- Run migration script
\i /path/to/migrations/002_medical_record_generator.sql
```

**What it does:**
- ✅ Adds `mrPrefix` to centers table
- ✅ Generates MR prefixes for existing centers
- ✅ Creates `medical_record_sequences` table
- ✅ Adds `inamsosRecordNumber` column to patients
- ✅ Renames `medicalRecordNumber` → `hospitalRecordNumber`
- ✅ Generates INAMSOS MR numbers for all patients
- ✅ Creates trigger for auto-generation on new inserts

**Verification:**
```sql
-- Check center prefixes
SELECT id, name, "mrPrefix" FROM centers;

-- Check INAMSOS MR numbers
SELECT
  "inamsosRecordNumber",
  "anonymousId",
  "hospitalRecordNumber",
  "createdAt"
FROM patients
ORDER BY "createdAt" DESC
LIMIT 10;

-- Test MR number format
SELECT validate_inamsos_mr_format('SBY-2025-00001'); -- Should return true
SELECT validate_inamsos_mr_format('INVALID'); -- Should return false

-- View statistics
SELECT * FROM mr_number_statistics;
```

### Step 3: Test Trigger (Auto-generation)

```sql
-- Insert test patient
INSERT INTO patients (
  "treatmentCenter",
  "anonymousId", -- Will be generated if null
  "dateOfBirth",
  gender,
  address,
  "emergencyContact",
  "treatmentStatus",
  "isActive",
  "isDeceased",
  "createdBy"
)
VALUES (
  (SELECT id FROM centers LIMIT 1),
  NULL, -- anonymousId will be auto-generated
  '1990-01-01',
  'male',
  '{"province": "Test Province"}'::jsonb,
  '{"name": "Test Contact", "phone": "081234567890", "relationship": "parent"}'::jsonb,
  'new',
  true,
  false,
  (SELECT id FROM users WHERE role = 'SYSTEM_ADMIN' LIMIT 1)
);

-- Check if INAMSOS MR was auto-generated
SELECT "inamsosRecordNumber", "anonymousId"
FROM patients
ORDER BY "createdAt" DESC
LIMIT 1;

-- Clean up test patient
DELETE FROM patients WHERE "dateOfBirth" = '1990-01-01';
```

## 🔄 Post-Migration Tasks

### 1. Update Application Code

**Backend:**
- ✅ Update `patient.interface.ts` - Remove `name`, add `anonymousId` & `inamsosRecordNumber`
- ✅ Update `patient.dto.ts` - Remove `name` from DTOs
- ✅ Create `medical-record.service.ts` - MR generation service
- ✅ Update `patients.service.ts` - Use `anonymousId` instead of `name`
- ✅ Update `centers.interface.ts` - Add `mrPrefix`

**Frontend:**
- ✅ Update `patient.ts` types - Remove `name`, add `anonymousId` & `inamsosRecordNumber`
- ✅ Update all forms - Remove name input fields
- ✅ Update patient lists - Display `anonymousId` instead of `name`
- ✅ Update patient detail pages - Show `anonymousId` & `inamsosRecordNumber`
- ✅ Update search - Search by `anonymousId` or MR numbers

### 2. Restart Application

```bash
# Start backend
cd backend
npm run start:dev

# Test API
curl http://localhost:3001/api/patients | jq '.data[0]'
# Should show anonymousId and inamsosRecordNumber, NOT name
```

### 3. Frontend Testing

```bash
# Start frontend
cd frontend
npm run dev

# Test pages:
# - /patients (list should show anonymousId)
# - /patients/new (should NOT have name field)
# - /patients/[id] (detail should show anonymousId & MR numbers)
```

## 🚨 Rollback Procedure (Emergency)

**ONLY if migrations completed but issues found:**

```sql
-- ROLLBACK Migration 002 (MR Generator)
-- 1. Drop trigger
DROP TRIGGER IF EXISTS trg_patient_inamsos_mr ON patients;
DROP FUNCTION IF EXISTS trg_generate_inamsos_mr();

-- 2. Drop helper functions
DROP FUNCTION IF EXISTS generate_inamsos_mr_number(UUID, INTEGER);
DROP FUNCTION IF EXISTS validate_inamsos_mr_format(VARCHAR);
DROP FUNCTION IF EXISTS parse_inamsos_mr_number(VARCHAR);

-- 3. Drop view
DROP VIEW IF EXISTS mr_number_statistics;

-- 4. Rename column back
ALTER TABLE patients RENAME COLUMN "hospitalRecordNumber" TO "medicalRecordNumber";

-- 5. Drop columns
ALTER TABLE patients DROP COLUMN IF EXISTS "inamsosRecordNumber";
ALTER TABLE centers DROP COLUMN IF EXISTS "mrPrefix";
ALTER TABLE centers DROP COLUMN IF EXISTS "mrSequenceCounter";
ALTER TABLE centers DROP COLUMN IF EXISTS "mrSequenceYear";

-- 6. Drop table
DROP TABLE IF EXISTS medical_record_sequences;

-- ROLLBACK Migration 001 (Anonimisasi)
-- 1. Restore names from archive
UPDATE patients p
SET name_deprecated_do_not_use = pii.name
FROM patients_archived_pii pii
WHERE p.id = pii.patient_id;

-- 2. Rename column back
ALTER TABLE patients RENAME COLUMN name_deprecated_do_not_use TO name;

-- 3. Drop anonymousId
ALTER TABLE patients DROP COLUMN IF EXISTS "anonymousId";

-- 4. Drop archive table
DROP TABLE IF EXISTS patients_archived_pii CASCADE;

-- 5. Drop view
DROP VIEW IF EXISTS patients_with_pii;

-- 6. Restore from backup (if needed)
-- psql -U postgres -d tumor_registry < backup_YYYYMMDD_HHMMSS.sql
```

## 📊 Monitoring Queries

```sql
-- 1. Check data consistency
SELECT
  (SELECT COUNT(*) FROM patients) as total_patients,
  (SELECT COUNT(*) FROM patients WHERE "anonymousId" IS NOT NULL) as with_anonymous_id,
  (SELECT COUNT(*) FROM patients WHERE "inamsosRecordNumber" IS NOT NULL) as with_inamsos_mr,
  (SELECT COUNT(*) FROM patients_archived_pii) as archived_pii;

-- 2. Check for duplicate MR numbers (should be 0)
SELECT "inamsosRecordNumber", COUNT(*)
FROM patients
GROUP BY "inamsosRecordNumber"
HAVING COUNT(*) > 1;

-- 3. Check MR number format validity
SELECT COUNT(*) as invalid_mr_format
FROM patients
WHERE NOT validate_inamsos_mr_format("inamsosRecordNumber");
-- Should return 0

-- 4. Center-wise patient distribution
SELECT
  c.name,
  c."mrPrefix",
  COUNT(p.id) as patient_count
FROM centers c
LEFT JOIN patients p ON p."treatmentCenter" = c.id
GROUP BY c.id, c.name, c."mrPrefix"
ORDER BY patient_count DESC;
```

## ✅ Success Criteria

- [ ] All patients have `anonymousId`
- [ ] All patients have `inamsosRecordNumber`
- [ ] All centers have `mrPrefix`
- [ ] No patient `name` visible in database
- [ ] Patient names backed up in `patients_archived_pii`
- [ ] MR number format is valid (XXX-YYYY-NNNNN)
- [ ] No duplicate MR numbers
- [ ] Trigger auto-generates MR on new insert
- [ ] Application starts without errors
- [ ] Frontend displays anonymousId instead of name

## 📞 Support

If you encounter issues:
1. Check logs: `docker logs tumor-registry-db`
2. Verify backup exists before rollback
3. Contact: dev-team@inamsos.id

---

**Migration Date:** 2025-12-28
**Status:** Ready for Execution
**Estimated Time:** 15-30 minutes (depending on data size)
