import { ClinicalPhotosService } from './clinical-photos.service';
export declare class ClinicalPhotosController {
    private readonly clinicalPhotosService;
    constructor(clinicalPhotosService: ClinicalPhotosService);
    uploadPhoto(req: any): Promise<any>;
    getPhotosByPatient(patientId: string): Promise<any>;
    deletePhoto(id: string, req: any): Promise<any>;
}
