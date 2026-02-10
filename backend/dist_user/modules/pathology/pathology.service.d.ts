import { PrismaService } from '@/database/prisma.service';
import { CreatePathologyReportDto, UpdatePathologyReportDto } from './dto';
export declare class PathologyService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createDto: CreatePathologyReportDto): Promise<any>;
    findAll(patientId?: string, status?: string, isMalignant?: boolean, page?: number, limit?: number): Promise<{
        reports: any[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findById(id: string): Promise<any>;
    findByReportNumber(reportNumber: string): Promise<any>;
    findByPatient(patientId: string): Promise<any[]>;
    update(id: string, updateDto: UpdatePathologyReportDto): Promise<any>;
    delete(id: string): Promise<any>;
    getMalignantCount(centerId?: string): Promise<number>;
    getStatistics(centerId?: string): Promise<any>;
    private getReportsByBiopsyType;
}
