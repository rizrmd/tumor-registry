import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RemotePrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RemotePrismaService.name);

  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get('REMOTE_DATABASE_URL'),
        },
      },
      log: ['error'],
    });
  }

  async onModuleInit() {
    // We don't connect immediately on init to avoid blocking if offline
    // Connection will be established when needed
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Remote Database disconnected');
  }

  async checkConnection(): Promise<boolean> {
    try {
      await this.$connect();
      return true;
    } catch (e) {
      return false;
    }
  }
}
