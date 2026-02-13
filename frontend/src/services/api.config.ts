import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API Configuration
// Detect if running in Wails desktop environment
function isWailsEnvironment(): boolean {
  if (typeof window === 'undefined') return false;

  const protocol = window.location.protocol;
  const hostname = window.location.hostname;

  // Wails v2 specific indicators
  const isWailsProtocol = protocol === 'wails:' || protocol === 'app:';
  const hasWailsObjects = !!((window as any).go || (window as any).runtime || (window as any).wails);
  const isLocalFile = protocol === 'file:';

  // Local development or custom local hostnames
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('wails.localhost');

  // If we are not on a standard http/https public domain, it's likely the desktop app
  const isNotStandardWeb = protocol !== 'http:' && protocol !== 'https:';

  return isWailsProtocol || hasWailsObjects || isLocalFile || isLocal || isNotStandardWeb;
}

// Determine API base URL
function getApiBaseUrl(): string {
  // Check if environment variable is explicitly set (for development)
  if (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim() !== '') {
    const url = process.env.NEXT_PUBLIC_API_URL;
    return url.endsWith('/') ? url : `${url}/`;
  }

  // In Wails/desktop mode, ALWAYS use absolute localhost URL
  if (isWailsEnvironment()) {
    console.log('[API] Desktop environment detected, using absolute localhost API');
    return 'http://127.0.0.1:3001/api/v1/';
  }

  // Default: use relative path for web deployments
  return '/api/v1/';
}

const API_BASE_URL = getApiBaseUrl();

console.log('[API] Base URL:', API_BASE_URL);

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Increased timeout to 30 seconds for better reliability
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token and fix slash issues
apiClient.interceptors.request.use(
  (config) => {
    // Fix: Remove leading slash if using absolute baseURL
    // This prevents Axios from replacing the baseURL subpath (like /api/v1/)
    if (config.url?.startsWith('/') && config.baseURL) {
      config.url = config.url.substring(1);
    }

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
