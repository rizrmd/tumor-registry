import apiClient from './api.config';

export enum ConflictResolution {
    USE_LOCAL = 'USE_LOCAL',
    USE_REMOTE = 'USE_REMOTE',
    MERGE = 'MERGE',
    MANUAL = 'MANUAL',
}

export interface SyncStatistics {
    pending: number;
    processing: number;
    synced: number;
    failed: number;
    conflict: number;
    needsAttention: number;
}

export interface FileSyncStats {
    pending: number;
    inProgress: number;
    completed: number;
    failed: number;
    totalSize: number;
    currentFile?: string;
    currentProgress: number;
}

export interface FullSyncStatus {
    dataSync: SyncStatistics;
    fileSync: FileSyncStats;
    isOnline: boolean;
    centralServerUrl?: string;
    lastCheckAt: string;
}

export interface QueueItem {
    id: string;
    entityType: string;
    entityId: string;
    operation: 'CREATE' | 'UPDATE' | 'DELETE';
    data: any;
    status: 'PENDING' | 'PROCESSING' | 'SYNCED' | 'FAILED' | 'CONFLICT' | 'RESOLVED';
    localTimestamp: string;
    syncedAt?: string;
    attemptCount: number;
    maxAttempts: number;
    errorMessage?: string;
    errorDetails?: any;
    conflictData?: {
        errorMessage: string;
        localData: any;
        remoteData: any;
    };
    resolution?: ConflictResolution;
    resolvedAt?: string;
    resolvedBy?: string;
    priority: number;
    deviceId?: string;
    sessionId?: string;
    metadata?: any;
}

export interface ResolveConflictRequest {
    resolution: ConflictResolution;
    mergedData?: any;
}

export const syncService = {
    /**
     * Get synchronization statistics for the current user
     */
    getStatistics: async (): Promise<SyncStatistics> => {
        const response = await apiClient.get('/offline-queue/statistics');
        return response.data;
    },

    /**
     * Get pending queue items including conflicts
     */
    getQueueItems: async (limit = 100): Promise<{ total: number; items: QueueItem[] }> => {
        const response = await apiClient.get('/offline-queue/pending', {
            params: { limit },
        });
        return response.data;
    },

    /**
     * Resolve a conflict for a queue item
     */
    resolveConflict: async (id: string, resolution: ConflictResolution, mergedData?: any): Promise<any> => {
        const response = await apiClient.put(`/offline-queue/${id}/resolve-conflict`, {
            resolution,
            mergedData,
        });
        return response.data;
    },

    /**
     * Auto-resolve all conflicts using smart merge
     */
    autoResolveConflicts: async (): Promise<any> => {
        const response = await apiClient.post('/offline-queue/auto-resolve-conflicts');
        return response.data;
    },

    /**
     * Retry a failed queue item
     */
    retryItem: async (id: string): Promise<any> => {
        const response = await apiClient.put(`/offline-queue/${id}/retry`);
        return response.data;
    },

    /**
     * Sync all pending items manually
     */
    syncAll: async (): Promise<any> => {
        const response = await apiClient.post('/offline-queue/sync-all');
        return response.data;
    },

    /**
     * Run full sync including data push, data pull, and files
     */
    runFullSync: async (): Promise<any> => {
        const response = await apiClient.post('/offline-queue/full-sync');
        return response.data;
    },

    /**
     * Get detailed full sync status including progress
     */
    getFullSyncStatus: async (): Promise<FullSyncStatus> => {
        const response = await apiClient.get('/offline-queue/full-sync-status');
        return response.data;
    },

    /**
     * Get file sync status
     */
    getFileSyncStatus: async (): Promise<any> => {
        const response = await apiClient.get('/offline-queue/files/status');
        return response.data;
    },

    /**
     * Trigger file synchronization
     */
    syncFiles: async (): Promise<any> => {
        const response = await apiClient.post('/offline-queue/files/sync');
        return response.data;
    },

    /**
     * Get pending file sync jobs
     */
    getPendingFiles: async (limit = 100): Promise<any> => {
        const response = await apiClient.get('/offline-queue/files/pending', {
            params: { limit },
        });
        return response.data;
    }
};

export default syncService;
