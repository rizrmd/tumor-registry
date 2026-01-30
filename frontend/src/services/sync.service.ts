import apiClient from './api.config';

export interface SyncStatistics {
    pending: number;
    processing: number;
    synced: number;
    failed: number;
    conflict: number;
    needsAttention: number;
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
    }
};

export default syncService;
