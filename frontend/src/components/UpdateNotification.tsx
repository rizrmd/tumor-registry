'use client';

import React, { useState, useEffect } from 'react';
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

interface UpdateNotificationProps {
    onDownloadUpdate?: (url: string) => void;
    onDismiss?: () => void;
}

export function UpdateNotification({ onDownloadUpdate, onDismiss }: UpdateNotificationProps) {
    const { CheckForUpdates, GetCachedUpdateInfo, GetAppVersion } = useWails();
    const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
    const [currentVersion, setCurrentVersion] = useState<string>('');
    const [isVisible, setIsVisible] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

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
            } else {
                // Show "no updates available" message temporarily
                setCurrentVersion(info?.currentVersion || currentVersion);
                setTimeout(() => setIsVisible(false), 3000);
            }
        } catch (error) {
            console.error('Failed to check for updates:', error);
        } finally {
            setIsChecking(false);
        }
    };

    const handleDownload = () => {
        if (updateInfo?.downloadUrl) {
            // Open download URL in default browser
            window.open(updateInfo.downloadUrl, '_blank');
            onDownloadUpdate?.(updateInfo.downloadUrl);
        }
    };

    const handleDismiss = () => {
        if (!updateInfo?.mandatory) {
            setIsVisible(false);
        }
        onDismiss?.();
    };

    if (!isVisible || !updateInfo) {
        // Show a small "Check for Updates" button in settings
        return null;
    }

    return (
        <div className="fixed top-4 right-4 z-50 max-w-md">
            <div className="bg-white rounded-xl shadow-2xl border-2 border-emerald-500 overflow-hidden">
                {/* Header */}
                <div className={`px-4 py-3 ${updateInfo.mandatory ? 'bg-red-500' : 'bg-emerald-500'}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {updateInfo.mandatory ? (
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            )}
                            <h3 className="text-white font-semibold">
                                {updateInfo.mandatory ? 'Mandatory Update Required' : 'New Update Available'}
                            </h3>
                        </div>
                        {!updateInfo.mandatory && (
                            <button
                                onClick={handleDismiss}
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
                <div className="p-4">
                    <p className="text-gray-700 mb-3">
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

                    {/* Actions */}
                    <div className="flex space-x-3">
                        <button
                            onClick={handleDownload}
                            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                                updateInfo.mandatory
                                    ? 'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98]'
                            }`}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span>{updateInfo.mandatory ? 'Update Now' : 'Download Update'}</span>
                        </button>

                        {!updateInfo.mandatory && (
                            <button
                                onClick={handleDismiss}
                                className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                Later
                            </button>
                        )}
                    </div>
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
