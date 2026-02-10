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
exports.MstsScoresController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const msts_scores_service_1 = require("./msts-scores.service");
const msts_score_dto_1 = require("./dto/msts-score.dto");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
let MstsScoresController = class MstsScoresController {
    constructor(service) {
        this.service = service;
    }
    async create(createDto) {
        return this.service.create(createDto);
    }
    async findAll(patientId) {
        return this.service.findAll(patientId);
    }
    async findByPatient(patientId) {
        return this.service.findByPatient(patientId);
    }
    async getPatientHistory(patientId) {
        return this.service.getPatientScoreHistory(patientId);
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
exports.MstsScoresController = MstsScoresController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new MSTS score assessment' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'MSTS score created', type: msts_score_dto_1.MstsScoreDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid score values' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [msts_score_dto_1.CreateMstsScoreDto]),
    __metadata("design:returntype", Promise)
], MstsScoresController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all MSTS scores' }),
    (0, swagger_1.ApiQuery)({ name: 'patientId', required: false, description: 'Filter by patient ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns MSTS scores', type: [msts_score_dto_1.MstsScoreDto] }),
    __param(0, (0, common_1.Query)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MstsScoresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get MSTS scores for a patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns patient MSTS scores', type: [msts_score_dto_1.MstsScoreDto] }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MstsScoresController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.Get)('patient/:patientId/history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get MSTS score history and statistics for a patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns score history and statistics' }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MstsScoresController.prototype, "getPatientHistory", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get MSTS score by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns MSTS score', type: msts_score_dto_1.MstsScoreDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'MSTS score not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MstsScoresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update MSTS score' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'MSTS score updated', type: msts_score_dto_1.MstsScoreDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'MSTS score not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, msts_score_dto_1.UpdateMstsScoreDto]),
    __metadata("design:returntype", Promise)
], MstsScoresController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete MSTS score' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'MSTS score deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'MSTS score not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MstsScoresController.prototype, "remove", null);
exports.MstsScoresController = MstsScoresController = __decorate([
    (0, swagger_1.ApiTags)('MSTS Scores'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('msts-scores'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [msts_scores_service_1.MstsScoresService])
], MstsScoresController);
//# sourceMappingURL=msts-scores.controller.js.map