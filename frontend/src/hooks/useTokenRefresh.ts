'use client';

import { useEffect, useRef } from 'react';
import authService from '@/services/auth.service';

/**
 * Hook to automatically refresh authentication token before expiration
 * This ensures users stay logged in during long sessions without interruption
 */
export function useTokenRefresh() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Function to check and refresh token if needed
    const checkAndRefreshToken = async () => {
      const token = authService.getToken();

      if (!token) {
        return; // No token, user is not logged in
      }

      // Check if token is expiring soon (within 5 minutes)
      if (authService.isTokenExpiringSoon(token)) {
        console.log('[Token Refresh] Token expiring soon, refreshing...');

        try {
          const result = await authService.refreshAccessToken();

          if (result) {
            console.log('[Token Refresh] Token refreshed successfully');
          } else {
            console.log('[Token Refresh] Failed to refresh token, user will be logged out');
          }
        } catch (error) {
          console.error('[Token Refresh] Error refreshing token:', error);
        }
      }
    };

    // Run check immediately on mount
    checkAndRefreshToken();

    // Set up interval to check every 1 minute (60000ms)
    intervalRef.current = setInterval(() => {
      checkAndRefreshToken();
    }, 60000); // Check every 1 minute

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Also check on user activity (mouse movement, keyboard events)
  useEffect(() => {
    const handleUserActivity = async () => {
      const token = authService.getToken();

      if (!token) return;

      // Only refresh if token is expiring soon
      if (authService.isTokenExpiringSoon(token)) {
        console.log('[Token Refresh] User activity detected, refreshing expiring token...');
        await authService.refreshAccessToken();
      }
    };

    // Debounce function to avoid too frequent refreshes
    let timeout: NodeJS.Timeout;
    const debouncedActivity = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleUserActivity, 2000); // Wait 2 seconds after last activity
    };

    // Listen to user activity events
    window.addEventListener('mousemove', debouncedActivity);
    window.addEventListener('keydown', debouncedActivity);
    window.addEventListener('click', debouncedActivity);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', debouncedActivity);
      window.removeEventListener('keydown', debouncedActivity);
      window.removeEventListener('click', debouncedActivity);
    };
  }, []);
}
