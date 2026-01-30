'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { syncService, SyncStatistics } from '@/services/sync.service';
import { useAuth } from './AuthContext';

interface SyncContextType {
    statistics: SyncStatistics | null;
    isSyncing: boolean;
    lastSyncedAt: Date | null;
    error: string | null;
    triggerSync: () => Promise<void>;
    refreshStatistics: () => Promise<void>;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

export function SyncProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [statistics, setStatistics] = useState<SyncStatistics | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
    const [error, setError] = useState<string | null>(null);
    const pollingRef = useRef<NodeJS.Timeout | null>(null);

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

    // Setup periodic polling
    useEffect(() => {
        if (user) {
            // Immediate fetch
            refreshStatistics();

            // Setup interval (30 seconds)
            pollingRef.current = setInterval(refreshStatistics, 30000);
        } else {
            if (pollingRef.current) {
                clearInterval(pollingRef.current);
                pollingRef.current = null;
            }
            setStatistics(null);
        }

        return () => {
            if (pollingRef.current) {
                clearInterval(pollingRef.current);
            }
        };
    }, [user, refreshStatistics]);

    return (
        <SyncContext.Provider
            value={{
                statistics,
                isSyncing,
                lastSyncedAt,
                error,
                triggerSync,
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
