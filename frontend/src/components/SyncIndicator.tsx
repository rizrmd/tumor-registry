'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSync, SyncPhase } from '@/contexts/SyncContext';

export function SyncIndicator() {
    const { statistics, fullSyncStatus, isSyncing, syncProgress, lastSyncedAt, error, triggerFullSync } = useSync();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!statistics) return null;

    const hasFailed = statistics.failed > 0;
    const hasConflicts = statistics.conflict > 0;
    const hasPending = statistics.pending > 0 || statistics.processing > 0;
    const needsAttention = statistics.needsAttention > 0;

    let statusColor = 'bg-emerald-500';
    let statusText = 'Synced';
    let pulseClass = 'animate-pulse'; // Always pulse for attention-grabbing
    let statusIcon = (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    );

    if (isSyncing) {
        statusColor = 'bg-blue-500';
        statusText = 'Syncing...';
        pulseClass = 'animate-pulse';
        statusIcon = (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        );
    } else if (needsAttention || hasFailed || hasConflicts) {
        statusColor = 'bg-red-500'; // RED classification
        statusText = 'Not synced';
        pulseClass = 'animate-bounce'; // More aggressive pulse for error
        statusIcon = (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        );
    } else if (hasPending) {
        statusColor = 'bg-yellow-500';
        statusText = 'Local Data';
        pulseClass = 'animate-pulse';
        statusIcon = (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        );
    }

    // Get phase label
    const getPhaseLabel = (phase: SyncPhase): string => {
        switch (phase) {
            case 'idle': return 'Idle';
            case 'push': return 'Uploading data...';
            case 'pull': return 'Downloading data...';
            case 'files': return 'Syncing files...';
            case 'complete': return 'Complete';
            case 'error': return 'Error';
            default: return 'Unknown';
        }
    };

    // Format file size
    const formatBytes = (bytes: number): string => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors bg-white shadow-sm"
                title={`Sync Status: ${statusText}`}
            >
                <div className={`w-2 h-2 rounded-full ${statusColor} ${pulseClass}`} />
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                    {statusText}
                </span>
                {statusIcon}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                    <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                        <h3 className="text-sm font-semibold text-gray-900">Sync Details</h3>
                        {lastSyncedAt && (
                            <p className="text-xs text-gray-500 mt-0.5">
                                Last synced: {lastSyncedAt.toLocaleTimeString()}
                            </p>
                        )}
                    </div>

                    <div className="p-4 space-y-4">
                        {/* Sync Progress Section */}
                        {isSyncing && (
                            <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-semibold text-blue-700">
                                        {getPhaseLabel(syncProgress.phase)}
                                    </span>
                                    <span className="text-xs font-medium text-blue-600">
                                        {syncProgress.phaseProgress}%
                                    </span>
                                </div>
                                {/* Progress Bar */}
                                <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${syncProgress.phaseProgress}%` }}
                                    />
                                </div>
                                {/* Current file info */}
                                {syncProgress.currentFile && (
                                    <p className="text-xs text-blue-600 truncate">
                                        {syncProgress.currentFile.split('/').pop()}
                                    </p>
                                )}
                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                                    <div>
                                        <span className="text-blue-500">Data Pushed:</span>
                                        <span className="font-semibold text-blue-700 ml-1">{syncProgress.dataPushed}</span>
                                    </div>
                                    <div>
                                        <span className="text-blue-500">Data Pulled:</span>
                                        <span className="font-semibold text-blue-700 ml-1">{syncProgress.dataPulled}</span>
                                    </div>
                                    <div>
                                        <span className="text-blue-500">Files:</span>
                                        <span className="font-semibold text-blue-700 ml-1">{syncProgress.filesSynced}/{syncProgress.totalFiles}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Data Sync Stats */}
                        <div>
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Data Sync</h4>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Synced</p>
                                    <p className="text-xl font-bold text-emerald-600">{statistics.synced}</p>
                                </div>
                                <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pending</p>
                                    <p className="text-xl font-bold text-yellow-600">{statistics.pending}</p>
                                </div>
                                <Link
                                    href="/sync/conflicts"
                                    className="p-2.5 rounded-lg bg-orange-50 border border-orange-200 hover:bg-orange-100 transition-colors cursor-pointer block"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">Conflicts</p>
                                    <p className="text-xl font-bold text-orange-600">{statistics.conflict}</p>
                                </Link>
                                <Link
                                    href="/sync/conflicts"
                                    className="p-2.5 rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 transition-colors cursor-pointer block"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Failed</p>
                                    <p className="text-xl font-bold text-red-600">{statistics.failed}</p>
                                </Link>
                            </div>
                        </div>

                        {/* File Sync Stats */}
                        {fullSyncStatus?.fileSync && (
                            <div>
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">File Sync</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pending</p>
                                        <p className="text-xl font-bold text-yellow-600">{fullSyncStatus.fileSync.pending}</p>
                                    </div>
                                    <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">In Progress</p>
                                        <p className="text-xl font-bold text-blue-600">{fullSyncStatus.fileSync.inProgress}</p>
                                    </div>
                                    <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Completed</p>
                                        <p className="text-xl font-bold text-emerald-600">{fullSyncStatus.fileSync.completed}</p>
                                    </div>
                                    <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Size</p>
                                        <p className="text-sm font-bold text-gray-700">{formatBytes(fullSyncStatus.fileSync.totalSize)}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Error Display */}
                        {error && (
                            <div className="p-2.5 rounded-lg bg-red-50 border border-red-100 text-xs text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Sync Button */}
                        <button
                            onClick={() => {
                                triggerFullSync();
                                setIsOpen(false);
                            }}
                            disabled={isSyncing}
                            className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${isSyncing
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98]'
                                }`}
                        >
                            {isSyncing ? (
                                <>
                                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Syncing...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    <span>Sync Now (Data + Files)</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="p-3 bg-gray-50/50 border-t border-gray-50">
                        <Link
                            href="/sync/conflicts"
                            className="text-xs text-emerald-600 font-medium hover:text-emerald-700 block text-center"
                            onClick={() => setIsOpen(false)}
                        >
                            Manage Sync Conflicts & Issues
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
