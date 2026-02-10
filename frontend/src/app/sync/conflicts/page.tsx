'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';
import { ConflictResolutionDialog } from '@/components/sync/ConflictResolutionDialog';
import { useSync } from '@/contexts/SyncContext';
import {
    syncService,
    QueueItem,
    ConflictResolution
} from '@/services/sync.service';
import toast from 'react-hot-toast';

export default function ConflictsPage() {
    const router = useRouter();
    const {
        statistics,
        isSyncing,
        triggerFullSync,
        refreshStatistics
    } = useSync();

    const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
    const [isLoadingItems, setIsLoadingItems] = useState(true);
    const [selectedItem, setSelectedItem] = useState<QueueItem | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState<'all' | 'conflict' | 'failed' | 'pending'>('all');

    const fetchQueueItems = useCallback(async () => {
        try {
            const queueData = await syncService.getQueueItems(100);
            setQueueItems(queueData.items);
        } catch (error) {
            console.error('Failed to fetch queue items:', error);
            toast.error('Gagal memuat antrian sinkronisasi');
        } finally {
            setIsLoadingItems(false);
        }
    }, []);

    const handleRefresh = async () => {
        const toastId = toast.loading('Memperbarui data...');
        try {
            await Promise.all([
                refreshStatistics(),
                fetchQueueItems()
            ]);
            toast.success('Data diperbarui', { id: toastId });
        } catch (error) {
            toast.error('Gagal memperbarui data', { id: toastId });
        }
    };

    useEffect(() => {
        fetchQueueItems();
        // Statistics are handled by SyncContext polling
    }, [fetchQueueItems]);

    const handleResolve = async (resolution: ConflictResolution, mergedData?: any) => {
        if (!selectedItem) return;

        const toastId = toast.loading('Menyelesaikan konflik...');
        try {
            await syncService.resolveConflict(selectedItem.id, resolution, mergedData);
            toast.success('Konflik berhasil diselesaikan', { id: toastId });
            setIsDialogOpen(false);
            setSelectedItem(null);
            await Promise.all([refreshStatistics(), fetchQueueItems()]);
        } catch (error) {
            console.error('Failed to resolve conflict:', error);
            toast.error('Gagal menyelesaikan konflik', { id: toastId });
        }
    };

    const handleRetry = async (item: QueueItem) => {
        const toastId = toast.loading('Mengulangi sinkronisasi...');
        try {
            await syncService.retryItem(item.id);
            toast.success('Item masuk antrian untuk dicoba lagi', { id: toastId });
            await Promise.all([refreshStatistics(), fetchQueueItems()]);
        } catch (error) {
            console.error('Failed to retry:', error);
            toast.error('Gagal mengulangi sinkronisasi', { id: toastId });
        }
    };

    const handleSyncNow = async () => {
        try {
            await triggerFullSync();
            toast.success('Sinkronisasi selesai');
            await fetchQueueItems();
        } catch (error) {
            // Error is handled by SyncContext/toast
        }
    };

    const openResolveDialog = (item: QueueItem) => {
        setSelectedItem(item);
        setIsDialogOpen(true);
    };

    const filteredItems = queueItems.filter(item => {
        if (activeFilter === 'all') return ['CONFLICT', 'FAILED', 'PENDING'].includes(item.status);
        return item.status.toLowerCase() === activeFilter;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CONFLICT': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'FAILED': return 'bg-red-100 text-red-800 border-red-200';
            case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'PROCESSING': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'SYNCED': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'CONFLICT':
                return (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                );
            case 'FAILED':
                return (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'PENDING':
                return (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    if (isLoadingItems) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Sync Management</h1>
                            <p className="text-gray-600 mt-1">Manage sync conflicts and pending items</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={handleRefresh}
                                className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>Refresh</span>
                            </button>
                            <button
                                onClick={handleSyncNow}
                                disabled={isSyncing}
                                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSyncing ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                )}
                                <span>Sync Now</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                {statistics && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                        <StatCard
                            title="Pending"
                            value={statistics.pending}
                            color="yellow"
                            icon="⏳"
                        />
                        <StatCard
                            title="Processing"
                            value={statistics.processing}
                            color="blue"
                            icon="🔄"
                        />
                        <StatCard
                            title="Synced"
                            value={statistics.synced}
                            color="emerald"
                            icon="✅"
                        />
                        <StatCard
                            title="Conflicts"
                            value={statistics.conflict}
                            color="orange"
                            icon="⚠️"
                            alert={statistics.conflict > 0}
                        />
                        <StatCard
                            title="Failed"
                            value={statistics.failed}
                            color="red"
                            icon="❌"
                            alert={statistics.failed > 0}
                        />
                        <StatCard
                            title="Needs Attention"
                            value={statistics.needsAttention}
                            color="purple"
                            icon="🔔"
                            alert={statistics.needsAttention > 0}
                        />
                    </div>
                )}

                {/* Filter Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="border-b border-gray-200">
                        <div className="flex">
                            {[
                                { key: 'all', label: 'All Issues', count: statistics?.needsAttention || 0 },
                                { key: 'conflict', label: 'Conflicts', count: statistics?.conflict || 0 },
                                { key: 'failed', label: 'Failed', count: statistics?.failed || 0 },
                                { key: 'pending', label: 'Pending', count: statistics?.pending || 0 },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveFilter(tab.key as any)}
                                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeFilter === tab.key
                                        ? 'border-emerald-500 text-emerald-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <span>{tab.label}</span>
                                    {tab.count > 0 && (
                                        <span className={`px-2 py-0.5 rounded-full text-xs ${activeFilter === tab.key
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {tab.count}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="divide-y divide-gray-200">
                        {filteredItems.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                {activeFilter === 'all' ? (
                                    <>
                                        <h3 className="text-lg font-medium text-gray-900">All caught up!</h3>
                                        <p className="text-gray-500 mt-1">No items need your attention</p>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="text-lg font-medium text-gray-900 capitalize">No {activeFilter} items</h3>
                                        <p className="text-gray-500 mt-1">
                                            {statistics?.needsAttention && statistics.needsAttention > 0 && activeFilter === 'pending'
                                                ? `You have ${statistics.needsAttention} items that need attention in other tabs.`
                                                : `There are no items with ${activeFilter} status.`}
                                        </p>
                                    </>
                                )}
                            </div>
                        ) : (
                            filteredItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-6 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-4">
                                            {/* Status Icon */}
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(item.status)}`}>
                                                {getStatusIcon(item.status)}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2">
                                                    <h3 className="text-base font-semibold text-gray-900 capitalize">
                                                        {item.operation.toLowerCase()} {item.entityType}
                                                    </h3>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                                                        {item.status}
                                                    </span>
                                                </div>

                                                <p className="text-sm text-gray-500 mt-1">
                                                    ID: {item.entityId?.slice(0, 12)}... •
                                                    Attempt {item.attemptCount}/{item.maxAttempts} •
                                                    {new Date(item.localTimestamp).toLocaleString()}
                                                </p>

                                                {/* Error Message */}
                                                {item.errorMessage && (
                                                    <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                                                        <p className="text-sm text-red-700">
                                                            {item.errorMessage}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Conflict Info */}
                                                {item.status === 'CONFLICT' && item.conflictData && (
                                                    <div className="mt-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                                        <p className="text-sm text-orange-700">
                                                            {item.conflictData.errorMessage || 'Data conflict detected between local and remote versions'}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center space-x-2 ml-4">
                                            {item.status === 'CONFLICT' && (
                                                <button
                                                    onClick={() => openResolveDialog(item)}
                                                    className="flex items-center space-x-1 px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                                    </svg>
                                                    <span>Resolve</span>
                                                </button>
                                            )}

                                            {item.status === 'FAILED' && (
                                                <button
                                                    onClick={() => handleRetry(item)}
                                                    className="flex items-center space-x-1 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                    <span>Retry</span>
                                                </button>
                                            )}

                                            {/* View Details Button */}
                                            <button
                                                onClick={() => openResolveDialog(item)}
                                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                title="View Details"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Conflict Resolution Dialog */}
            {selectedItem && (
                <ConflictResolutionDialog
                    queueItem={selectedItem}
                    isOpen={isDialogOpen}
                    onClose={() => {
                        setIsDialogOpen(false);
                        setSelectedItem(null);
                    }}
                    onResolve={handleResolve}
                />
            )}
        </Layout>
    );
}

// Stat Card Component
interface StatCardProps {
    title: string;
    value: number;
    color: 'yellow' | 'blue' | 'emerald' | 'orange' | 'red' | 'purple';
    icon: string;
    alert?: boolean;
}

function StatCard({ title, value, color, icon, alert }: StatCardProps) {
    const colorClasses = {
        yellow: 'bg-yellow-50 border-yellow-200',
        blue: 'bg-blue-50 border-blue-200',
        emerald: 'bg-emerald-50 border-emerald-200',
        orange: 'bg-orange-50 border-orange-200',
        red: 'bg-red-50 border-red-200',
        purple: 'bg-purple-50 border-purple-200',
    };

    const textColors = {
        yellow: 'text-yellow-900',
        blue: 'text-blue-900',
        emerald: 'text-emerald-900',
        orange: 'text-orange-900',
        red: 'text-red-900',
        purple: 'text-purple-900',
    };

    return (
        <div className={`p-4 rounded-xl border-2 ${colorClasses[color]} ${alert ? 'ring-2 ring-offset-2 ring-red-400' : ''}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className={`text-sm font-medium ${textColors[color]} opacity-70`}>{title}</p>
                    <p className={`text-3xl font-bold ${textColors[color]} mt-1`}>{value}</p>
                </div>
                <span className="text-3xl">{icon}</span>
            </div>
        </div>
    );
}
