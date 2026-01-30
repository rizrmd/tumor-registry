import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../auth/guards/permissions.guard';
import { Permissions } from '../../auth/decorators/permissions.decorator';

@Controller('activity-logs')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ActivityLogController {
    constructor(private readonly activityLogService: ActivityLogService) { }

    @Get()
    @Permissions('ACTIVITY_LOG_VIEW')
    async findAll(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('centerId') centerId?: string,
        @Query('actorId') actorId?: string,
    ) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const take = limit ? parseInt(limit, 10) : 50;
        const skip = (pageNum - 1) * take;

        return this.activityLogService.findAll({
            skip,
            take,
            centerId,
            actorId,
        });
    }
}
