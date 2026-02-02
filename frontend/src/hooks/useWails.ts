'use client';

import { useCallback, useEffect, useState } from 'react';

// Wails runtime is available in the desktop app
declare global {
  interface Window {
    // @ts-ignore - Wails bindings are added at runtime
    go?: {
      main?: {
        App?: {
          GetAppVersion: () => Promise<string>;
          CheckForUpdates: () => Promise<any>;
          GetCachedUpdateInfo: () => Promise<any>;
          CreateBackup: () => Promise<any>;
          ListBackups: () => Promise<any[]>;
          RestoreBackup: (backupPath: string) => Promise<void>;
          DeleteBackup: (backupPath: string) => Promise<void>;
          PerformUpdate: (downloadUrl: string, createBackup: boolean, progressCallback: (message: string) => void) => Promise<void>;
          ImportDataFromPath: (sourcePath: string, progressCallback: (message: string) => void) => Promise<void>;
          Login: (email: string, password: string) => Promise<any>;
          Logout: () => Promise<void>;
          GetAuthStatus: () => Promise<any>;
          Greet: (name: string) => Promise<string>;
          GetCentralServerUrl: () => Promise<string>;
        };
      };
    };
    // @ts-ignore - Also maintain window.wails for backward compatibility
    wails?: {
        GetAppVersion: () => Promise<string>;
        CheckForUpdates: () => Promise<UpdateInfo>;
        GetCachedUpdateInfo: () => Promise<UpdateInfo>;
        CreateBackup: () => Promise<BackupInfo>;
        ListBackups: () => Promise<BackupInfo[]>;
        RestoreBackup: (backupPath: string) => Promise<void>;
        DeleteBackup: (backupPath: string) => Promise<void>;
        PerformUpdate: (downloadUrl: string, createBackup: boolean, progressCallback: (message: string) => void) => Promise<void>;
        ImportDataFromPath: (sourcePath: string, progressCallback: (message: string) => void) => Promise<void>;
        Login: (email: string, password: string) => Promise<LoginResult>;
        Logout: () => Promise<void>;
        GetAuthStatus: () => Promise<AuthStatus>;
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
 * Get the Wails app bindings if available
 * Returns null if not running in Wails desktop environment
 */
function getWailsApp(): any {
    if (typeof window === 'undefined') return null;
    return (window as any).go?.main?.App || (window as any).wails || null;
}

/**
 * Hook to interact with Wails desktop app bindings
 * Returns null methods if not running in desktop environment
 */
export function useWails() {
    const [isWailsAvailable, setIsWailsAvailable] = useState(false);

    useEffect(() => {
        // Check if Wails is available (with polling for initial load)
        const checkWails = () => {
            const wails = getWailsApp();
            if (wails) {
                setIsWailsAvailable(true);
                return true;
            }
            return false;
        };

        if (checkWails()) return;

        // Poll for Wails availability
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds
        const interval = setInterval(() => {
            attempts++;
            if (checkWails() || attempts >= maxAttempts) {
                clearInterval(interval);
                if (attempts >= maxAttempts) {
                    console.log('[useWails] Running in web mode (Wails not detected)');
                }
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const GetAppVersion = useCallback(async (): Promise<string> => {
        const wails = getWailsApp();
        if (!wails) return 'web';
        try {
            return await wails.GetAppVersion();
        } catch (error) {
            console.error('Failed to get app version:', error);
            return 'web';
        }
    }, []);

    const CheckForUpdates = useCallback(async (): Promise<UpdateInfo | null> => {
        const wails = getWailsApp();
        if (!wails) return null;
        try {
            return await wails.CheckForUpdates();
        } catch (error) {
            console.error('Failed to check for updates:', error);
            return null;
        }
    }, []);

    const GetCachedUpdateInfo = useCallback(async (): Promise<UpdateInfo | null> => {
        const wails = getWailsApp();
        if (!wails) return null;
        try {
            return await wails.GetCachedUpdateInfo();
        } catch (error) {
            console.error('Failed to get cached update info:', error);
            return null;
        }
    }, []);

    const CreateBackup = useCallback(async (): Promise<BackupInfo | null> => {
        const wails = getWailsApp();
        if (!wails) return null;
        try {
            return await wails.CreateBackup();
        } catch (error) {
            console.error('Failed to create backup:', error);
            throw error;
        }
    }, []);

    const ListBackups = useCallback(async (): Promise<BackupInfo[] | null> => {
        const wails = getWailsApp();
        if (!wails) return null;
        try {
            return await wails.ListBackups();
        } catch (error) {
            console.error('Failed to list backups:', error);
            return null;
        }
    }, []);

    const RestoreBackup = useCallback(async (backupPath: string): Promise<void> => {
        const wails = getWailsApp();
        if (!wails) return;
        try {
            await wails.RestoreBackup(backupPath);
        } catch (error) {
            console.error('Failed to restore backup:', error);
            throw error;
        }
    }, []);

    const DeleteBackup = useCallback(async (backupPath: string): Promise<void> => {
        const wails = getWailsApp();
        if (!wails) return;
        try {
            await wails.DeleteBackup(backupPath);
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
        const wails = getWailsApp();
        if (!wails) return;
        try {
            await wails.PerformUpdate(downloadUrl, createBackup, progressCallback);
        } catch (error) {
            console.error('Failed to perform update:', error);
            throw error;
        }
    }, []);

    const ImportDataFromPath = useCallback(async (
        sourcePath: string,
        progressCallback: (message: string) => void
    ): Promise<void> => {
        const wails = getWailsApp();
        if (!wails) return;
        try {
            await wails.ImportDataFromPath(sourcePath, progressCallback);
        } catch (error) {
            console.error('Failed to import data:', error);
            throw error;
        }
    }, []);

    const Login = useCallback(async (email: string, password: string): Promise<LoginResult | null> => {
        const wails = getWailsApp();
        if (!wails) return null;
        try {
            return await wails.Login(email, password);
        } catch (error) {
            console.error('Login failed:', error);
            return null;
        }
    }, []);

    const Logout = useCallback(async (): Promise<void> => {
        const wails = getWailsApp();
        if (!wails) return;
        try {
            await wails.Logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }, []);

    const GetAuthStatus = useCallback(async (): Promise<AuthStatus | null> => {
        const wails = getWailsApp();
        if (!wails) return null;
        try {
            return await wails.GetAuthStatus();
        } catch (error) {
            console.error('Failed to get auth status:', error);
            return null;
        }
    }, []);

    const GetCentralServerUrl = useCallback(async (): Promise<string> => {
        const wails = getWailsApp();
        if (!wails) return '';
        try {
            return await wails.GetCentralServerUrl();
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
