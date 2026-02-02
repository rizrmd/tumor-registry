import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RemoteConfigService } from './remote-config.service';

/**
 * Extended PrismaClient type that we can create dynamically
 */
export type RemotePrismaClient = PrismaClient;

@Injectable()
export class RemotePrismaService implements OnModuleDestroy {
  private readonly logger = new Logger(RemotePrismaService.name);
  private prismaClient: RemotePrismaClient | null = null;

  constructor(private readonly remoteConfigService: RemoteConfigService) {
    // Set up proxy to forward all property access to the underlying client
    return new Proxy(this, {
      get: (target, prop) => {
        // First check if it's a property of the service itself
        if (prop in target || typeof prop === 'symbol') {
          return (target as any)[prop];
        }

        // Allow Promise-like and NestJS lifecycle checks to pass through without error
        // These are checked by NestJS/NestJS DI during initialization
        const specialProps = ['then', 'catch', 'finally', 'onModuleInit', 'onModuleDestroy', 'onApplicationBootstrap', 'onApplicationShutdown'];
        if (specialProps.includes(prop as string)) {
          return undefined;
        }

        // Otherwise, proxy to the PrismaClient
        const client = target.getClientOrNull();
        if (client) {
          const value = (client as any)[prop];
          if (typeof value === 'function') {
            return value.bind(client);
          }
          return value;
        }

        // Return a dummy function that throws if called when not initialized
        return (...args: any[]) => {
          throw new Error(
            `Remote Prisma client not initialized. ` +
            `Cannot access '${String(prop)}'. ` +
            `Call initialize() first or check isInitialized().`
          );
        };
      },
    }) as RemotePrismaService;
  }

  /**
   * Get client or null if not initialized
   */
  private getClientOrNull(): RemotePrismaClient | null {
    return this.prismaClient;
  }

  /**
   * Initialize the Prisma client with the remote database URL
   * This fetches the config from central server and creates the client
   */
  async initialize(): Promise<boolean> {
    try {
      // Fetch config from central server
      const config = await this.remoteConfigService.fetchRemoteDbConfig();
      
      if (!config?.enabled || !config.url) {
        this.logger.log('Remote database not configured or disabled');
        return false;
      }

      // Disconnect existing client if any
      if (this.prismaClient) {
        await this.prismaClient.$disconnect();
        this.prismaClient = null;
      }

      // Create new PrismaClient with the fetched URL
      this.prismaClient = new PrismaClient({
        datasources: {
          db: {
            url: config.url,
          },
        },
        log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
      });

      this.logger.log('Remote Prisma client initialized successfully');
      return true;
    } catch (error) {
      this.logger.error('Failed to initialize remote Prisma client', error);
      this.prismaClient = null;
      return false;
    }
  }

  /**
   * Get the Prisma client instance
   * Throws error if not initialized
   */
  getClient(): RemotePrismaClient {
    if (!this.prismaClient) {
      throw new Error('Remote Prisma client not initialized. Call initialize() first.');
    }
    return this.prismaClient;
  }

  /**
   * Check if client is initialized
   */
  isInitialized(): boolean {
    return this.prismaClient !== null;
  }

  /**
   * Check if connection to remote database is possible
   */
  async checkConnection(): Promise<boolean> {
    try {
      // If not initialized, try to initialize first
      if (!this.prismaClient) {
        const initialized = await this.initialize();
        if (!initialized) {
          return false;
        }
      }

      // Test connection
      await this.prismaClient!.$connect();
      await this.prismaClient!.$disconnect();
      return true;
    } catch (e) {
      this.logger.warn('Remote database connection check failed', e);
      return false;
    }
  }

  /**
   * Ensure client is connected
   */
  async connect(): Promise<void> {
    if (!this.prismaClient) {
      const initialized = await this.initialize();
      if (!initialized) {
        throw new Error('Failed to initialize remote database connection');
      }
    }
    await this.prismaClient!.$connect();
  }

  /**
   * Disconnect from remote database
   */
  async disconnect(): Promise<void> {
    if (this.prismaClient) {
      await this.prismaClient.$disconnect();
    }
  }

  async onModuleDestroy() {
    await this.disconnect();
    this.logger.log('Remote Database disconnected');
  }
}
