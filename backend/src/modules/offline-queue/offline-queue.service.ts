import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  BadRequestException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaService } from '@/common/database/prisma.service';
import { SyncOfflineDataDto } from './dto/sync-offline-data.dto';
import { ResolveConflictDto } from './dto/resolve-conflict.dto';

import { RemotePrismaService } from '@/database/remote-prisma.service';

@Injectable()
export class OfflineQueueService implements OnModuleInit {
  private readonly logger = new Logger(OfflineQueueService.name);
  private isSyncing = false;
  private readonly trackedEntities = ['patient', 'diagnosis', 'medication', 'clinical-photo', 'msts-score'];

  constructor(
    private prisma: PrismaService,
    private remotePrisma: RemotePrismaService,
  ) { }

  async onModuleInit() {
    // Start background sync every 5 minutes
    // Wrap in timeout to ensure app is fully booted
    setTimeout(() => {
      this.logger.log('Starting background sync loop');
      setInterval(() => {
        this.runFullSync().catch((err) =>
          this.logger.error('Background sync failed', err),
        );
      }, 1000 * 60 * 5); // 5 minutes
    }, 5000);
  }

  async runFullSync() {
    this.logger.log('Starting full sync (Push + Pull)');
    await this.syncAllPendingItems();
    await this.syncRemoteChanges();
    this.logger.log('Full sync completed');
  }

  async queueOfflineData(syncDto: SyncOfflineDataDto, userId: string): Promise<any> {
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

  async processQueueItem(queueId: string, userId: string): Promise<any> {
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
        // Check connection first
        if (!(await this.remotePrisma.checkConnection())) {
          throw new Error('Remote database unavailable');
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
      const pendingItems = await this.prisma.offlineDataQueue.findMany({
        where: { status: 'PENDING' },
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

  async syncRemoteChanges(): Promise<any> {
    try {
      // Check connection first
      if (!(await this.remotePrisma.checkConnection())) {
        return { status: 'OFFLINE' };
      }

      this.logger.log('Pulling remote changes...');
      const results: any[] = [];

      for (const entityType of this.trackedEntities) {
        const pullRes = await this.pullRemoteData(entityType);
        results.push({ entityType, ...pullRes });
      }

      return results;
    } catch (error) {
      this.logger.error('Error pulling remote changes', error);
      throw error;
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
    const filter = {
      where: {
        updatedAt: { gt: since },
      },
      take: 500, // Limit per batch
    };

    switch (entityType.toLowerCase()) {
      case 'patient':
        return await this.remotePrisma.patient.findMany(filter);
      case 'diagnosis':
        return await this.remotePrisma.patientDiagnosis.findMany(filter);
      case 'medication':
        return await this.remotePrisma.patientMedication.findMany(filter);
      case 'clinical-photo':
        return await this.remotePrisma.clinicalPhoto.findMany(filter);
      case 'msts-score':
        return await this.remotePrisma.mstsScore.findMany(filter);
      default:
        return [];
    }
  }

  private async upsertLocal(entityType: string, data: any): Promise<any> {
    const { id, ...rest } = data;
    const model = entityType.toLowerCase();

    // Use prisma[model].upsert behavior
    switch (model) {
      case 'patient':
        return await this.prisma.patient.upsert({ where: { id }, create: data, update: rest });
      case 'diagnosis':
        return await this.prisma.patientDiagnosis.upsert({ where: { id }, create: data, update: rest });
      case 'medication':
        return await this.prisma.patientMedication.upsert({ where: { id }, create: data, update: rest });
      case 'clinical-photo':
        return await this.prisma.clinicalPhoto.upsert({ where: { id }, create: data, update: rest });
      case 'msts-score':
        return await this.prisma.mstsScore.upsert({ where: { id }, create: data, update: rest });
    }
  }

  async resolveConflict(queueId: string, resolveDto: ResolveConflictDto, userId: string): Promise<any> {
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
            throw new BadRequestException('Merged data is required for MERGE resolution');
          }
          dataToUse = resolveDto.mergedData;
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

  async getPendingQueue(userId: string, limit = 100): Promise<any> {
    try {
      const queueItems = await this.prisma.offlineDataQueue.findMany({
        where: {
          userId,
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

  async getQueueStatistics(userId: string): Promise<any> {
    try {
      const [pending, processing, synced, failed, conflict] = await Promise.all([
        this.prisma.offlineDataQueue.count({ where: { userId, status: 'PENDING' } }),
        this.prisma.offlineDataQueue.count({ where: { userId, status: 'PROCESSING' } }),
        this.prisma.offlineDataQueue.count({ where: { userId, status: 'SYNCED' } }),
        this.prisma.offlineDataQueue.count({ where: { userId, status: 'FAILED' } }),
        this.prisma.offlineDataQueue.count({ where: { userId, status: 'CONFLICT' } }),
      ]);

      return {
        pending,
        processing,
        synced,
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
    userId: string,
  ): Promise<any> {
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
      default:
        throw new BadRequestException(`Unsupported entity type: ${entityType}`);
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
        case 'clinical-photo':
          return await this.remotePrisma.clinicalPhoto.findUnique({ where: { id: entityId } });
        case 'msts-score':
          return await this.remotePrisma.mstsScore.findUnique({ where: { id: entityId } });
        default:
          return null;
      }
    } catch (error) {
      this.logger.warn(`Could not fetch remote data for ${entityType} ${entityId}`, error);
      return null;
    }
  }
}
