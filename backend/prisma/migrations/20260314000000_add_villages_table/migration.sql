-- Create villages table without FK constraint (IndoArea has more districts than emsifa API)
CREATE TABLE IF NOT EXISTS "system"."villages" (
  "code" TEXT PRIMARY KEY,
  "districtCode" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "villages_districtCode_idx" ON "system"."villages"("districtCode");

-- Note: FK constraint intentionally omitted because IndoArea 2024 data has 7,288 districts
-- while emsifa API (used for provinces/regencies/districts import) has only 7,215 districts.
-- The 73 extra districts in IndoArea would cause FK violations.
