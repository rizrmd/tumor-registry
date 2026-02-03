'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import authService, { User, LoginCredentials } from '@/services/auth.service';
import { useTokenRefresh } from '@/hooks/useTokenRefresh';
import { useWails } from '@/hooks/useWails';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, mfaCode?: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  checkPasswordVersion: () => Promise<boolean>;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  kolegiumId?: string;
  phone?: string;
  nik?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Storage keys
const TOKEN_KEY = 'token';
const USER_KEY = 'user';
const PASSWORD_VERSION_KEY = 'passwordVersion';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const syncCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { Login: wailsLogin, isWailsAvailable } = useWails();

  // Enable automatic token refresh for long-running sessions
  useTokenRefresh();

  // Logout function
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(PASSWORD_VERSION_KEY);
  }, []);

  // Check password version against server
  const checkPasswordVersion = useCallback(async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) return false;

      const storedVersion = localStorage.getItem(PASSWORD_VERSION_KEY);
      if (!storedVersion) return true; // No version stored, assume ok

      // Try to get current user profile from server
      const userData = await authService.getProfile();
      
      // Get the updatedAt timestamp from user data
      const currentVersion = userData.updatedAt ? new Date(userData.updatedAt).getTime() : null;
      const storedVersionNum = parseInt(storedVersion, 10);

      // If server version is different from stored version, password changed
      if (currentVersion && currentVersion !== storedVersionNum) {
        console.warn('[Auth] Password version mismatch - password changed on server');
        logout();
        return false;
      }

      return true;
    } catch (error: any) {
      // If offline (network error), allow access
      if (error.message?.includes('Network Error') || error.message?.includes('timeout')) {
        console.log('[Auth] Offline mode - skipping password version check');
        return true;
      }
      
      // If unauthorized (401), password definitely changed
      if (error.response?.status === 401) {
        console.warn('[Auth] Token invalid - password may have changed');
        logout();
        return false;
      }

      console.error('[Auth] Error checking password version:', error);
      return true; // Allow on error to prevent lockout
    }
  }, [logout]);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
          try {
            // Try to verify token and get user data using authService
            const userData = await authService.getProfile();
            setUser(userData);
            setIsAuthenticated(true);
            
            // Store password version (updatedAt timestamp)
            if (userData.updatedAt) {
              localStorage.setItem(PASSWORD_VERSION_KEY, new Date(userData.updatedAt).getTime().toString());
            }
          } catch (apiError: any) {
            // Check if it's a password change error
            if (apiError.response?.status === 401 && 
                apiError.response?.data?.message?.includes('Password changed')) {
              console.warn('[Auth] Password changed on server - forcing logout');
              logout();
              return;
            }
            
            // API call failed, fall back to localStorage user (for demo/offline mode)
            console.warn('[Auth] API not available, using cached user:', apiError);
            const cachedUser = localStorage.getItem(USER_KEY);
            if (cachedUser) {
              try {
                const parsedUser = JSON.parse(cachedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
              } catch (parseError) {
                // Invalid cached data, clear everything
                logout();
              }
            } else {
              // No cached user, remove token
              logout();
            }
          }
        } else {
          // No token, user is not authenticated
          setIsLoading(false);
        }
      } catch (error) {
        console.error('[Auth] Auth check failed:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [logout]);

  // Periodic password version check when online
  useEffect(() => {
    if (!isAuthenticated) return;

    // Check password version every 2 minutes when online
    const checkInterval = setInterval(() => {
      if (navigator.onLine) {
        checkPasswordVersion();
      }
    }, 2 * 60 * 1000); // 2 minutes

    syncCheckIntervalRef.current = checkInterval;

    // Also check when coming back online
    const handleOnline = () => {
      console.log('[Auth] Connection restored - checking password version');
      checkPasswordVersion();
    };

    window.addEventListener('online', handleOnline);

    return () => {
      clearInterval(checkInterval);
      window.removeEventListener('online', handleOnline);
      syncCheckIntervalRef.current = null;
    };
  }, [isAuthenticated, checkPasswordVersion]);

  const login = async (email: string, password: string, mfaCode?: string) => {
    setIsLoading(true);
    try {
      // Use Wails Login method if available (desktop app), otherwise use REST API
      if (isWailsAvailable && wailsLogin) {
        console.log('[Auth] Using Wails login method (desktop mode)');
        const loginResult = await wailsLogin(email, password);

        if (!loginResult || !loginResult.success) {
          throw new Error(loginResult?.message || 'Login failed');
        }

        // Convert Wails user format to app User format
        const wailsUser: User = {
          id: loginResult.user!.id,
          email: loginResult.user!.email,
          name: loginResult.user!.name,
          role: loginResult.user!.role,
          centerId: loginResult.user!.centerId,
          centerName: undefined, // Wails doesn't provide this
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setUser(wailsUser);
        setIsAuthenticated(true);

        // Store user data in localStorage for persistence
        localStorage.setItem(USER_KEY, JSON.stringify(wailsUser));
        localStorage.setItem(TOKEN_KEY, 'wails-token'); // Dummy token for Wails
        localStorage.setItem(PASSWORD_VERSION_KEY, new Date().getTime().toString());
      } else {
        console.log('[Auth] Using REST API login method (web mode)');
        // Use authService to login (web mode)
        const loginData = await authService.login({ email, password });

        // Set user from login response
        setUser(loginData.user as User);
        setIsAuthenticated(true);

        // Store password version (updatedAt timestamp)
        const userData = await authService.getProfile();
        if (userData.updatedAt) {
          localStorage.setItem(PASSWORD_VERSION_KEY, new Date(userData.updatedAt).getTime().toString());
        }
      }
    } catch (error) {
      console.error('[Auth] Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      // Use authService to register (when implemented)
      // For now, this is a placeholder
      console.log('[Auth] Registration successful:', userData);
      // TODO: Implement register endpoint in authService
    } catch (error) {
      console.error('[Auth] Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      // Token refresh will be handled by API interceptor in authService
      // This is mainly for manual refresh if needed
      const userData = await authService.getProfile();
      setUser(userData);
      setIsAuthenticated(true);
      
      // Update password version
      if (userData.updatedAt) {
        localStorage.setItem(PASSWORD_VERSION_KEY, new Date(userData.updatedAt).getTime().toString());
      }
    } catch (error: any) {
      console.error('[Auth] Token refresh error:', error);
      
      // If password changed, error will be 401 with specific message
      if (error.response?.status === 401 && 
          error.response?.data?.message?.includes('Password changed')) {
        console.warn('[Auth] Password changed - forcing logout');
      }
      
      logout();
      throw error;
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      // TODO: Implement email verification endpoint in authService
      console.log('[Auth] Email verification:', token);
      // Return void as per interface
    } catch (error) {
      console.error('[Auth] Email verification error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshToken,
    verifyEmail,
    checkPasswordVersion,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
