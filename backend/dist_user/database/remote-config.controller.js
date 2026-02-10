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
var RemoteConfigController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteConfigController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("@/auth/guards/jwt.guard");
const remote_config_service_1 = require("./remote-config.service");
let RemoteConfigController = RemoteConfigController_1 = class RemoteConfigController {
    constructor(remoteConfigService) {
        this.remoteConfigService = remoteConfigService;
        this.logger = new common_1.Logger(RemoteConfigController_1.name);
    }
    async updateToken(dto, req) {
        if (!req.user.centerId) {
            return {
                success: false,
                message: 'User has no center assigned',
                enabled: false,
            };
        }
        this.remoteConfigService.setJwtToken(dto.jwtToken);
        this.remoteConfigService.clearCache();
        this.logger.log(`Remote sync token updated for user: ${req.user.email}`);
        const config = await this.remoteConfigService.fetchRemoteDbConfig();
        if (config?.enabled) {
            this.logger.log('Remote sync configured successfully');
            return {
                success: true,
                message: 'Remote sync configured successfully',
                enabled: true,
                centerId: req.user.centerId,
            };
        }
        return {
            success: true,
            message: 'Token updated, but remote sync is not enabled for this center',
            enabled: false,
            centerId: req.user.centerId,
        };
    }
    async getStatus() {
        const isEnabled = this.remoteConfigService.isRemoteDbEnabled();
        const url = this.remoteConfigService.getRemoteDbUrl();
        return {
            enabled: isEnabled,
            hasUrl: !!url,
            urlMask: url ? url.replace(/:\/\/.*@/, '://***@') : null,
        };
    }
};
exports.RemoteConfigController = RemoteConfigController;
__decorate([
    (0, common_1.Post)('update-token'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update JWT token for remote sync (Desktop)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Token updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RemoteConfigController.prototype, "updateToken", null);
__decorate([
    (0, common_1.Post)('status'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get remote sync status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status retrieved' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RemoteConfigController.prototype, "getStatus", null);
exports.RemoteConfigController = RemoteConfigController = RemoteConfigController_1 = __decorate([
    (0, swagger_1.ApiTags)('Remote Sync'),
    (0, common_1.Controller)('remote-sync'),
    __metadata("design:paramtypes", [remote_config_service_1.RemoteConfigService])
], RemoteConfigController);
//# sourceMappingURL=remote-config.controller.js.map