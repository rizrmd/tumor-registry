# Villages Migration Guide

## Problem
The villages table was created but not populated with data. The file `villages_data.sql` contains 84,210 Indonesian village records but hasn't been executed against the production database.

## Solution

### Option 1: Run via Bun Script (Recommended)

```bash
cd /home/yopi/Projects/INAMSOS\ FIX/tumor-registry/backend

# Run the migration script
bun run scripts/migrate-villages.ts
```

### Option 2: Run SQL directly via psql

If you have direct database access:

```bash
# Connect to production database and run the migration
psql "$DATABASE_URL" -f prisma/migrations/20260314000000_add_villages_table/villages_data.sql
```

### Option 3: Run via Prisma

```bash
cd /home/yopi/Projects/INAMSOS\ FIX/tumor-registry/backend

# Deploy all pending migrations
npx prisma migrate deploy
```

## Verification

After running the migration, verify the data:

```bash
# Check village count (should be ~84,210)
psql "$DATABASE_URL" -c "SELECT COUNT(*) FROM system.villages;"

# Check specific district (e.g., 3301010 - DAYEUHLUHUR)
psql "$DATABASE_URL" -c "SELECT * FROM system.villages WHERE \"districtCode\" = '3301010' ORDER BY code;"
```

## Expected Results

For district 3301010 (DAYEUHLUHUR), should return 14 villages:
- PANULISAN BARAT
- PANULISAN
- PANULISAN TIMUR
- MATENGGENG
- CIWALEN
- DAYEUHLUHUR
- HANUM
- DATAR
- BINGKENG
- BOLANG
- KUTAAGUNG
- CIJERUK
- CILUMPING
- SUMPINGHAYU

## Testing in Frontend

After migration:
1. Go to https://inamsos.com/patients/new
2. Click "Identitas Pasien" tab
3. Select:
   - Provinsi: JAWA TENGAH
   - Kabupaten/Kota: CILACAP
   - Kecamatan: DAYEUHLUHUR
4. **Kelurahan/Desa dropdown should now show 14 options**
