import { Module } from '@nestjs/common';
import { OfflineQueueController } from './offline-queue.controller';
import { OfflineQueueService } from './offline-queue.service';
import { FileSyncService } from './file-sync.service';
import { PrismaService } from '@/database/prisma.service';
import { RemotePrismaService } from '@/database/remote-prisma.service';
import { MedicalRecordService } from '@/modules/medical-record/medical-record.service';

@Module({
  controllers: [OfflineQueueController],
  providers: [
    OfflineQueueService,
    FileSyncService,
    MedicalRecordService,
    PrismaService,
    RemotePrismaService,
  ],
  exports: [OfflineQueueService, FileSyncService],
})
export class OfflineQueueModule { }
