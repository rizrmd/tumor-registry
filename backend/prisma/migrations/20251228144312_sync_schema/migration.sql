/*
  Warnings:

  - You are about to drop the column `medicalRecordNumber` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `lastActivity` on the `user_sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[inamsosRecordNumber]` on the table `patients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mrPrefix]` on the table `centers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `user_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "medical"."RadiologyModality" AS ENUM ('XRAY', 'MRI', 'CT', 'BONE_SCAN', 'PET_CT', 'ULTRASOUND', 'ANGIOGRAPHY');

-- CreateEnum
CREATE TYPE "medical"."MirrelLesionType" AS ENUM ('BLASTIC', 'MIXED', 'LYTIC');

-- CreateEnum
CREATE TYPE "medical"."FractureRisk" AS ENUM ('LOW', 'MODERATE', 'HIGH');

-- CreateEnum
CREATE TYPE "medical"."PathologyReportType" AS ENUM ('FNAB', 'CORE_BIOPSY', 'OPEN_BIOPSY', 'IHK', 'EXCISIONAL', 'FROZEN_SECTION');

-- CreateEnum
CREATE TYPE "medical"."TumorGrade" AS ENUM ('BENIGN', 'GRADE_1', 'GRADE_2', 'GRADE_3', 'GRADE_X');

-- CreateEnum
CREATE TYPE "medical"."HuvosGradeType" AS ENUM ('GRADE_I', 'GRADE_II', 'GRADE_III', 'GRADE_IV');

-- CreateEnum
CREATE TYPE "medical"."EnnekingStage" AS ENUM ('IA', 'IB', 'IIA', 'IIB', 'III');

-- CreateEnum
CREATE TYPE "medical"."AjccStage" AS ENUM ('IA', 'IB', 'IIA', 'IIB', 'III', 'IVA', 'IVB');

-- CreateEnum
CREATE TYPE "medical"."TumorDepth" AS ENUM ('SUPERFICIAL', 'DEEP');

-- CreateEnum
CREATE TYPE "medical"."ChemotherapyTiming" AS ENUM ('NEO_ADJUVANT', 'ADJUVANT', 'PALLIATIVE', 'CONCURRENT');

-- CreateEnum
CREATE TYPE "medical"."SurgeryType" AS ENUM ('LIMB_SALVAGE', 'LIMB_ABLATION');

-- CreateEnum
CREATE TYPE "medical"."SurgicalMargin" AS ENUM ('WIDE_R0', 'MARGINAL_R0', 'R1', 'R2', 'INTRALESIONAL');

-- CreateEnum
CREATE TYPE "medical"."RadiotherapyTiming" AS ENUM ('NEO_ADJUVANT', 'ADJUVANT', 'PALLIATIVE', 'DEFINITIVE');

-- CreateEnum
CREATE TYPE "medical"."FollowUpVisitType" AS ENUM ('YEAR_1_2_Q3M', 'YEAR_3_5_Q6M', 'UNSCHEDULED', 'AD_HOC');

-- CreateEnum
CREATE TYPE "medical"."FollowUpStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'MISSED', 'CANCELLED', 'RESCHEDULED');

-- CreateEnum
CREATE TYPE "medical"."RecurrenceType" AS ENUM ('LOCAL', 'DISTANT_METASTASIS', 'REGIONAL');

-- CreateEnum
CREATE TYPE "medical"."ComplicationSeverity" AS ENUM ('MILD', 'MODERATE', 'SEVERE', 'LIFE_THREATENING');

-- DropIndex
DROP INDEX "medical"."patients_medicalRecordNumber_key";

-- AlterTable
ALTER TABLE "medical"."patients" DROP COLUMN "medicalRecordNumber",
ADD COLUMN     "ajccStage" TEXT,
ADD COLUMN     "biopsyDate" TIMESTAMP(3),
ADD COLUMN     "biopsyResult" TEXT,
ADD COLUMN     "biopsyType" TEXT,
ADD COLUMN     "boneLocationId" TEXT,
ADD COLUMN     "chiefComplaint" TEXT,
ADD COLUMN     "cpcDate" TIMESTAMP(3),
ADD COLUMN     "cpcRecommendation" TEXT,
ADD COLUMN     "ennekingStage" TEXT,
ADD COLUMN     "familyHistoryCancer" TEXT,
ADD COLUMN     "histopathologyGrade" TEXT,
ADD COLUMN     "hospitalRecordNumber" TEXT,
ADD COLUMN     "imagingStudies" TEXT,
ADD COLUMN     "inamsosRecordNumber" TEXT,
ADD COLUMN     "intendedTreatment" TEXT,
ADD COLUMN     "karnofskysScore" INTEGER,
ADD COLUMN     "laterality" TEXT,
ADD COLUMN     "metastasisPresent" BOOLEAN,
ADD COLUMN     "metastasisSites" TEXT,
ADD COLUMN     "mirrelScore" INTEGER,
ADD COLUMN     "mitosisCount" INTEGER,
ADD COLUMN     "necrosisPercentage" DOUBLE PRECISION,
ADD COLUMN     "onsetDate" TIMESTAMP(3),
ADD COLUMN     "pathologyType" TEXT,
ADD COLUMN     "presentingSymptoms" TEXT,
ADD COLUMN     "softTissueLocationId" TEXT,
ADD COLUMN     "symptomDuration" INTEGER,
ADD COLUMN     "tumorSizeAtPresentation" DOUBLE PRECISION,
ADD COLUMN     "tumorSizeT1" DOUBLE PRECISION,
ADD COLUMN     "tumorSizeT2" DOUBLE PRECISION,
ADD COLUMN     "tumorSizeT3" DOUBLE PRECISION,
ADD COLUMN     "tumorSyndromeId" TEXT,
ADD COLUMN     "whoBoneTumorId" TEXT,
ADD COLUMN     "whoSoftTissueTumorId" TEXT;

-- AlterTable
ALTER TABLE "medical"."research_requests" ADD COLUMN     "approverRole" TEXT DEFAULT 'NATIONAL_ADMIN',
ADD COLUMN     "requestingCenterId" TEXT,
ADD COLUMN     "visibilityLevel" TEXT DEFAULT 'IDENTIFIABLE',
ALTER COLUMN "submittedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "system"."centers" ADD COLUMN     "mrPrefix" VARCHAR(3),
ADD COLUMN     "mrSequenceCounter" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mrSequenceYear" INTEGER NOT NULL DEFAULT 2025;

-- AlterTable
ALTER TABLE "system"."notifications" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "system"."password_policies" ADD COLUMN     "centerId" TEXT,
ADD COLUMN     "maxConcurrentSessions" INTEGER;

-- AlterTable
ALTER TABLE "system"."refresh_tokens" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "system"."security_alerts" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "system"."user_sessions" DROP COLUMN "lastActivity",
ADD COLUMN     "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "system"."users" ADD COLUMN     "isLocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSsoUser" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lockedUntil" TIMESTAMP(3),
ALTER COLUMN "centerId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "medical"."medical_record_sequences" (
    "id" TEXT NOT NULL,
    "centerId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "lastSequence" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medical_record_sequences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."medical_images" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "recordId" TEXT,
    "imageType" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalFileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileSize" BIGINT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "isDicom" BOOLEAN NOT NULL DEFAULT false,
    "dicomMetadata" JSONB,
    "thumbnailPath" TEXT,
    "compressedPath" TEXT,
    "annotations" JSONB,
    "description" TEXT,
    "findings" TEXT,
    "bodyPart" TEXT,
    "modality" TEXT,
    "studyDate" TIMESTAMP(3),
    "seriesNumber" TEXT,
    "instanceNumber" TEXT,
    "isCompressed" BOOLEAN NOT NULL DEFAULT false,
    "compressionRatio" DOUBLE PRECISION,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "uploadedBy" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quality" TEXT,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medical_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."pathology_reports" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "reportNumber" TEXT NOT NULL,
    "biopsyType" TEXT NOT NULL,
    "biopsyDate" TIMESTAMP(3) NOT NULL,
    "specimenReceivedDate" TIMESTAMP(3),
    "specimenSite" TEXT NOT NULL,
    "specimenDescription" TEXT,
    "grossDescription" TEXT NOT NULL,
    "microscopicDescription" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "tumorGrade" TEXT,
    "mitosisCount" TEXT,
    "necrosisPercentage" TEXT,
    "cellularity" TEXT,
    "immunohistochemistry" TEXT,
    "molecularFindings" TEXT,
    "marginsStatus" TEXT,
    "isMalignant" BOOLEAN,
    "status" TEXT NOT NULL,
    "comments" TEXT,
    "pathologistId" TEXT NOT NULL,
    "reportDate" TIMESTAMP(3),
    "specialStains" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "ihcMarkers" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pathology_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."research_request_approvals_new" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "approverLevel" INTEGER,
    "approverRole" TEXT,
    "approverId" TEXT,
    "decision" TEXT NOT NULL,
    "decisionDate" TIMESTAMP(3),
    "notes" TEXT,
    "conditions" TEXT,
    "dataAccessLevel" TEXT,
    "maxRecords" INTEGER,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "research_request_approvals_new_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."national_statistics_cache" (
    "id" TEXT NOT NULL,
    "statisticType" TEXT NOT NULL,
    "periodStart" DATE,
    "periodEnd" DATE,
    "totalPatients" INTEGER NOT NULL,
    "totalCenters" INTEGER NOT NULL,
    "byGender" JSONB NOT NULL,
    "byAgeGroup" JSONB,
    "byCancerStage" JSONB,
    "byTreatmentStatus" JSONB,
    "byPrimarySite" JSONB,
    "byProvince" JSONB,
    "byCenter" JSONB,
    "generatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "national_statistics_cache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit"."activity_logs_new" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "actorName" TEXT,
    "actorRole" TEXT,
    "actorCenterId" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT,
    "entityId" TEXT,
    "changesBefore" JSONB,
    "changesAfter" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "requestMethod" TEXT,
    "requestPath" TEXT,
    "centerId" TEXT,
    "sessionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_new_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system"."security_incidents" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "type" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "details" JSONB,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "priority" INTEGER NOT NULL DEFAULT 3,
    "assignedTo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "security_incidents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system"."threat_scans" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "threatType" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "threatsFound" INTEGER NOT NULL DEFAULT 0,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "threat_scans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system"."behavioral_baselines" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "avgActivityPerDay" DOUBLE PRECISION,
    "commonActions" TEXT[],
    "typicalHours" INTEGER[],
    "dataPoints" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "behavioral_baselines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system"."sso_configurations" (
    "id" TEXT NOT NULL,
    "centerId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerName" TEXT NOT NULL,
    "configuration" JSONB NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "autoProvision" BOOLEAN NOT NULL DEFAULT true,
    "defaultRole" TEXT,
    "attributeMapping" JSONB,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sso_configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system"."sso_logins" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "configId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "externalUserId" TEXT,
    "attributes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sso_logins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system"."data_provenance" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "oldValue" TEXT,
    "newValue" TEXT,
    "userId" TEXT NOT NULL,
    "changeReason" TEXT,
    "dataSource" TEXT NOT NULL DEFAULT 'MANUAL_ENTRY',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hash" TEXT NOT NULL,

    CONSTRAINT "data_provenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system"."validation_rules" (
    "id" TEXT NOT NULL,
    "centerId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "entityType" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "ruleType" TEXT NOT NULL,
    "ruleConfig" JSONB NOT NULL,
    "errorMessage" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "validation_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system"."ai_suggestions" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "context" JSONB,
    "suggestion" TEXT NOT NULL,
    "confidenceScore" DOUBLE PRECISION,
    "modelVersion" TEXT,
    "userId" TEXT,
    "accepted" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_suggestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system"."cancer_predictions" (
    "id" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "predictionType" TEXT NOT NULL,
    "geographicArea" TEXT,
    "cancerType" TEXT,
    "predictionData" JSONB NOT NULL,
    "confidenceInterval" JSONB,
    "predictedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validUntil" TIMESTAMP(3),

    CONSTRAINT "cancer_predictions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system"."clinical_decisions" (
    "id" TEXT NOT NULL,
    "patientId" TEXT,
    "decisionType" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "evidenceBase" JSONB,
    "confidenceScore" DOUBLE PRECISION,
    "similarCases" INTEGER,
    "createdForUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clinical_decisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."pathology_types" (
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

-- CreateTable
CREATE TABLE "medical"."who_bone_tumor_classifications" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "icdO3Code" TEXT,
    "pageReference" TEXT,
    "isMalignant" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "who_bone_tumor_classifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."who_soft_tissue_tumor_classifications" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "icdO3Code" TEXT,
    "isMalignant" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "who_soft_tissue_tumor_classifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."bone_locations" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "region" TEXT NOT NULL,
    "boneName" TEXT,
    "segment" TEXT,
    "parentId" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bone_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."soft_tissue_locations" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "anatomicalRegion" TEXT NOT NULL,
    "specificLocation" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "soft_tissue_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."tumor_syndromes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "geneticMarker" TEXT,
    "description" TEXT,
    "associatedTumors" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tumor_syndromes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."msts_scores" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "followUpVisitId" TEXT,
    "pain" INTEGER NOT NULL,
    "function" INTEGER NOT NULL,
    "emotionalAcceptance" INTEGER NOT NULL,
    "supports" INTEGER NOT NULL,
    "walking" INTEGER NOT NULL,
    "gait" INTEGER NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "assessmentDate" TIMESTAMP(3) NOT NULL,
    "assessedBy" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "msts_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."follow_up_visits" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "visitNumber" INTEGER NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "actualDate" TIMESTAMP(3),
    "visitType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "examinedBy" TEXT,
    "chiefComplaint" TEXT,
    "physicalExamination" TEXT,
    "supportingExamination" TEXT,
    "clinicalStatus" TEXT,
    "localRecurrence" BOOLEAN,
    "distantMetastasis" BOOLEAN,
    "metastasisSites" TEXT,
    "currentTreatment" TEXT,
    "mstsScoreId" TEXT,
    "karnofskyScore" INTEGER,
    "imagingPerformed" TEXT,
    "imagingFindings" TEXT,
    "labResults" TEXT,
    "complications" TEXT,
    "nextVisitDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "follow_up_visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."cpc_conferences" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "conferenceDate" TIMESTAMP(3) NOT NULL,
    "attendees" TEXT NOT NULL,
    "presentation" TEXT,
    "recommendation" TEXT NOT NULL,
    "recommendationType" TEXT NOT NULL,
    "rationale" TEXT,
    "alternativeOptions" TEXT,
    "consensus" BOOLEAN NOT NULL DEFAULT true,
    "dissent" TEXT,
    "documentedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cpc_conferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."treatment_management" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "treatmentType" TEXT NOT NULL,
    "surgeryType" TEXT,
    "reconstructionMethod" TEXT,
    "surgicalMargin" TEXT,
    "marginDistance" DOUBLE PRECISION,
    "amputationLevel" TEXT,
    "chemotherapyProtocol" TEXT,
    "numberOfCycles" INTEGER,
    "cyclesCompleted" INTEGER,
    "radiotherapyDose" DOUBLE PRECISION,
    "numberOfFractions" INTEGER,
    "fractionsCompleted" INTEGER,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "response" TEXT,
    "huvosGrade" TEXT,
    "complications" TEXT,
    "adverseEvents" TEXT,
    "notes" TEXT,
    "performedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "treatment_management_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."case_reviews" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "caseType" TEXT NOT NULL,
    "complexity" TEXT NOT NULL DEFAULT 'STANDARD',
    "flagReason" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "clinicalData" JSONB NOT NULL,
    "diagnosisIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "findings" JSONB,
    "recommendedActions" JSONB,
    "specialty" TEXT,
    "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "flaggedBy" TEXT NOT NULL,
    "flaggedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "reviewNotes" TEXT,
    "outcome" TEXT,
    "resolution" TEXT,
    "similarCases" JSONB,
    "dueDate" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "case_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."review_assignments" (
    "id" TEXT NOT NULL,
    "caseReviewId" TEXT NOT NULL,
    "assignedTo" TEXT NOT NULL,
    "assignedBy" TEXT NOT NULL,
    "specialty" TEXT,
    "role" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ASSIGNED',
    "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
    "dueDate" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "notes" TEXT,
    "timeSpent" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."review_comments" (
    "id" TEXT NOT NULL,
    "caseReviewId" TEXT NOT NULL,
    "parentId" TEXT,
    "userId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "commentType" TEXT NOT NULL DEFAULT 'GENERAL',
    "isInternal" BOOLEAN NOT NULL DEFAULT false,
    "mentions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "attachments" JSONB,
    "isEdited" BOOLEAN NOT NULL DEFAULT false,
    "editedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."peer_reviews" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "reviewType" TEXT NOT NULL DEFAULT 'QUALITY_CHECK',
    "requestedBy" TEXT NOT NULL,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedTo" TEXT,
    "assignedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
    "dueDate" TIMESTAMP(3),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "context" JSONB,
    "checklist" JSONB,
    "findings" JSONB,
    "score" DOUBLE PRECISION,
    "recommendation" TEXT,
    "requiresChanges" BOOLEAN NOT NULL DEFAULT false,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "rejectedBy" TEXT,
    "rejectedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "completedAt" TIMESTAMP(3),
    "timeSpent" INTEGER,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "peer_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."peer_review_comments" (
    "id" TEXT NOT NULL,
    "peerReviewId" TEXT NOT NULL,
    "parentId" TEXT,
    "userId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "commentType" TEXT NOT NULL DEFAULT 'GENERAL',
    "severity" TEXT NOT NULL DEFAULT 'INFO',
    "lineReference" TEXT,
    "suggestion" TEXT,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "resolvedBy" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "isInternal" BOOLEAN NOT NULL DEFAULT false,
    "mentions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "attachments" JSONB,
    "isEdited" BOOLEAN NOT NULL DEFAULT false,
    "editedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "peer_review_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."review_recognitions" (
    "id" TEXT NOT NULL,
    "peerReviewId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "recognitionType" TEXT NOT NULL,
    "awardedBy" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "points" INTEGER NOT NULL DEFAULT 0,
    "badge" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "awardedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_recognitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system"."external_systems" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "vendor" TEXT,
    "version" TEXT,
    "description" TEXT,
    "endpoint" TEXT NOT NULL,
    "protocol" TEXT,
    "port" INTEGER,
    "authentication" JSONB,
    "configuration" JSONB,
    "dataMapping" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'inactive',
    "lastSync" TIMESTAMP(3),
    "lastSyncStatus" TEXT,
    "nextSync" TIMESTAMP(3),
    "syncFrequency" TEXT,
    "errorCount" INTEGER NOT NULL DEFAULT 0,
    "lastError" TEXT,
    "lastErrorAt" TIMESTAMP(3),
    "successCount" INTEGER NOT NULL DEFAULT 0,
    "failureCount" INTEGER NOT NULL DEFAULT 0,
    "timeout" INTEGER NOT NULL DEFAULT 30000,
    "retryPolicy" JSONB,
    "rateLimit" JSONB,
    "statistics" JSONB,
    "centerId" TEXT,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "external_systems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."dicom_images" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "patientName" TEXT,
    "studyInstanceUID" TEXT NOT NULL,
    "seriesInstanceUID" TEXT NOT NULL,
    "sopInstanceUID" TEXT NOT NULL,
    "modality" TEXT NOT NULL,
    "studyDate" TIMESTAMP(3),
    "studyTime" TEXT,
    "studyDescription" TEXT,
    "seriesDescription" TEXT,
    "seriesNumber" TEXT,
    "instanceNumber" TEXT,
    "bodyPart" TEXT,
    "viewPosition" TEXT,
    "imageType" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "rows" INTEGER,
    "columns" INTEGER,
    "bitsAllocated" INTEGER,
    "pixelSpacing" TEXT,
    "sliceThickness" DOUBLE PRECISION,
    "acquisitionDate" TIMESTAMP(3),
    "institutionName" TEXT,
    "referringPhysician" TEXT,
    "performingPhysician" TEXT,
    "imagePath" TEXT NOT NULL,
    "thumbnailPath" TEXT,
    "fileSize" BIGINT,
    "transferSyntax" TEXT,
    "metadata" JSONB,
    "processingStatus" TEXT NOT NULL DEFAULT 'received',
    "processingError" TEXT,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "archivedAt" TIMESTAMP(3),
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "centerId" TEXT,
    "uploadedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dicom_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."research_data_exports" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "requestedBy" TEXT NOT NULL,
    "exportFormat" TEXT NOT NULL,
    "exportType" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dataCount" INTEGER,
    "fileSize" BIGINT,
    "filePath" TEXT,
    "fileName" TEXT,
    "downloadUrl" TEXT,
    "checksum" TEXT,
    "encryption" BOOLEAN NOT NULL DEFAULT false,
    "encryptionKey" TEXT,
    "compression" BOOLEAN NOT NULL DEFAULT true,
    "deidentified" BOOLEAN NOT NULL DEFAULT true,
    "dataFields" JSONB,
    "filters" JSONB,
    "transformations" JSONB,
    "qualityMetrics" JSONB,
    "exportDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedDate" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "lastDownloadedAt" TIMESTAMP(3),
    "errorMessage" TEXT,
    "errorDetails" JSONB,
    "auditLog" JSONB,
    "notes" TEXT,
    "centerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "research_data_exports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."clinical_presentations" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "karnofskyScore" INTEGER,
    "painScale" INTEGER,
    "bmi" DECIMAL(5,2),
    "chiefComplaint" TEXT,
    "comorbidities" TEXT,
    "cancerHistory" TEXT,
    "familyCancerHistory" TEXT,
    "physicalExamination" JSONB,
    "symptomDuration" INTEGER,
    "presentingSymptoms" JSONB,
    "tumorSizeAtPresentation" DECIMAL(6,2),
    "onsetDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clinical_presentations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."clinical_photos" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileSize" INTEGER,
    "mimeType" TEXT,
    "anatomicalLocation" TEXT,
    "viewType" TEXT,
    "description" TEXT,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uploadedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clinical_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."laboratory_results_extended" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "testDate" TIMESTAMP(3) NOT NULL,
    "alp" DECIMAL(10,2),
    "ldh" DECIMAL(10,2),
    "calcium" DECIMAL(6,2),
    "phosphate" DECIMAL(6,2),
    "tumorMarkers" JSONB,
    "hemoglobin" DECIMAL(5,2),
    "albumin" DECIMAL(5,2),
    "esr" INTEGER,
    "crp" DECIMAL(8,2),
    "notes" TEXT,
    "orderedBy" TEXT,
    "performedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "laboratory_results_extended_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."radiology_findings" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "modalityType" "medical"."RadiologyModality" NOT NULL,
    "studyDate" TIMESTAMP(3) NOT NULL,
    "findings" TEXT NOT NULL,
    "impression" TEXT,
    "imageUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "reportDate" TIMESTAMP(3) NOT NULL,
    "reportedBy" TEXT,
    "tumorSize" DECIMAL(6,2),
    "tumorVolume" DECIMAL(10,2),
    "corticalBreakthrough" BOOLEAN,
    "softTissueExtension" BOOLEAN,
    "neurovascularInvolvement" BOOLEAN,
    "skipLesions" BOOLEAN,
    "pathologicalFracture" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "radiology_findings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."mirrel_scores" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "siteScore" INTEGER NOT NULL,
    "painScore" INTEGER NOT NULL,
    "lesionType" "medical"."MirrelLesionType" NOT NULL,
    "sizeScore" INTEGER NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "fractureRisk" "medical"."FractureRisk" NOT NULL,
    "assessmentDate" TIMESTAMP(3) NOT NULL,
    "assessedBy" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mirrel_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."pathology_reports_extended" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "reportType" "medical"."PathologyReportType" NOT NULL,
    "biopsyDate" TIMESTAMP(3),
    "reportDate" TIMESTAMP(3) NOT NULL,
    "grossDescription" TEXT,
    "microscopicFindings" TEXT,
    "diagnosis" TEXT NOT NULL,
    "ihcMarkers" JSONB,
    "molecularMarkers" JSONB,
    "tumorGrade" "medical"."TumorGrade",
    "mitosisCount" INTEGER,
    "necrosisPercentage" DECIMAL(5,2),
    "tumorSize" DECIMAL(6,2),
    "margins" TEXT,
    "pathologistName" TEXT,
    "pathologyLab" TEXT,
    "specimenType" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pathology_reports_extended_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."huvos_grades" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "grade" "medical"."HuvosGradeType" NOT NULL,
    "tumorNecrosisPercentage" DECIMAL(5,2) NOT NULL,
    "viableTumorPercentage" DECIMAL(5,2),
    "assessmentDate" TIMESTAMP(3) NOT NULL,
    "specimenType" TEXT,
    "assessedBy" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "huvos_grades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."staging_data" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "ennekingStage" "medical"."EnnekingStage",
    "ajccStage" "medical"."AjccStage",
    "tumorGrade" "medical"."TumorGrade",
    "tumorSize" DECIMAL(6,2),
    "tumorDepth" "medical"."TumorDepth",
    "compartmentStatus" TEXT,
    "metastasisAtDiagnosis" BOOLEAN NOT NULL DEFAULT false,
    "metastasisSites" TEXT[],
    "regionalLymphNodes" BOOLEAN NOT NULL DEFAULT false,
    "tumorLocation" TEXT,
    "stagingDate" TIMESTAMP(3),
    "stagedBy" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staging_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."cpc_records" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "cpcDate" TIMESTAMP(3) NOT NULL,
    "attendingConsultants" TEXT[],
    "presentation" TEXT,
    "treatmentDecision" TEXT NOT NULL,
    "treatmentIntent" TEXT,
    "recommendationType" TEXT,
    "rationale" TEXT,
    "alternativeOptions" TEXT,
    "consensus" BOOLEAN NOT NULL DEFAULT true,
    "dissent" TEXT,
    "notes" TEXT,
    "documentedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cpc_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."chemotherapy_records" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "timing" "medical"."ChemotherapyTiming" NOT NULL,
    "regimen" TEXT NOT NULL,
    "cycles" INTEGER NOT NULL,
    "cyclesCompleted" INTEGER NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "response" TEXT,
    "complications" TEXT,
    "adverseEvents" JSONB,
    "doseModifications" JSONB,
    "performedBy" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chemotherapy_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."surgical_records" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "surgeryDate" TIMESTAMP(3) NOT NULL,
    "surgeryType" "medical"."SurgeryType" NOT NULL,
    "surgicalProcedure" TEXT NOT NULL,
    "surgicalMargin" "medical"."SurgicalMargin" NOT NULL,
    "marginDistance" DECIMAL(6,2),
    "reconstructionMethod" TEXT,
    "amputationLevel" TEXT,
    "operativeDuration" INTEGER,
    "bloodLoss" DECIMAL(8,2),
    "complications" TEXT,
    "adverseEvents" TEXT,
    "surgeonName" TEXT,
    "assistantSurgeons" TEXT[],
    "anesthesiaType" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "surgical_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."radiotherapy_records" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "timing" "medical"."RadiotherapyTiming" NOT NULL,
    "totalDose" DECIMAL(7,2) NOT NULL,
    "fractions" INTEGER NOT NULL,
    "fractionsCompleted" INTEGER NOT NULL DEFAULT 0,
    "dosePerFraction" DECIMAL(6,2),
    "technique" TEXT,
    "targetVolume" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "complications" TEXT,
    "adverseEvents" JSONB,
    "radiationOncologist" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "radiotherapy_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."follow_up_visits_enhanced" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "visitNumber" INTEGER NOT NULL,
    "visitType" "medical"."FollowUpVisitType" NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "actualDate" TIMESTAMP(3),
    "status" "medical"."FollowUpStatus" NOT NULL,
    "clinicalStatus" TEXT,
    "karnofskyScore" INTEGER,
    "painScale" INTEGER,
    "functionalStatus" TEXT,
    "imagingPerformed" TEXT[],
    "imagingFindings" TEXT,
    "labResults" TEXT,
    "currentTreatment" TEXT,
    "complications" TEXT,
    "nextVisitDate" TIMESTAMP(3),
    "completedBy" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "follow_up_visits_enhanced_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."msts_scores_enhanced" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "followUpVisitId" TEXT,
    "pain" INTEGER NOT NULL,
    "function" INTEGER NOT NULL,
    "emotionalAcceptance" INTEGER NOT NULL,
    "handPositioning" INTEGER NOT NULL,
    "manualDexterity" INTEGER NOT NULL,
    "liftingAbility" INTEGER NOT NULL,
    "supports" INTEGER,
    "walking" INTEGER,
    "gait" INTEGER,
    "totalScore" INTEGER NOT NULL,
    "extremityType" TEXT,
    "assessmentDate" TIMESTAMP(3) NOT NULL,
    "assessedBy" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "msts_scores_enhanced_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."recurrence_tracking" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "followUpVisitId" TEXT,
    "recurrenceType" "medical"."RecurrenceType" NOT NULL,
    "detectionDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "diagnosticMethod" TEXT,
    "treatment" TEXT,
    "outcome" TEXT,
    "notes" TEXT,
    "documentedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recurrence_tracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical"."complication_tracking" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "followUpVisitId" TEXT,
    "complicationType" TEXT NOT NULL,
    "severity" "medical"."ComplicationSeverity" NOT NULL,
    "onsetDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "management" TEXT,
    "resolution" TEXT,
    "resolutionDate" TIMESTAMP(3),
    "notes" TEXT,
    "documentedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "complication_tracking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "medical_record_sequences_centerId_year_idx" ON "medical"."medical_record_sequences"("centerId", "year");

-- CreateIndex
CREATE UNIQUE INDEX "medical_record_sequences_centerId_year_key" ON "medical"."medical_record_sequences"("centerId", "year");

-- CreateIndex
CREATE UNIQUE INDEX "pathology_reports_reportNumber_key" ON "medical"."pathology_reports"("reportNumber");

-- CreateIndex
CREATE INDEX "research_request_approvals_new_requestId_idx" ON "medical"."research_request_approvals_new"("requestId");

-- CreateIndex
CREATE INDEX "national_statistics_cache_statisticType_periodStart_periodE_idx" ON "medical"."national_statistics_cache"("statisticType", "periodStart", "periodEnd");

-- CreateIndex
CREATE INDEX "activity_logs_new_actorId_idx" ON "audit"."activity_logs_new"("actorId");

-- CreateIndex
CREATE INDEX "activity_logs_new_centerId_idx" ON "audit"."activity_logs_new"("centerId");

-- CreateIndex
CREATE INDEX "activity_logs_new_action_idx" ON "audit"."activity_logs_new"("action");

-- CreateIndex
CREATE INDEX "activity_logs_new_entity_entityId_idx" ON "audit"."activity_logs_new"("entity", "entityId");

-- CreateIndex
CREATE INDEX "activity_logs_new_createdAt_idx" ON "audit"."activity_logs_new"("createdAt");

-- CreateIndex
CREATE INDEX "security_incidents_userId_idx" ON "system"."security_incidents"("userId");

-- CreateIndex
CREATE INDEX "security_incidents_status_idx" ON "system"."security_incidents"("status");

-- CreateIndex
CREATE INDEX "security_incidents_severity_idx" ON "system"."security_incidents"("severity");

-- CreateIndex
CREATE INDEX "security_incidents_priority_idx" ON "system"."security_incidents"("priority");

-- CreateIndex
CREATE INDEX "threat_scans_userId_idx" ON "system"."threat_scans"("userId");

-- CreateIndex
CREATE INDEX "threat_scans_threatType_idx" ON "system"."threat_scans"("threatType");

-- CreateIndex
CREATE INDEX "threat_scans_createdAt_idx" ON "system"."threat_scans"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "behavioral_baselines_userId_key" ON "system"."behavioral_baselines"("userId");

-- CreateIndex
CREATE INDEX "behavioral_baselines_userId_idx" ON "system"."behavioral_baselines"("userId");

-- CreateIndex
CREATE INDEX "sso_configurations_centerId_idx" ON "system"."sso_configurations"("centerId");

-- CreateIndex
CREATE INDEX "sso_configurations_isActive_idx" ON "system"."sso_configurations"("isActive");

-- CreateIndex
CREATE INDEX "sso_logins_userId_idx" ON "system"."sso_logins"("userId");

-- CreateIndex
CREATE INDEX "sso_logins_configId_idx" ON "system"."sso_logins"("configId");

-- CreateIndex
CREATE INDEX "sso_logins_createdAt_idx" ON "system"."sso_logins"("createdAt");

-- CreateIndex
CREATE INDEX "data_provenance_entityType_entityId_idx" ON "system"."data_provenance"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "data_provenance_userId_idx" ON "system"."data_provenance"("userId");

-- CreateIndex
CREATE INDEX "data_provenance_timestamp_idx" ON "system"."data_provenance"("timestamp");

-- CreateIndex
CREATE INDEX "data_provenance_fieldName_idx" ON "system"."data_provenance"("fieldName");

-- CreateIndex
CREATE INDEX "data_provenance_dataSource_idx" ON "system"."data_provenance"("dataSource");

-- CreateIndex
CREATE INDEX "validation_rules_centerId_idx" ON "system"."validation_rules"("centerId");

-- CreateIndex
CREATE INDEX "validation_rules_entityType_idx" ON "system"."validation_rules"("entityType");

-- CreateIndex
CREATE INDEX "validation_rules_isActive_idx" ON "system"."validation_rules"("isActive");

-- CreateIndex
CREATE INDEX "ai_suggestions_entityType_idx" ON "system"."ai_suggestions"("entityType");

-- CreateIndex
CREATE INDEX "ai_suggestions_fieldName_idx" ON "system"."ai_suggestions"("fieldName");

-- CreateIndex
CREATE INDEX "ai_suggestions_userId_idx" ON "system"."ai_suggestions"("userId");

-- CreateIndex
CREATE INDEX "ai_suggestions_createdAt_idx" ON "system"."ai_suggestions"("createdAt");

-- CreateIndex
CREATE INDEX "cancer_predictions_modelId_idx" ON "system"."cancer_predictions"("modelId");

-- CreateIndex
CREATE INDEX "cancer_predictions_predictionType_idx" ON "system"."cancer_predictions"("predictionType");

-- CreateIndex
CREATE INDEX "cancer_predictions_geographicArea_idx" ON "system"."cancer_predictions"("geographicArea");

-- CreateIndex
CREATE INDEX "cancer_predictions_cancerType_idx" ON "system"."cancer_predictions"("cancerType");

-- CreateIndex
CREATE INDEX "clinical_decisions_patientId_idx" ON "system"."clinical_decisions"("patientId");

-- CreateIndex
CREATE INDEX "clinical_decisions_decisionType_idx" ON "system"."clinical_decisions"("decisionType");

-- CreateIndex
CREATE INDEX "clinical_decisions_createdForUserId_idx" ON "system"."clinical_decisions"("createdForUserId");

-- CreateIndex
CREATE INDEX "clinical_decisions_createdAt_idx" ON "system"."clinical_decisions"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "pathology_types_code_key" ON "medical"."pathology_types"("code");

-- CreateIndex
CREATE INDEX "who_bone_tumor_classifications_category_idx" ON "medical"."who_bone_tumor_classifications"("category");

-- CreateIndex
CREATE INDEX "who_bone_tumor_classifications_isMalignant_idx" ON "medical"."who_bone_tumor_classifications"("isMalignant");

-- CreateIndex
CREATE UNIQUE INDEX "who_bone_tumor_classifications_category_diagnosis_key" ON "medical"."who_bone_tumor_classifications"("category", "diagnosis");

-- CreateIndex
CREATE INDEX "who_soft_tissue_tumor_classifications_category_idx" ON "medical"."who_soft_tissue_tumor_classifications"("category");

-- CreateIndex
CREATE INDEX "who_soft_tissue_tumor_classifications_isMalignant_idx" ON "medical"."who_soft_tissue_tumor_classifications"("isMalignant");

-- CreateIndex
CREATE UNIQUE INDEX "who_soft_tissue_tumor_classifications_category_diagnosis_key" ON "medical"."who_soft_tissue_tumor_classifications"("category", "diagnosis");

-- CreateIndex
CREATE UNIQUE INDEX "bone_locations_code_key" ON "medical"."bone_locations"("code");

-- CreateIndex
CREATE INDEX "bone_locations_level_idx" ON "medical"."bone_locations"("level");

-- CreateIndex
CREATE INDEX "bone_locations_region_idx" ON "medical"."bone_locations"("region");

-- CreateIndex
CREATE INDEX "bone_locations_parentId_idx" ON "medical"."bone_locations"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "soft_tissue_locations_code_key" ON "medical"."soft_tissue_locations"("code");

-- CreateIndex
CREATE INDEX "soft_tissue_locations_anatomicalRegion_idx" ON "medical"."soft_tissue_locations"("anatomicalRegion");

-- CreateIndex
CREATE UNIQUE INDEX "tumor_syndromes_name_key" ON "medical"."tumor_syndromes"("name");

-- CreateIndex
CREATE INDEX "msts_scores_patientId_idx" ON "medical"."msts_scores"("patientId");

-- CreateIndex
CREATE INDEX "msts_scores_followUpVisitId_idx" ON "medical"."msts_scores"("followUpVisitId");

-- CreateIndex
CREATE INDEX "msts_scores_assessmentDate_idx" ON "medical"."msts_scores"("assessmentDate");

-- CreateIndex
CREATE INDEX "follow_up_visits_patientId_idx" ON "medical"."follow_up_visits"("patientId");

-- CreateIndex
CREATE INDEX "follow_up_visits_scheduledDate_idx" ON "medical"."follow_up_visits"("scheduledDate");

-- CreateIndex
CREATE INDEX "follow_up_visits_status_idx" ON "medical"."follow_up_visits"("status");

-- CreateIndex
CREATE UNIQUE INDEX "follow_up_visits_patientId_visitNumber_key" ON "medical"."follow_up_visits"("patientId", "visitNumber");

-- CreateIndex
CREATE INDEX "cpc_conferences_patientId_idx" ON "medical"."cpc_conferences"("patientId");

-- CreateIndex
CREATE INDEX "cpc_conferences_conferenceDate_idx" ON "medical"."cpc_conferences"("conferenceDate");

-- CreateIndex
CREATE INDEX "treatment_management_patientId_idx" ON "medical"."treatment_management"("patientId");

-- CreateIndex
CREATE INDEX "treatment_management_treatmentType_idx" ON "medical"."treatment_management"("treatmentType");

-- CreateIndex
CREATE INDEX "treatment_management_status_idx" ON "medical"."treatment_management"("status");

-- CreateIndex
CREATE INDEX "case_reviews_patientId_idx" ON "medical"."case_reviews"("patientId");

-- CreateIndex
CREATE INDEX "case_reviews_caseType_idx" ON "medical"."case_reviews"("caseType");

-- CreateIndex
CREATE INDEX "case_reviews_status_idx" ON "medical"."case_reviews"("status");

-- CreateIndex
CREATE INDEX "case_reviews_specialty_idx" ON "medical"."case_reviews"("specialty");

-- CreateIndex
CREATE INDEX "case_reviews_flaggedAt_idx" ON "medical"."case_reviews"("flaggedAt");

-- CreateIndex
CREATE INDEX "review_assignments_caseReviewId_idx" ON "medical"."review_assignments"("caseReviewId");

-- CreateIndex
CREATE INDEX "review_assignments_assignedTo_idx" ON "medical"."review_assignments"("assignedTo");

-- CreateIndex
CREATE INDEX "review_assignments_status_idx" ON "medical"."review_assignments"("status");

-- CreateIndex
CREATE INDEX "review_comments_caseReviewId_idx" ON "medical"."review_comments"("caseReviewId");

-- CreateIndex
CREATE INDEX "review_comments_parentId_idx" ON "medical"."review_comments"("parentId");

-- CreateIndex
CREATE INDEX "review_comments_userId_idx" ON "medical"."review_comments"("userId");

-- CreateIndex
CREATE INDEX "peer_reviews_entityType_idx" ON "medical"."peer_reviews"("entityType");

-- CreateIndex
CREATE INDEX "peer_reviews_entityId_idx" ON "medical"."peer_reviews"("entityId");

-- CreateIndex
CREATE INDEX "peer_reviews_status_idx" ON "medical"."peer_reviews"("status");

-- CreateIndex
CREATE INDEX "peer_reviews_assignedTo_idx" ON "medical"."peer_reviews"("assignedTo");

-- CreateIndex
CREATE INDEX "peer_reviews_requestedAt_idx" ON "medical"."peer_reviews"("requestedAt");

-- CreateIndex
CREATE INDEX "peer_review_comments_peerReviewId_idx" ON "medical"."peer_review_comments"("peerReviewId");

-- CreateIndex
CREATE INDEX "peer_review_comments_parentId_idx" ON "medical"."peer_review_comments"("parentId");

-- CreateIndex
CREATE INDEX "peer_review_comments_userId_idx" ON "medical"."peer_review_comments"("userId");

-- CreateIndex
CREATE INDEX "review_recognitions_peerReviewId_idx" ON "medical"."review_recognitions"("peerReviewId");

-- CreateIndex
CREATE INDEX "review_recognitions_reviewerId_idx" ON "medical"."review_recognitions"("reviewerId");

-- CreateIndex
CREATE INDEX "external_systems_type_idx" ON "system"."external_systems"("type");

-- CreateIndex
CREATE INDEX "external_systems_status_idx" ON "system"."external_systems"("status");

-- CreateIndex
CREATE INDEX "external_systems_centerId_idx" ON "system"."external_systems"("centerId");

-- CreateIndex
CREATE UNIQUE INDEX "dicom_images_sopInstanceUID_key" ON "medical"."dicom_images"("sopInstanceUID");

-- CreateIndex
CREATE INDEX "dicom_images_patientId_idx" ON "medical"."dicom_images"("patientId");

-- CreateIndex
CREATE INDEX "dicom_images_studyInstanceUID_idx" ON "medical"."dicom_images"("studyInstanceUID");

-- CreateIndex
CREATE INDEX "dicom_images_seriesInstanceUID_idx" ON "medical"."dicom_images"("seriesInstanceUID");

-- CreateIndex
CREATE INDEX "dicom_images_modality_idx" ON "medical"."dicom_images"("modality");

-- CreateIndex
CREATE INDEX "dicom_images_studyDate_idx" ON "medical"."dicom_images"("studyDate");

-- CreateIndex
CREATE INDEX "research_data_exports_requestId_idx" ON "medical"."research_data_exports"("requestId");

-- CreateIndex
CREATE INDEX "research_data_exports_requestedBy_idx" ON "medical"."research_data_exports"("requestedBy");

-- CreateIndex
CREATE INDEX "research_data_exports_status_idx" ON "medical"."research_data_exports"("status");

-- CreateIndex
CREATE INDEX "research_data_exports_exportDate_idx" ON "medical"."research_data_exports"("exportDate");

-- CreateIndex
CREATE INDEX "research_data_exports_centerId_idx" ON "medical"."research_data_exports"("centerId");

-- CreateIndex
CREATE UNIQUE INDEX "clinical_presentations_patientId_key" ON "medical"."clinical_presentations"("patientId");

-- CreateIndex
CREATE INDEX "clinical_presentations_patientId_idx" ON "medical"."clinical_presentations"("patientId");

-- CreateIndex
CREATE INDEX "clinical_presentations_karnofskyScore_idx" ON "medical"."clinical_presentations"("karnofskyScore");

-- CreateIndex
CREATE INDEX "clinical_photos_patientId_idx" ON "medical"."clinical_photos"("patientId");

-- CreateIndex
CREATE INDEX "clinical_photos_uploadDate_idx" ON "medical"."clinical_photos"("uploadDate");

-- CreateIndex
CREATE INDEX "laboratory_results_extended_patientId_idx" ON "medical"."laboratory_results_extended"("patientId");

-- CreateIndex
CREATE INDEX "laboratory_results_extended_testDate_idx" ON "medical"."laboratory_results_extended"("testDate");

-- CreateIndex
CREATE INDEX "radiology_findings_patientId_idx" ON "medical"."radiology_findings"("patientId");

-- CreateIndex
CREATE INDEX "radiology_findings_modalityType_idx" ON "medical"."radiology_findings"("modalityType");

-- CreateIndex
CREATE INDEX "radiology_findings_studyDate_idx" ON "medical"."radiology_findings"("studyDate");

-- CreateIndex
CREATE INDEX "mirrel_scores_patientId_idx" ON "medical"."mirrel_scores"("patientId");

-- CreateIndex
CREATE INDEX "mirrel_scores_fractureRisk_idx" ON "medical"."mirrel_scores"("fractureRisk");

-- CreateIndex
CREATE INDEX "mirrel_scores_assessmentDate_idx" ON "medical"."mirrel_scores"("assessmentDate");

-- CreateIndex
CREATE INDEX "pathology_reports_extended_patientId_idx" ON "medical"."pathology_reports_extended"("patientId");

-- CreateIndex
CREATE INDEX "pathology_reports_extended_reportType_idx" ON "medical"."pathology_reports_extended"("reportType");

-- CreateIndex
CREATE INDEX "pathology_reports_extended_reportDate_idx" ON "medical"."pathology_reports_extended"("reportDate");

-- CreateIndex
CREATE INDEX "huvos_grades_patientId_idx" ON "medical"."huvos_grades"("patientId");

-- CreateIndex
CREATE INDEX "huvos_grades_grade_idx" ON "medical"."huvos_grades"("grade");

-- CreateIndex
CREATE INDEX "huvos_grades_assessmentDate_idx" ON "medical"."huvos_grades"("assessmentDate");

-- CreateIndex
CREATE UNIQUE INDEX "staging_data_patientId_key" ON "medical"."staging_data"("patientId");

-- CreateIndex
CREATE INDEX "staging_data_patientId_idx" ON "medical"."staging_data"("patientId");

-- CreateIndex
CREATE INDEX "staging_data_ennekingStage_idx" ON "medical"."staging_data"("ennekingStage");

-- CreateIndex
CREATE INDEX "staging_data_ajccStage_idx" ON "medical"."staging_data"("ajccStage");

-- CreateIndex
CREATE INDEX "cpc_records_patientId_idx" ON "medical"."cpc_records"("patientId");

-- CreateIndex
CREATE INDEX "cpc_records_cpcDate_idx" ON "medical"."cpc_records"("cpcDate");

-- CreateIndex
CREATE INDEX "chemotherapy_records_patientId_idx" ON "medical"."chemotherapy_records"("patientId");

-- CreateIndex
CREATE INDEX "chemotherapy_records_timing_idx" ON "medical"."chemotherapy_records"("timing");

-- CreateIndex
CREATE INDEX "chemotherapy_records_startDate_idx" ON "medical"."chemotherapy_records"("startDate");

-- CreateIndex
CREATE INDEX "surgical_records_patientId_idx" ON "medical"."surgical_records"("patientId");

-- CreateIndex
CREATE INDEX "surgical_records_surgeryType_idx" ON "medical"."surgical_records"("surgeryType");

-- CreateIndex
CREATE INDEX "surgical_records_surgicalMargin_idx" ON "medical"."surgical_records"("surgicalMargin");

-- CreateIndex
CREATE INDEX "surgical_records_surgeryDate_idx" ON "medical"."surgical_records"("surgeryDate");

-- CreateIndex
CREATE INDEX "radiotherapy_records_patientId_idx" ON "medical"."radiotherapy_records"("patientId");

-- CreateIndex
CREATE INDEX "radiotherapy_records_timing_idx" ON "medical"."radiotherapy_records"("timing");

-- CreateIndex
CREATE INDEX "radiotherapy_records_startDate_idx" ON "medical"."radiotherapy_records"("startDate");

-- CreateIndex
CREATE INDEX "follow_up_visits_enhanced_patientId_idx" ON "medical"."follow_up_visits_enhanced"("patientId");

-- CreateIndex
CREATE INDEX "follow_up_visits_enhanced_visitType_idx" ON "medical"."follow_up_visits_enhanced"("visitType");

-- CreateIndex
CREATE INDEX "follow_up_visits_enhanced_status_idx" ON "medical"."follow_up_visits_enhanced"("status");

-- CreateIndex
CREATE INDEX "follow_up_visits_enhanced_scheduledDate_idx" ON "medical"."follow_up_visits_enhanced"("scheduledDate");

-- CreateIndex
CREATE UNIQUE INDEX "follow_up_visits_enhanced_patientId_visitNumber_key" ON "medical"."follow_up_visits_enhanced"("patientId", "visitNumber");

-- CreateIndex
CREATE INDEX "msts_scores_enhanced_patientId_idx" ON "medical"."msts_scores_enhanced"("patientId");

-- CreateIndex
CREATE INDEX "msts_scores_enhanced_followUpVisitId_idx" ON "medical"."msts_scores_enhanced"("followUpVisitId");

-- CreateIndex
CREATE INDEX "msts_scores_enhanced_assessmentDate_idx" ON "medical"."msts_scores_enhanced"("assessmentDate");

-- CreateIndex
CREATE INDEX "recurrence_tracking_patientId_idx" ON "medical"."recurrence_tracking"("patientId");

-- CreateIndex
CREATE INDEX "recurrence_tracking_followUpVisitId_idx" ON "medical"."recurrence_tracking"("followUpVisitId");

-- CreateIndex
CREATE INDEX "recurrence_tracking_recurrenceType_idx" ON "medical"."recurrence_tracking"("recurrenceType");

-- CreateIndex
CREATE INDEX "recurrence_tracking_detectionDate_idx" ON "medical"."recurrence_tracking"("detectionDate");

-- CreateIndex
CREATE INDEX "complication_tracking_patientId_idx" ON "medical"."complication_tracking"("patientId");

-- CreateIndex
CREATE INDEX "complication_tracking_followUpVisitId_idx" ON "medical"."complication_tracking"("followUpVisitId");

-- CreateIndex
CREATE INDEX "complication_tracking_severity_idx" ON "medical"."complication_tracking"("severity");

-- CreateIndex
CREATE INDEX "complication_tracking_onsetDate_idx" ON "medical"."complication_tracking"("onsetDate");

-- CreateIndex
CREATE UNIQUE INDEX "patients_inamsosRecordNumber_key" ON "medical"."patients"("inamsosRecordNumber");

-- CreateIndex
CREATE INDEX "patients_pathologyType_idx" ON "medical"."patients"("pathologyType");

-- CreateIndex
CREATE INDEX "patients_whoBoneTumorId_idx" ON "medical"."patients"("whoBoneTumorId");

-- CreateIndex
CREATE INDEX "patients_whoSoftTissueTumorId_idx" ON "medical"."patients"("whoSoftTissueTumorId");

-- CreateIndex
CREATE INDEX "patients_boneLocationId_idx" ON "medical"."patients"("boneLocationId");

-- CreateIndex
CREATE INDEX "patients_softTissueLocationId_idx" ON "medical"."patients"("softTissueLocationId");

-- CreateIndex
CREATE INDEX "patients_ennekingStage_idx" ON "medical"."patients"("ennekingStage");

-- CreateIndex
CREATE INDEX "patients_ajccStage_idx" ON "medical"."patients"("ajccStage");

-- CreateIndex
CREATE INDEX "research_requests_requestingCenterId_idx" ON "medical"."research_requests"("requestingCenterId");

-- CreateIndex
CREATE UNIQUE INDEX "centers_mrPrefix_key" ON "system"."centers"("mrPrefix");

-- CreateIndex
CREATE INDEX "refresh_tokens_userId_idx" ON "system"."refresh_tokens"("userId");

-- CreateIndex
CREATE INDEX "refresh_tokens_token_idx" ON "system"."refresh_tokens"("token");

-- AddForeignKey
ALTER TABLE "medical"."medical_record_sequences" ADD CONSTRAINT "medical_record_sequences_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "system"."centers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."patients" ADD CONSTRAINT "patients_whoBoneTumorId_fkey" FOREIGN KEY ("whoBoneTumorId") REFERENCES "medical"."who_bone_tumor_classifications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."patients" ADD CONSTRAINT "patients_whoSoftTissueTumorId_fkey" FOREIGN KEY ("whoSoftTissueTumorId") REFERENCES "medical"."who_soft_tissue_tumor_classifications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."patients" ADD CONSTRAINT "patients_boneLocationId_fkey" FOREIGN KEY ("boneLocationId") REFERENCES "medical"."bone_locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."patients" ADD CONSTRAINT "patients_softTissueLocationId_fkey" FOREIGN KEY ("softTissueLocationId") REFERENCES "medical"."soft_tissue_locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."patients" ADD CONSTRAINT "patients_tumorSyndromeId_fkey" FOREIGN KEY ("tumorSyndromeId") REFERENCES "medical"."tumor_syndromes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."patient_diagnoses" ADD CONSTRAINT "patient_diagnoses_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "system"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."medical_images" ADD CONSTRAINT "medical_images_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."pathology_reports" ADD CONSTRAINT "pathology_reports_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."research_requests" ADD CONSTRAINT "research_requests_requestingCenterId_fkey" FOREIGN KEY ("requestingCenterId") REFERENCES "system"."centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."research_request_approvals_new" ADD CONSTRAINT "research_request_approvals_new_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "medical"."research_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."research_request_approvals_new" ADD CONSTRAINT "research_request_approvals_new_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "system"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit"."activity_logs_new" ADD CONSTRAINT "activity_logs_new_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "system"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit"."activity_logs_new" ADD CONSTRAINT "activity_logs_new_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "system"."centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system"."notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "system"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system"."security_alerts" ADD CONSTRAINT "security_alerts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "system"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system"."sso_logins" ADD CONSTRAINT "sso_logins_configId_fkey" FOREIGN KEY ("configId") REFERENCES "system"."sso_configurations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."bone_locations" ADD CONSTRAINT "bone_locations_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "medical"."bone_locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."msts_scores" ADD CONSTRAINT "msts_scores_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."follow_up_visits" ADD CONSTRAINT "follow_up_visits_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."cpc_conferences" ADD CONSTRAINT "cpc_conferences_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."treatment_management" ADD CONSTRAINT "treatment_management_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."review_assignments" ADD CONSTRAINT "review_assignments_caseReviewId_fkey" FOREIGN KEY ("caseReviewId") REFERENCES "medical"."case_reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."review_comments" ADD CONSTRAINT "review_comments_caseReviewId_fkey" FOREIGN KEY ("caseReviewId") REFERENCES "medical"."case_reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."review_comments" ADD CONSTRAINT "review_comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "medical"."review_comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."peer_review_comments" ADD CONSTRAINT "peer_review_comments_peerReviewId_fkey" FOREIGN KEY ("peerReviewId") REFERENCES "medical"."peer_reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."peer_review_comments" ADD CONSTRAINT "peer_review_comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "medical"."peer_review_comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."review_recognitions" ADD CONSTRAINT "review_recognitions_peerReviewId_fkey" FOREIGN KEY ("peerReviewId") REFERENCES "medical"."peer_reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."clinical_presentations" ADD CONSTRAINT "clinical_presentations_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."clinical_photos" ADD CONSTRAINT "clinical_photos_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."laboratory_results_extended" ADD CONSTRAINT "laboratory_results_extended_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."radiology_findings" ADD CONSTRAINT "radiology_findings_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."mirrel_scores" ADD CONSTRAINT "mirrel_scores_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."pathology_reports_extended" ADD CONSTRAINT "pathology_reports_extended_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."huvos_grades" ADD CONSTRAINT "huvos_grades_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."staging_data" ADD CONSTRAINT "staging_data_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."cpc_records" ADD CONSTRAINT "cpc_records_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."chemotherapy_records" ADD CONSTRAINT "chemotherapy_records_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."surgical_records" ADD CONSTRAINT "surgical_records_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."radiotherapy_records" ADD CONSTRAINT "radiotherapy_records_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."follow_up_visits_enhanced" ADD CONSTRAINT "follow_up_visits_enhanced_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."msts_scores_enhanced" ADD CONSTRAINT "msts_scores_enhanced_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."msts_scores_enhanced" ADD CONSTRAINT "msts_scores_enhanced_followUpVisitId_fkey" FOREIGN KEY ("followUpVisitId") REFERENCES "medical"."follow_up_visits_enhanced"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."recurrence_tracking" ADD CONSTRAINT "recurrence_tracking_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."recurrence_tracking" ADD CONSTRAINT "recurrence_tracking_followUpVisitId_fkey" FOREIGN KEY ("followUpVisitId") REFERENCES "medical"."follow_up_visits_enhanced"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."complication_tracking" ADD CONSTRAINT "complication_tracking_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "medical"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical"."complication_tracking" ADD CONSTRAINT "complication_tracking_followUpVisitId_fkey" FOREIGN KEY ("followUpVisitId") REFERENCES "medical"."follow_up_visits_enhanced"("id") ON DELETE SET NULL ON UPDATE CASCADE;
