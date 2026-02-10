import { PrismaService } from '@/database/prisma.service';
import { CreateLabResultDto, UpdateLabResultDto } from './dto';
export declare class LaboratoryService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createDto: CreateLabResultDto): Promise<any>;
    findAll(patientId?: string, testType?: string, status?: string, page?: number, limit?: number): Promise<{
        results: any[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findById(id: string): Promise<any>;
    findByPatient(patientId: string, testType?: string): Promise<any[]>;
    getTumorMarkers(patientId: string): Promise<any>;
    update(id: string, updateDto: UpdateLabResultDto): Promise<any>;
    delete(id: string): Promise<any>;
    getAbnormalResults(patientId: string): Promise<any[]>;
    getStatistics(centerId?: string): Promise<any>;
    private checkIfAbnormal;
    private calculateAge;
    private getTestsByType;
}
