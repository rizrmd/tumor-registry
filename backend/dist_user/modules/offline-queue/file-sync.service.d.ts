import { PrismaService } from '@/database/prisma.service';
import { RemotePrismaService } from '@/database/remote-prisma.service';
export interface FileSyncJob {
    id: string;
    entityType: 'medical-image' | 'clinical-photo' | 'pathology-report' | 'document';
    entityId: string;
    filePath: string;
    remoteUrl?: string;
    operation: 'UPLOAD' | 'DOWNLOAD';
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
    retryCount: number;
    maxRetries: number;
    errorMessage?: string;
    checksum?: string;
    fileSize?: number;
    progress: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface SyncStats {
    dataSync: {
        pending: number;
        processing: number;
        synced: number;
        failed: number;
        conflict: number;
        lastSyncAt?: Date;
    };
    fileSync: {
        pending: number;
        inProgress: number;
        completed: number;
        failed: number;
        totalSize: number;
        currentFile?: string;
        currentProgress: number;
    };
    isOnline: boolean;
    lastCheckAt: Date;
}
export declare class FileSyncService {
    private prisma;
    private remotePrismaService;
    private readonly logger;
    private readonly uploadDir;
    private readonly maxFileSize;
    private readonly jobQueue;
    private isProcessing;
    private lastSyncStats;
    constructor(prisma: PrismaService, remotePrismaService: RemotePrismaService);
    private get remotePrisma();
    private ensureUploadDirExists;
    private generateId;
    private calculateChecksum;
    queueFile(entityType: FileSyncJob['entityType'], entityId: string, filePath: string, operation?: 'UPLOAD' | 'DOWNLOAD', remoteUrl?: string, fileSize?: number): Promise<FileSyncJob>;
    queueFilesForSync(entityType: string, since: Date): Promise<number>;
    private queueMedicalImages;
    private queueClinicalPhotos;
    queueFilesForDownload(): Promise<number>;
    processPendingFileSyncs(): Promise<{
        processed: number;
        succeeded: number;
        failed: number;
    }>;
    private processFileSyncJob;
    private uploadFileToRemote;
    private downloadFileFromRemote;
    getFileSyncStats(): {
        pending: number;
        inProgress: number;
        completed: number;
        failed: number;
        totalSize: number;
        currentFile?: string;
        currentProgress: number;
    };
    getSyncStatus(): Promise<SyncStats>;
    getPendingJobs(limit?: number): FileSyncJob[];
    cleanupOldJobs(minutes?: number): number;
}
