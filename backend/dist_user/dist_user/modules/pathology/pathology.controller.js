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
exports.PathologyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pathology_service_1 = require("./pathology.service");
const dto_1 = require("./dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let PathologyController = class PathologyController {
    constructor(pathologyService) {
        this.pathologyService = pathologyService;
    }
    async create(createDto) {
        return this.pathologyService.create(createDto);
    }
    async findAll(patientId, status, isMalignant, page, limit) {
        return this.pathologyService.findAll(patientId, status, isMalignant === 'true' ? true : isMalignant === 'false' ? false : undefined, page ? parseInt(page) : 1, limit ? parseInt(limit) : 50);
    }
    async getStatistics(centerId) {
        return this.pathologyService.getStatistics(centerId);
    }
    async findByReportNumber(reportNumber) {
        return this.pathologyService.findByReportNumber(reportNumber);
    }
    async findByPatient(patientId) {
        return this.pathologyService.findByPatient(patientId);
    }
    async findById(id) {
        return this.pathologyService.findById(id);
    }
    async update(id, updateDto) {
        return this.pathologyService.update(id, updateDto);
    }
    async delete(id) {
        return this.pathologyService.delete(id);
    }
};
exports.PathologyController = PathologyController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new pathology report' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Pathology report created successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Report number already exists' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePathologyReportDto]),
    __metadata("design:returntype", Promise)
], PathologyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all pathology reports with filters' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pathology reports retrieved successfully',
    }),
    (0, swagger_1.ApiQuery)({ name: 'patientId', required: false, description: 'Filter by patient ID' }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        description: 'Filter by status',
        enum: dto_1.PathologyStatus,
    }),
    (0, swagger_1.ApiQuery)({ name: 'isMalignant', required: false, type: Boolean, description: 'Filter by malignancy' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 50)' }),
    __param(0, (0, common_1.Query)('patientId')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('isMalignant')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], PathologyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pathology statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pathology statistics retrieved successfully' }),
    (0, swagger_1.ApiQuery)({ name: 'centerId', required: false, description: 'Filter by center ID' }),
    __param(0, (0, common_1.Query)('centerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PathologyController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('report-number/:reportNumber'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pathology report by report number' }),
    (0, swagger_1.ApiParam)({ name: 'reportNumber', description: 'Pathology report number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pathology report retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pathology report not found' }),
    __param(0, (0, common_1.Param)('reportNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PathologyController.prototype, "findByReportNumber", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all pathology reports for a patient' }),
    (0, swagger_1.ApiParam)({ name: 'patientId', description: 'Patient UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pathology reports retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Patient not found' }),
    __param(0, (0, common_1.Param)('patientId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PathologyController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pathology report by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Pathology report UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pathology report retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pathology report not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PathologyController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update pathology report' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Pathology report UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pathology report updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pathology report not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdatePathologyReportDto]),
    __metadata("design:returntype", Promise)
], PathologyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete pathology report' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Pathology report UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pathology report deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pathology report not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PathologyController.prototype, "delete", null);
exports.PathologyController = PathologyController = __decorate([
    (0, swagger_1.ApiTags)('Pathology'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('pathology'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [pathology_service_1.PathologyService])
], PathologyController);
//# sourceMappingURL=pathology.controller.js.map
