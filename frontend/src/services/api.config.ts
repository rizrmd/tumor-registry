import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API Configuration
// Detect if running in Wails desktop environment
function isWailsEnvironment(): boolean {
  if (typeof window === 'undefined') return false;
  // Wails v2 specifically injects these objects
  return !!((window as any).go || (window as any).runtime);
}

// Determine API base URL
function getApiBaseUrl(): string {
  // Check if environment variable is explicitly set (for development)
  if (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim() !== '') {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // In Wails/desktop mode, use localhost
  if (isWailsEnvironment()) {
    console.log('[API] Running in Wails/desktop mode, using localhost API');
    return 'http://127.0.0.1:3001/api/v1';
  }

  // Default: use Next.js proxy rewrite (web mode)
  return '/api/v1';
}

const API_BASE_URL = getApiBaseUrl();

console.log('[API] Base URL:', API_BASE_URL);

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // Reduced timeout to 5 seconds for faster error handling
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const responseData: any = error.response.data;

      // Check for authentication errors
      const isUnauthorized =
        status === 401 ||
        (status === 400 &&
          responseData?.error?.details?.some((d: any) =>
            d.message === 'Unauthorized' || d.message?.includes('token')
          ));

      if (isUnauthorized) {
        // Unauthorized or token expired - clear storage and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');

        // Only redirect if not already on login page
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      } else if (status === 403) {
        // Forbidden
        console.error('Access forbidden');
      } else if (status === 404) {
        // Not found
        console.error('Resource not found');
      } else if (status >= 500) {
        // Server error
        console.error('Server error occurred');
      }
    } else if (error.request) {
      // Request made but no response
      console.error('Network error - no response from server');
    } else {
      // Error setting up request
      console.error('Error setting up request:', error.message);
    }

    return Promise.reject(error);
  }
);

// API Error type
export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

// Generic API response type
export interface ApiResponse<T> {
  data: T;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

// Pagination params
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export default apiClient;
