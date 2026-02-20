-- AlterTable
ALTER TABLE "medical"."follow_up_visits" ADD COLUMN "reminderSent" BOOLEAN DEFAULT false;
ALTER TABLE "medical"."follow_up_visits" ADD COLUMN "reminderDate" TIMESTAMP(3);
ALTER TABLE "medical"."follow_up_visits" ADD COLUMN "reminderMethod" TEXT;
