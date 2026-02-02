'use client';

import { useCallback, useEffect, useState } from 'react';

// Wails runtime is available in the desktop app
declare global {
  interface Window {
    // @ts-ignore - Wails bindings are added at runtime
    wails?: {
        // App methods
        GetAppVersion: () => Promise<string>;
        CheckForUpdates: () => Promise<UpdateInfo>;
        GetCachedUpdateInfo: () => Promise<UpdateInfo>;

        // Backup methods
        CreateBackup: () => Promise<BackupInfo>;
        ListBackups: () => Promise<BackupInfo[]>;
        RestoreBackup: (backupPath: string) => Promise<void>;
        DeleteBackup: (backupPath: string) => Promise<void>;

        // Update methods
        PerformUpdate: (downloadUrl: string, createBackup: boolean, progressCallback: (message: string) => void) => Promise<void>;

        // Data migration
        ImportDataFromPath: (sourcePath: string, progressCallback: (message: string) => void) => Promise<void>;

        // Auth methods
        Login: (email: string, password: string) => Promise<LoginResult>;
        Logout: () => Promise<void>;
        GetAuthStatus: () => Promise<AuthStatus>;

        // Other app methods
        Greet: (name: string) => Promise<string>;
        GetCentralServerUrl: () => Promise<string>;
    };
  }
}

export interface UpdateInfo {
    updateAvailable: boolean;
    currentVersion: string;
    latestVersion: string;
    mandatory: boolean;
    downloadUrl: string;
    releaseDate: string;
    changelog: string[];
    message?: string;
}

export interface BackupInfo {
    backupPath: string;
    timestamp: string;
    version: string;
    size: number;
}

export interface LoginResult {
    success: boolean;
    message: string;
    user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        centerId: string;
    };
}

export interface AuthStatus {
    isAuthenticated: boolean;
    centralServer: string;
}

/**
 * Hook to interact with Wails desktop app bindings
 * Returns null methods if not running in desktop environment
 */
export function useWails() {
    const [isWailsAvailable, setIsWailsAvailable] = useState(false);

    useEffect(() => {
        // Check if Wails is available
        setIsWailsAvailable(!!window.wails);
    }, []);

    const GetAppVersion = useCallback(async (): Promise<string> => {
        if (!window.wails) return 'web';
        return await window.wails.GetAppVersion();
    }, []);

    const CheckForUpdates = useCallback(async (): Promise<UpdateInfo | null> => {
        if (!window.wails) return null;
        try {
            return await window.wails.CheckForUpdates();
        } catch (error) {
            console.error('Failed to check for updates:', error);
            return null;
        }
    }, []);

    const GetCachedUpdateInfo = useCallback(async (): Promise<UpdateInfo | null> => {
        if (!window.wails) return null;
        try {
            return await window.wails.GetCachedUpdateInfo();
        } catch (error) {
            console.error('Failed to get cached update info:', error);
            return null;
        }
    }, []);

    const CreateBackup = useCallback(async (): Promise<BackupInfo | null> => {
        if (!window.wails) return null;
        try {
            return await window.wails.CreateBackup();
        } catch (error) {
            console.error('Failed to create backup:', error);
            throw error;
        }
    }, []);

    const ListBackups = useCallback(async (): Promise<BackupInfo[] | null> => {
        if (!window.wails) return null;
        try {
            return await window.wails.ListBackups();
        } catch (error) {
            console.error('Failed to list backups:', error);
            return null;
        }
    }, []);

    const RestoreBackup = useCallback(async (backupPath: string): Promise<void> => {
        if (!window.wails) return;
        try {
            await window.wails.RestoreBackup(backupPath);
        } catch (error) {
            console.error('Failed to restore backup:', error);
            throw error;
        }
    }, []);

    const DeleteBackup = useCallback(async (backupPath: string): Promise<void> => {
        if (!window.wails) return;
        try {
            await window.wails.DeleteBackup(backupPath);
        } catch (error) {
            console.error('Failed to delete backup:', error);
            throw error;
        }
    }, []);

    const PerformUpdate = useCallback(async (
        downloadUrl: string,
        createBackup: boolean,
        progressCallback: (message: string) => void
    ): Promise<void> => {
        if (!window.wails) return;
        try {
            await window.wails.PerformUpdate(downloadUrl, createBackup, progressCallback);
        } catch (error) {
            console.error('Failed to perform update:', error);
            throw error;
        }
    }, []);

    const ImportDataFromPath = useCallback(async (
        sourcePath: string,
        progressCallback: (message: string) => void
    ): Promise<void> => {
        if (!window.wails) return;
        try {
            await window.wails.ImportDataFromPath(sourcePath, progressCallback);
        } catch (error) {
            console.error('Failed to import data:', error);
            throw error;
        }
    }, []);

    const Login = useCallback(async (email: string, password: string): Promise<LoginResult | null> => {
        if (!window.wails) return null;
        try {
            return await window.wails.Login(email, password);
        } catch (error) {
            console.error('Login failed:', error);
            return null;
        }
    }, []);

    const Logout = useCallback(async (): Promise<void> => {
        if (!window.wails) return;
        try {
            await window.wails.Logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }, []);

    const GetAuthStatus = useCallback(async (): Promise<AuthStatus | null> => {
        if (!window.wails) return null;
        try {
            return await window.wails.GetAuthStatus();
        } catch (error) {
            console.error('Failed to get auth status:', error);
            return null;
        }
    }, []);

    const GetCentralServerUrl = useCallback(async (): Promise<string> => {
        if (!window.wails) return '';
        try {
            return await window.wails.GetCentralServerUrl();
        } catch (error) {
            console.error('Failed to get central server URL:', error);
            return '';
        }
    }, []);

    return {
        isWailsAvailable,
        GetAppVersion,
        CheckForUpdates,
        GetCachedUpdateInfo,
        CreateBackup,
        ListBackups,
        RestoreBackup,
        DeleteBackup,
        PerformUpdate,
        ImportDataFromPath,
        Login,
        Logout,
        GetAuthStatus,
        GetCentralServerUrl,
    };
}
