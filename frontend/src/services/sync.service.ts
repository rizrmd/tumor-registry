import apiClient from './api.config';

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
    lastCheckAt: string;
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
     * Get pending queue items
     */
    getPendingQueue: async (limit = 100): Promise<any> => {
        const response = await apiClient.get('/offline-queue/pending', {
            params: { limit },
        });
        return response.data;
    },

    /**
     * Retry a specific failed queue item
     */
    retryItem: async (id: string): Promise<any> => {
        const response = await apiClient.put(`/offline-queue/${id}/retry`);
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
