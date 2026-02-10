'use client';

import React, { useState, useEffect } from 'react';
import { QueueItem, ConflictResolution } from '@/services/sync.service';

interface ConflictResolutionDialogProps {
    queueItem: QueueItem;
    isOpen: boolean;
    onClose: () => void;
    onResolve: (resolution: ConflictResolution, mergedData?: any) => void;
}

export function ConflictResolutionDialog({
    queueItem,
    isOpen,
    onClose,
    onResolve,
}: ConflictResolutionDialogProps) {
    const [selectedStrategy, setSelectedStrategy] = useState<ConflictResolution>(ConflictResolution.USE_LOCAL);
    const [mergedData, setMergedData] = useState<any>({});
    const [activeTab, setActiveTab] = useState<'visual' | 'json'>('visual');

    // Initialize merged data with local data as base
    useEffect(() => {
        if (queueItem?.conflictData?.localData) {
            setMergedData({ ...queueItem.conflictData.localData });
        }
    }, [queueItem]);

    if (!isOpen || !queueItem) return null;

    const localData = queueItem.conflictData?.localData || {};
    const remoteData = queueItem.conflictData?.remoteData || {};
    const entityType = queueItem.entityType;
    const entityId = queueItem.entityId;

    // Get all unique keys from both objects
    const allKeys = Array.from(new Set([...Object.keys(localData), ...Object.keys(remoteData)]));

    // Filter out internal/metadata keys
    const displayKeys = allKeys.filter(key =>
        !['id', 'createdAt', 'updatedAt', 'passwordHash', 'metadata'].includes(key)
    );

    const handleResolve = () => {
        if (selectedStrategy === ConflictResolution.MERGE || selectedStrategy === ConflictResolution.MANUAL) {
            onResolve(selectedStrategy, mergedData);
        } else {
            onResolve(selectedStrategy);
        }
    };

    const formatValue = (value: any): string => {
        if (value === null || value === undefined) return '-';
        if (typeof value === 'boolean') return value ? 'Yes' : 'No';
        if (typeof value === 'object') return JSON.stringify(value).slice(0, 50);
        return String(value);
    };

    const isDifferent = (key: string): boolean => {
        return JSON.stringify(localData[key]) !== JSON.stringify(remoteData[key]);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        Conflict Detected
                                    </h2>
                                    <p className="text-orange-100 text-sm">
                                        {entityType} {entityId && `(ID: ${entityId.slice(0, 8)}...)`}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 max-h-[70vh] overflow-y-auto">
                        {/* View Toggle */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                                <button
                                    onClick={() => setActiveTab('visual')}
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'visual'
                                            ? 'bg-white text-gray-900 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    Visual Diff
                                </button>
                                <button
                                    onClick={() => setActiveTab('json')}
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'json'
                                            ? 'bg-white text-gray-900 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    JSON View
                                </button>
                            </div>
                            <div className="text-sm text-gray-500">
                                <span className="inline-flex items-center px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
                                    {displayKeys.filter(isDifferent).length} differences
                                </span>
                            </div>
                        </div>

                        {activeTab === 'visual' ? (
                            <div className="grid grid-cols-2 gap-4">
                                {/* Local Version */}
                                <div className="border-2 border-blue-200 rounded-xl overflow-hidden">
                                    <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-blue-900">Your Version</h3>
                                                <p className="text-xs text-blue-600">Local changes</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                                        {displayKeys.map(key => (
                                            <div
                                                key={key}
                                                className={`p-2 rounded-lg ${isDifferent(key) ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}
                                            >
                                                <div className="text-xs font-medium text-gray-500 uppercase">{key}</div>
                                                <div className="text-sm text-gray-900 font-medium">
                                                    {formatValue(localData[key])}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Remote Version */}
                                <div className="border-2 border-purple-200 rounded-xl overflow-hidden">
                                    <div className="bg-purple-50 px-4 py-3 border-b border-purple-100">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-purple-900">Server Version</h3>
                                                <p className="text-xs text-purple-600">Remote changes</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                                        {displayKeys.map(key => (
                                            <div
                                                key={key}
                                                className={`p-2 rounded-lg ${isDifferent(key) ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50'}`}
                                            >
                                                <div className="text-xs font-medium text-gray-500 uppercase">{key}</div>
                                                <div className="text-sm text-gray-900 font-medium">
                                                    {formatValue(remoteData[key])}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                    <div className="text-xs text-gray-400 mb-2">Local (Your Changes)</div>
                                    <pre className="text-sm text-green-400 font-mono">
                                        {JSON.stringify(localData, null, 2)}
                                    </pre>
                                </div>
                                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                    <div className="text-xs text-gray-400 mb-2">Remote (Server)</div>
                                    <pre className="text-sm text-blue-400 font-mono">
                                        {JSON.stringify(remoteData, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        )}

                        {/* Resolution Strategy */}
                        <div className="mt-6">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Choose Resolution Strategy</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <ResolutionOption
                                    value={ConflictResolution.USE_LOCAL}
                                    label="Use My Version"
                                    description="Keep your local changes and overwrite server"
                                    icon="💻"
                                    selected={selectedStrategy === ConflictResolution.USE_LOCAL}
                                    onSelect={(val) => {
                                        setSelectedStrategy(val);
                                        setMergedData({ ...localData });
                                    }}
                                    color="blue"
                                />
                                <ResolutionOption
                                    value={ConflictResolution.USE_REMOTE}
                                    label="Use Server Version"
                                    description="Accept server changes and discard yours"
                                    icon="🌐"
                                    selected={selectedStrategy === ConflictResolution.USE_REMOTE}
                                    onSelect={(val) => {
                                        setSelectedStrategy(val);
                                        setMergedData({ ...remoteData });
                                    }}
                                    color="purple"
                                />
                                <ResolutionOption
                                    value={ConflictResolution.MERGE}
                                    label="Smart Merge"
                                    description="Merge non-conflicting fields from both"
                                    icon="🔀"
                                    selected={selectedStrategy === ConflictResolution.MERGE}
                                    onSelect={(val) => {
                                        setSelectedStrategy(val);
                                        // Smart Merge Logic:
                                        // Use Remote as base (server truth)
                                        // Override with Local ONLY if Local has valid value
                                        const smartMerged = { ...remoteData };
                                        Object.keys(localData).forEach(key => {
                                            const val = localData[key];
                                            if (val !== null && val !== undefined && val !== '') {
                                                smartMerged[key] = val;
                                            }
                                        });
                                        setMergedData(smartMerged);
                                    }}
                                    color="orange"
                                />
                                <ResolutionOption
                                    value={ConflictResolution.MANUAL}
                                    label="Manual Edit"
                                    description="Edit the data before resolving"
                                    icon="✏️"
                                    selected={selectedStrategy === ConflictResolution.MANUAL}
                                    onSelect={(val) => {
                                        setSelectedStrategy(val);
                                        setMergedData({ ...localData });
                                    }}
                                    color="emerald"
                                />
                            </div>
                        </div>

                        {/* Merge Editor (shown for MERGE or MANUAL) */}
                        {(selectedStrategy === ConflictResolution.MERGE || selectedStrategy === ConflictResolution.MANUAL) && (
                            <div className="mt-4">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                    {selectedStrategy === ConflictResolution.MERGE ? 'Review Merged Data' : 'Edit Data Manually'}
                                </h3>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                                    {displayKeys.map(key => (
                                        <div key={key} className="mb-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <label className="block text-xs font-medium text-gray-500 uppercase">
                                                    {key}
                                                    {isDifferent(key) && (
                                                        <span className="ml-2 text-orange-500" title="Different in Local and Remote">●</span>
                                                    )}
                                                </label>
                                                {isDifferent(key) && (
                                                    <span className="text-xs text-orange-600">Conflict</span>
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                value={mergedData[key] !== undefined && mergedData[key] !== null ? String(mergedData[key]) : ''}
                                                onChange={(e) => setMergedData({ ...mergedData, [key]: e.target.value })}
                                                className={`w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${isDifferent(key) ? 'border-orange-300 bg-orange-50' : 'border-gray-300'
                                                    }`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                This action cannot be undone
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleResolve}
                                    className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                                >
                                    Resolve Conflict
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Resolution Option Component
interface ResolutionOptionProps {
    value: ConflictResolution;
    label: string;
    description: string;
    icon: string;
    selected: boolean;
    onSelect: (value: ConflictResolution) => void;
    color: 'blue' | 'purple' | 'orange' | 'emerald';
}

function ResolutionOption({ value, label, description, icon, selected, onSelect, color }: ResolutionOptionProps) {
    const colorClasses = {
        blue: 'border-blue-200 hover:border-blue-300 bg-blue-50/50',
        purple: 'border-purple-200 hover:border-purple-300 bg-purple-50/50',
        orange: 'border-orange-200 hover:border-orange-300 bg-orange-50/50',
        emerald: 'border-emerald-200 hover:border-emerald-300 bg-emerald-50/50',
    };

    const selectedClasses = {
        blue: 'border-blue-500 bg-blue-50 ring-2 ring-blue-200',
        purple: 'border-purple-500 bg-purple-50 ring-2 ring-purple-200',
        orange: 'border-orange-500 bg-orange-50 ring-2 ring-orange-200',
        emerald: 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200',
    };

    return (
        <button
            onClick={() => onSelect(value)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${selected ? selectedClasses[color] : colorClasses[color]
                }`}
        >
            <div className="flex items-start space-x-3">
                <span className="text-2xl">{icon}</span>
                <div>
                    <div className="font-semibold text-gray-900">{label}</div>
                    <div className="text-sm text-gray-600 mt-1">{description}</div>
                </div>
            </div>
        </button>
    );
}
