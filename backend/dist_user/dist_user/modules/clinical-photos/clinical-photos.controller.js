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
exports.ClinicalPhotosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const clinical_photos_service_1 = require("./clinical-photos.service");
const jwt_guard_1 = require("@/modules/auth/guards/jwt.guard");
let ClinicalPhotosController = class ClinicalPhotosController {
    constructor(clinicalPhotosService) {
        this.clinicalPhotosService = clinicalPhotosService;
    }
    async uploadPhoto(req) {
        const userId = req.user.sub || req.user.userId;
        const parts = req.parts();
        const uploadDto = {};
        let fileData = null;
        for await (const part of parts) {
            if (part.type === 'file') {
                const buffer = await part.toBuffer();
                fileData = {
                    buffer,
                    originalname: part.filename,
                    mimetype: part.mimetype,
                    size: buffer.length,
                };
            }
            else {
                uploadDto[part.fieldname] = part.value;
            }
        }
        if (!fileData) {
            return {
                success: false,
                error: { message: 'No file provided' },
            };
        }
        return await this.clinicalPhotosService.uploadPhoto(uploadDto, fileData, userId);
    }
    async getPhotosByPatient(patientId) {
        return await this.clinicalPhotosService.getPhotosByPatientId(patientId);
    }
    async deletePhoto(id, req) {
        const userId = req.user.sub || req.user.userId;
        return await this.clinicalPhotosService.deletePhoto(id, userId);
    }
};
exports.ClinicalPhotosController = ClinicalPhotosController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload clinical photo for a patient' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'Clinical photo file (JPG, PNG - max 10MB)',
                },
                patientId: { type: 'string', description: 'Patient ID' },
                viewType: {
                    type: 'string',
                    enum: ['ANTERIOR', 'POSTERIOR', 'LATERAL_LEFT', 'LATERAL_RIGHT', 'OTHER'],
                    description: 'Anatomical view type',
                },
                anatomicalLocation: { type: 'string', description: 'Anatomical location (optional)' },
                description: { type: 'string', description: 'Photo description (optional)' },
            },
            required: ['file', 'patientId'],
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Photo uploaded successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input or file type' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClinicalPhotosController.prototype, "uploadPhoto", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all clinical photos for a patient' }),
    (0, swagger_1.ApiParam)({ name: 'patientId', description: 'Patient ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Photos retrieved successfully' }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClinicalPhotosController.prototype, "getPhotosByPatient", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete clinical photo' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Photo ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Photo deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Photo not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClinicalPhotosController.prototype, "deletePhoto", null);
exports.ClinicalPhotosController = ClinicalPhotosController = __decorate([
    (0, swagger_1.ApiTags)('Clinical Photos'),
    (0, common_1.Controller)('clinical-photos'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [clinical_photos_service_1.ClinicalPhotosService])
], ClinicalPhotosController);
//# sourceMappingURL=clinical-photos.controller.js.map
