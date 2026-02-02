import { Module } from '@nestjs/common';
import { OfflineQueueController } from './offline-queue.controller';
import { OfflineQueueService } from './offline-queue.service';
import { FileSyncService } from './file-sync.service';
import { PrismaService } from '@/common/database/prisma.service';
import { RemotePrismaService } from '@/database/remote-prisma.service';

@Module({
  controllers: [OfflineQueueController],
  providers: [
    OfflineQueueService,
    FileSyncService,
    PrismaService,
    RemotePrismaService,
  ],
  exports: [OfflineQueueService, FileSyncService],
})
export class OfflineQueueModule { }
