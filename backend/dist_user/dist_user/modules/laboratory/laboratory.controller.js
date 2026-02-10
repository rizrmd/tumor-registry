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
exports.LaboratoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const laboratory_service_1 = require("./laboratory.service");
const dto_1 = require("./dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let LaboratoryController = class LaboratoryController {
    constructor(laboratoryService) {
        this.laboratoryService = laboratoryService;
    }
    async create(createDto) {
        return this.laboratoryService.create(createDto);
    }
    async findAll(patientId, testType, status, page, limit) {
        return this.laboratoryService.findAll(patientId, testType, status, page ? parseInt(page) : 1, limit ? parseInt(limit) : 50);
    }
    async getStatistics(centerId) {
        return this.laboratoryService.getStatistics(centerId);
    }
    async findByPatient(patientId, testType) {
        return this.laboratoryService.findByPatient(patientId, testType);
    }
    async getTumorMarkers(patientId) {
        return this.laboratoryService.getTumorMarkers(patientId);
    }
    async getAbnormalResults(patientId) {
        return this.laboratoryService.getAbnormalResults(patientId);
    }
    async findById(id) {
        return this.laboratoryService.findById(id);
    }
    async update(id, updateDto) {
        return this.laboratoryService.update(id, updateDto);
    }
    async delete(id) {
        return this.laboratoryService.delete(id);
    }
    async createTumorMarkersBatch(createDtos) {
        const results = await Promise.all(createDtos.map(dto => this.laboratoryService.create(dto)));
        return { results, count: results.length };
    }
    async getCommonTestTypes() {
        return {
            tumorMarkers: [
                {
                    name: 'Alkaline Phosphatase (ALP)',
                    normalRange: '30-120 U/L',
                    unit: 'U/L',
                    indication: 'Elevated in bone tumors, osteosarcoma',
                },
                {
                    name: 'Lactate Dehydrogenase (LDH)',
                    normalRange: '140-280 U/L',
                    unit: 'U/L',
                    indication: 'Prognostic marker for Ewing sarcoma',
                },
                {
                    name: 'CA 19-9',
                    normalRange: '0-37 U/mL',
                    unit: 'U/mL',
                    indication: 'Some soft tissue sarcomas',
                },
            ],
            cbcTests: [
                {
                    name: 'Hemoglobin (Hb)',
                    normalRange: '12-16 g/dL (F), 13-17 g/dL (M)',
                    unit: 'g/dL',
                    indication: 'Anemia assessment',
                },
                {
                    name: 'White Blood Cell (WBC)',
                    normalRange: '4,000-11,000/μL',
                    unit: '/μL',
                    indication: 'Infection, chemotherapy monitoring',
                },
                {
                    name: 'Platelet Count',
                    normalRange: '150,000-450,000/μL',
                    unit: '/μL',
                    indication: 'Bleeding risk, chemotherapy monitoring',
                },
            ],
            chemistryTests: [
                {
                    name: 'Calcium',
                    normalRange: '8.5-10.5 mg/dL',
                    unit: 'mg/dL',
                    indication: 'Bone metabolism, metastasis',
                },
                {
                    name: 'Phosphorus',
                    normalRange: '2.5-4.5 mg/dL',
                    unit: 'mg/dL',
                    indication: 'Bone metabolism',
                },
                {
                    name: 'Creatinine',
                    normalRange: '0.6-1.2 mg/dL',
                    unit: 'mg/dL',
                    indication: 'Renal function (chemotherapy)',
                },
            ],
        };
    }
};
exports.LaboratoryController = LaboratoryController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new laboratory result' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Lab result created successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Patient not found' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateLabResultDto]),
    __metadata("design:returntype", Promise)
], LaboratoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all laboratory results with filters' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lab results retrieved successfully',
    }),
    (0, swagger_1.ApiQuery)({ name: 'patientId', required: false, description: 'Filter by patient ID' }),
    (0, swagger_1.ApiQuery)({
        name: 'testType',
        required: false,
        description: 'Filter by test type',
        enum: dto_1.LabTestType,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        description: 'Filter by status',
        enum: dto_1.LabResultStatus,
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 50)' }),
    __param(0, (0, common_1.Query)('patientId')),
    __param(1, (0, common_1.Query)('testType')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], LaboratoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get laboratory statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lab statistics retrieved successfully' }),
    (0, swagger_1.ApiQuery)({ name: 'centerId', required: false, description: 'Filter by center ID' }),
    __param(0, (0, common_1.Query)('centerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LaboratoryController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all lab results for a patient' }),
    (0, swagger_1.ApiParam)({ name: 'patientId', description: 'Patient UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lab results retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Patient not found' }),
    (0, swagger_1.ApiQuery)({
        name: 'testType',
        required: false,
        description: 'Filter by test type',
        enum: dto_1.LabTestType,
    }),
    __param(0, (0, common_1.Param)('patientId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('testType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LaboratoryController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.Get)('patient/:patientId/tumor-markers'),
    (0, swagger_1.ApiOperation)({ summary: 'Get tumor markers for a patient with trends' }),
    (0, swagger_1.ApiParam)({ name: 'patientId', description: 'Patient UUID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Tumor markers retrieved successfully with trend analysis',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Patient not found' }),
    __param(0, (0, common_1.Param)('patientId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LaboratoryController.prototype, "getTumorMarkers", null);
__decorate([
    (0, common_1.Get)('patient/:patientId/abnormal'),
    (0, swagger_1.ApiOperation)({ summary: 'Get abnormal lab results for a patient' }),
    (0, swagger_1.ApiParam)({ name: 'patientId', description: 'Patient UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Abnormal results retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Patient not found' }),
    __param(0, (0, common_1.Param)('patientId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LaboratoryController.prototype, "getAbnormalResults", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get lab result by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Lab result UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lab result retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lab result not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LaboratoryController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update lab result' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Lab result UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lab result updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lab result not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateLabResultDto]),
    __metadata("design:returntype", Promise)
], LaboratoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete lab result' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Lab result UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lab result deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lab result not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LaboratoryController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('tumor-markers/batch'),
    (0, swagger_1.ApiOperation)({ summary: 'Create multiple tumor marker results at once' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tumor markers created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], LaboratoryController.prototype, "createTumorMarkersBatch", null);
__decorate([
    (0, common_1.Get)('test-types/common'),
    (0, swagger_1.ApiOperation)({ summary: 'Get common lab test types for musculoskeletal tumors' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Common test types retrieved' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LaboratoryController.prototype, "getCommonTestTypes", null);
exports.LaboratoryController = LaboratoryController = __decorate([
    (0, swagger_1.ApiTags)('Laboratory'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('laboratory'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [laboratory_service_1.LaboratoryService])
], LaboratoryController);
//# sourceMappingURL=laboratory.controller.js.map
