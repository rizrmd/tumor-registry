-- Fix schema mismatch for pathology_types
-- Prisma model expects: system.pathology_types
-- Older migration created: medical.pathology_types

CREATE TABLE IF NOT EXISTS "system"."pathology_types" (
  "id" TEXT NOT NULL,
  "code" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "pathology_types_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "pathology_types_code_key"
  ON "system"."pathology_types"("code");

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'medical' AND table_name = 'pathology_types'
  ) THEN
    INSERT INTO "system"."pathology_types" (
      "id", "code", "name", "description", "isActive", "sortOrder", "createdAt", "updatedAt"
    )
    SELECT
      m."id", m."code", m."name", m."description", m."isActive", m."sortOrder", m."createdAt", m."updatedAt"
    FROM "medical"."pathology_types" m
    ON CONFLICT ("code") DO UPDATE SET
      "name" = EXCLUDED."name",
      "description" = EXCLUDED."description",
      "isActive" = EXCLUDED."isActive",
      "sortOrder" = EXCLUDED."sortOrder",
      "updatedAt" = EXCLUDED."updatedAt";
  END IF;
END $$;
