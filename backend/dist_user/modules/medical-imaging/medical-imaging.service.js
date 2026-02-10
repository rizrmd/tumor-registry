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
var MedicalImagingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalImagingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("@/database/prisma.service");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const util_1 = require("util");
const unlinkAsync = (0, util_1.promisify)(fs.unlink);
const mkdirAsync = (0, util_1.promisify)(fs.mkdir);
let MedicalImagingService = MedicalImagingService_1 = class MedicalImagingService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(MedicalImagingService_1.name);
        this.uploadDir = process.env.UPLOAD_DIR || './uploads/medical-images';
        this.maxFileSize = 100 * 1024 * 1024;
        this.ensureUploadDirectory();
    }
    async ensureUploadDirectory() {
        try {
            await mkdirAsync(this.uploadDir, { recursive: true });
            await mkdirAsync(path.join(this.uploadDir, 'thumbnails'), { recursive: true });
            await mkdirAsync(path.join(this.uploadDir, 'compressed'), { recursive: true });
        }
        catch (error) {
            this.logger.error('Error creating upload directories', error);
        }
    }
    async uploadImage(uploadDto, file, userId) {
        try {
            if (!file) {
                throw new common_1.BadRequestException('No file provided');
            }
            if (file.size > this.maxFileSize) {
                throw new common_1.BadRequestException('File size exceeds maximum limit');
            }
            const timestamp = Date.now();
            const sanitizedFilename = this.sanitizeFilename(file.originalname);
            const fileName = `${timestamp}-${sanitizedFilename}`;
            const filePath = path.join(this.uploadDir, fileName);
            await fs.promises.writeFile(filePath, file.buffer);
            let width;
            let height;
            let thumbnailPath;
            let compressedPath;
            let isCompressed = false;
            let compressionRatio;
            if (this.isImageFormat(file.mimetype)) {
                try {
                    const metadata = await sharp(file.buffer).metadata();
                    width = metadata.width;
                    height = metadata.height;
                    const thumbnailFileName = `thumb-${fileName}`;
                    thumbnailPath = path.join(this.uploadDir, 'thumbnails', thumbnailFileName);
                    await sharp(file.buffer)
                        .resize(200, 200, { fit: 'inside' })
                        .jpeg({ quality: 80 })
                        .toFile(thumbnailPath);
                    if (file.size > 5 * 1024 * 1024) {
                        const compressedFileName = `compressed-${fileName}`;
                        compressedPath = path.join(this.uploadDir, 'compressed', compressedFileName);
                        const compressedBuffer = await sharp(file.buffer)
                            .jpeg({ quality: 75, mozjpeg: true })
                            .toBuffer();
                        await fs.promises.writeFile(compressedPath, compressedBuffer);
                        isCompressed = true;
                        compressionRatio = compressedBuffer.length / file.size;
                    }
                }
                catch (error) {
                    this.logger.warn('Error processing image, continuing without optimization', error);
                }
            }
            const medicalImage = await this.prisma.medicalImage.create({
                data: {
                    patientId: uploadDto.patientId,
                    recordId: uploadDto.recordId,
                    imageType: uploadDto.imageType,
                    category: uploadDto.category,
                    fileName,
                    originalFileName: file.originalname,
                    filePath,
                    fileSize: BigInt(file.size),
                    mimeType: file.mimetype,
                    width,
                    height,
                    isDicom: uploadDto.isDicom || false,
                    dicomMetadata: uploadDto.dicomMetadata,
                    thumbnailPath,
                    compressedPath,
                    annotations: uploadDto.annotations,
                    description: uploadDto.description,
                    findings: uploadDto.findings,
                    bodyPart: uploadDto.bodyPart,
                    modality: uploadDto.modality,
                    studyDate: uploadDto.studyDate ? new Date(uploadDto.studyDate) : undefined,
                    seriesNumber: uploadDto.seriesNumber,
                    instanceNumber: uploadDto.instanceNumber,
                    isCompressed,
                    compressionRatio,
                    tags: uploadDto.tags || [],
                    uploadedBy: userId,
                    uploadedAt: new Date(),
                },
            });
            await this.prisma.auditLog.create({
                data: {
                    userId,
                    action: 'UPLOAD_MEDICAL_IMAGE',
                    resource: 'MedicalImage',
                    details: {
                        imageId: medicalImage.id,
                        patientId: uploadDto.patientId,
                        imageType: uploadDto.imageType,
                        category: uploadDto.category,
                        fileSize: file.size,
                    },
                },
            });
            this.logger.log(`Medical image uploaded: ${medicalImage.id} for patient ${uploadDto.patientId}`);
            return {
                ...medicalImage,
                fileSize: medicalImage.fileSize.toString(),
            };
        }
        catch (error) {
            this.logger.error('Error uploading medical image', error);
            throw error;
        }
    }
    async findAll(patientId, imageType, category, page = 1, limit = 50) {
        try {
            const skip = (page - 1) * limit;
            const where = {
                isActive: true,
                isDeleted: false,
                ...(patientId && { patientId }),
                ...(imageType && { imageType }),
                ...(category && { category }),
            };
            const [images, total] = await Promise.all([
                this.prisma.medicalImage.findMany({
                    where,
                    orderBy: { uploadedAt: 'desc' },
                    skip,
                    take: limit,
                }),
                this.prisma.medicalImage.count({ where }),
            ]);
            const totalPages = Math.ceil(total / limit);
            return {
                images: images.map(img => ({
                    ...img,
                    fileSize: img.fileSize.toString(),
                })),
                total,
                page,
                totalPages,
            };
        }
        catch (error) {
            this.logger.error('Error finding medical images', error);
            throw error;
        }
    }
    async findById(id) {
        try {
            const image = await this.prisma.medicalImage.findUnique({
                where: { id },
            });
            if (!image) {
                throw new common_1.NotFoundException(`Medical image with ID ${id} not found`);
            }
            if (image.isDeleted) {
                throw new common_1.NotFoundException(`Medical image with ID ${id} has been deleted`);
            }
            return {
                ...image,
                fileSize: image.fileSize.toString(),
            };
        }
        catch (error) {
            this.logger.error(`Error finding medical image by ID: ${id}`, error);
            throw error;
        }
    }
    async update(id, updateDto, userId) {
        try {
            const existingImage = await this.findById(id);
            const updatedImage = await this.prisma.medicalImage.update({
                where: { id },
                data: {
                    ...(updateDto.description !== undefined && { description: updateDto.description }),
                    ...(updateDto.findings !== undefined && { findings: updateDto.findings }),
                    ...(updateDto.bodyPart !== undefined && { bodyPart: updateDto.bodyPart }),
                    ...(updateDto.tags !== undefined && { tags: updateDto.tags }),
                    ...(updateDto.annotations !== undefined && { annotations: updateDto.annotations }),
                    ...(updateDto.quality !== undefined && { quality: updateDto.quality }),
                    reviewedBy: userId,
                    reviewedAt: new Date(),
                },
            });
            await this.prisma.auditLog.create({
                data: {
                    userId,
                    action: 'UPDATE_MEDICAL_IMAGE',
                    resource: 'MedicalImage',
                    details: {
                        imageId: id,
                        changes: JSON.parse(JSON.stringify(updateDto)),
                    },
                },
            });
            this.logger.log(`Medical image updated: ${id}`);
            return {
                ...updatedImage,
                fileSize: updatedImage.fileSize.toString(),
            };
        }
        catch (error) {
            this.logger.error(`Error updating medical image with ID: ${id}`, error);
            throw error;
        }
    }
    async delete(id, userId) {
        try {
            const existingImage = await this.findById(id);
            const deletedImage = await this.prisma.medicalImage.update({
                where: { id },
                data: {
                    isActive: false,
                    isDeleted: true,
                    deletedAt: new Date(),
                    deletedBy: userId,
                },
            });
            await this.prisma.auditLog.create({
                data: {
                    userId,
                    action: 'DELETE_MEDICAL_IMAGE',
                    resource: 'MedicalImage',
                    details: {
                        imageId: id,
                        patientId: deletedImage.patientId,
                    },
                },
            });
            this.logger.log(`Medical image deleted: ${id}`);
            return { message: 'Image deleted successfully' };
        }
        catch (error) {
            this.logger.error(`Error deleting medical image with ID: ${id}`, error);
            throw error;
        }
    }
    async getImageFile(id) {
        try {
            const image = await this.findById(id);
            if (!fs.existsSync(image.filePath)) {
                throw new common_1.NotFoundException('Image file not found on disk');
            }
            return {
                filePath: image.filePath,
                mimeType: image.mimeType,
                fileName: image.originalFileName,
            };
        }
        catch (error) {
            this.logger.error(`Error getting image file for ID: ${id}`, error);
            throw error;
        }
    }
    async getThumbnail(id) {
        try {
            const image = await this.findById(id);
            if (!image.thumbnailPath || !fs.existsSync(image.thumbnailPath)) {
                throw new common_1.NotFoundException('Thumbnail not found');
            }
            return {
                filePath: image.thumbnailPath,
                mimeType: 'image/jpeg',
            };
        }
        catch (error) {
            this.logger.error(`Error getting thumbnail for ID: ${id}`, error);
            throw error;
        }
    }
    async categorizeImage(id, category, userId) {
        try {
            const image = await this.findById(id);
            const updatedImage = await this.prisma.medicalImage.update({
                where: { id },
                data: { category },
            });
            await this.prisma.auditLog.create({
                data: {
                    userId,
                    action: 'CATEGORIZE_MEDICAL_IMAGE',
                    resource: 'MedicalImage',
                    details: {
                        imageId: id,
                        oldCategory: image.category,
                        newCategory: category,
                    },
                },
            });
            this.logger.log(`Medical image categorized: ${id} as ${category}`);
            return {
                ...updatedImage,
                fileSize: updatedImage.fileSize.toString(),
            };
        }
        catch (error) {
            this.logger.error(`Error categorizing medical image with ID: ${id}`, error);
            throw error;
        }
    }
    async addAnnotations(id, annotations, userId) {
        try {
            const image = await this.findById(id);
            const updatedImage = await this.prisma.medicalImage.update({
                where: { id },
                data: {
                    annotations: {
                        ...(image.annotations || {}),
                        ...annotations,
                        lastModifiedBy: userId,
                        lastModifiedAt: new Date().toISOString(),
                    },
                },
            });
            await this.prisma.auditLog.create({
                data: {
                    userId,
                    action: 'ANNOTATE_MEDICAL_IMAGE',
                    resource: 'MedicalImage',
                    details: {
                        imageId: id,
                        annotations,
                    },
                },
            });
            this.logger.log(`Annotations added to medical image: ${id}`);
            return {
                ...updatedImage,
                fileSize: updatedImage.fileSize.toString(),
            };
        }
        catch (error) {
            this.logger.error(`Error adding annotations to image with ID: ${id}`, error);
            throw error;
        }
    }
    sanitizeFilename(filename) {
        return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    }
    isImageFormat(mimeType) {
        return ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/tiff'].includes(mimeType);
    }
};
exports.MedicalImagingService = MedicalImagingService;
exports.MedicalImagingService = MedicalImagingService = MedicalImagingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MedicalImagingService);
//# sourceMappingURL=medical-imaging.service.js.map