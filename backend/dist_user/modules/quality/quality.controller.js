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
var QualityController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QualityController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const quality_service_1 = require("./quality.service");
let QualityController = QualityController_1 = class QualityController {
    constructor(qualityService) {
        this.qualityService = qualityService;
        this.logger = new common_1.Logger(QualityController_1.name);
    }
    async getPatientQualityScore(patientId) {
        this.logger.log(`Calculating quality score for patient ${patientId}`);
        return this.qualityService.calculateQualityScore(patientId);
    }
    async getPatientQualityTrends(patientId, days) {
        const daysNumber = days ? parseInt(days, 10) : 30;
        this.logger.log(`Getting quality trends for patient ${patientId} for last ${daysNumber} days`);
        return this.qualityService.getQualityTrends(patientId, daysNumber);
    }
    async validatePatientData(patientId) {
        this.logger.log(`Validating data for patient ${patientId}`);
        return this.qualityService.validatePatientData(patientId);
    }
    async getCenterQualitySummary(centerId) {
        this.logger.log(`Getting quality summary for center ${centerId}`);
        return this.qualityService.getCenterQualitySummary(centerId);
    }
    async getNationalQualityOverview() {
        this.logger.log('Getting national quality overview');
        return this.qualityService.getNationalQualityOverview();
    }
    async getStaffPerformanceLeaderboard(centerId) {
        this.logger.log(`Getting staff performance leaderboard${centerId ? ` for center ${centerId}` : ' (all centers)'}`);
        return this.qualityService.getStaffPerformanceLeaderboard(centerId);
    }
    async getMissingDataHeatmap(centerId) {
        this.logger.log(`Getting missing data heatmap${centerId ? ` for center ${centerId}` : ' (all centers)'}`);
        return this.qualityService.getMissingDataHeatmap(centerId);
    }
};
exports.QualityController = QualityController;
__decorate([
    (0, common_1.Get)('patient/:patientId/score'),
    (0, swagger_1.ApiOperation)({ summary: 'Calculate quality score for a patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Quality score calculated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Patient not found' }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QualityController.prototype, "getPatientQualityScore", null);
__decorate([
    (0, common_1.Get)('patient/:patientId/trends'),
    (0, swagger_1.ApiOperation)({ summary: 'Get quality trends for a patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Quality trends retrieved successfully' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], QualityController.prototype, "getPatientQualityTrends", null);
__decorate([
    (0, common_1.Get)('patient/:patientId/validate'),
    (0, swagger_1.ApiOperation)({ summary: 'Validate patient data quality' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Patient data validated successfully' }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QualityController.prototype, "validatePatientData", null);
__decorate([
    (0, common_1.Get)('center/:centerId/summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get quality summary for a center' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Center quality summary retrieved successfully' }),
    __param(0, (0, common_1.Param)('centerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QualityController.prototype, "getCenterQualitySummary", null);
__decorate([
    (0, common_1.Get)('national/overview'),
    (0, swagger_1.ApiOperation)({ summary: 'Get national quality overview' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'National quality overview retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QualityController.prototype, "getNationalQualityOverview", null);
__decorate([
    (0, common_1.Get)('staff-performance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get staff performance leaderboard' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Staff performance leaderboard retrieved successfully' }),
    __param(0, (0, common_1.Query)('centerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QualityController.prototype, "getStaffPerformanceLeaderboard", null);
__decorate([
    (0, common_1.Get)('missing-data-heatmap'),
    (0, swagger_1.ApiOperation)({ summary: 'Get missing data heatmap' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Missing data heatmap retrieved successfully' }),
    __param(0, (0, common_1.Query)('centerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QualityController.prototype, "getMissingDataHeatmap", null);
exports.QualityController = QualityController = QualityController_1 = __decorate([
    (0, swagger_1.ApiTags)('quality'),
    (0, common_1.Controller)('quality'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [quality_service_1.QualityService])
], QualityController);
//# sourceMappingURL=quality.controller.js.map