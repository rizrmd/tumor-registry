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
        Login,
        Logout,
        GetAuthStatus,
        GetCentralServerUrl,
    };
}
