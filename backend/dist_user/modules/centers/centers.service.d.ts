import { PrismaService } from '@/database/prisma.service';
import { Center } from '@prisma/client';
import { MedicalRecordService } from '../patients/services/medical-record.service';
export declare class CentersService {
    private prisma;
    private medicalRecordService;
    private readonly logger;
    constructor(prisma: PrismaService, medicalRecordService: MedicalRecordService);
    findAll(includeInactive?: boolean): Promise<Center[]>;
    findById(id: string, includeUsers?: boolean): Promise<any>;
    findByCode(code: string): Promise<Center>;
    create(centerData: {
        name: string;
        code: string;
        province: string;
        regency?: string;
        address?: string;
        mrPrefix: string;
    }): Promise<Center>;
    update(id: string, updateData: {
        name?: string;
        code?: string;
        province?: string;
        regency?: string;
        address?: string;
        mrPrefix?: string;
        isActive?: boolean;
    }): Promise<Center>;
    delete(id: string): Promise<void>;
    deactivate(id: string): Promise<Center>;
    activate(id: string): Promise<Center>;
    getStatistics(): Promise<any>;
    getCenterUsers(centerId: string): Promise<any[]>;
    checkMrPrefixAvailability(prefix: string): Promise<{
        available: boolean;
        valid: boolean;
        message: string;
    }>;
    getRemoteDbConfig(centerId: string): Promise<{
        url: string | null;
        apiKey: string | null;
    } | null>;
    updateRemoteDbConfig(centerId: string, config: {
        remoteDbUrl?: string | null;
        remoteDbApiKey?: string | null;
    }): Promise<Center>;
}
