import { MedicalImagingService } from './medical-imaging.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
export declare class MedicalImagingController {
    private readonly medicalImagingService;
    constructor(medicalImagingService: MedicalImagingService);
    uploadImage(file: any, uploadDto: UploadImageDto, req: any): Promise<any>;
    findAll(patientId?: string, imageType?: string, category?: string, page?: string, limit?: string): Promise<any>;
    findById(id: string): Promise<any>;
    getImageFile(id: string, res: any): Promise<void>;
    getThumbnail(id: string, res: any): Promise<void>;
    update(id: string, updateDto: UpdateImageDto, req: any): Promise<any>;
    delete(id: string, req: any): Promise<any>;
    categorize(id: string, category: string, req: any): Promise<any>;
    addAnnotations(id: string, annotations: any, req: any): Promise<any>;
}
