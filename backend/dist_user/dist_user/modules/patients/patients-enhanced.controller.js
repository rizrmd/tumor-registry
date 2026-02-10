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
exports.PatientsEnhancedController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const patients_enhanced_service_1 = require("./patients-enhanced.service");
const dto_1 = require("./dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let PatientsEnhancedController = class PatientsEnhancedController {
    constructor(patientsService) {
        this.patientsService = patientsService;
    }
    async create(createDto) {
        return this.patientsService.create(createDto);
    }
    async findAll(centerId, pathologyType, search, includeInactive, page, limit) {
        return this.patientsService.findAll(centerId, pathologyType, includeInactive === 'true', page ? parseInt(page) : 1, limit ? parseInt(limit) : 50, search);
    }
    async searchPatients(searchQuery) {
        return this.patientsService.searchPatients(searchQuery);
    }
    async getStatistics(centerId) {
        return this.patientsService.getPatientStatistics(centerId);
    }
    async findByNIK(nik) {
        return this.patientsService.findByNIK(nik);
    }
    async findByMRN(mrn) {
        return this.patientsService.findByMRN(mrn);
    }
    async getPatientSummary(id) {
        return this.patientsService.getPatientSummary(id);
    }
    async findById(id, includeFullHistory) {
        const include = includeFullHistory === 'true';
        return this.patientsService.findById(id, include);
    }
    async update(id, updateDto) {
        return this.patientsService.update(id, updateDto);
    }
    async remove(id) {
        return this.patientsService.remove(id);
    }
};
exports.PatientsEnhancedController = PatientsEnhancedController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new patient with musculoskeletal tumor data' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Patient created successfully',
        type: dto_1.PatientDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Patient with NIK or MRN already exists' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePatientDto]),
    __metadata("design:returntype", Promise)
], PatientsEnhancedController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all patients with pagination and filtering' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Patients retrieved successfully',
    }),
    (0, swagger_1.ApiQuery)({ name: 'centerId', required: false, description: 'Filter by center ID' }),
    (0, swagger_1.ApiQuery)({
        name: 'pathologyType',
        required: false,
        description: 'Filter by pathology type',
        enum: ['bone_tumor', 'soft_tissue_tumor', 'metastatic_bone_disease'],
    }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Search by name, NIK, MRN, or phone' }),
    (0, swagger_1.ApiQuery)({ name: 'includeInactive', required: false, type: Boolean, description: 'Include inactive patients' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 50)' }),
    __param(0, (0, common_1.Query)('centerId')),
    __param(1, (0, common_1.Query)('pathologyType')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('includeInactive')),
    __param(4, (0, common_1.Query)('page')),
    __param(5, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], PatientsEnhancedController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Advanced patient search with multiple filters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Patients searched successfully' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Search text' }),
    (0, swagger_1.ApiQuery)({ name: 'centerId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'pathologyType', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'gender', required: false, enum: ['MALE', 'FEMALE'] }),
    (0, swagger_1.ApiQuery)({ name: 'ennekingStage', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'ajccStage', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isDeceased', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'metastasisPresent', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientsEnhancedController.prototype, "searchPatients", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get patient statistics for center or system-wide' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Patient statistics retrieved successfully' }),
    (0, swagger_1.ApiQuery)({ name: 'centerId', required: false, description: 'Filter by center ID (omit for system-wide)' }),
    __param(0, (0, common_1.Query)('centerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientsEnhancedController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('nik/:nik'),
    (0, swagger_1.ApiOperation)({ summary: 'Get patient by Indonesian National ID (NIK)' }),
    (0, swagger_1.ApiParam)({ name: 'nik', description: '16-digit Indonesian National ID', example: '3173051234567890' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Patient retrieved successfully', type: dto_1.PatientDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Patient not found' }),
    __param(0, (0, common_1.Param)('nik')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientsEnhancedController.prototype, "findByNIK", null);
__decorate([
    (0, common_1.Get)('mrn/:mrn'),
    (0, swagger_1.ApiOperation)({ summary: 'Get patient by Medical Record Number' }),
    (0, swagger_1.ApiParam)({ name: 'mrn', description: 'Medical Record Number', example: 'MR-2025-00001' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Patient retrieved successfully', type: dto_1.PatientDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Patient not found' }),
    __param(0, (0, common_1.Param)('mrn')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientsEnhancedController.prototype, "findByMRN", null);
__decorate([
    (0, common_1.Get)(':id/summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get comprehensive patient summary with all musculoskeletal data' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Patient UUID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Patient summary retrieved successfully with diagnosis, clinical data, MSTS scores, follow-ups, treatments, and CPC conferences',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Patient not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientsEnhancedController.prototype, "getPatientSummary", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get patient by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Patient UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Patient retrieved successfully', type: dto_1.PatientDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Patient not found' }),
    (0, swagger_1.ApiQuery)({
        name: 'includeFullHistory',
        required: false,
        type: Boolean,
        description: 'Include all MSTS scores, follow-ups, treatments, and CPC conferences',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('includeFullHistory')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PatientsEnhancedController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update patient information' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Patient UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Patient updated successfully', type: dto_1.PatientDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Patient not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdatePatientDto]),
    __metadata("design:returntype", Promise)
], PatientsEnhancedController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete patient (set isActive = false)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Patient UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Patient deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Patient not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientsEnhancedController.prototype, "remove", null);
exports.PatientsEnhancedController = PatientsEnhancedController = __decorate([
    (0, swagger_1.ApiTags)('Patients'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('patients'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [patients_enhanced_service_1.PatientsEnhancedService])
], PatientsEnhancedController);
//# sourceMappingURL=patients-enhanced.controller.js.map
