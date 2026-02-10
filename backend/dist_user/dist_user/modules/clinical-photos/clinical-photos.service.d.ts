import { PrismaService } from '@/database/prisma.service';
import { UploadClinicalPhotoDto } from './dto/upload-clinical-photo.dto';
export declare class ClinicalPhotosService {
    private prisma;
    private readonly logger;
    private readonly uploadDir;
    private readonly maxFileSize;
    constructor(prisma: PrismaService);
    private ensureUploadDirectory;
    private sanitizeFilename;
    private isImageFormat;
    uploadPhoto(uploadDto: UploadClinicalPhotoDto, file: any, userId: string): Promise<any>;
    uploadMultiplePhotos(patientId: string, photos: {
        file: any;
        viewType?: string;
        description?: string;
    }[], userId: string): Promise<any>;
    getPhotosByPatientId(patientId: string): Promise<any>;
    deletePhoto(id: string, userId: string): Promise<any>;
}
