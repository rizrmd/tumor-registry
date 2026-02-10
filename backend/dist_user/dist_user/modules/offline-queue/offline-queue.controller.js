"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfflineQueueController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const offline_queue_service_1 = require("./offline-queue.service");
const file_sync_service_1 = require("./file-sync.service");
const jwt_guard_1 = require("@/modules/auth/guards/jwt.guard");
const sync_offline_data_dto_1 = require("./dto/sync-offline-data.dto");
const resolve_conflict_dto_1 = require("./dto/resolve-conflict.dto");
let OfflineQueueController = class OfflineQueueController {
    constructor(offlineQueueService, fileSyncService) {
        this.offlineQueueService = offlineQueueService;
        this.fileSyncService = fileSyncService;
    }
    async syncOfflineData(syncDto, req) {
        const userId = req.user.userId;
        return await this.offlineQueueService.queueOfflineData(syncDto, userId);
    }
    async getPendingQueue(limit, req) {
        const userId = req.user.userId;
        return await this.offlineQueueService.getPendingQueue(userId, limit ? parseInt(limit) : 100);
    }
    async getStatistics(req) {
        const userId = req.user.userId;
        return await this.offlineQueueService.getQueueStatistics(userId);
    }
    async syncAll(req) {
        const userId = req.user.userId;
        return await this.offlineQueueService.syncAllPendingItems();
    }
    async retry(id, req) {
        const userId = req.user.userId;
        return await this.offlineQueueService.processQueueItem(id, userId);
    }
    async resolveConflict(id, resolveDto, req) {
        const userId = req.user.userId;
        return await this.offlineQueueService.resolveConflict(id, resolveDto, userId);
    }
    async getFileSyncStatus() {
        return this.fileSyncService.getFileSyncStats();
    }
    async syncFiles() {
        return await this.fileSyncService.processPendingFileSyncs();
    }
    async getPendingFiles(limit) {
        const jobs = this.fileSyncService.getPendingJobs(limit ? parseInt(limit) : 100);
        return { total: jobs.length, jobs };
    }
    async runFullSync(req) {
        const userId = req.user.userId;
        const result = await this.offlineQueueService.runFullSync();
        return result;
    }
    async getFullSyncStatus() {
        return await this.fileSyncService.getSyncStatus();
    }
};
exports.OfflineQueueController = OfflineQueueController;
__decorate([
    (0, common_1.Post)('sync'),
    (0, swagger_1.ApiOperation)({ summary: 'Queue offline data for synchronization' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Data queued and synced successfully' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Conflict detected' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sync_offline_data_dto_1.SyncOfflineDataDto, Object]),
    __metadata("design:returntype", Promise)
], OfflineQueueController.prototype, "syncOfflineData", null);
__decorate([
    (0, common_1.Get)('pending'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pending queue items for current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pending queue items retrieved successfully' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OfflineQueueController.prototype, "getPendingQueue", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get queue statistics for current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Queue statistics retrieved successfully' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfflineQueueController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Post)('sync-all'),
    (0, swagger_1.ApiOperation)({ summary: 'Sync all pending items' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bulk sync completed' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfflineQueueController.prototype, "syncAll", null);
__decorate([
    (0, common_1.Put)(':id/retry'),
    (0, swagger_1.ApiOperation)({ summary: 'Retry failed queue item' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Queue Item ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Queue item retried successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OfflineQueueController.prototype, "retry", null);
__decorate([
    (0, common_1.Put)(':id/resolve-conflict'),
    (0, swagger_1.ApiOperation)({ summary: 'Resolve data conflict' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Queue Item ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Conflict resolved successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, resolve_conflict_dto_1.ResolveConflictDto, Object]),
    __metadata("design:returntype", Promise)
], OfflineQueueController.prototype, "resolveConflict", null);
__decorate([
    (0, common_1.Get)('files/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Get file sync status and statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'File sync statistics retrieved' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OfflineQueueController.prototype, "getFileSyncStatus", null);
__decorate([
    (0, common_1.Post)('files/sync'),
    (0, swagger_1.ApiOperation)({ summary: 'Trigger file synchronization' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'File sync triggered' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OfflineQueueController.prototype, "syncFiles", null);
__decorate([
    (0, common_1.Get)('files/pending'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pending file sync jobs' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pending file sync jobs retrieved' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OfflineQueueController.prototype, "getPendingFiles", null);
__decorate([
    (0, common_1.Post)('full-sync'),
    (0, swagger_1.ApiOperation)({ summary: 'Run full sync including data and files' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Full sync completed' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfflineQueueController.prototype, "runFullSync", null);
__decorate([
    (0, common_1.Get)('full-sync-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Get detailed full sync status including progress' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Full sync status retrieved' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OfflineQueueController.prototype, "getFullSyncStatus", null);
exports.OfflineQueueController = OfflineQueueController = __decorate([
    (0, swagger_1.ApiTags)('Offline Queue'),
    (0, common_1.Controller)('offline-queue'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [offline_queue_service_1.OfflineQueueService,
        file_sync_service_1.FileSyncService])
], OfflineQueueController);
//# sourceMappingURL=offline-queue.controller.js.map
