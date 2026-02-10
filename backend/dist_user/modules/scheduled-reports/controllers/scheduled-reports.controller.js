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
exports.ScheduledReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("@/auth/guards/jwt-auth.guard");
const roles_guard_1 = require("@/auth/guards/roles.guard");
const roles_decorator_1 = require("@/auth/decorators/roles.decorator");
const scheduled_reports_service_1 = require("../services/scheduled-reports.service");
const create_scheduled_report_dto_1 = require("../dto/create-scheduled-report.dto");
const update_scheduled_report_dto_1 = require("../dto/update-scheduled-report.dto");
let ScheduledReportsController = class ScheduledReportsController {
    constructor(scheduledReportsService) {
        this.scheduledReportsService = scheduledReportsService;
    }
    async create(createDto, req) {
        createDto.createdBy = req.user.id;
        return this.scheduledReportsService.create(createDto);
    }
    async findAll(templateId, isActive, deliveryMethod) {
        const filters = {
            templateId,
            isActive: isActive !== undefined ? isActive === 'true' : undefined,
            deliveryMethod,
        };
        return this.scheduledReportsService.findAll(filters);
    }
    async findOne(id) {
        return this.scheduledReportsService.findOne(id);
    }
    async update(id, updateDto) {
        return this.scheduledReportsService.update(id, updateDto);
    }
    async toggleActive(id) {
        return this.scheduledReportsService.toggleActive(id);
    }
    async remove(id) {
        return this.scheduledReportsService.remove(id);
    }
    async executeNow(id, parameters) {
        return this.scheduledReportsService.executeScheduledReport({
            scheduledReportId: id,
            executionTime: new Date(),
            parameters,
        });
    }
};
exports.ScheduledReportsController = ScheduledReportsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('SYSTEM_ADMIN', 'CENTER_DIRECTOR', 'DATA_ANALYST'),
    (0, swagger_1.ApiOperation)({ summary: 'Create scheduled report' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Scheduled report created successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_scheduled_report_dto_1.CreateScheduledReportDto, Object]),
    __metadata("design:returntype", Promise)
], ScheduledReportsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('SYSTEM_ADMIN', 'CENTER_DIRECTOR', 'DATA_ANALYST', 'RESEARCHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all scheduled reports' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Scheduled reports retrieved successfully' }),
    __param(0, (0, common_1.Query)('templateId')),
    __param(1, (0, common_1.Query)('isActive')),
    __param(2, (0, common_1.Query)('deliveryMethod')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ScheduledReportsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('SYSTEM_ADMIN', 'CENTER_DIRECTOR', 'DATA_ANALYST', 'RESEARCHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Get scheduled report by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Scheduled report retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduledReportsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('SYSTEM_ADMIN', 'CENTER_DIRECTOR', 'DATA_ANALYST'),
    (0, swagger_1.ApiOperation)({ summary: 'Update scheduled report' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Scheduled report updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_scheduled_report_dto_1.UpdateScheduledReportDto]),
    __metadata("design:returntype", Promise)
], ScheduledReportsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/toggle'),
    (0, roles_decorator_1.Roles)('SYSTEM_ADMIN', 'CENTER_DIRECTOR', 'DATA_ANALYST'),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle scheduled report active status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Scheduled report status toggled successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduledReportsController.prototype, "toggleActive", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('SYSTEM_ADMIN', 'CENTER_DIRECTOR'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete scheduled report' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Scheduled report deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduledReportsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/execute'),
    (0, roles_decorator_1.Roles)('SYSTEM_ADMIN', 'CENTER_DIRECTOR', 'DATA_ANALYST'),
    (0, swagger_1.ApiOperation)({ summary: 'Manually execute scheduled report' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Report execution started' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ScheduledReportsController.prototype, "executeNow", null);
exports.ScheduledReportsController = ScheduledReportsController = __decorate([
    (0, swagger_1.ApiTags)('scheduled-reports'),
    (0, common_1.Controller)('scheduled-reports'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [scheduled_reports_service_1.ScheduledReportsService])
], ScheduledReportsController);
//# sourceMappingURL=scheduled-reports.controller.js.map