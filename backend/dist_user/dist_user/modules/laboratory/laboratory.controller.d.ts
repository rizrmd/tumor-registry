import { LaboratoryService } from './laboratory.service';
import { CreateLabResultDto, UpdateLabResultDto } from './dto';
export declare class LaboratoryController {
    private readonly laboratoryService;
    constructor(laboratoryService: LaboratoryService);
    create(createDto: CreateLabResultDto): Promise<any>;
    findAll(patientId?: string, testType?: string, status?: string, page?: string, limit?: string): Promise<{
        results: any[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    getStatistics(centerId?: string): Promise<any>;
    findByPatient(patientId: string, testType?: string): Promise<any[]>;
    getTumorMarkers(patientId: string): Promise<any>;
    getAbnormalResults(patientId: string): Promise<any[]>;
    findById(id: string): Promise<any>;
    update(id: string, updateDto: UpdateLabResultDto): Promise<any>;
    delete(id: string): Promise<any>;
    createTumorMarkersBatch(createDtos: CreateLabResultDto[]): Promise<{
        results: any[];
        count: number;
    }>;
    getCommonTestTypes(): Promise<{
        tumorMarkers: {
            name: string;
            normalRange: string;
            unit: string;
            indication: string;
        }[];
        cbcTests: {
            name: string;
            normalRange: string;
            unit: string;
            indication: string;
        }[];
        chemistryTests: {
            name: string;
            normalRange: string;
            unit: string;
            indication: string;
        }[];
    }>;
}
