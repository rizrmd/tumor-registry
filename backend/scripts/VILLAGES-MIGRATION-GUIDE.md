# Villages Data Migration - Production Deployment Instructions

## Issue Summary
**Problem**: Kelurahan/Desa dropdown is empty on patient registration form (`https://inamsos.com/patients/new`)

**Root Cause**: The `villages` table exists but contains no data. The migration file `villages_data.sql` with 84,210 village records was created but never executed against the production database.

**Affected Feature**: Patient Identity form - Village/Kelurahan dropdown (cascades from Province → Regency → District → Village)

---

## Pre-Migration Checks

### 1. Verify Current State

Connect to production database and check current village count:

```bash
# SSH to production server (if needed)
ssh user@inamsos.com

# Check village count
docker exec -i inamosos-postgres psql -U inamsos_user -d inamsos_prod -c "SELECT COUNT(*) FROM system.villages;"
```

**Expected**: Count will be 0 or very low

---

## Migration Execution (Choose One Method)

### Method 1: Via Docker (Recommended for Production)

```bash
# On production server
cd /path/to/inamsos

# Copy migration file to container
docker cp backend/prisma/migrations/20260314000000_add_villages_table/villages_data.sql \
  inamosos-app:/app/prisma/migrations/20260314000000_add_villages_table/villages_data.sql

# Execute migration
docker exec -i inamosos-app bun run prisma migrate deploy
```

### Method 2: Direct SQL Execution

```bash
# On production server
docker exec -i inamosos-postgres psql \
  -U inamsos_user \
  -d inamsos_prod \
  -f /path/to/villages_data.sql
```

Or if you have the SQL file locally:

```bash
# From backend directory
cat prisma/migrations/20260314000000_add_villages_table/villages_data.sql | \
  docker exec -i inamosos-postgres psql -U inamsos_user -d inamsos_prod
```

### Method 3: Via Application Script

```bash
cd /home/yopi/Projects/INAMSOS\ FIX/tumor-registry/backend

# Set DATABASE_URL environment variable
export DATABASE_URL="postgresql://..."

# Run migration script
bun run scripts/migrate-villages.ts
```

---

## Post-Migration Verification

### 1. Check Village Count

```bash
docker exec -i inamosos-postgres psql \
  -U inamsos_user \
  -d inamsos_prod \
  -c "SELECT COUNT(*) FROM system.villages;"
```

**Expected**: ~84,210 records

### 2. Verify Specific District (DAYEUHLUHUR - 3301010)

```bash
docker exec -i inamosos-postgres psql \
  -U inamsos_user \
  -d inamsos_prod \
  -c "SELECT code, name, type FROM system.villages WHERE \"districtCode\" = '3301010' ORDER BY code;"
```

**Expected Output**:
```
     code     |      name       | type
--------------+-----------------+------
 3301010001   | PANULISAN BARAT | DESA
 3301010002   | PANULISAN       | DESA
 3301010003   | PANULISAN TIMUR | DESA
 3301010004   | MATENGGENG      | DESA
 3301010005   | CIWALEN         | DESA
 3301010006   | DAYEUHLUHUR     | DESA
 3301010007   | HANUM           | DESA
 3301010008   | DATAR           | DESA
 3301010009   | BINGKENG        | DESA
 3301010010   | BOLANG          | DESA
 3301010011   | KUTAAGUNG       | DESA
 3301010012   | CIJERUK         | DESA
 3301010013   | CILUMPING       | DESA
 3301010014   | SUMPINGHAYU     | DESA
(14 rows)
```

### 3. Test API Endpoint

```bash
# Test villages API for district 3301010
curl -H "Authorization: Bearer <your-token>" \
  https://inamsos.com/api/v1/regions/districts/3301010/villages
```

**Expected**: JSON array with 14 village objects

---

## Frontend Testing

1. Navigate to `https://inamsos.com/patients/new`
2. Click on **"Identitas Pasien"** tab (Tab 2)
3. Fill in the cascade dropdowns:
   - **Provinsi**: JAWA TENGAH
   - **Kabupaten/Kota**: CILACAP
   - **Kecamatan**: DAYEUHLUHUR
   - **Kelurahan/Desa**: Should now show 14 options

---

## Rollback (If Needed)

If migration causes issues, rollback:

```bash
# Truncate villages table
docker exec -i inamosos-postgres psql \
  -U inamsos_user \
  -d inamsos_prod \
  -c "TRUNCATE TABLE system.villages CASCADE;"
```

---

## Files Involved

| File | Purpose |
|------|---------|
| `backend/prisma/migrations/20260314000000_add_villages_table/migration.sql` | Creates villages table |
| `backend/prisma/migrations/20260314000000_add_villages_table/villages_data.sql` | 84,210 village INSERT statements |
| `backend/src/modules/regions/regions.service.ts` | API service for region queries |
| `backend/src/modules/regions/regions.controller.ts` | API endpoints for regions |
| `frontend/src/components/patients/wizard/sections/Section2PatientIdentity.tsx` | Frontend cascade dropdown |

---

## Additional Notes

- **Province ordering**: Already correct (sorted by BPS code ASC)
- **No FK constraint**: Villages table intentionally has no FK to districts (IndoArea has 7,288 districts vs emsifa API's 7,215)
- **Data source**: hanifabd/wilayah-indonesia-area (2024-04-19)
- **Migration is idempotent**: Running multiple times is safe (uses INSERT, table has PRIMARY KEY)

---

## Contact

For questions or issues, refer to the INAMSOS deployment documentation or contact the development team.
