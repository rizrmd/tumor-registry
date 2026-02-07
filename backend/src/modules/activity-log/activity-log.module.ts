import { Module, Global } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { ActivityLogController } from './activity-log.controller';
import { PrismaService } from '../../database/prisma.service';

@Global()
@Module({
    controllers: [ActivityLogController],
    providers: [ActivityLogService, PrismaService],
    exports: [ActivityLogService],
})
export class ActivityLogModule { }
