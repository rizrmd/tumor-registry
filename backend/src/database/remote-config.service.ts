import { Injectable, Logger, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface RemoteDbConfig {
  enabled: boolean;
  url?: string;
  apiKey?: string;
  message?: string;
}

@Injectable()
export class RemoteConfigService {
  private readonly logger = new Logger(RemoteConfigService.name);
  private cachedConfig: RemoteDbConfig | null = null;
  private lastFetchTime: number = 0;
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  private jwtToken: string | null = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    // Try to load token from environment on startup
    this.jwtToken = this.configService.get<string>('remoteSync.jwtToken') || null;
  }

  /**
   * Set the JWT token for authenticating with central server
   * This is called by the desktop app after user login
   */
  setJwtToken(token: string): void {
    this.jwtToken = token;
    this.logger.log('JWT token updated for remote sync');
  }

  /**
   * Fetch remote database configuration from the central server
   * Requires CENTRAL_SERVER_URL and USER_JWT_TOKEN to be configured
   */
  async fetchRemoteDbConfig(): Promise<RemoteDbConfig | null> {
    try {
      // Check for direct URL first (backward compatibility)
      const directUrl = this.configService.get<string>('remoteSync.directUrl');
      if (directUrl) {
        this.logger.debug('Using direct REMOTE_DATABASE_URL from environment');
        return {
          enabled: true,
          url: directUrl,
        };
      }

      const centralServerUrl = this.configService.get<string>('remoteSync.centralServerUrl');
      const envToken = this.configService.get<string>('remoteSync.jwtToken');

      // Use token from memory (set by desktop app) or from environment
      const jwtToken = this.jwtToken || envToken;

      // Default central server is https://inamsos.com (set in configuration.ts)
      if (!jwtToken) {
        this.logger.debug('JWT token not available, remote sync disabled');
        return null;
      }

      // Check cache
      if (this.cachedConfig && Date.now() - this.lastFetchTime < this.CACHE_TTL) {
        this.logger.debug('Returning cached remote DB config');
        return this.cachedConfig;
      }

      const url = `${centralServerUrl}/api/v1/centers/my/remote-db-config`;

      this.logger.log(`Fetching remote DB config from central server`);

      const response = await firstValueFrom(
        this.httpService.get<RemoteDbConfig>(url, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          timeout: 10000, // 10 second timeout
        }),
      );

      this.cachedConfig = response.data;
      this.lastFetchTime = Date.now();

      if (this.cachedConfig.enabled) {
        this.logger.log('Remote DB config fetched successfully from central server');
      } else {
        this.logger.log('Remote DB not enabled for this center');
      }

      return this.cachedConfig;
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error(`HTTP error fetching remote DB config: ${error.message}`);
      } else if (error.response) {
        // Axios error
        this.logger.error(
          `Failed to fetch remote DB config: ${error.response.status} - ${JSON.stringify(error.response.data)}`
        );
      } else {
        this.logger.error('Failed to fetch remote DB config', error.message || error);
      }
      return null;
    }
  }

  /**
   * Get the cached remote database URL
   */
  getRemoteDbUrl(): string | null {
    return this.cachedConfig?.enabled ? this.cachedConfig.url || null : null;
  }

  /**
   * Get the cached remote database API key
   */
  getRemoteDbApiKey(): string | null {
    return this.cachedConfig?.enabled ? this.cachedConfig.apiKey || null : null;
  }

  /**
   * Check if remote database is enabled
   */
  isRemoteDbEnabled(): boolean {
    return this.cachedConfig?.enabled === true && !!this.cachedConfig.url;
  }

  /**
   * Clear the cached configuration (force refetch)
   */
  clearCache(): void {
    this.cachedConfig = null;
    this.lastFetchTime = 0;
    this.logger.log('Remote DB config cache cleared');
  }

  /**
   * Refresh the configuration from the server
   */
  async refreshConfig(): Promise<RemoteDbConfig | null> {
    this.clearCache();
    return this.fetchRemoteDbConfig();
  }

  /**
   * Get the central server URL
   */
  getCentralServerUrl(): string {
    return this.configService.get<string>('remoteSync.centralServerUrl') || 'https://inamsos.com';
  }
}
