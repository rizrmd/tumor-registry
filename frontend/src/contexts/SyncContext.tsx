'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { syncService, SyncStatistics, FullSyncStatus } from '@/services/sync.service';
import { useAuth } from './AuthContext';

export type SyncPhase = 'idle' | 'push' | 'pull' | 'files' | 'complete' | 'error';

interface SyncProgress {
    phase: SyncPhase;
    currentEntity?: string;
    phaseProgress: number; // 0-100
    dataPushed: number;
    dataPulled: number;
    filesSynced: number;
    totalFiles: number;
    currentFile?: string;
}

interface SyncContextType {
    statistics: SyncStatistics | null;
    fullSyncStatus: FullSyncStatus | null;
    isSyncing: boolean;
    syncProgress: SyncProgress;
    lastSyncedAt: Date | null;
    error: string | null;
    triggerSync: () => Promise<void>;
    triggerFullSync: () => Promise<void>;
    refreshStatistics: () => Promise<void>;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

const initialSyncProgress: SyncProgress = {
    phase: 'idle',
    phaseProgress: 0,
    dataPushed: 0,
    dataPulled: 0,
    filesSynced: 0,
    totalFiles: 0,
};

export function SyncProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [statistics, setStatistics] = useState<SyncStatistics | null>(null);
    const [fullSyncStatus, setFullSyncStatus] = useState<FullSyncStatus | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncProgress, setSyncProgress] = useState<SyncProgress>(initialSyncProgress);
    const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
    const [error, setError] = useState<string | null>(null);
    const pollingRef = useRef<NodeJS.Timeout | null>(null);
    const progressPollingRef = useRef<NodeJS.Timeout | null>(null);

    const refreshStatistics = useCallback(async () => {
        if (!user) return;

        try {
            const stats = await syncService.getStatistics();
            setStatistics(stats);
            setError(null);

            // If we see items in "PROCESSING" state, we consider it syncing
            if (stats.processing > 0) {
                setIsSyncing(true);
            } else if (isSyncing && stats.processing === 0) {
                setIsSyncing(false);
                setLastSyncedAt(new Date());
            }
        } catch (err: any) {
            console.error('Failed to fetch sync statistics:', err);
            setError(err.message || 'Failed to fetch sync status');
        }
    }, [user, isSyncing]);

    const refreshFullSyncStatus = useCallback(async () => {
        if (!user) return;

        try {
            const status = await syncService.getFullSyncStatus();
            setFullSyncStatus(status);
        } catch (err: any) {
            console.error('Failed to fetch full sync status:', err);
        }
    }, [user]);

    const triggerSync = async () => {
        if (isSyncing) return;

        setIsSyncing(true);
        setError(null);
        try {
            await syncService.syncAll();
            await refreshStatistics();
            setLastSyncedAt(new Date());
        } catch (err: any) {
            console.error('Manual sync failed:', err);
            setError(err.message || 'Manual sync failed');
        } finally {
            setIsSyncing(false);
        }
    };

    const triggerFullSync = async () => {
        if (isSyncing) return;

        setIsSyncing(true);
        setError(null);
        setSyncProgress({ ...initialSyncProgress, phase: 'push' });

        try {
            // Start polling for progress updates
            progressPollingRef.current = setInterval(async () => {
                await refreshFullSyncStatus();
            }, 1000);

            await syncService.runFullSync();
            setSyncProgress({ ...initialSyncProgress, phase: 'complete' });
            await refreshStatistics();
            await refreshFullSyncStatus();
            setLastSyncedAt(new Date());
        } catch (err: any) {
            console.error('Full sync failed:', err);
            setError(err.message || 'Full sync failed');
            setSyncProgress({ ...initialSyncProgress, phase: 'error' });
        } finally {
            setIsSyncing(false);
            if (progressPollingRef.current) {
                clearInterval(progressPollingRef.current);
                progressPollingRef.current = null;
            }
        }
    };

    // Update sync progress based on full sync status
    useEffect(() => {
        if (!fullSyncStatus || !isSyncing) return;

        const { dataSync, fileSync, isOnline } = fullSyncStatus;

        // Determine phase based on status
        let newPhase: SyncPhase = 'idle';
        if (!isOnline) {
            newPhase = 'error';
        } else if (dataSync.processing > 0) {
            newPhase = 'push';
        } else if (fileSync.inProgress > 0 || fileSync.pending > 0) {
            newPhase = 'files';
        } else if (dataSync.pending === 0 && fileSync.pending === 0) {
            newPhase = 'complete';
        }

        setSyncProgress(prev => ({
            ...prev,
            phase: newPhase,
            dataPushed: dataSync.synced,
            dataPulled: dataSync.synced,
            filesSynced: fileSync.completed,
            totalFiles: fileSync.completed + fileSync.pending + fileSync.inProgress,
            currentFile: fileSync.currentFile,
            phaseProgress: fileSync.currentProgress || 0,
        }));
    }, [fullSyncStatus, isSyncing]);

    // Setup periodic polling
    useEffect(() => {
        if (user) {
            // Immediate fetch
            refreshStatistics();
            refreshFullSyncStatus();

            // Setup interval (30 seconds)
            pollingRef.current = setInterval(() => {
                refreshStatistics();
                refreshFullSyncStatus();
            }, 30000);
        } else {
            if (pollingRef.current) {
                clearInterval(pollingRef.current);
                pollingRef.current = null;
            }
            setStatistics(null);
            setFullSyncStatus(null);
        }

        return () => {
            if (pollingRef.current) {
                clearInterval(pollingRef.current);
            }
            if (progressPollingRef.current) {
                clearInterval(progressPollingRef.current);
            }
        };
    }, [user, refreshStatistics, refreshFullSyncStatus]);

    return (
        <SyncContext.Provider
            value={{
                statistics,
                fullSyncStatus,
                isSyncing,
                syncProgress,
                lastSyncedAt,
                error,
                triggerSync,
                triggerFullSync,
                refreshStatistics,
            }}
        >
            {children}
        </SyncContext.Provider>
    );
}

export function useSync() {
    const context = useContext(SyncContext);
    if (context === undefined) {
        throw new Error('useSync must be used within a SyncProvider');
    }
    return context;
}
