import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { OfflineQueueService } from './offline-queue.service';
import { FileSyncService } from './file-sync.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt.guard';
import { SyncOfflineDataDto } from './dto/sync-offline-data.dto';
import { ResolveConflictDto } from './dto/resolve-conflict.dto';

@ApiTags('Offline Queue')
@Controller('offline-queue')
@UseGuards(JwtAuthGuard)
export class OfflineQueueController {
  constructor(
    private readonly offlineQueueService: OfflineQueueService,
    private readonly fileSyncService: FileSyncService,
  ) { }

  @Post('sync')
  @ApiOperation({ summary: 'Queue offline data for synchronization' })
  @ApiResponse({ status: 201, description: 'Data queued and synced successfully' })
  @ApiResponse({ status: 409, description: 'Conflict detected' })
  @HttpCode(HttpStatus.CREATED)
  async syncOfflineData(@Body() syncDto: SyncOfflineDataDto, @Req() req: any) {
    const userId = req.user.userId;
    return await this.offlineQueueService.queueOfflineData(syncDto, userId);
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get pending queue items for current user' })
  @ApiResponse({ status: 200, description: 'Pending queue items retrieved successfully' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getPendingQueue(@Query('limit') limit?: string, @Req() req?: any) {
    const userId = req.user.userId;
    return await this.offlineQueueService.getPendingQueue(userId, limit ? parseInt(limit) : 100);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get queue statistics for current user' })
  @ApiResponse({ status: 200, description: 'Queue statistics retrieved successfully' })
  async getStatistics(@Req() req: any) {
    const userId = req.user.userId;
    return await this.offlineQueueService.getQueueStatistics(userId);
  }

  @Post('sync-all')
  @ApiOperation({ summary: 'Sync all pending items' })
  @ApiResponse({ status: 200, description: 'Bulk sync completed' })
  async syncAll(@Req() req: any) {
    const userId = req.user.userId;
    return await this.offlineQueueService.syncAllPendingItems();
  }

  @Put(':id/retry')
  @ApiOperation({ summary: 'Retry failed queue item' })
  @ApiParam({ name: 'id', description: 'Queue Item ID' })
  @ApiResponse({ status: 200, description: 'Queue item retried successfully' })
  async retry(@Param('id', ParseUUIDPipe) id: string, @Req() req: any) {
    const userId = req.user.userId;
    return await this.offlineQueueService.processQueueItem(id, userId);
  }

  @Put(':id/resolve-conflict')
  @ApiOperation({ summary: 'Resolve data conflict' })
  @ApiParam({ name: 'id', description: 'Queue Item ID' })
  @ApiResponse({ status: 200, description: 'Conflict resolved successfully' })
  async resolveConflict(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() resolveDto: ResolveConflictDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    return await this.offlineQueueService.resolveConflict(id, resolveDto, userId);
  }

  @Post('auto-resolve-conflicts')
  @ApiOperation({ summary: 'Auto-resolve all conflicts using smart merge' })
  @ApiResponse({ status: 200, description: 'Auto-resolution completed' })
  async autoResolveConflicts(@Req() req: any) {
    const userId = req.user.userId;
    return await this.offlineQueueService.autoResolveConflicts(userId);
  }

  // ==================== FILE SYNC ENDPOINTS ====================

  @Get('files/status')
  @ApiOperation({ summary: 'Get file sync status and statistics' })
  @ApiResponse({ status: 200, description: 'File sync statistics retrieved' })
  async getFileSyncStatus() {
    return this.fileSyncService.getFileSyncStats();
  }

  @Post('files/sync')
  @ApiOperation({ summary: 'Trigger file synchronization' })
  @ApiResponse({ status: 200, description: 'File sync triggered' })
  async syncFiles() {
    return await this.fileSyncService.processPendingFileSyncs();
  }

  @Get('files/pending')
  @ApiOperation({ summary: 'Get pending file sync jobs' })
  @ApiResponse({ status: 200, description: 'Pending file sync jobs retrieved' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getPendingFiles(@Query('limit') limit?: string) {
    const jobs = this.fileSyncService.getPendingJobs(limit ? parseInt(limit) : 100);
    return { total: jobs.length, jobs };
  }

  @Post('full-sync')
  @ApiOperation({ summary: 'Run full sync including data and files' })
  @ApiResponse({ status: 200, description: 'Full sync completed' })
  async runFullSync(@Req() req: any) {
    const userId = req.user.userId;
    const result = await this.offlineQueueService.runFullSync();
    return result;
  }

  @Get('full-sync-status')
  @ApiOperation({ summary: 'Get detailed full sync status including progress' })
  @ApiResponse({ status: 200, description: 'Full sync status retrieved' })
  async getFullSyncStatus() {
    return await this.fileSyncService.getSyncStatus();
  }
}
