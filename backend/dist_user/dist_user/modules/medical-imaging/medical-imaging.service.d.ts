import { PrismaService } from '@/database/prisma.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
export declare class MedicalImagingService {
    private prisma;
    private readonly logger;
    private readonly uploadDir;
    private readonly maxFileSize;
    constructor(prisma: PrismaService);
    private ensureUploadDirectory;
    uploadImage(uploadDto: UploadImageDto, file: any, userId: string): Promise<any>;
    findAll(patientId?: string, imageType?: string, category?: string, page?: number, limit?: number): Promise<any>;
    findById(id: string): Promise<any>;
    update(id: string, updateDto: UpdateImageDto, userId: string): Promise<any>;
    delete(id: string, userId: string): Promise<any>;
    getImageFile(id: string): Promise<{
        filePath: string;
        mimeType: string;
        fileName: string;
    }>;
    getThumbnail(id: string): Promise<{
        filePath: string;
        mimeType: string;
    }>;
    categorizeImage(id: string, category: string, userId: string): Promise<any>;
    addAnnotations(id: string, annotations: any, userId: string): Promise<any>;
    private sanitizeFilename;
    private isImageFormat;
}
