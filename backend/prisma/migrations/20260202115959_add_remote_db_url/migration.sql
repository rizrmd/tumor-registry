-- AlterTable
ALTER TABLE "medical"."patients" ADD COLUMN     "createdById" TEXT;

-- AlterTable
ALTER TABLE "system"."centers" ADD COLUMN     "remoteDbApiKey" VARCHAR(255),
ADD COLUMN     "remoteDbUrl" TEXT;

-- CreateTable
CREATE TABLE "system"."offline_sync_state" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "lastPullAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastPushAt" TIMESTAMP(3),
    "totalItemsSynced" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "offline_sync_state_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "offline_sync_state_entityType_key" ON "system"."offline_sync_state"("entityType");

-- CreateIndex
CREATE INDEX "clinical_photos_updatedAt_idx" ON "medical"."clinical_photos"("updatedAt");

-- CreateIndex
CREATE INDEX "follow_up_visits_updatedAt_idx" ON "medical"."follow_up_visits"("updatedAt");

-- CreateIndex
CREATE INDEX "msts_scores_updatedAt_idx" ON "medical"."msts_scores"("updatedAt");

-- CreateIndex
CREATE INDEX "patient_diagnoses_updatedAt_idx" ON "medical"."patient_diagnoses"("updatedAt");

-- CreateIndex
CREATE INDEX "patient_medications_updatedAt_idx" ON "medical"."patient_medications"("updatedAt");

-- CreateIndex
CREATE INDEX "patients_updatedAt_idx" ON "medical"."patients"("updatedAt");

-- AddForeignKey
ALTER TABLE "medical"."patients" ADD CONSTRAINT "patients_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "system"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
