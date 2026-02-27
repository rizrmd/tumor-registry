CREATE TABLE IF NOT EXISTS "system"."provinces" (
  "code" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "system"."regencies" (
  "code" TEXT PRIMARY KEY,
  "provinceCode" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "regencies_provinceCode_fkey" FOREIGN KEY ("provinceCode") REFERENCES "system"."provinces"("code") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "system"."districts" (
  "code" TEXT PRIMARY KEY,
  "regencyCode" TEXT NOT NULL,
  "provinceCode" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "districts_regencyCode_fkey" FOREIGN KEY ("regencyCode") REFERENCES "system"."regencies"("code") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "districts_provinceCode_fkey" FOREIGN KEY ("provinceCode") REFERENCES "system"."provinces"("code") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "regencies_provinceCode_idx" ON "system"."regencies"("provinceCode");
CREATE INDEX IF NOT EXISTS "districts_regencyCode_idx" ON "system"."districts"("regencyCode");
CREATE INDEX IF NOT EXISTS "districts_provinceCode_idx" ON "system"."districts"("provinceCode");
