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
exports.MedicalImagingController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const medical_imaging_service_1 = require("./medical-imaging.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const upload_image_dto_1 = require("./dto/upload-image.dto");
const update_image_dto_1 = require("./dto/update-image.dto");
const fs = require("fs");
let MedicalImagingController = class MedicalImagingController {
    constructor(medicalImagingService) {
        this.medicalImagingService = medicalImagingService;
    }
    async uploadImage(file, uploadDto, req) {
        const userId = req.user.userId;
        return await this.medicalImagingService.uploadImage(uploadDto, file, userId);
    }
    async findAll(patientId, imageType, category, page, limit) {
        return await this.medicalImagingService.findAll(patientId, imageType, category, page ? parseInt(page) : 1, limit ? parseInt(limit) : 50);
    }
    async findById(id) {
        return await this.medicalImagingService.findById(id);
    }
    async getImageFile(id, res) {
        const { filePath, mimeType, fileName } = await this.medicalImagingService.getImageFile(id);
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    }
    async getThumbnail(id, res) {
        const { filePath, mimeType } = await this.medicalImagingService.getThumbnail(id);
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Disposition', 'inline');
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    }
    async update(id, updateDto, req) {
        const userId = req.user.userId;
        return await this.medicalImagingService.update(id, updateDto, userId);
    }
    async delete(id, req) {
        const userId = req.user.userId;
        return await this.medicalImagingService.delete(id, userId);
    }
    async categorize(id, category, req) {
        const userId = req.user.userId;
        return await this.medicalImagingService.categorizeImage(id, category, userId);
    }
    async addAnnotations(id, annotations, req) {
        const userId = req.user.userId;
        return await this.medicalImagingService.addAnnotations(id, annotations, userId);
    }
};
exports.MedicalImagingController = MedicalImagingController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({ summary: 'Upload medical image with metadata' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                patientId: { type: 'string' },
                imageType: { type: 'string', enum: ['HISTOLOGY', 'RADIOLOGY', 'CLINICAL_PHOTO', 'PATHOLOGY', 'ENDOSCOPY', 'ULTRASOUND', 'CT_SCAN', 'MRI', 'XRAY', 'PET_SCAN', 'MAMMOGRAPHY', 'OTHER'] },
                category: { type: 'string', enum: ['HISTOLOGY', 'RADIOLOGY', 'CLINICAL', 'PATHOLOGY', 'DIAGNOSTIC', 'SURGICAL', 'FOLLOW_UP', 'SCREENING', 'OTHER'] },
                description: { type: 'string' },
                findings: { type: 'string' },
                bodyPart: { type: 'string' },
                modality: { type: 'string' },
                studyDate: { type: 'string', format: 'date-time' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Image uploaded successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upload_image_dto_1.UploadImageDto, Object]),
    __metadata("design:returntype", Promise)
], MedicalImagingController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all medical images with filters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Images retrieved successfully' }),
    (0, swagger_1.ApiQuery)({ name: 'patientId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'imageType', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    __param(0, (0, common_1.Query)('patientId')),
    __param(1, (0, common_1.Query)('imageType')),
    __param(2, (0, common_1.Query)('category')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], MedicalImagingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get medical image metadata by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Image ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Image retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Image not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedicalImagingController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(':id/file'),
    (0, swagger_1.ApiOperation)({ summary: 'Download original image file' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Image ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Image file retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Image not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MedicalImagingController.prototype, "getImageFile", null);
__decorate([
    (0, common_1.Get)(':id/thumbnail'),
    (0, swagger_1.ApiOperation)({ summary: 'Get image thumbnail' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Image ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thumbnail retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Thumbnail not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MedicalImagingController.prototype, "getThumbnail", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update medical image metadata' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Image ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Image updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Image not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_image_dto_1.UpdateImageDto, Object]),
    __metadata("design:returntype", Promise)
], MedicalImagingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete medical image (soft delete)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Image ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Image deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Image not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MedicalImagingController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)(':id/categorize'),
    (0, swagger_1.ApiOperation)({ summary: 'Change image category' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Image ID' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                category: { type: 'string', enum: ['HISTOLOGY', 'RADIOLOGY', 'CLINICAL', 'PATHOLOGY', 'DIAGNOSTIC', 'SURGICAL', 'FOLLOW_UP', 'SCREENING', 'OTHER'] },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Image categorized successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('category')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], MedicalImagingController.prototype, "categorize", null);
__decorate([
    (0, common_1.Post)(':id/annotations'),
    (0, swagger_1.ApiOperation)({ summary: 'Add annotations to image' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Image ID' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                annotations: { type: 'object' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Annotations added successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('annotations')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], MedicalImagingController.prototype, "addAnnotations", null);
exports.MedicalImagingController = MedicalImagingController = __decorate([
    (0, swagger_1.ApiTags)('Medical Imaging'),
    (0, common_1.Controller)('medical-imaging'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [medical_imaging_service_1.MedicalImagingService])
], MedicalImagingController);
//# sourceMappingURL=medical-imaging.controller.js.map