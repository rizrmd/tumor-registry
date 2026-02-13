import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  BadRequestException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { PrismaClient } from '@prisma/client';
import { SyncOfflineDataDto } from './dto/sync-offline-data.dto';
import { ResolveConflictDto } from './dto/resolve-conflict.dto';
import { FileSyncService } from './file-sync.service';

import { RemotePrismaService } from '@/database/remote-prisma.service';

@Injectable()
export class OfflineQueueService implements OnModuleInit {
  private readonly logger = new Logger(OfflineQueueService.name);
  private isSyncing = false;
  private isFileSyncing = false;

  // Entities organized by dependency phases for proper sync order
  // Phase 1: Core system (no dependencies)
  private readonly phase1Entities = [
    'center',
    'role',
    'permission',
    'who-bone-tumor',
    'who-soft-tissue-tumor',
    'bone-location',
    'soft-tissue-location',
    'tumor-syndrome',
  ];

  // Phase 2: User and auth (depends on center, role, permission)
  private readonly phase2Entities = [
    'user',
    'user-role',
    'role-permission',
    'system-configuration',
  ];

  // Phase 3: Patient core data (depends on center, user)
  private readonly phase3Entities = [
    'patient',
    'medical-record-sequence',
  ];

  // Phase 4: Patient medical data (depends on patient)
  private readonly phase4Entities = [
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

  // Phase 5: Research data (depends on user, patient)
  private readonly phase5Entities = [
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

  // Phase 6: Analytics and reporting (depends on patient, center)
  private readonly phase6Entities = [
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

  // Phase 7: System and reporting (depends on user, center)
  private readonly phase7Entities = [
    'report-template',
    'generated-report',
    'scheduled-report',
    'report-execution',
    'report-history',
    'report-schedule',
    'report-distribution',
    'report-access-log',
  ];

  // Phase 8: Quality and review (depends on user, patient)
  private readonly phase8Entities = [
    'case-review',
    'review-assignment',
    'review-comment',
    'peer-review',
    'peer-review-comment',
    'review-recognition',
  ];

  // Phase 9: Notifications (depends on user)
  private readonly phase9Entities = [
    'notification-template',
    'notification',
    'notification-preference',
    'notification-history',
    'notification-digest',
  ];

  // Phase 10: Audit and security (depends on user, center)
  private readonly phase10Entities = [
    'audit-log',
    'activity-log',
    'user-activity-log',
    'security-event',
    'analytics-event-log',
    'api-usage',
    'api-endpoint',
  ];

  // Phase 11: System admin (depends on user, center)
  private readonly phase11Entities = [
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

  // Combine all phases for backwards compatibility
  private readonly trackedEntities = [
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

  constructor(
    private prisma: PrismaService,
    private remotePrismaService: RemotePrismaService,
    private fileSyncService: FileSyncService,
  ) { }

  // Getter to cast RemotePrismaService to PrismaClient for type compatibility
  private get remotePrisma(): PrismaClient {
    return this.remotePrismaService as unknown as PrismaClient;
  }

  async onModuleInit() {
    // Start background sync every 1 minute
    // Wrap in timeout to ensure app is fully booted
    setTimeout(async () => {
      this.logger.log('Starting background sync loop');

      // Run initial sync immediately after boot
      this.runFullSync().catch((err) =>
        this.logger.error('Initial background sync failed', err),
      );

      // Data sync interval (1 minute)
      setInterval(() => {
        this.runFullSync().catch((err) =>
          this.logger.error('Background sync failed', err),
        );
      }, 1000 * 60 * 1); // 1 minute

      // File sync interval (5 minutes)
      setInterval(() => {
        this.syncFiles().catch((err) =>
          this.logger.error('Background file sync failed', err),
        );
      }, 1000 * 60 * 5); // 5 minutes

    }, 5000);
  }

  async runFullSync() {
    if (this.isSyncing) {
      this.logger.log('Sync already in progress, skipping background run');
      return { status: 'ALREADY_RUNNING' };
    }

    this.isSyncing = true;
    this.logger.log('Starting full sync (Push + Pull + Files)');

    const result: any = {
      pushResults: null,
      pullResults: null,
      fileSyncResults: null,
      status: 'COMPLETED',
      errors: []
    };

    try {
      // Step 1: Push local data changes to remote
      this.logger.log('Step 1: Pushing local data to remote...');
      result.pushResults = await this.syncAllPendingItems();

      // Step 2: Pull remote data changes to local
      this.logger.log('Step 2: Pulling remote data to local...');
      result.pullResults = await this.syncRemoteChanges();

      // Step 3: Sync files (medical images, clinical photos, etc.)
      this.logger.log('Step 3: Syncing files...');
      result.fileSyncResults = await this.syncFiles();

      this.logger.log('Full sync completed successfully');

      // Calculate summary
      const pullResultsArray = Array.isArray(result.pullResults?.details)
        ? result.pullResults.details
        : (Array.isArray(result.pullResults) ? result.pullResults : []);

      result.summary = {
        dataPushed: result.pushResults?.synced || 0,
        dataPulled: pullResultsArray.reduce((sum: number, r: any) => sum + (r.pulled || 0), 0) || 0,
        filesSynced: result.fileSyncResults?.succeeded || 0,
        failed: (result.pushResults?.failed || 0) + (result.fileSyncResults?.failed || 0),
        conflicts: result.pushResults?.conflicts || 0
      };

      return result;
    } catch (error: any) {
      this.logger.error('Full sync encountered errors', error);
      result.status = 'PARTIAL';
      result.errors.push(error.message);
      return result;
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * Sync files (medical images, clinical photos, documents)
   */
  async syncFiles(): Promise<any> {
    if (this.isFileSyncing) {
      return { status: 'ALREADY_RUNNING' };
    }

    this.isFileSyncing = true;
    try {
      this.logger.log('Starting file sync...');

      // Queue new files for sync (scan all files since epoch)
      await this.fileSyncService.queueFilesForSync('medical-image', new Date(0));
      await this.fileSyncService.queueFilesForSync('clinical-photo', new Date(0));
      await this.fileSyncService.queueFilesForSync('pathology-report', new Date(0));

      // Process pending file syncs
      const results = await this.fileSyncService.processPendingFileSyncs();

      this.logger.log(`File sync completed: ${results.succeeded} succeeded, ${results.failed} failed`);
      return results;
    } catch (error) {
      this.logger.error('File sync failed:', error);
      return { status: 'FAILED', error: error.message };
    } finally {
      this.isFileSyncing = false;
    }
  }

  async syncRemoteChanges(): Promise<any> {
    try {
      // Check connection first
      if (!(await this.remotePrismaService.checkConnection())) {
        this.logger.log('Remote database not available - skipping pull sync');
        return {
          status: 'OFFLINE',
          message: 'Remote database unavailable. Running in offline mode.',
          pulled: 0
        };
      }

      this.logger.log('Pulling remote changes...');
      const results: any[] = [];

      // Sync in phases to respect dependencies
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
          } catch (error) {
            this.logger.error(`Error syncing ${entityType}`, error);
            results.push({ entityType, pulled: 0, error: error.message });
          }
        }
      }

      const totalPulled = results.reduce((sum: number, r: any) => sum + (r.pulled || 0), 0);
      this.logger.log(`Pull sync completed: ${totalPulled} records pulled`);

      return {
        status: 'SUCCESS',
        totalPulled,
        details: results
      };
    } catch (error) {
      this.logger.error('Error pulling remote changes', error);
      return {
        status: 'ERROR',
        message: error.message,
        pulled: 0
      };
    }
  }

  async pullRemoteData(entityType: string): Promise<any> {
    try {
      // 1. Get last pull timestamp
      const state = await this.prisma.offlineSyncState.findUnique({
        where: { entityType },
      });
      const lastPullAt = state?.lastPullAt || new Date(0);

      // 2. Fetch from remote
      const remoteRecords = await this.fetchRemoteChanges(entityType, lastPullAt);
      if (remoteRecords.length === 0) return { pulled: 0 };

      this.logger.log(`Pulled ${remoteRecords.length} new ${entityType} records from remote`);

      // 3. Upsert locally
      for (const record of remoteRecords) {
        await this.upsertLocal(entityType, record);
      }

      // 4. Update sync state
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
    } catch (error) {
      this.logger.error(`Error pulling remote data for ${entityType}`, error);
      return { pulled: 0, error: error.message };
    }
  }

  private async fetchRemoteChanges(entityType: string, since: Date): Promise<any[]> {
    const take = 500; // Limit per batch

    // Helper for models with updatedAt
    const withUpdatedAt = { where: { updatedAt: { gt: since } }, take };
    // Helper for models with createdAt only
    const withCreatedAt = { where: { createdAt: { gt: since } }, take };
    // Helper for models without timestamps (fetch all, limited)
    const noTimestamp = { take };

    switch (entityType.toLowerCase()) {
      // Phase 1: Core System
      // Center has updatedAt
      case 'center':
        return await this.remotePrisma.center.findMany(withUpdatedAt);
      // Role has no timestamps
      case 'role':
        return await this.remotePrisma.role.findMany(noTimestamp);
      // Permission has no timestamps
      case 'permission':
        return await this.remotePrisma.permission.findMany(noTimestamp);
      // WHO classifications - check schema for timestamps
      case 'who-bone-tumor':
        return await this.remotePrisma.whoBoneTumorClassification.findMany(withUpdatedAt);
      case 'who-soft-tissue-tumor':
        return await this.remotePrisma.whoSoftTissueTumorClassification.findMany(withUpdatedAt);
      // Locations - check schema
      case 'bone-location':
        return await this.remotePrisma.boneLocation.findMany(withUpdatedAt);
      case 'soft-tissue-location':
        return await this.remotePrisma.softTissueLocation.findMany(withUpdatedAt);
      case 'tumor-syndrome':
        return await this.remotePrisma.tumorSyndrome.findMany(withUpdatedAt);

      // Phase 2: User & Auth
      // User has updatedAt
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
      // UserRole has createdAt only
      case 'user-role':
        return await this.remotePrisma.userRole.findMany(withCreatedAt);
      // RolePermission has createdAt only
      case 'role-permission':
        return await this.remotePrisma.rolePermission.findMany(withCreatedAt);
      // SystemConfiguration has updatedAt
      case 'system-configuration':
        return await this.remotePrisma.systemConfiguration.findMany(withUpdatedAt);

      // Phase 3: Patient Core
      // Patient has updatedAt
      case 'patient':
        return await this.remotePrisma.patient.findMany(withUpdatedAt);
      // MedicalRecordSequence has updatedAt
      case 'medical-record-sequence':
        return await this.remotePrisma.medicalRecordSequence.findMany(withUpdatedAt);

      // Phase 4: Medical Data
      // These have updatedAt
      case 'diagnosis':
        return await this.remotePrisma.patientDiagnosis.findMany(withUpdatedAt);
      case 'medication':
        return await this.remotePrisma.patientMedication.findMany(withUpdatedAt);
      // VitalSign doesn't have updatedAt, use createdAt via id (ordered)
      case 'vital-sign':
        return await this.remotePrisma.vitalSign.findMany({
          where: {
            // VitalSign has no timestamp, fetch recent by id ordering
          },
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
      // Extended/enhanced models - check schema
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

      // Phase 5: Research
      // These have updatedAt
      case 'research-request':
        return await this.remotePrisma.researchRequest.findMany(withUpdatedAt);
      // ResearchRequestApproval has createdAt only
      case 'research-request-approval':
        return await this.remotePrisma.researchRequestApproval.findMany(withCreatedAt);
      // ResearchApproval has updatedAt
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
      // ResearchRequestActivity has createdAt only
      case 'research-request-activity':
        return await this.remotePrisma.researchRequestActivity.findMany(withCreatedAt);

      // Phase 6: Analytics
      // Most analytics models don't have updatedAt - fetch limited records
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
      // ModelPerformanceMetric has no updatedAt, use timestamp
      case 'model-performance-metric':
        return await this.remotePrisma.modelPerformanceMetric.findMany({
          where: { timestamp: { gt: since } },
          take,
        });
      case 'executive-dashboard':
        return await this.remotePrisma.executiveDashboard.findMany(withUpdatedAt);
      // RealTimeAnalyticsCache has no updatedAt, use lastRefreshed
      case 'real-time-analytics-cache':
        return await this.remotePrisma.realTimeAnalyticsCache.findMany({
          where: { lastRefreshed: { gt: since } },
          take,
        });
      case 'materialized-view-refresh':
        return await this.remotePrisma.materializedViewRefresh.findMany(withUpdatedAt);

      // Phase 7: Reporting
      case 'report-template':
        return await this.remotePrisma.reportTemplate.findMany(withUpdatedAt);
      // GeneratedReport has no timestamps
      case 'generated-report':
        return await this.remotePrisma.generatedReport.findMany(noTimestamp);
      case 'scheduled-report':
        return await this.remotePrisma.scheduledReport.findMany(withUpdatedAt);
      // ReportExecution has no timestamps
      case 'report-execution':
        return await this.remotePrisma.reportExecution.findMany(noTimestamp);
      // ReportHistory has createdAt only
      case 'report-history':
        return await this.remotePrisma.reportHistory.findMany(withCreatedAt);
      case 'report-schedule':
        return await this.remotePrisma.reportSchedule.findMany(withUpdatedAt);
      case 'report-distribution':
        return await this.remotePrisma.reportDistribution.findMany(withUpdatedAt);
      // ReportAccessLog has no timestamps
      case 'report-access-log':
        return await this.remotePrisma.reportAccessLog.findMany(noTimestamp);

      // Phase 8: Quality & Review
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
      // ReviewRecognition has no timestamps
      case 'review-recognition':
        return await this.remotePrisma.reviewRecognition.findMany(noTimestamp);

      // Phase 9: Notifications
      case 'notification-template':
        return await this.remotePrisma.notificationTemplate.findMany(withUpdatedAt);
      case 'notification':
        return await this.remotePrisma.notification.findMany(withUpdatedAt);
      case 'notification-preference':
        return await this.remotePrisma.notificationPreference.findMany(withUpdatedAt);
      // NotificationHistory has createdAt only
      case 'notification-history':
        return await this.remotePrisma.notificationHistory.findMany(withCreatedAt);
      case 'notification-digest':
        return await this.remotePrisma.notificationDigest.findMany(withUpdatedAt);

      // Phase 10: Audit & Security
      case 'audit-log':
        return await this.remotePrisma.auditLog.findMany(withCreatedAt);
      // ActivityLog has createdAt only
      case 'activity-log':
        return await this.remotePrisma.activityLog.findMany(withCreatedAt);
      // UserActivityLog has no timestamps
      case 'user-activity-log':
        return await this.remotePrisma.userActivityLog.findMany(noTimestamp);
      case 'security-event':
        return await this.remotePrisma.securityEvent.findMany(withUpdatedAt);
      // AnalyticsEventLog has no timestamps
      case 'analytics-event-log':
        return await this.remotePrisma.analyticsEventLog.findMany(noTimestamp);
      // ApiUsage has no timestamps
      case 'api-usage':
        return await this.remotePrisma.apiUsage.findMany(noTimestamp);
      case 'api-endpoint':
        return await this.remotePrisma.apiEndpoint.findMany(withUpdatedAt);

      // Phase 11: System Admin
      case 'backup-job':
        return await this.remotePrisma.backupJob.findMany(withUpdatedAt);
      // BackupExecution has no timestamps
      case 'backup-execution':
        return await this.remotePrisma.backupExecution.findMany(noTimestamp);
      case 'scheduled-task':
        return await this.remotePrisma.scheduledTask.findMany(withUpdatedAt);
      // TaskExecution has no timestamps
      case 'task-execution':
        return await this.remotePrisma.taskExecution.findMany(noTimestamp);
      case 'health-check':
        return await this.remotePrisma.healthCheck.findMany(withUpdatedAt);
      // HealthCheckResult has no timestamps
      case 'health-check-result':
        return await this.remotePrisma.healthCheckResult.findMany(noTimestamp);
      // DataExportJob has no timestamps
      case 'data-export-job':
        return await this.remotePrisma.dataExportJob.findMany(noTimestamp);
      // DataImportJob has no timestamps
      case 'data-import-job':
        return await this.remotePrisma.dataImportJob.findMany(noTimestamp);
      case 'compliance-audit':
        return await this.remotePrisma.complianceAudit.findMany(withUpdatedAt);
      case 'system-alert':
        return await this.remotePrisma.systemAlert.findMany(withUpdatedAt);
      // PerformanceMetric has no timestamps
      case 'performance-metric':
        return await this.remotePrisma.performanceMetric.findMany(noTimestamp);
      case 'external-integration':
        return await this.remotePrisma.externalIntegration.findMany(withUpdatedAt);
      // IntegrationSyncLog has no timestamps
      case 'integration-sync-log':
        return await this.remotePrisma.integrationSyncLog.findMany(noTimestamp);
      case 'calendar-integration':
        return await this.remotePrisma.calendarIntegration.findMany(withUpdatedAt);

      default:
        return [];
    }
  }

  private async upsertLocal(entityType: string, data: any): Promise<any> {
    const { id, ...rest } = data;
    const model = entityType.toLowerCase();

    // Phase 1: Core System
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

      // Phase 2: User & Auth
      case 'user':
        return await this.prisma.user.upsert({ where: { id }, create: data, update: rest });
      case 'user-role':
        return await this.prisma.userRole.upsert({ where: { id }, create: data, update: rest });
      case 'role-permission':
        return await this.prisma.rolePermission.upsert({ where: { id }, create: data, update: rest });
      case 'system-configuration':
        return await this.prisma.systemConfiguration.upsert({ where: { id }, create: data, update: rest });

      // Phase 3: Patient Core
      case 'patient':
        return await this.prisma.patient.upsert({ where: { id }, create: data, update: rest });
      case 'medical-record-sequence':
        return await this.prisma.medicalRecordSequence.upsert({ where: { id }, create: data, update: rest });

      // Phase 4: Medical Data
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

      // Phase 5: Research
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

      // Phase 6: Analytics
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

      // Phase 7: Reporting
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

      // Phase 8: Quality & Review
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

      // Phase 9: Notifications
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

      // Phase 10: Audit & Security
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

      // Phase 11: System Admin
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

  // ... rest of the existing methods (queueOfflineData, processQueueItem, etc.) ...
  async queueOfflineData(syncDto: SyncOfflineDataDto, userId: string | null): Promise<any> {
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

      // Try to sync immediately if online
      this.processQueueItem(queueItem.id, userId).catch(() => {
        // Silently fail immediate sync, will be retried by background job
      });

      return { status: 'QUEUED', queueItem };
    } catch (error) {
      this.logger.error('Error queuing offline data', error);
      throw error;
    }
  }

  async processQueueItem(queueId: string, userId: string | null): Promise<any> {
    try {
      const queueItem = await this.prisma.offlineDataQueue.findUnique({
        where: { id: queueId },
      });

      if (!queueItem) {
        throw new NotFoundException(`Queue item with ID ${queueId} not found`);
      }

      if (queueItem.status === 'SYNCED') {
        return { status: 'ALREADY_SYNCED', queueItem };
      }

      // Update status to processing
      await this.prisma.offlineDataQueue.update({
        where: { id: queueId },
        data: {
          status: 'PROCESSING',
          attemptCount: { increment: 1 },
        },
      });

      let result: any;
      let hasConflict = false;
      let conflictData: any = null;

      try {
        // Skip processing for non-syncable entities (analytics, dashboard, etc.)
        const nonSyncableEntities = [
          'national-dashboard', 'dashboard', 'analytics',
          'report', 'export', 'statistics', 'aggregate',
          'search-aggregation', 'searchAggregated'
        ];
        if (nonSyncableEntities.includes(queueItem.entityType.toLowerCase())) {
          this.logger.warn(`Skipping sync for non-syncable entity: ${queueItem.entityType}`);
          // Mark as synced with a note that this entity type doesn't need syncing
          await this.prisma.offlineDataQueue.update({
            where: { id: queueId },
            data: {
              status: 'SYNCED',
              syncedAt: new Date(),
              errorMessage: null,
              errorDetails: null,
              metadata: {
                ...(queueItem.metadata as Record<string, any> || {}),
                note: 'Non-syncable entity type - marked as synced'
              }
            },
          });
          return { status: 'SYNCED', result: null, queueItem };
        }

        // Check connection first
        if (!(await this.remotePrismaService.checkConnection())) {
          throw new Error('Remote database unavailable. Please check your internet connection and remote sync configuration.');
        }

        // Process based on entity type and operation
        // Execute on REMOTE DB
        result = await this.executeRemoteOperation(
          queueItem.entityType,
          queueItem.operation,
          queueItem.entityId,
          queueItem.data as any,
          userId,
        );

        // Mark as synced
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
      } catch (error: any) {
        // Check if it's a conflict error
        if (error instanceof ConflictException || error.message?.includes('conflict')) {
          const remoteData = await this.fetchRemoteData(queueItem.entityType, queueItem.entityId);

          // SMART CHECK: If remote data is exactly the same as local data, it's not actually a conflict
          if (remoteData && this.isDataEqual(queueItem.data, remoteData)) {
            this.logger.log(`Conflict detected for ${queueItem.entityType} ${queueItem.id} but data is identical. Auto-syncing.`);
            await this.prisma.offlineDataQueue.update({
              where: { id: queueId },
              data: {
                status: 'SYNCED',
                syncedAt: new Date(),
                errorMessage: null,
                errorDetails: null,
              },
            });
            return { status: 'SYNCED', result: remoteData, queueItem };
          }

          hasConflict = true;
          conflictData = {
            errorMessage: error.message,
            localData: queueItem.data,
            remoteData: remoteData,
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

        // Other errors - mark as failed
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
    } catch (error) {
      this.logger.error(`Error processing queue item ${queueId}`, error);
      throw error;
    }
  }

  async syncAllPendingItems(): Promise<any> {
    if (this.isSyncing) return;
    this.isSyncing = true;

    try {
      // Reset stuck items first
      await this.resetStuckItems();

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
          if (res.status === 'SYNCED') results.synced++;
          else if (res.status === 'CONFLICT') results.conflicts++;
          else results.failed++;
        } catch (e) {
          results.failed++;
        }
      }

      this.logger.log(`Sync completed: ${results.synced} synced, ${results.failed} failed, ${results.conflicts} conflicts`);
      return results;
    } finally {
      this.isSyncing = false;
    }
  }

  async resolveConflict(queueId: string, resolveDto: ResolveConflictDto, userId: string | null): Promise<any> {
    try {
      const queueItem = await this.prisma.offlineDataQueue.findUnique({
        where: { id: queueId },
      });

      if (!queueItem) {
        throw new NotFoundException(`Queue item with ID ${queueId} not found`);
      }

      if (queueItem.status !== 'CONFLICT') {
        throw new BadRequestException('Queue item is not in conflict state');
      }

      let dataToUse: any;

      switch (resolveDto.resolution) {
        case 'USE_LOCAL':
          dataToUse = queueItem.data;
          break;
        case 'USE_REMOTE':
          dataToUse = (queueItem.conflictData as any)?.remoteData;
          break;
        case 'MERGE':
          if (!resolveDto.mergedData) {
            // Apply automatic smart merge if no merged data provided
            const remoteData = (queueItem.conflictData as any)?.remoteData || {};
            const localData = (queueItem.data as any) || {};
            dataToUse = { ...remoteData };
            Object.keys(localData).forEach(key => {
              if (localData[key] !== null && localData[key] !== undefined && localData[key] !== '') {
                dataToUse[key] = localData[key];
              }
            });
          } else {
            dataToUse = resolveDto.mergedData;
          }
          break;
        case 'MANUAL':
          if (!resolveDto.mergedData) {
            throw new BadRequestException('Manual resolution data is required');
          }
          dataToUse = resolveDto.mergedData;
          break;
      }

      // Execute the operation with resolved data
      const result = await this.executeRemoteOperation(
        queueItem.entityType,
        queueItem.operation,
        queueItem.entityId,
        dataToUse,
        userId,
      );

      // Mark as resolved and synced
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
    } catch (error) {
      this.logger.error(`Error resolving conflict for queue item ${queueId}`, error);
      throw error;
    }
  }

  async autoResolveConflicts(userId: string | null): Promise<any> {
    const conflicts = await this.prisma.offlineDataQueue.findMany({
      where: { status: 'CONFLICT' },
    });

    if (conflicts.length === 0) return { resolved: 0 };

    this.logger.log(`Auto-resolving ${conflicts.length} conflicts using SMART MERGE`);
    let resolvedCount = 0;

    for (const conflict of conflicts) {
      try {
        await this.resolveConflict(conflict.id, { resolution: 'MERGE' } as any, userId);
        resolvedCount++;
      } catch (e) {
        this.logger.error(`Failed to auto-resolve conflict ${conflict.id}`, e);
      }
    }

    return { resolved: resolvedCount, total: conflicts.length };
  }

  async getPendingQueue(userId: string | null, limit = 100): Promise<any> {
    try {
      const queueItems = await this.prisma.offlineDataQueue.findMany({
        where: {
          // userId, // Remove userId filter to show global queue items
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
    } catch (error) {
      this.logger.error(`Error getting pending queue for user ${userId}`, error);
      throw error;
    }
  }

  async getQueueStatistics(userId: string | null): Promise<any> {
    try {
      // Get push statistics (Global queue, not user specific matching syncAllPendingItems)
      const [pending, processing, pushedSynced, failed, conflict] = await Promise.all([
        this.prisma.offlineDataQueue.count({ where: { status: 'PENDING' } }),
        this.prisma.offlineDataQueue.count({ where: { status: 'PROCESSING' } }),
        this.prisma.offlineDataQueue.count({ where: { status: 'SYNCED' } }),
        this.prisma.offlineDataQueue.count({ where: { status: 'FAILED' } }),
        this.prisma.offlineDataQueue.count({ where: { status: 'CONFLICT' } }),
      ]);

      // Get pull statistics - count actual records in key tables for "validity"
      const [patientCount, visitCount] = await Promise.all([
        this.prisma.patient.count(),
        this.prisma.followUpVisit.count(),
      ]);

      return {
        pending,
        processing,
        synced: pushedSynced + patientCount + visitCount,
        failed,
        conflict,
        needsAttention: failed + conflict,
      };
    } catch (error) {
      this.logger.error(`Error getting queue statistics for user ${userId}`, error);
      throw error;
    }
  }

  private async executeRemoteOperation(
    entityType: string,
    operation: string,
    entityId: string | null,
    data: any,
    userId: string | null,
  ): Promise<any> {
    // Map entity types to their Prisma model names
    const entityMap: Record<string, string> = {
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
      'center': 'center',
      'user': 'user',
      'role': 'role',
      'follow-up-visit': 'followUpVisit',
      'patient-visit': 'patientVisit',
      'activity-log': 'activityLog',
      'national-statistics-cache': 'nationalStatisticsCache',
      'national-dashboard': 'executiveDashboard',
      'cancer-geographic-data': 'cancerGeographicData',
      'cancer-aggregate-stats': 'cancerAggregateStats',
    };

    const prismaModel = entityMap[entityType.toLowerCase()] || (entityType.toLowerCase() === 'national-dashboard' ? 'executiveDashboard' : null);
    if (!prismaModel) {
      throw new BadRequestException(`Unsupported entity type: ${entityType}`);
    }

    // Use type-safe operations via switch
    switch (entityType.toLowerCase()) {
      case 'patient':
        return this.handlePatientOperation(this.remotePrisma, operation, entityId, data);
      case 'diagnosis':
        return this.handleDiagnosisOperation(this.remotePrisma, operation, entityId, data);
      case 'medication':
        return this.handleMedicationOperation(this.remotePrisma, operation, entityId, data);
      case 'clinical-photo':
        return this.handleClinicalPhotoOperation(this.remotePrisma, operation, entityId, data);
      case 'msts-score':
        return this.handleMstsScoreOperation(this.remotePrisma, operation, entityId, data);
      case 'vital-sign':
      case 'laboratory-result':
      case 'radiology-result':
      case 'pathology-report':
      case 'medical-record':
      case 'medical-image':
      case 'staging-data':
      case 'research-request':
      case 'center':
      case 'user':
      case 'role':
      case 'follow-up-visit':
      case 'patient-visit':
      case 'activity-log':
      case 'national-statistics-cache':
      case 'national-dashboard':
      case 'cancer-geographic-data':
      case 'cancer-aggregate-stats':
        return this.handleGenericOperation(this.remotePrisma, prismaModel, operation, entityId, data);
      default:
        throw new BadRequestException(`Unsupported entity type: ${entityType}`);
    }
  }

  private async handleGenericOperation(client: any, modelName: string, operation: string, entityId: string | null, data: any): Promise<any> {
    const model = client[modelName];
    if (!model) throw new BadRequestException(`Model ${modelName} not found on remote client`);

    switch (operation) {
      case 'CREATE':
        return await model.create({ data });
      case 'UPDATE':
        if (!entityId) throw new BadRequestException('Entity ID required for UPDATE');
        return await model.update({ where: { id: entityId }, data });
      case 'DELETE':
        if (!entityId) throw new BadRequestException('Entity ID required for DELETE');
        // Check if model has isActive for soft delete, otherwise hard delete
        try {
          return await model.update({ where: { id: entityId }, data: { isActive: false } });
        } catch (e) {
          return await model.delete({ where: { id: entityId } });
        }
      default:
        throw new BadRequestException(`Unsupported operation: ${operation}`);
    }
  }

  private async handlePatientOperation(client: any, operation: string, entityId: string | null, data: any): Promise<any> {
    switch (operation) {
      case 'CREATE':
        return await client.patient.create({ data });
      case 'UPDATE':
        if (!entityId) throw new BadRequestException('Entity ID required for UPDATE');
        return await client.patient.update({ where: { id: entityId }, data });
      case 'DELETE':
        if (!entityId) throw new BadRequestException('Entity ID required for DELETE');
        return await client.patient.update({ where: { id: entityId }, data: { isActive: false } });
      default:
        throw new BadRequestException(`Unsupported operation: ${operation}`);
    }
  }

  private async handleDiagnosisOperation(client: any, operation: string, entityId: string | null, data: any): Promise<any> {
    switch (operation) {
      case 'CREATE':
        return await client.patientDiagnosis.create({ data });
      case 'UPDATE':
        if (!entityId) throw new BadRequestException('Entity ID required for UPDATE');
        return await client.patientDiagnosis.update({ where: { id: entityId }, data });
      case 'DELETE':
        if (!entityId) throw new BadRequestException('Entity ID required for DELETE');
        return await client.patientDiagnosis.delete({ where: { id: entityId } });
      default:
        throw new BadRequestException(`Unsupported operation: ${operation}`);
    }
  }

  private async handleMedicationOperation(client: any, operation: string, entityId: string | null, data: any): Promise<any> {
    switch (operation) {
      case 'CREATE':
        return await client.patientMedication.create({ data });
      case 'UPDATE':
        if (!entityId) throw new BadRequestException('Entity ID required for UPDATE');
        return await client.patientMedication.update({ where: { id: entityId }, data });
      case 'DELETE':
        if (!entityId) throw new BadRequestException('Entity ID required for DELETE');
        return await client.patientMedication.update({ where: { id: entityId }, data: { isActive: false } });
      default:
        throw new BadRequestException(`Unsupported operation: ${operation}`);
    }
  }

  private async handleClinicalPhotoOperation(client: any, operation: string, entityId: string | null, data: any): Promise<any> {
    switch (operation) {
      case 'CREATE':
        return await client.clinicalPhoto.create({ data });
      case 'UPDATE':
        if (!entityId) throw new BadRequestException('Entity ID required for UPDATE');
        return await client.clinicalPhoto.update({ where: { id: entityId }, data });
      case 'DELETE':
        if (!entityId) throw new BadRequestException('Entity ID required for DELETE');
        return await client.clinicalPhoto.delete({ where: { id: entityId } });
      default:
        throw new BadRequestException(`Unsupported operation: ${operation}`);
    }
  }

  private async handleMstsScoreOperation(client: any, operation: string, entityId: string | null, data: any): Promise<any> {
    switch (operation) {
      case 'CREATE':
        return await client.mstsScore.create({ data });
      case 'UPDATE':
        if (!entityId) throw new BadRequestException('Entity ID required for UPDATE');
        return await client.mstsScore.update({ where: { id: entityId }, data });
      case 'DELETE':
        if (!entityId) throw new BadRequestException('Entity ID required for DELETE');
        return await client.mstsScore.delete({ where: { id: entityId } });
      default:
        throw new BadRequestException(`Unsupported operation: ${operation}`);
    }
  }

  private async fetchRemoteData(entityType: string, entityId: string | null): Promise<any> {
    if (!entityId) return null;

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
        case 'national-dashboard':
          return await this.remotePrisma.executiveDashboard.findUnique({ where: { id: entityId } });
        case 'national-statistics-cache':
          return await this.remotePrisma.nationalStatisticsCache.findUnique({ where: { id: entityId } });
        default:
          return null;
      }
    } catch (error) {
      this.logger.warn(`Could not fetch remote data for ${entityType} ${entityId}`, error);
      return null;
    }
  }

  /**
   * Helper to compare two data objects for equality
   */
  private isDataEqual(local: any, remote: any): boolean {
    if (!local || !remote) return false;

    // Remove metadata fields that might differ but don't represent data changes
    const clean = (obj: any) => {
      const { updatedAt, createdAt, syncedAt, ...rest } = obj;
      return JSON.stringify(rest, Object.keys(rest).sort());
    };

    return clean(local) === clean(remote);
  }

  /**
   * Reset items that have been in PROCESSING state for too long
   * (e.g., due to server crash)
   */
  async resetStuckItems(): Promise<number> {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const stuck = await this.prisma.offlineDataQueue.updateMany({
      where: {
        status: 'PROCESSING',
        updatedAt: { lt: fiveMinutesAgo },
      },
      data: {
        status: 'PENDING',
      },
    });

    if (stuck.count > 0) {
      this.logger.log(`Reset ${stuck.count} stuck PROCESSING items back to PENDING`);
    }

    return stuck.count;
  }

  /**
   * Clear all failed items from the queue
   * Useful for cleaning up items that consistently fail
   */
  async clearFailedItems(): Promise<{ deleted: number; message: string }> {
    try {
      // First, count failed items
      const failedCount = await this.prisma.offlineDataQueue.count({
        where: { status: 'FAILED' }
      });

      if (failedCount === 0) {
        return { deleted: 0, message: 'No failed items to clear' };
      }

      // Delete all failed items
      const deleted = await this.prisma.offlineDataQueue.deleteMany({
        where: { status: 'FAILED' }
      });

      this.logger.log(`Cleared ${deleted.count} failed items from queue`);

      return {
        deleted: deleted.count,
        message: `Cleared ${deleted.count} failed items. These items have been removed from the queue.`
      };
    } catch (error) {
      this.logger.error('Error clearing failed items', error);
      throw error;
    }
  }
}
