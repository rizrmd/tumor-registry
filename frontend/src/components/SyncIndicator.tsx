'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSync } from '@/contexts/SyncContext';

export function SyncIndicator() {
    const { statistics, isSyncing, lastSyncedAt, error, triggerSync } = useSync();
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
    let statusIcon = (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    );

    if (isSyncing) {
        statusColor = 'bg-blue-500';
        statusText = 'Syncing...';
        statusIcon = (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        );
    } else if (needsAttention) {
        statusColor = 'bg-red-500';
        statusText = 'Sync Issue';
        statusIcon = (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        );
    } else if (hasPending) {
        statusColor = 'bg-yellow-500';
        statusText = 'Pending Sync';
        statusIcon = (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        );
    }

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors bg-white shadow-sm"
                title={`Sync Status: ${statusText}`}
            >
                <div className={`w-2 h-2 rounded-full ${statusColor} ${isSyncing ? 'animate-pulse' : ''}`} />
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                    {statusText}
                </span>
                {statusIcon}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                    <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                        <h3 className="text-sm font-semibold text-gray-900">Sync Details</h3>
                        {lastSyncedAt && (
                            <p className="text-xs text-gray-500 mt-0.5">
                                Last synced: {lastSyncedAt.toLocaleTimeString()}
                            </p>
                        )}
                    </div>

                    <div className="p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Synced</p>
                                <p className="text-xl font-bold text-emerald-600">{statistics.synced}</p>
                            </div>
                            <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pending</p>
                                <p className="text-xl font-bold text-yellow-600">{statistics.pending}</p>
                            </div>
                            <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Conflicts</p>
                                <p className="text-xl font-bold text-orange-600">{statistics.conflict}</p>
                            </div>
                            <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Failed</p>
                                <p className="text-xl font-bold text-red-600">{statistics.failed}</p>
                            </div>
                        </div>

                        {error && (
                            <div className="p-2.5 rounded-lg bg-red-50 border border-red-100 text-xs text-red-600">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={() => {
                                triggerSync();
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
                                    <span>Sync Now</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="p-3 bg-gray-50/50 border-t border-gray-50">
                        <a
                            href="/settings"
                            className="text-xs text-emerald-600 font-medium hover:text-emerald-700 block text-center"
                            onClick={() => setIsOpen(false)}
                        >
                            Advanced Sync Settings
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
