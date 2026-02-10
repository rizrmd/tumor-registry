import { PathologyService } from './pathology.service';
import { CreatePathologyReportDto, UpdatePathologyReportDto } from './dto';
export declare class PathologyController {
    private readonly pathologyService;
    constructor(pathologyService: PathologyService);
    create(createDto: CreatePathologyReportDto): Promise<any>;
    findAll(patientId?: string, status?: string, isMalignant?: string, page?: string, limit?: string): Promise<{
        reports: any[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    getStatistics(centerId?: string): Promise<any>;
    findByReportNumber(reportNumber: string): Promise<any>;
    findByPatient(patientId: string): Promise<any[]>;
    findById(id: string): Promise<any>;
    update(id: string, updateDto: UpdatePathologyReportDto): Promise<any>;
    delete(id: string): Promise<any>;
}
