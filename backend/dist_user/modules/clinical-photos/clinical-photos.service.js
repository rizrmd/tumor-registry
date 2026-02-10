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
var ClinicalPhotosService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicalPhotosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("@/database/prisma.service");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const uuid_1 = require("uuid");
let ClinicalPhotosService = ClinicalPhotosService_1 = class ClinicalPhotosService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(ClinicalPhotosService_1.name);
        this.uploadDir = process.env.CLINICAL_PHOTOS_DIR || './uploads/clinical-photos';
        this.maxFileSize = 10 * 1024 * 1024;
        this.ensureUploadDirectory();
    }
    async ensureUploadDirectory() {
        try {
            await fs.promises.mkdir(this.uploadDir, { recursive: true });
            await fs.promises.mkdir(path.join(this.uploadDir, 'thumbnails'), { recursive: true });
        }
        catch (error) {
            this.logger.error('Error creating upload directories', error);
        }
    }
    sanitizeFilename(filename) {
        return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    }
    isImageFormat(mimetype) {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        return allowedTypes.includes(mimetype);
    }
    async uploadPhoto(uploadDto, file, userId) {
        try {
            if (!file) {
                throw new common_1.BadRequestException('No file provided');
            }
            if (!this.isImageFormat(file.mimetype)) {
                throw new common_1.BadRequestException('Only JPG and PNG images are allowed');
            }
            if (file.size > this.maxFileSize) {
                throw new common_1.BadRequestException('File size exceeds 10MB limit');
            }
            const fileExt = path.extname(file.originalname || file.filename);
            const uniqueFilename = `${(0, uuid_1.v4)()}${fileExt}`;
            const filePath = path.join(this.uploadDir, uniqueFilename);
            await fs.promises.writeFile(filePath, file.buffer);
            const thumbnailFilename = `thumb-${uniqueFilename}`;
            const thumbnailPath = path.join(this.uploadDir, 'thumbnails', thumbnailFilename);
            await sharp(file.buffer)
                .resize(300, 300, { fit: 'inside' })
                .jpeg({ quality: 85 })
                .toFile(thumbnailPath);
            const clinicalPhoto = await this.prisma.clinicalPhoto.create({
                data: {
                    patientId: uploadDto.patientId,
                    fileUrl: `/uploads/clinical-photos/${uniqueFilename}`,
                    fileName: uniqueFilename,
                    fileSize: file.size,
                    mimeType: file.mimetype,
                    anatomicalLocation: uploadDto.anatomicalLocation,
                    viewType: uploadDto.viewType,
                    description: uploadDto.description,
                    uploadedBy: userId,
                },
            });
            return {
                success: true,
                message: 'Clinical photo uploaded successfully',
                data: {
                    id: clinicalPhoto.id,
                    fileName: uniqueFilename,
                    fileUrl: clinicalPhoto.fileUrl,
                    fileSize: file.size,
                    viewType: clinicalPhoto.viewType,
                    uploadedAt: clinicalPhoto.uploadDate,
                },
            };
        }
        catch (error) {
            this.logger.error('Error uploading clinical photo', error);
            throw error;
        }
    }
    async uploadMultiplePhotos(patientId, photos, userId) {
        const uploadedPhotos = [];
        for (const photo of photos) {
            const uploadDto = {
                patientId,
                viewType: photo.viewType,
                description: photo.description,
            };
            const result = await this.uploadPhoto(uploadDto, photo.file, userId);
            uploadedPhotos.push(result.data);
        }
        return {
            success: true,
            message: `${uploadedPhotos.length} clinical photos uploaded successfully`,
            data: uploadedPhotos,
        };
    }
    async getPhotosByPatientId(patientId) {
        const photos = await this.prisma.clinicalPhoto.findMany({
            where: { patientId },
            orderBy: { uploadDate: 'desc' },
        });
        return {
            success: true,
            data: photos,
            meta: {
                total: photos.length,
            },
        };
    }
    async deletePhoto(id, userId) {
        const photo = await this.prisma.clinicalPhoto.findUnique({
            where: { id },
        });
        if (!photo) {
            throw new common_1.NotFoundException('Clinical photo not found');
        }
        const filePath = path.join(this.uploadDir, photo.fileName);
        const thumbnailPath = path.join(this.uploadDir, 'thumbnails', `thumb-${photo.fileName}`);
        try {
            if (fs.existsSync(filePath)) {
                await fs.promises.unlink(filePath);
            }
            if (fs.existsSync(thumbnailPath)) {
                await fs.promises.unlink(thumbnailPath);
            }
        }
        catch (error) {
            this.logger.warn('Error deleting photo files from disk', error);
        }
        await this.prisma.clinicalPhoto.delete({
            where: { id },
        });
        return {
            success: true,
            message: 'Clinical photo deleted successfully',
        };
    }
};
exports.ClinicalPhotosService = ClinicalPhotosService;
exports.ClinicalPhotosService = ClinicalPhotosService = ClinicalPhotosService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClinicalPhotosService);
//# sourceMappingURL=clinical-photos.service.js.map