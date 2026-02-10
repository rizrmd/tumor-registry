"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OfflineQueueService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfflineQueueService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("@/database/prisma.service");
const file_sync_service_1 = require("./file-sync.service");
const remote_prisma_service_1 = require("@/database/remote-prisma.service");
let OfflineQueueService = OfflineQueueService_1 = class OfflineQueueService {
    constructor(prisma, remotePrismaService, fileSyncService) {
        this.prisma = prisma;
        this.remotePrismaService = remotePrismaService;
        this.fileSyncService = fileSyncService;
        this.logger = new common_1.Logger(OfflineQueueService_1.name);
        this.isSyncing = false;
        this.isFileSyncing = false;
        this.phase1Entities = [
            'center',
            'role',
            'permission',
            'who-bone-tumor',
            'who-soft-tissue-tumor',
            'bone-location',
            'soft-tissue-location',
            'tumor-syndrome',
        ];
        this.phase2Entities = [
            'user',
            'user-role',
            'role-permission',
            'system-configuration',
        ];
        this.phase3Entities = [
            'patient',
            'medical-record-sequence',
        ];
        this.phase4Entities = [
            'diagnosis',
            'medication',
            'vital-sign',
            'laboratory-result',
            'radiology-result',
            'patient-procedure',
            'patient-consent',
            'patient-visit',
            'patient-allergy',
            'patient-insurance',
            'pathology-report',
            'medical-record',
            'medical-image',
            'clinical-photo',
            'clinical-presentation',
            'staging-data',
            'radiology-finding',
            'laboratory-result-extended',
            'pathology-report-extended',
            'mirrel-score',
            'huvos-grade',
            'msts-score',
            'msts-score-enhanced',
            'follow-up-visit',
            'follow-up-visit-enhanced',
            'recurrence-tracking',
            'complication-tracking',
            'cpc-conference',
            'cpc-record',
            'treatment-management',
            'chemotherapy-record',
            'surgical-record',
            'radiotherapy-record',
        ];
        this.phase5Entities = [
            'research-request',
            'research-request-approval',
            'research-approval',
            'research-collaboration',
            'research-publication',
            'research-impact-metric',
            'research-impact-analysis',
            'data-access-session',
            'research-request-activity',
        ];
        this.phase6Entities = [
            'national-statistics-cache',
            'cancer-geographic-data',
            'cancer-aggregate-stats',
            'analytics-performance-metric',
            'cancer-trend-analysis',
            'national-cancer-intelligence',
            'predictive-model',
            'model-prediction',
            'model-performance-metric',
            'executive-dashboard',
            'real-time-analytics-cache',
            'materialized-view-refresh',
        ];
        this.phase7Entities = [
            'report-template',
            'generated-report',
            'scheduled-report',
            'report-execution',
            'report-history',
            'report-schedule',
            'report-distribution',
            'report-access-log',
        ];
        this.phase8Entities = [
            'case-review',
            'review-assignment',
            'review-comment',
            'peer-review',
            'peer-review-comment',
            'review-recognition',
        ];
        this.phase9Entities = [
            'notification-template',
            'notification',
            'notification-preference',
            'notification-history',
            'notification-digest',
        ];
        this.phase10Entities = [
            'audit-log',
            'activity-log',
            'user-activity-log',
            'security-event',
            'analytics-event-log',
            'api-usage',
            'api-endpoint',
        ];
        this.phase11Entities = [
            'backup-job',
            'backup-execution',
            'scheduled-task',
            'task-execution',
            'health-check',
            'health-check-result',
            'data-export-job',
            'data-import-job',
            'compliance-audit',
            'system-alert',
            'performance-metric',
            'external-integration',
            'integration-sync-log',
            'calendar-integration',
        ];
        this.trackedEntities = [
            ...this.phase1Entities,
            ...this.phase2Entities,
            ...this.phase3Entities,
            ...this.phase4Entities,
            ...this.phase5Entities,
            ...this.phase6Entities,
            ...this.phase7Entities,
            ...this.phase8Entities,
            ...this.phase9Entities,
            ...this.phase10Entities,
            ...this.phase11Entities,
        ];
    }
    get remotePrisma() {
        return this.remotePrismaService;
    }
    async onModuleInit() {
        setTimeout(() => {
            this.logger.log('Starting background sync loop');
            setInterval(() => {
                this.runFullSync().catch((err) => this.logger.error('Background sync failed', err));
            }, 1000 * 60 * 5);
            setInterval(() => {
                this.syncFiles().catch((err) => this.logger.error('Background file sync failed', err));
            }, 1000 * 60 * 10);
        }, 5000);
    }
    async runFullSync() {
        this.logger.log('Starting full sync (Push + Pull + Files)');
        await this.syncAllPendingItems();
        const dataSyncResults = await this.syncRemoteChanges();
        await this.syncFiles();
        this.logger.log('Full sync completed');
        return { dataSync: dataSyncResults, status: 'COMPLETED' };
    }
    async syncFiles() {
        if (this.isFileSyncing) {
            return { status: 'ALREADY_RUNNING' };
        }
        this.isFileSyncing = true;
        try {
            this.logger.log('Starting file sync...');
            await this.fileSyncService.queueFilesForSync('medical-image', new Date(0));
            await this.fileSyncService.queueFilesForSync('clinical-photo', new Date(0));
            await this.fileSyncService.queueFilesForSync('pathology-report', new Date(0));
            const results = await this.fileSyncService.processPendingFileSyncs();
            this.logger.log(`File sync completed: ${results.succeeded} succeeded, ${results.failed} failed`);
            return results;
        }
        catch (error) {
            this.logger.error('File sync failed:', error);
            return { status: 'FAILED', error: error.message };
        }
        finally {
            this.isFileSyncing = false;
        }
    }
    async syncRemoteChanges() {
        try {
            if (!(await this.remotePrismaService.checkConnection())) {
                return { status: 'OFFLINE' };
            }
            this.logger.log('Pulling remote changes...');
            const results = [];
            const phases = [
                { name: 'Phase 1: Core System', entities: this.phase1Entities },
                { name: 'Phase 2: User & Auth', entities: this.phase2Entities },
                { name: 'Phase 3: Patient Core', entities: this.phase3Entities },
                { name: 'Phase 4: Medical Data', entities: this.phase4Entities },
                { name: 'Phase 5: Research', entities: this.phase5Entities },
                { name: 'Phase 6: Analytics', entities: this.phase6Entities },
                { name: 'Phase 7: Reporting', entities: this.phase7Entities },
                { name: 'Phase 8: Quality & Review', entities: this.phase8Entities },
                { name: 'Phase 9: Notifications', entities: this.phase9Entities },
                { name: 'Phase 10: Audit & Security', entities: this.phase10Entities },
                { name: 'Phase 11: System Admin', entities: this.phase11Entities },
            ];
            for (const phase of phases) {
                this.logger.log(`Starting ${phase.name}...`);
                for (const entityType of phase.entities) {
                    try {
                        const pullRes = await this.pullRemoteData(entityType);
                        results.push({ entityType, ...pullRes });
                    }
                    catch (error) {
                        this.logger.error(`Error syncing ${entityType}`, error);
                        results.push({ entityType, pulled: 0, error: error.message });
                    }
                }
            }
            return results;
        }
        catch (error) {
            this.logger.error('Error pulling remote changes', error);
            throw error;
        }
    }
    async pullRemoteData(entityType) {
        try {
            const state = await this.prisma.offlineSyncState.findUnique({
                where: { entityType },
            });
            const lastPullAt = state?.lastPullAt || new Date(0);
            const remoteRecords = await this.fetchRemoteChanges(entityType, lastPullAt);
            if (remoteRecords.length === 0)
                return { pulled: 0 };
            this.logger.log(`Pulled ${remoteRecords.length} new ${entityType} records from remote`);
            for (const record of remoteRecords) {
                await this.upsertLocal(entityType, record);
            }
            await this.prisma.offlineSyncState.upsert({
                where: { entityType },
                create: {
                    entityType,
                    lastPullAt: new Date(),
                    totalItemsSynced: remoteRecords.length,
                },
                update: {
                    lastPullAt: new Date(),
                    totalItemsSynced: { increment: remoteRecords.length },
                },
            });
            return { pulled: remoteRecords.length };
        }
        catch (error) {
            this.logger.error(`Error pulling remote data for ${entityType}`, error);
            return { pulled: 0, error: error.message };
        }
    }
    async fetchRemoteChanges(entityType, since) {
        const take = 500;
        const withUpdatedAt = { where: { updatedAt: { gt: since } }, take };
        const withCreatedAt = { where: { createdAt: { gt: since } }, take };
        const noTimestamp = { take };
        switch (entityType.toLowerCase()) {
            case 'center':
                return await this.remotePrisma.center.findMany(withUpdatedAt);
            case 'role':
                return await this.remotePrisma.role.findMany(noTimestamp);
            case 'permission':
                return await this.remotePrisma.permission.findMany(noTimestamp);
            case 'who-bone-tumor':
                return await this.remotePrisma.whoBoneTumorClassification.findMany(withUpdatedAt);
            case 'who-soft-tissue-tumor':
                return await this.remotePrisma.whoSoftTissueTumorClassification.findMany(withUpdatedAt);
            case 'bone-location':
                return await this.remotePrisma.boneLocation.findMany(withUpdatedAt);
            case 'soft-tissue-location':
                return await this.remotePrisma.softTissueLocation.findMany(withUpdatedAt);
            case 'tumor-syndrome':
                return await this.remotePrisma.tumorSyndrome.findMany(withUpdatedAt);
            case 'user':
                return await this.remotePrisma.user.findMany({
                    where: { updatedAt: { gt: since } },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        passwordHash: true,
                        kolegiumId: true,
                        phone: true,
                        nik: true,
                        isActive: true,
                        isEmailVerified: true,
                        mfaEnabled: true,
                        mfaSecret: true,
                        isLocked: true,
                        lockedUntil: true,
                        lastLoginAt: true,
                        isSsoUser: true,
                        centerId: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                    take,
                });
            case 'user-role':
                return await this.remotePrisma.userRole.findMany(withCreatedAt);
            case 'role-permission':
                return await this.remotePrisma.rolePermission.findMany(withCreatedAt);
            case 'system-configuration':
                return await this.remotePrisma.systemConfiguration.findMany(withUpdatedAt);
            case 'patient':
                return await this.remotePrisma.patient.findMany(withUpdatedAt);
            case 'medical-record-sequence':
                return await this.remotePrisma.medicalRecordSequence.findMany(withUpdatedAt);
            case 'diagnosis':
                return await this.remotePrisma.patientDiagnosis.findMany(withUpdatedAt);
            case 'medication':
                return await this.remotePrisma.patientMedication.findMany(withUpdatedAt);
            case 'vital-sign':
                return await this.remotePrisma.vitalSign.findMany({
                    where: {},
                    orderBy: { id: 'desc' },
                    take,
                });
            case 'laboratory-result':
                return await this.remotePrisma.laboratoryResult.findMany(withUpdatedAt);
            case 'radiology-result':
                return await this.remotePrisma.radiologyResult.findMany(withUpdatedAt);
            case 'patient-procedure':
                return await this.remotePrisma.patientProcedure.findMany(withUpdatedAt);
            case 'patient-consent':
                return await this.remotePrisma.patientConsent.findMany(withUpdatedAt);
            case 'patient-visit':
                return await this.remotePrisma.patientVisit.findMany(withUpdatedAt);
            case 'patient-allergy':
                return await this.remotePrisma.patientAllergy.findMany(withUpdatedAt);
            case 'patient-insurance':
                return await this.remotePrisma.patientInsurance.findMany(withUpdatedAt);
            case 'pathology-report':
                return await this.remotePrisma.pathologyReport.findMany(withUpdatedAt);
            case 'medical-record':
                return await this.remotePrisma.medicalRecord.findMany(withUpdatedAt);
            case 'medical-image':
                return await this.remotePrisma.medicalImage.findMany(withUpdatedAt);
            case 'clinical-photo':
                return await this.remotePrisma.clinicalPhoto.findMany(withUpdatedAt);
            case 'clinical-presentation':
                return await this.remotePrisma.clinicalPresentation.findMany(withUpdatedAt);
            case 'staging-data':
                return await this.remotePrisma.stagingData.findMany(withUpdatedAt);
            case 'radiology-finding':
                return await this.remotePrisma.radiologyFinding.findMany(withUpdatedAt);
            case 'laboratory-result-extended':
                return await this.remotePrisma.laboratoryResult_Extended.findMany(withUpdatedAt);
            case 'pathology-report-extended':
                return await this.remotePrisma.pathologyReport_Extended.findMany(withUpdatedAt);
            case 'mirrel-score':
                return await this.remotePrisma.mirrelScore.findMany(withUpdatedAt);
            case 'huvos-grade':
                return await this.remotePrisma.huvosGrade.findMany(withUpdatedAt);
            case 'msts-score':
                return await this.remotePrisma.mstsScore.findMany(withUpdatedAt);
            case 'msts-score-enhanced':
                return await this.remotePrisma.mstsScore_Enhanced.findMany(withUpdatedAt);
            case 'follow-up-visit':
                return await this.remotePrisma.followUpVisit.findMany(withUpdatedAt);
            case 'follow-up-visit-enhanced':
                return await this.remotePrisma.followUpVisit_Enhanced.findMany(withUpdatedAt);
            case 'recurrence-tracking':
                return await this.remotePrisma.recurrenceTracking.findMany(withUpdatedAt);
            case 'complication-tracking':
                return await this.remotePrisma.complicationTracking.findMany(withUpdatedAt);
            case 'cpc-conference':
                return await this.remotePrisma.cpcConference.findMany(withUpdatedAt);
            case 'cpc-record':
                return await this.remotePrisma.cpcRecord.findMany(withUpdatedAt);
            case 'treatment-management':
                return await this.remotePrisma.treatmentManagement.findMany(withUpdatedAt);
            case 'chemotherapy-record':
                return await this.remotePrisma.chemotherapyRecord.findMany(withUpdatedAt);
            case 'surgical-record':
                return await this.remotePrisma.surgicalRecord.findMany(withUpdatedAt);
            case 'radiotherapy-record':
                return await this.remotePrisma.radiotherapyRecord.findMany(withUpdatedAt);
            case 'research-request':
                return await this.remotePrisma.researchRequest.findMany(withUpdatedAt);
            case 'research-request-approval':
                return await this.remotePrisma.researchRequestApproval.findMany(withCreatedAt);
            case 'research-approval':
                return await this.remotePrisma.researchApproval.findMany(withUpdatedAt);
            case 'research-collaboration':
                return await this.remotePrisma.researchCollaboration.findMany(withUpdatedAt);
            case 'research-publication':
                return await this.remotePrisma.researchPublication.findMany(withUpdatedAt);
            case 'research-impact-metric':
                return await this.remotePrisma.researchImpactMetric.findMany(withUpdatedAt);
            case 'research-impact-analysis':
                return await this.remotePrisma.researchImpactAnalysis.findMany(withUpdatedAt);
            case 'data-access-session':
                return await this.remotePrisma.dataAccessSession.findMany(withUpdatedAt);
            case 'research-request-activity':
                return await this.remotePrisma.researchRequestActivity.findMany(withCreatedAt);
            case 'national-statistics-cache':
                return await this.remotePrisma.nationalStatisticsCache.findMany(noTimestamp);
            case 'cancer-geographic-data':
                return await this.remotePrisma.cancerGeographicData.findMany(withUpdatedAt);
            case 'cancer-aggregate-stats':
                return await this.remotePrisma.cancerAggregateStats.findMany(noTimestamp);
            case 'analytics-performance-metric':
                return await this.remotePrisma.analyticsPerformanceMetric.findMany(withUpdatedAt);
            case 'cancer-trend-analysis':
                return await this.remotePrisma.cancerTrendAnalysis.findMany(withUpdatedAt);
            case 'national-cancer-intelligence':
                return await this.remotePrisma.nationalCancerIntelligence.findMany(noTimestamp);
            case 'predictive-model':
                return await this.remotePrisma.predictiveModel.findMany(withUpdatedAt);
            case 'model-prediction':
                return await this.remotePrisma.modelPrediction.findMany(withUpdatedAt);
            case 'model-performance-metric':
                return await this.remotePrisma.modelPerformanceMetric.findMany({
                    where: { timestamp: { gt: since } },
                    take,
                });
            case 'executive-dashboard':
                return await this.remotePrisma.executiveDashboard.findMany(withUpdatedAt);
            case 'real-time-analytics-cache':
                return await this.remotePrisma.realTimeAnalyticsCache.findMany({
                    where: { lastRefreshed: { gt: since } },
                    take,
                });
            case 'materialized-view-refresh':
                return await this.remotePrisma.materializedViewRefresh.findMany(withUpdatedAt);
            case 'report-template':
                return await this.remotePrisma.reportTemplate.findMany(withUpdatedAt);
            case 'generated-report':
                return await this.remotePrisma.generatedReport.findMany(noTimestamp);
            case 'scheduled-report':
                return await this.remotePrisma.scheduledReport.findMany(withUpdatedAt);
            case 'report-execution':
                return await this.remotePrisma.reportExecution.findMany(noTimestamp);
            case 'report-history':
                return await this.remotePrisma.reportHistory.findMany(withCreatedAt);
            case 'report-schedule':
                return await this.remotePrisma.reportSchedule.findMany(withUpdatedAt);
            case 'report-distribution':
                return await this.remotePrisma.reportDistribution.findMany(withUpdatedAt);
            case 'report-access-log':
                return await this.remotePrisma.reportAccessLog.findMany(noTimestamp);
            case 'case-review':
                return await this.remotePrisma.caseReview.findMany(withUpdatedAt);
            case 'review-assignment':
                return await this.remotePrisma.reviewAssignment.findMany(withUpdatedAt);
            case 'review-comment':
                return await this.remotePrisma.reviewComment.findMany(withUpdatedAt);
            case 'peer-review':
                return await this.remotePrisma.peerReview.findMany(withUpdatedAt);
            case 'peer-review-comment':
                return await this.remotePrisma.peerReviewComment.findMany(withUpdatedAt);
            case 'review-recognition':
                return await this.remotePrisma.reviewRecognition.findMany(noTimestamp);
            case 'notification-template':
                return await this.remotePrisma.notificationTemplate.findMany(withUpdatedAt);
            case 'notification':
                return await this.remotePrisma.notification.findMany(withUpdatedAt);
            case 'notification-preference':
                return await this.remotePrisma.notificationPreference.findMany(withUpdatedAt);
            case 'notification-history':
                return await this.remotePrisma.notificationHistory.findMany(withCreatedAt);
            case 'notification-digest':
                return await this.remotePrisma.notificationDigest.findMany(withUpdatedAt);
            case 'audit-log':
                return await this.remotePrisma.auditLog.findMany(withCreatedAt);
            case 'activity-log':
                return await this.remotePrisma.activityLog.findMany(withCreatedAt);
            case 'user-activity-log':
                return await this.remotePrisma.userActivityLog.findMany(noTimestamp);
            case 'security-event':
                return await this.remotePrisma.securityEvent.findMany(withUpdatedAt);
            case 'analytics-event-log':
                return await this.remotePrisma.analyticsEventLog.findMany(noTimestamp);
            case 'api-usage':
                return await this.remotePrisma.apiUsage.findMany(noTimestamp);
            case 'api-endpoint':
                return await this.remotePrisma.apiEndpoint.findMany(withUpdatedAt);
            case 'backup-job':
                return await this.remotePrisma.backupJob.findMany(withUpdatedAt);
            case 'backup-execution':
                return await this.remotePrisma.backupExecution.findMany(noTimestamp);
            case 'scheduled-task':
                return await this.remotePrisma.scheduledTask.findMany(withUpdatedAt);
            case 'task-execution':
                return await this.remotePrisma.taskExecution.findMany(noTimestamp);
            case 'health-check':
                return await this.remotePrisma.healthCheck.findMany(withUpdatedAt);
            case 'health-check-result':
                return await this.remotePrisma.healthCheckResult.findMany(noTimestamp);
            case 'data-export-job':
                return await this.remotePrisma.dataExportJob.findMany(noTimestamp);
            case 'data-import-job':
                return await this.remotePrisma.dataImportJob.findMany(noTimestamp);
            case 'compliance-audit':
                return await this.remotePrisma.complianceAudit.findMany(withUpdatedAt);
            case 'system-alert':
                return await this.remotePrisma.systemAlert.findMany(withUpdatedAt);
            case 'performance-metric':
                return await this.remotePrisma.performanceMetric.findMany(noTimestamp);
            case 'external-integration':
                return await this.remotePrisma.externalIntegration.findMany(withUpdatedAt);
            case 'integration-sync-log':
                return await this.remotePrisma.integrationSyncLog.findMany(noTimestamp);
            case 'calendar-integration':
                return await this.remotePrisma.calendarIntegration.findMany(withUpdatedAt);
            default:
                return [];
        }
    }
    async upsertLocal(entityType, data) {
        const { id, ...rest } = data;
        const model = entityType.toLowerCase();
        switch (model) {
            case 'center':
                return await this.prisma.center.upsert({ where: { id }, create: data, update: rest });
            case 'role':
                return await this.prisma.role.upsert({ where: { id }, create: data, update: rest });
            case 'permission':
                return await this.prisma.permission.upsert({ where: { id }, create: data, update: rest });
            case 'who-bone-tumor':
                return await this.prisma.whoBoneTumorClassification.upsert({ where: { id }, create: data, update: rest });
            case 'who-soft-tissue-tumor':
                return await this.prisma.whoSoftTissueTumorClassification.upsert({ where: { id }, create: data, update: rest });
            case 'bone-location':
                return await this.prisma.boneLocation.upsert({ where: { id }, create: data, update: rest });
            case 'soft-tissue-location':
                return await this.prisma.softTissueLocation.upsert({ where: { id }, create: data, update: rest });
            case 'tumor-syndrome':
                return await this.prisma.tumorSyndrome.upsert({ where: { id }, create: data, update: rest });
            case 'user':
                return await this.prisma.user.upsert({ where: { id }, create: data, update: rest });
            case 'user-role':
                return await this.prisma.userRole.upsert({ where: { id }, create: data, update: rest });
            case 'role-permission':
                return await this.prisma.rolePermission.upsert({ where: { id }, create: data, update: rest });
            case 'system-configuration':
                return await this.prisma.systemConfiguration.upsert({ where: { id }, create: data, update: rest });
            case 'patient':
                return await this.prisma.patient.upsert({ where: { id }, create: data, update: rest });
            case 'medical-record-sequence':
                return await this.prisma.medicalRecordSequence.upsert({ where: { id }, create: data, update: rest });
            case 'diagnosis':
                return await this.prisma.patientDiagnosis.upsert({ where: { id }, create: data, update: rest });
            case 'medication':
                return await this.prisma.patientMedication.upsert({ where: { id }, create: data, update: rest });
            case 'vital-sign':
                return await this.prisma.vitalSign.upsert({ where: { id }, create: data, update: rest });
            case 'laboratory-result':
                return await this.prisma.laboratoryResult.upsert({ where: { id }, create: data, update: rest });
            case 'radiology-result':
                return await this.prisma.radiologyResult.upsert({ where: { id }, create: data, update: rest });
            case 'patient-procedure':
                return await this.prisma.patientProcedure.upsert({ where: { id }, create: data, update: rest });
            case 'patient-consent':
                return await this.prisma.patientConsent.upsert({ where: { id }, create: data, update: rest });
            case 'patient-visit':
                return await this.prisma.patientVisit.upsert({ where: { id }, create: data, update: rest });
            case 'patient-allergy':
                return await this.prisma.patientAllergy.upsert({ where: { id }, create: data, update: rest });
            case 'patient-insurance':
                return await this.prisma.patientInsurance.upsert({ where: { id }, create: data, update: rest });
            case 'pathology-report':
                return await this.prisma.pathologyReport.upsert({ where: { id }, create: data, update: rest });
            case 'medical-record':
                return await this.prisma.medicalRecord.upsert({ where: { id }, create: data, update: rest });
            case 'medical-image':
                return await this.prisma.medicalImage.upsert({ where: { id }, create: data, update: rest });
            case 'clinical-photo':
                return await this.prisma.clinicalPhoto.upsert({ where: { id }, create: data, update: rest });
            case 'clinical-presentation':
                return await this.prisma.clinicalPresentation.upsert({ where: { id }, create: data, update: rest });
            case 'staging-data':
                return await this.prisma.stagingData.upsert({ where: { id }, create: data, update: rest });
            case 'radiology-finding':
                return await this.prisma.radiologyFinding.upsert({ where: { id }, create: data, update: rest });
            case 'laboratory-result-extended':
                return await this.prisma.laboratoryResult_Extended.upsert({ where: { id }, create: data, update: rest });
            case 'pathology-report-extended':
                return await this.prisma.pathologyReport_Extended.upsert({ where: { id }, create: data, update: rest });
            case 'mirrel-score':
                return await this.prisma.mirrelScore.upsert({ where: { id }, create: data, update: rest });
            case 'huvos-grade':
                return await this.prisma.huvosGrade.upsert({ where: { id }, create: data, update: rest });
            case 'msts-score':
                return await this.prisma.mstsScore.upsert({ where: { id }, create: data, update: rest });
            case 'msts-score-enhanced':
                return await this.prisma.mstsScore_Enhanced.upsert({ where: { id }, create: data, update: rest });
            case 'follow-up-visit':
                return await this.prisma.followUpVisit.upsert({ where: { id }, create: data, update: rest });
            case 'follow-up-visit-enhanced':
                return await this.prisma.followUpVisit_Enhanced.upsert({ where: { id }, create: data, update: rest });
            case 'recurrence-tracking':
                return await this.prisma.recurrenceTracking.upsert({ where: { id }, create: data, update: rest });
            case 'complication-tracking':
                return await this.prisma.complicationTracking.upsert({ where: { id }, create: data, update: rest });
            case 'cpc-conference':
                return await this.prisma.cpcConference.upsert({ where: { id }, create: data, update: rest });
            case 'cpc-record':
                return await this.prisma.cpcRecord.upsert({ where: { id }, create: data, update: rest });
            case 'treatment-management':
                return await this.prisma.treatmentManagement.upsert({ where: { id }, create: data, update: rest });
            case 'chemotherapy-record':
                return await this.prisma.chemotherapyRecord.upsert({ where: { id }, create: data, update: rest });
            case 'surgical-record':
                return await this.prisma.surgicalRecord.upsert({ where: { id }, create: data, update: rest });
            case 'radiotherapy-record':
                return await this.prisma.radiotherapyRecord.upsert({ where: { id }, create: data, update: rest });
            case 'research-request':
                return await this.prisma.researchRequest.upsert({ where: { id }, create: data, update: rest });
            case 'research-request-approval':
                return await this.prisma.researchRequestApproval.upsert({ where: { id }, create: data, update: rest });
            case 'research-approval':
                return await this.prisma.researchApproval.upsert({ where: { id }, create: data, update: rest });
            case 'research-collaboration':
                return await this.prisma.researchCollaboration.upsert({ where: { id }, create: data, update: rest });
            case 'research-publication':
                return await this.prisma.researchPublication.upsert({ where: { id }, create: data, update: rest });
            case 'research-impact-metric':
                return await this.prisma.researchImpactMetric.upsert({ where: { id }, create: data, update: rest });
            case 'research-impact-analysis':
                return await this.prisma.researchImpactAnalysis.upsert({ where: { id }, create: data, update: rest });
            case 'data-access-session':
                return await this.prisma.dataAccessSession.upsert({ where: { id }, create: data, update: rest });
            case 'research-request-activity':
                return await this.prisma.researchRequestActivity.upsert({ where: { id }, create: data, update: rest });
            case 'national-statistics-cache':
                return await this.prisma.nationalStatisticsCache.upsert({ where: { id }, create: data, update: rest });
            case 'cancer-geographic-data':
                return await this.prisma.cancerGeographicData.upsert({ where: { id }, create: data, update: rest });
            case 'cancer-aggregate-stats':
                return await this.prisma.cancerAggregateStats.upsert({ where: { id }, create: data, update: rest });
            case 'analytics-performance-metric':
                return await this.prisma.analyticsPerformanceMetric.upsert({ where: { id }, create: data, update: rest });
            case 'cancer-trend-analysis':
                return await this.prisma.cancerTrendAnalysis.upsert({ where: { id }, create: data, update: rest });
            case 'national-cancer-intelligence':
                return await this.prisma.nationalCancerIntelligence.upsert({ where: { id }, create: data, update: rest });
            case 'predictive-model':
                return await this.prisma.predictiveModel.upsert({ where: { id }, create: data, update: rest });
            case 'model-prediction':
                return await this.prisma.modelPrediction.upsert({ where: { id }, create: data, update: rest });
            case 'model-performance-metric':
                return await this.prisma.modelPerformanceMetric.upsert({ where: { id }, create: data, update: rest });
            case 'executive-dashboard':
                return await this.prisma.executiveDashboard.upsert({ where: { id }, create: data, update: rest });
            case 'real-time-analytics-cache':
                return await this.prisma.realTimeAnalyticsCache.upsert({ where: { id }, create: data, update: rest });
            case 'materialized-view-refresh':
                return await this.prisma.materializedViewRefresh.upsert({ where: { id }, create: data, update: rest });
            case 'report-template':
                return await this.prisma.reportTemplate.upsert({ where: { id }, create: data, update: rest });
            case 'generated-report':
                return await this.prisma.generatedReport.upsert({ where: { id }, create: data, update: rest });
            case 'scheduled-report':
                return await this.prisma.scheduledReport.upsert({ where: { id }, create: data, update: rest });
            case 'report-execution':
                return await this.prisma.reportExecution.upsert({ where: { id }, create: data, update: rest });
            case 'report-history':
                return await this.prisma.reportHistory.upsert({ where: { id }, create: data, update: rest });
            case 'report-schedule':
                return await this.prisma.reportSchedule.upsert({ where: { id }, create: data, update: rest });
            case 'report-distribution':
                return await this.prisma.reportDistribution.upsert({ where: { id }, create: data, update: rest });
            case 'report-access-log':
                return await this.prisma.reportAccessLog.upsert({ where: { id }, create: data, update: rest });
            case 'case-review':
                return await this.prisma.caseReview.upsert({ where: { id }, create: data, update: rest });
            case 'review-assignment':
                return await this.prisma.reviewAssignment.upsert({ where: { id }, create: data, update: rest });
            case 'review-comment':
                return await this.prisma.reviewComment.upsert({ where: { id }, create: data, update: rest });
            case 'peer-review':
                return await this.prisma.peerReview.upsert({ where: { id }, create: data, update: rest });
            case 'peer-review-comment':
                return await this.prisma.peerReviewComment.upsert({ where: { id }, create: data, update: rest });
            case 'review-recognition':
                return await this.prisma.reviewRecognition.upsert({ where: { id }, create: data, update: rest });
            case 'notification-template':
                return await this.prisma.notificationTemplate.upsert({ where: { id }, create: data, update: rest });
            case 'notification':
                return await this.prisma.notification.upsert({ where: { id }, create: data, update: rest });
            case 'notification-preference':
                return await this.prisma.notificationPreference.upsert({ where: { id }, create: data, update: rest });
            case 'notification-history':
                return await this.prisma.notificationHistory.upsert({ where: { id }, create: data, update: rest });
            case 'notification-digest':
                return await this.prisma.notificationDigest.upsert({ where: { id }, create: data, update: rest });
            case 'audit-log':
                return await this.prisma.auditLog.upsert({ where: { id }, create: data, update: rest });
            case 'activity-log':
                return await this.prisma.activityLog.upsert({ where: { id }, create: data, update: rest });
            case 'user-activity-log':
                return await this.prisma.userActivityLog.upsert({ where: { id }, create: data, update: rest });
            case 'security-event':
                return await this.prisma.securityEvent.upsert({ where: { id }, create: data, update: rest });
            case 'analytics-event-log':
                return await this.prisma.analyticsEventLog.upsert({ where: { id }, create: data, update: rest });
            case 'api-usage':
                return await this.prisma.apiUsage.upsert({ where: { id }, create: data, update: rest });
            case 'api-endpoint':
                return await this.prisma.apiEndpoint.upsert({ where: { id }, create: data, update: rest });
            case 'backup-job':
                return await this.prisma.backupJob.upsert({ where: { id }, create: data, update: rest });
            case 'backup-execution':
                return await this.prisma.backupExecution.upsert({ where: { id }, create: data, update: rest });
            case 'scheduled-task':
                return await this.prisma.scheduledTask.upsert({ where: { id }, create: data, update: rest });
            case 'task-execution':
                return await this.prisma.taskExecution.upsert({ where: { id }, create: data, update: rest });
            case 'health-check':
                return await this.prisma.healthCheck.upsert({ where: { id }, create: data, update: rest });
            case 'health-check-result':
                return await this.prisma.healthCheckResult.upsert({ where: { id }, create: data, update: rest });
            case 'data-export-job':
                return await this.prisma.dataExportJob.upsert({ where: { id }, create: data, update: rest });
            case 'data-import-job':
                return await this.prisma.dataImportJob.upsert({ where: { id }, create: data, update: rest });
            case 'compliance-audit':
                return await this.prisma.complianceAudit.upsert({ where: { id }, create: data, update: rest });
            case 'system-alert':
                return await this.prisma.systemAlert.upsert({ where: { id }, create: data, update: rest });
            case 'performance-metric':
                return await this.prisma.performanceMetric.upsert({ where: { id }, create: data, update: rest });
            case 'external-integration':
                return await this.prisma.externalIntegration.upsert({ where: { id }, create: data, update: rest });
            case 'integration-sync-log':
                return await this.prisma.integrationSyncLog.upsert({ where: { id }, create: data, update: rest });
            case 'calendar-integration':
                return await this.prisma.calendarIntegration.upsert({ where: { id }, create: data, update: rest });
            case 'research-request':
                return await this.prisma.researchRequest.upsert({ where: { id }, create: data, update: rest });
        }
    }
    async queueOfflineData(syncDto, userId) {
        try {
            const queueItem = await this.prisma.offlineDataQueue.create({
                data: {
                    userId,
                    entityType: syncDto.entityType,
                    entityId: syncDto.entityId,
                    operation: syncDto.operation,
                    data: syncDto.data,
                    priority: syncDto.priority || 0,
                    localTimestamp: new Date(syncDto.localTimestamp),
                    deviceId: syncDto.deviceId,
                    sessionId: syncDto.sessionId,
                    metadata: syncDto.metadata,
                },
            });
            this.logger.log(`Offline data queued: ${queueItem.id} for ${syncDto.entityType} ${syncDto.operation}`);
            this.processQueueItem(queueItem.id, userId).catch(() => {
            });
            return { status: 'QUEUED', queueItem };
        }
        catch (error) {
            this.logger.error('Error queuing offline data', error);
            throw error;
        }
    }
    async processQueueItem(queueId, userId) {
        try {
            const queueItem = await this.prisma.offlineDataQueue.findUnique({
                where: { id: queueId },
            });
            if (!queueItem) {
                throw new common_1.NotFoundException(`Queue item with ID ${queueId} not found`);
            }
            if (queueItem.status === 'SYNCED') {
                return { status: 'ALREADY_SYNCED', queueItem };
            }
            await this.prisma.offlineDataQueue.update({
                where: { id: queueId },
                data: {
                    status: 'PROCESSING',
                    attemptCount: { increment: 1 },
                },
            });
            let result;
            let hasConflict = false;
            let conflictData = null;
            try {
                if (!(await this.remotePrismaService.checkConnection())) {
                    throw new Error('Remote database unavailable');
                }
                result = await this.executeRemoteOperation(queueItem.entityType, queueItem.operation, queueItem.entityId, queueItem.data, userId);
                await this.prisma.offlineDataQueue.update({
                    where: { id: queueId },
                    data: {
                        status: 'SYNCED',
                        syncedAt: new Date(),
                        errorMessage: null,
                        errorDetails: null,
                    },
                });
                this.logger.log(`Queue item ${queueId} synced successfully`);
                return { status: 'SYNCED', result, queueItem };
            }
            catch (error) {
                if (error instanceof common_1.ConflictException || error.message?.includes('conflict')) {
                    hasConflict = true;
                    conflictData = {
                        errorMessage: error.message,
                        localData: queueItem.data,
                        remoteData: await this.fetchRemoteData(queueItem.entityType, queueItem.entityId),
                    };
                    await this.prisma.offlineDataQueue.update({
                        where: { id: queueId },
                        data: {
                            status: 'CONFLICT',
                            conflictData,
                            errorMessage: error.message,
                        },
                    });
                    return { status: 'CONFLICT', conflictData, queueItem };
                }
                const shouldRetry = queueItem.attemptCount < queueItem.maxAttempts;
                await this.prisma.offlineDataQueue.update({
                    where: { id: queueId },
                    data: {
                        status: shouldRetry ? 'PENDING' : 'FAILED',
                        errorMessage: error.message,
                        errorDetails: {
                            stack: error.stack,
                            timestamp: new Date().toISOString(),
                        },
                    },
                });
                if (!shouldRetry) {
                    this.logger.error(`Queue item ${queueId} failed after ${queueItem.attemptCount} attempts`, error);
                }
                return { status: shouldRetry ? 'RETRY' : 'FAILED', error: error.message, queueItem };
            }
        }
        catch (error) {
            this.logger.error(`Error processing queue item ${queueId}`, error);
            throw error;
        }
    }
    async syncAllPendingItems() {
        if (this.isSyncing)
            return;
        this.isSyncing = true;
        try {
            const pendingItems = await this.prisma.offlineDataQueue.findMany({
                where: {
                    status: { in: ['PENDING', 'FAILED'] }
                },
                orderBy: [{ priority: 'desc' }, { localTimestamp: 'asc' }],
            });
            if (pendingItems.length === 0) {
                this.isSyncing = false;
                return { total: 0 };
            }
            this.logger.log(`Starting sync for ${pendingItems.length} items`);
            const results = {
                total: pendingItems.length,
                synced: 0,
                failed: 0,
                conflicts: 0,
            };
            for (const item of pendingItems) {
                try {
                    const res = await this.processQueueItem(item.id, item.userId);
                    if (res.status === 'SYNCED')
                        results.synced++;
                    else if (res.status === 'CONFLICT')
                        results.conflicts++;
                    else
                        results.failed++;
                }
                catch (e) {
                    results.failed++;
                }
            }
            this.logger.log(`Sync completed: ${results.synced} synced, ${results.failed} failed, ${results.conflicts} conflicts`);
            return results;
        }
        finally {
            this.isSyncing = false;
        }
    }
    async resolveConflict(queueId, resolveDto, userId) {
        try {
            const queueItem = await this.prisma.offlineDataQueue.findUnique({
                where: { id: queueId },
            });
            if (!queueItem) {
                throw new common_1.NotFoundException(`Queue item with ID ${queueId} not found`);
            }
            if (queueItem.status !== 'CONFLICT') {
                throw new common_1.BadRequestException('Queue item is not in conflict state');
            }
            let dataToUse;
            switch (resolveDto.resolution) {
                case 'USE_LOCAL':
                    dataToUse = queueItem.data;
                    break;
                case 'USE_REMOTE':
                    dataToUse = queueItem.conflictData?.remoteData;
                    break;
                case 'MERGE':
                    if (!resolveDto.mergedData) {
                        throw new common_1.BadRequestException('Merged data is required for MERGE resolution');
                    }
                    dataToUse = resolveDto.mergedData;
                    break;
                case 'MANUAL':
                    if (!resolveDto.mergedData) {
                        throw new common_1.BadRequestException('Manual resolution data is required');
                    }
                    dataToUse = resolveDto.mergedData;
                    break;
            }
            const result = await this.executeRemoteOperation(queueItem.entityType, queueItem.operation, queueItem.entityId, dataToUse, userId);
            await this.prisma.offlineDataQueue.update({
                where: { id: queueId },
                data: {
                    status: 'RESOLVED',
                    resolution: resolveDto.resolution,
                    resolvedBy: userId,
                    resolvedAt: new Date(),
                    syncedAt: new Date(),
                },
            });
            this.logger.log(`Conflict resolved for queue item ${queueId} using ${resolveDto.resolution}`);
            return { status: 'RESOLVED', result };
        }
        catch (error) {
            this.logger.error(`Error resolving conflict for queue item ${queueId}`, error);
            throw error;
        }
    }
    async getPendingQueue(userId, limit = 100) {
        try {
            const queueItems = await this.prisma.offlineDataQueue.findMany({
                where: {
                    status: { in: ['PENDING', 'FAILED', 'CONFLICT'] },
                },
                orderBy: [
                    { priority: 'desc' },
                    { localTimestamp: 'asc' },
                ],
                take: limit,
            });
            return {
                total: queueItems.length,
                items: queueItems,
            };
        }
        catch (error) {
            this.logger.error(`Error getting pending queue for user ${userId}`, error);
            throw error;
        }
    }
    async getQueueStatistics(userId) {
        try {
            const [pending, processing, pushedSynced, failed, conflict] = await Promise.all([
                this.prisma.offlineDataQueue.count({ where: { status: 'PENDING' } }),
                this.prisma.offlineDataQueue.count({ where: { status: 'PROCESSING' } }),
                this.prisma.offlineDataQueue.count({ where: { status: 'SYNCED' } }),
                this.prisma.offlineDataQueue.count({ where: { status: 'FAILED' } }),
                this.prisma.offlineDataQueue.count({ where: { status: 'CONFLICT' } }),
            ]);
            const syncStates = await this.prisma.offlineSyncState.findMany();
            const pulledSynced = syncStates.reduce((acc, curr) => acc + curr.totalItemsSynced, 0);
            return {
                pending,
                processing,
                synced: pushedSynced + pulledSynced,
                failed,
                conflict,
                needsAttention: failed + conflict,
            };
        }
        catch (error) {
            this.logger.error(`Error getting queue statistics for user ${userId}`, error);
            throw error;
        }
    }
    async executeRemoteOperation(entityType, operation, entityId, data, userId) {
        const entityMap = {
            'patient': 'patient',
            'diagnosis': 'patientDiagnosis',
            'medication': 'patientMedication',
            'vital-sign': 'vitalSign',
            'laboratory-result': 'laboratoryResult',
            'radiology-result': 'radiologyResult',
            'pathology-report': 'pathologyReport',
            'medical-record': 'medicalRecord',
            'medical-image': 'medicalImage',
            'clinical-photo': 'clinicalPhoto',
            'staging-data': 'stagingData',
            'msts-score': 'mstsScore',
            'research-request': 'researchRequest',
        };
        const prismaModel = entityMap[entityType.toLowerCase()];
        if (!prismaModel) {
            throw new common_1.BadRequestException(`Unsupported entity type: ${entityType}`);
        }
        switch (entityType.toLowerCase()) {
            case 'patient':
                return this.handlePatientOperation(this.remotePrisma, operation, entityId, data);
            case 'diagnosis':
                return this.handleDiagnosisOperation(this.remotePrisma, operation, entityId, data);
            case 'medication':
                return this.handleMedicationOperation(this.remotePrisma, operation, entityId, data);
            case 'vital-sign':
            case 'laboratory-result':
            case 'radiology-result':
            case 'pathology-report':
            case 'medical-record':
            case 'medical-image':
            case 'staging-data':
            case 'research-request':
                return this.handleGenericOperation(this.remotePrisma, prismaModel, operation, entityId, data);
            case 'clinical-photo':
                return this.handleClinicalPhotoOperation(this.remotePrisma, operation, entityId, data);
            case 'msts-score':
                return this.handleMstsScoreOperation(this.remotePrisma, operation, entityId, data);
            default:
                throw new common_1.BadRequestException(`Unsupported entity type: ${entityType}`);
        }
    }
    async handleGenericOperation(client, modelName, operation, entityId, data) {
        const model = client[modelName];
        if (!model)
            throw new common_1.BadRequestException(`Model ${modelName} not found on remote client`);
        switch (operation) {
            case 'CREATE':
                return await model.create({ data });
            case 'UPDATE':
                if (!entityId)
                    throw new common_1.BadRequestException('Entity ID required for UPDATE');
                return await model.update({ where: { id: entityId }, data });
            case 'DELETE':
                if (!entityId)
                    throw new common_1.BadRequestException('Entity ID required for DELETE');
                try {
                    return await model.update({ where: { id: entityId }, data: { isActive: false } });
                }
                catch (e) {
                    return await model.delete({ where: { id: entityId } });
                }
            default:
                throw new common_1.BadRequestException(`Unsupported operation: ${operation}`);
        }
    }
    async handlePatientOperation(client, operation, entityId, data) {
        switch (operation) {
            case 'CREATE':
                return await client.patient.create({ data });
            case 'UPDATE':
                if (!entityId)
                    throw new common_1.BadRequestException('Entity ID required for UPDATE');
                return await client.patient.update({ where: { id: entityId }, data });
            case 'DELETE':
                if (!entityId)
                    throw new common_1.BadRequestException('Entity ID required for DELETE');
                return await client.patient.update({ where: { id: entityId }, data: { isActive: false } });
            default:
                throw new common_1.BadRequestException(`Unsupported operation: ${operation}`);
        }
    }
    async handleDiagnosisOperation(client, operation, entityId, data) {
        switch (operation) {
            case 'CREATE':
                return await client.patientDiagnosis.create({ data });
            case 'UPDATE':
                if (!entityId)
                    throw new common_1.BadRequestException('Entity ID required for UPDATE');
                return await client.patientDiagnosis.update({ where: { id: entityId }, data });
            case 'DELETE':
                if (!entityId)
                    throw new common_1.BadRequestException('Entity ID required for DELETE');
                return await client.patientDiagnosis.delete({ where: { id: entityId } });
            default:
                throw new common_1.BadRequestException(`Unsupported operation: ${operation}`);
        }
    }
    async handleMedicationOperation(client, operation, entityId, data) {
        switch (operation) {
            case 'CREATE':
                return await client.patientMedication.create({ data });
            case 'UPDATE':
                if (!entityId)
                    throw new common_1.BadRequestException('Entity ID required for UPDATE');
                return await client.patientMedication.update({ where: { id: entityId }, data });
            case 'DELETE':
                if (!entityId)
                    throw new common_1.BadRequestException('Entity ID required for DELETE');
                return await client.patientMedication.update({ where: { id: entityId }, data: { isActive: false } });
            default:
                throw new common_1.BadRequestException(`Unsupported operation: ${operation}`);
        }
    }
    async handleClinicalPhotoOperation(client, operation, entityId, data) {
        switch (operation) {
            case 'CREATE':
                return await client.clinicalPhoto.create({ data });
            case 'UPDATE':
                if (!entityId)
                    throw new common_1.BadRequestException('Entity ID required for UPDATE');
                return await client.clinicalPhoto.update({ where: { id: entityId }, data });
            case 'DELETE':
                if (!entityId)
                    throw new common_1.BadRequestException('Entity ID required for DELETE');
                return await client.clinicalPhoto.delete({ where: { id: entityId } });
            default:
                throw new common_1.BadRequestException(`Unsupported operation: ${operation}`);
        }
    }
    async handleMstsScoreOperation(client, operation, entityId, data) {
        switch (operation) {
            case 'CREATE':
                return await client.mstsScore.create({ data });
            case 'UPDATE':
                if (!entityId)
                    throw new common_1.BadRequestException('Entity ID required for UPDATE');
                return await client.mstsScore.update({ where: { id: entityId }, data });
            case 'DELETE':
                if (!entityId)
                    throw new common_1.BadRequestException('Entity ID required for DELETE');
                return await client.mstsScore.delete({ where: { id: entityId } });
            default:
                throw new common_1.BadRequestException(`Unsupported operation: ${operation}`);
        }
    }
    async fetchRemoteData(entityType, entityId) {
        if (!entityId)
            return null;
        try {
            switch (entityType.toLowerCase()) {
                case 'patient':
                    return await this.remotePrisma.patient.findUnique({ where: { id: entityId } });
                case 'diagnosis':
                    return await this.remotePrisma.patientDiagnosis.findUnique({ where: { id: entityId } });
                case 'medication':
                    return await this.remotePrisma.patientMedication.findUnique({ where: { id: entityId } });
                case 'vital-sign':
                    return await this.remotePrisma.vitalSign.findUnique({ where: { id: entityId } });
                case 'laboratory-result':
                    return await this.remotePrisma.laboratoryResult.findUnique({ where: { id: entityId } });
                case 'radiology-result':
                    return await this.remotePrisma.radiologyResult.findUnique({ where: { id: entityId } });
                case 'pathology-report':
                    return await this.remotePrisma.pathologyReport.findUnique({ where: { id: entityId } });
                case 'medical-record':
                    return await this.remotePrisma.medicalRecord.findUnique({ where: { id: entityId } });
                case 'medical-image':
                    return await this.remotePrisma.medicalImage.findUnique({ where: { id: entityId } });
                case 'clinical-photo':
                    return await this.remotePrisma.clinicalPhoto.findUnique({ where: { id: entityId } });
                case 'staging-data':
                    return await this.remotePrisma.stagingData.findUnique({ where: { id: entityId } });
                case 'msts-score':
                    return await this.remotePrisma.mstsScore.findUnique({ where: { id: entityId } });
                case 'research-request':
                    return await this.remotePrisma.researchRequest.findUnique({ where: { id: entityId } });
                default:
                    return null;
            }
        }
        catch (error) {
            this.logger.warn(`Could not fetch remote data for ${entityType} ${entityId}`, error);
            return null;
        }
    }
};
exports.OfflineQueueService = OfflineQueueService;
exports.OfflineQueueService = OfflineQueueService = OfflineQueueService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        remote_prisma_service_1.RemotePrismaService,
        file_sync_service_1.FileSyncService])
], OfflineQueueService);
//# sourceMappingURL=offline-queue.service.js.map
