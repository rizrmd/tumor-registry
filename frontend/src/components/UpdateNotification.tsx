'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useWails } from '@/hooks/useWails';

interface UpdateInfo {
    updateAvailable: boolean;
    currentVersion: string;
    latestVersion: string;
    mandatory: boolean;
    downloadUrl: string;
    releaseDate: string;
    changelog: string[];
    message?: string;
}

type UpdateStage = 'confirmation' | 'backing-up' | 'downloading' | 'installing' | 'complete' | 'error';

interface UpdateNotificationProps {
    onDownloadUpdate?: (url: string) => void;
    onDismiss?: () => void;
}

export function UpdateNotification({ onDownloadUpdate, onDismiss }: UpdateNotificationProps) {
    const { CheckForUpdates, GetCachedUpdateInfo, GetAppVersion, PerformUpdate } = useWails();
    const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
    const [currentVersion, setCurrentVersion] = useState<string>('');
    const [isVisible, setIsVisible] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    // Update progress state
    const [stage, setStage] = useState<UpdateStage>('confirmation');
    const [progress, setProgress] = useState(0);
    const [progressMessage, setProgressMessage] = useState('');
    const [backupPath, setBackupPath] = useState<string>('');
    const [createBackup, setCreateBackup] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        // Get current app version on mount
        GetAppVersion?.().then(setCurrentVersion).catch(console.error);

        // Check for cached update info
        GetCachedUpdateInfo?.().then((info: UpdateInfo) => {
            if (info?.updateAvailable) {
                setUpdateInfo(info);
                setIsVisible(true);
            }
        }).catch(console.error);
    }, [GetAppVersion, GetCachedUpdateInfo]);

    const handleCheckForUpdates = async () => {
        setIsChecking(true);
        try {
            const info = await CheckForUpdates?.();
            if (info?.updateAvailable) {
                setUpdateInfo(info);
                setIsVisible(true);
                setStage('confirmation');
            } else {
                // Show "no updates available" message temporarily
                setCurrentVersion(info?.currentVersion || currentVersion);
                setTimeout(() => setIsVisible(false), 3000);
            }
        } catch (err) {
            console.error('Failed to check for updates:', err);
            setError('Failed to check for updates');
        } finally {
            setIsChecking(false);
        }
    };

    const handleStartUpdate = async () => {
        setStage('backing-up');
        setProgress(0);
        setError('');

        try {
            await PerformUpdate?.(
                updateInfo!.downloadUrl,
                createBackup,
                (message: string) => {
                    setProgressMessage(message);

                    // Update stage based on message
                    if (message.includes('Backup')) {
                        setStage('backing-up');
                        setProgress(25);
                    } else if (message.includes('Downloading')) {
                        setStage('downloading');
                        setProgress(50);
                    } else if (message.includes('%')) {
                        const match = message.match(/(\d+\.?\d*)%/);
                        if (match) {
                            const percent = parseFloat(match[1]);
                            if (stage === 'downloading') {
                                setProgress(50 + (percent / 2));
                            }
                        }
                    } else if (message.includes('Installing')) {
                        setStage('installing');
                        setProgress(75);
                    } else if (message.includes('complete')) {
                        setStage('complete');
                        setProgress(100);
                    }
                }
            );

            setStage('complete');
        } catch (err: any) {
            console.error('Update failed:', err);
            setError(err?.message || 'Update failed');
            setStage('error');
        }
    };

    const handleDismiss = () => {
        if (!updateInfo?.mandatory) {
            setIsVisible(false);
        }
        onDismiss?.();
    };

    const handleClose = () => {
        if (stage === 'complete') {
            setIsVisible(false);
        }
        handleDismiss();
    };

    if (!isVisible || !updateInfo) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden">
                {/* Header */}
                <div className={`px-6 py-4 ${
                    stage === 'error' ? 'bg-red-500' :
                    stage === 'complete' ? 'bg-emerald-500' :
                    updateInfo.mandatory ? 'bg-red-500' : 'bg-emerald-500'
                }`}>
                    <div className="flex items-center justify-between">
                        <h3 className="text-white font-semibold text-lg">
                            {stage === 'error' ? 'Update Failed' :
                             stage === 'complete' ? 'Update Complete' :
                             stage === 'confirmation' ? (updateInfo.mandatory ? 'Mandatory Update Required' : 'New Update Available') :
                             'Updating...'}
                        </h3>
                        {(stage === 'confirmation' || stage === 'complete') && !updateInfo.mandatory && (
                            <button
                                onClick={handleClose}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {stage === 'confirmation' && (
                        <>
                            <p className="text-gray-700 mb-4">
                                {updateInfo.mandatory
                                    ? `A mandatory update is available. Version ${updateInfo.latestVersion} includes important security and stability fixes.`
                                    : `A new version (${updateInfo.latestVersion}) is available! You're currently running ${currentVersion || updateInfo.currentVersion}.`
                                }
                            </p>

                            {/* Changelog */}
                            {updateInfo.changelog && updateInfo.changelog.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">What's New:</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        {updateInfo.changelog.map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-emerald-500 mr-2">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Release Date */}
                            {updateInfo.releaseDate && (
                                <p className="text-xs text-gray-500 mb-4">
                                    Released: {new Date(updateInfo.releaseDate).toLocaleDateString()}
                                </p>
                            )}

                            {/* Backup Option */}
                            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={createBackup}
                                        onChange={(e) => setCreateBackup(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-700">Create backup before updating</p>
                                        <p className="text-xs text-gray-500">Recommended - backs up your database and files</p>
                                    </div>
                                </label>
                            </div>

                            {/* Actions */}
                            <div className="flex space-x-3">
                                <button
                                    onClick={handleStartUpdate}
                                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                                        updateInfo.mandatory
                                            ? 'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]'
                                            : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98]'
                                    }`}
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    <span>Update Now</span>
                                </button>

                                {!updateInfo.mandatory && (
                                    <button
                                        onClick={handleDismiss}
                                        className="px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        Later
                                    </button>
                                )}
                            </div>
                        </>
                    )}

                    {(stage === 'backing-up' || stage === 'downloading' || stage === 'installing') && (
                        <div className="text-center">
                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                                <div
                                    className={`h-3 rounded-full transition-all duration-300 ${
                                        stage === 'error' ? 'bg-red-500' :
                                        stage === 'complete' ? 'bg-emerald-500' :
                                        'bg-blue-500'
                                    }`}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            {/* Stage Indicator */}
                            <div className="space-y-2 mb-4">
                                <div className={`flex items-center justify-center text-sm ${stage === 'backing-up' ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                                    <div className={`w-2 h-2 rounded-full mr-2 ${stage === 'complete' ? 'bg-emerald-500' : stage === 'backing-up' ? 'bg-blue-500' : 'bg-gray-300'}`} />
                                    Backing up data
                                </div>
                                <div className={`flex items-center justify-center text-sm ${stage === 'downloading' ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                                    <div className={`w-2 h-2 rounded-full mr-2 ${stage === 'downloading' ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`} />
                                    Downloading update
                                </div>
                                <div className={`flex items-center justify-center text-sm ${stage === 'installing' ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                                    <div className={`w-2 h-2 rounded-full mr-2 ${stage === 'installing' ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`} />
                                    Installing update
                                </div>
                            </div>

                            {/* Progress Message */}
                            <p className="text-sm text-gray-600">{progressMessage}</p>
                        </div>
                    )}

                    {stage === 'complete' && (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Update Complete!</h4>
                            <p className="text-gray-600 mb-4">
                                The application has been updated to version {updateInfo.latestVersion}.
                                {backupPath && " Your data was backed up before the update."}
                            </p>
                            <button
                                onClick={handleClose}
                                className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                            >
                                Continue
                            </button>
                        </div>
                    )}

                    {stage === 'error' && (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Update Failed</h4>
                            <p className="text-gray-600 mb-4">{error}</p>
                            <div className="flex space-x-3 justify-center">
                                <button
                                    onClick={handleStartUpdate}
                                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                                >
                                    Try Again
                                </button>
                                <button
                                    onClick={handleDismiss}
                                    className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Hook to show update notification anywhere in the app
export function useUpdateNotification() {
    const [showManualCheck, setShowManualCheck] = useState(false);

    const ManualCheckButton = () => {
        const { CheckForUpdates } = useWails();
        const [isChecking, setIsChecking] = useState(false);

        const handleCheck = async () => {
            setIsChecking(true);
            try {
                await CheckForUpdates?.();
                setShowManualCheck(true);
            } catch (error) {
                console.error('Failed to check for updates:', error);
            } finally {
                setIsChecking(false);
            }
        };

        return (
            <button
                onClick={handleCheck}
                disabled={isChecking}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
                {isChecking ? (
                    <>
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-emerald-600 rounded-full animate-spin" />
                        <span>Checking...</span>
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Check for Updates</span>
                    </>
                )}
            </button>
        );
    };

    return {
        UpdateNotification,
        ManualCheckButton,
        showManualCheck,
        setShowManualCheck,
    };
}
