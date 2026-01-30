import { Module } from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { PrismaService } from '../../common/database/prisma.service';

@Module({
    providers: [MedicalRecordService, PrismaService],
    exports: [MedicalRecordService],
})
export class MedicalRecordModule { }
