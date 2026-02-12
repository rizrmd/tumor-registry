import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      datasources: {
        db: {
          url: "postgresql://postgres@127.0.0.1:54321/postgres?schema=system",
        },
      },
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }

  async onModuleInit() {
    let retries = 10;
    while (retries > 0) {
      try {
        await this.$connect();
        this.logger.log('Database connected successfully');
        return;
      } catch (error) {
        retries--;
        this.logger.warn(`Database connection attempt failed. Retrying... (${retries} attempts left)`);
        if (retries === 0) {
          this.logger.error('Database connection failed after all attempts', error);
          throw error;
        }
        // Wait 3 seconds before next retry
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Database disconnected');
  }

  // Helper method for raw SQL queries
  get client() {
    return this;
  }
}
