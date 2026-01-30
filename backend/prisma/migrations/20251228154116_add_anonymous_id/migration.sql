/*
  Warnings:

  - A unique constraint covering the columns `[anonymousId]` on the table `patients` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "medical"."patients" ADD COLUMN     "anonymousId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "patients_anonymousId_key" ON "medical"."patients"("anonymousId");
