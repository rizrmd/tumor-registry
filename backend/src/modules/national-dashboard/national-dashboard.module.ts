import { Module } from '@nestjs/common';
import { NationalDashboardController } from './national-dashboard.controller';
import { NationalDashboardService } from './national-dashboard.service';
import { PrismaService } from '../../database/prisma.service';

@Module({
    controllers: [NationalDashboardController],
    providers: [NationalDashboardService, PrismaService],
})
export class NationalDashboardModule { }
