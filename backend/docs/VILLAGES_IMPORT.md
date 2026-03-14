# Indonesian Village Data Import

This document describes the villages import implementation for the Indonesian regions data.

## Data Source

- **Source**: [hanifabd/wilayah-indonesia-area](https://github.com/hanifabd/wilayah-indonesia-area)
- **Data Date**: April 19, 2024
- **Total Villages**: ~84,210 (kelurahan/desa)
- **Coverage**: All Indonesian administrative divisions

## Implementation Overview

### 1. Database Migration

A new migration has been created to add the `villages` table to the `system` schema:

**Migration**: `prisma/migrations/20260314000000_add_villages_table/migration.sql`

The table structure:
```sql
CREATE TABLE "system"."villages" (
  "code" TEXT PRIMARY KEY,
  "districtCode" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "type" TEXT NOT NULL,  -- 'KELURAHAN' or 'DESA'
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "villages_districtCode_fkey" FOREIGN KEY ("districtCode")
    REFERENCES "system"."districts"("code")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "villages_districtCode_idx" ON "system"."villages"("districtCode");
```

### 2. Import Script

**Script**: `scripts/import-villages.js`

The script:
1. Reads all JSON files from `/tmp/kelurahan_desa/` directory
2. Parses the file naming convention to construct full village codes
3. Determines village type (KELURAHAN/DESA) based on naming patterns
4. Bulk inserts ~84,210 villages into the `system.villages` table

### 3. Service Update

**File**: `src/modules/regions/regions.service.ts`

The `findVillagesByDistrictId()` method now queries real villages from the database instead of returning placeholder data.

## How to Run the Import

### Prerequisites

1. Extract the IndoArea data (if not already done):
```bash
cd /tmp
unzip -o IndoArea-19-04-2024.zip
```

2. Ensure the database is running and accessible via `DATABASE_URL` environment variable

### Steps

1. **Apply the migration**:
```bash
cd /home/yopi/Projects/INAMSOS FIX/tumor-registry/backend
npx prisma migrate deploy
```

Or run the SQL directly:
```bash
psql "$DATABASE_URL" -f prisma/migrations/20260314000000_add_villages_table/migration.sql
```

2. **Run the import script**:
```bash
cd /home/yopi/Projects/INAMSOS FIX/tumor-registry/backend
node scripts/import-villages.js
```

### Expected Output

```
Starting villages import from IndoArea 2024-04-19...
Reading from: /tmp/kelurahan_desa
Found 7288 village files to process
Processed 1000/7288 files (XXXXX villages so far)
...

=== Import Complete ===
{
  filesProcessed: 7288,
  totalVillagesInserted: 84210,
  storedInDatabase: 84210
}
```

## Village Code Format

The village codes follow the Indonesian administrative hierarchy:

```
Full Village Code (10 digits):
├── Province Code    (2 digits)  e.g., "11" = ACEH
├── Regency Code     (2 digits)  e.g., "01" = KABUPATEN SABANG
├── District Code    (3 digits)  e.g., "010" = SUKAKARYA
└── Village Code     (3 digits)  e.g., "001" = LATIUNG

Example: 1101010001
- 11 = ACEH
- 01 = KABUPATEN SABANG
- 010 = SUKAKARYA
- 001 = LATIUNG
```

## Village Type Determination

The import script determines village type based on naming patterns:

- **KELURAHAN** (urban): Name starts with "KELURAHAN", "KLURAHAN", or contains "KL."
- **DESA** (rural): Name starts with "DESA", "DSA", "KAMPUNG", "KP.", "GAMPONG", or default

## API Endpoint

After import, villages can be accessed via:

```
GET /regions/districts/{districtId}/villages
```

Example:
```
GET /regions/districts/1101010/villages
```

Response:
```json
[
  {
    "id": "1101010001",
    "code": "1101010001",
    "name": "LATIUNG",
    "districtId": "1101010",
    "type": "DESA"
  },
  ...
]
```

## Verification

After import, verify the data:

```sql
-- Count total villages
SELECT COUNT(*) FROM "system"."villages";

-- Count by type
SELECT type, COUNT(*) FROM "system"."villages" GROUP BY type;

-- Sample villages by district
SELECT * FROM "system"."villages" WHERE "districtCode" = '1101010' ORDER BY code;

-- Check coverage by province
SELECT
  LEFT("districtCode", 2) as province_code,
  COUNT(*) as village_count
FROM "system"."villages"
GROUP BY LEFT("districtCode", 2)
ORDER BY province_code;
```

## Troubleshooting

### Connection Error

If you get a database connection error, ensure `DATABASE_URL` is set:

```bash
export DATABASE_URL="postgresql://user:password@localhost:5432/tumor-registry?schema=system,medical,audit"
```

### Missing Data Files

If the import script can't find the data files:

```bash
# Check if files exist
ls -la /tmp/kelurahan_desa/*.json | wc -l

# Should show 7288 files
```

### Permission Issues

Ensure the database user has permissions for the `system` schema:

```sql
GRANT ALL ON SCHEMA "system" TO your_user;
GRANT ALL ON ALL TABLES IN SCHEMA "system" TO your_user;
```
