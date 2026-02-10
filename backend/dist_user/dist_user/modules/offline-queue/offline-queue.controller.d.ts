import { OfflineQueueService } from './offline-queue.service';
import { FileSyncService } from './file-sync.service';
import { SyncOfflineDataDto } from './dto/sync-offline-data.dto';
import { ResolveConflictDto } from './dto/resolve-conflict.dto';
export declare class OfflineQueueController {
    private readonly offlineQueueService;
    private readonly fileSyncService;
    constructor(offlineQueueService: OfflineQueueService, fileSyncService: FileSyncService);
    syncOfflineData(syncDto: SyncOfflineDataDto, req: any): Promise<any>;
    getPendingQueue(limit?: string, req?: any): Promise<any>;
    getStatistics(req: any): Promise<any>;
    syncAll(req: any): Promise<any>;
    retry(id: string, req: any): Promise<any>;
    resolveConflict(id: string, resolveDto: ResolveConflictDto, req: any): Promise<any>;
    getFileSyncStatus(): Promise<{
        pending: number;
        inProgress: number;
        completed: number;
        failed: number;
        totalSize: number;
        currentFile?: string;
        currentProgress: number;
    }>;
    syncFiles(): Promise<{
        processed: number;
        succeeded: number;
        failed: number;
    }>;
    getPendingFiles(limit?: string): Promise<{
        total: number;
        jobs: import("./file-sync.service").FileSyncJob[];
    }>;
    runFullSync(req: any): Promise<{
        dataSync: any;
        status: string;
    }>;
    getFullSyncStatus(): Promise<import("./file-sync.service").SyncStats>;
}
