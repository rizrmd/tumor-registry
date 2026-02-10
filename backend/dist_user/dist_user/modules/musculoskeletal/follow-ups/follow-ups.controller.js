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
exports.FollowUpsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const follow_ups_service_1 = require("./follow-ups.service");
const follow_up_visit_dto_1 = require("./dto/follow-up-visit.dto");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
let FollowUpsController = class FollowUpsController {
    constructor(service) {
        this.service = service;
    }
    async generateSchedule(dto) {
        return this.service.generateSchedule(dto);
    }
    async create(createDto) {
        return this.service.create(createDto);
    }
    async findAll(patientId, status) {
        return this.service.findAll(patientId, status);
    }
    async findByPatient(patientId) {
        return this.service.findByPatient(patientId);
    }
    async getPatientSummary(patientId) {
        return this.service.getPatientFollowUpSummary(patientId);
    }
    async findOne(id) {
        return this.service.findOne(id);
    }
    async update(id, updateDto) {
        return this.service.update(id, updateDto);
    }
    async remove(id) {
        return this.service.remove(id);
    }
};
exports.FollowUpsController = FollowUpsController;
__decorate([
    (0, common_1.Post)('generate-schedule'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate 14-visit follow-up schedule for a patient' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Schedule generated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Schedule already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [follow_up_visit_dto_1.GenerateFollowUpScheduleDto]),
    __metadata("design:returntype", Promise)
], FollowUpsController.prototype, "generateSchedule", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create individual follow-up visit' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Follow-up visit created', type: follow_up_visit_dto_1.FollowUpVisitDto }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Visit number already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [follow_up_visit_dto_1.CreateFollowUpVisitDto]),
    __metadata("design:returntype", Promise)
], FollowUpsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all follow-up visits' }),
    (0, swagger_1.ApiQuery)({ name: 'patientId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [follow_up_visit_dto_1.FollowUpVisitDto] }),
    __param(0, (0, common_1.Query)('patientId')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FollowUpsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all follow-up visits for a patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [follow_up_visit_dto_1.FollowUpVisitDto] }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FollowUpsController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.Get)('patient/:patientId/summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get follow-up summary for a patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns follow-up statistics and upcoming visits' }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FollowUpsController.prototype, "getPatientSummary", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get follow-up visit by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: follow_up_visit_dto_1.FollowUpVisitDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Visit not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FollowUpsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update follow-up visit' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: follow_up_visit_dto_1.FollowUpVisitDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Visit not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, follow_up_visit_dto_1.UpdateFollowUpVisitDto]),
    __metadata("design:returntype", Promise)
], FollowUpsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete follow-up visit' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Visit not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FollowUpsController.prototype, "remove", null);
exports.FollowUpsController = FollowUpsController = __decorate([
    (0, swagger_1.ApiTags)('Follow-up Visits'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('follow-ups'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [follow_ups_service_1.FollowUpsService])
], FollowUpsController);
//# sourceMappingURL=follow-ups.controller.js.map
