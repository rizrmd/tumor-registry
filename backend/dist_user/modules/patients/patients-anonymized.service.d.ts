import { PrismaService } from '@/database/prisma.service';
import { Gender, BloodType, MaritalStatus } from '@prisma/client';
import { MedicalRecordService } from './services/medical-record.service';
export declare class PatientsAnonymizedService {
    private prisma;
    private medicalRecordService;
    private readonly logger;
    constructor(prisma: PrismaService, medicalRecordService: MedicalRecordService);
    findAll(centerId?: string, includeInactive?: boolean, page?: number, limit?: number, search?: string): Promise<{
        patients: any[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findById(id: string, includeMedicalHistory?: boolean): Promise<any>;
    findByAnonymousId(anonymousId: string): Promise<any>;
    findByInamsosNumber(inamsosRecordNumber: string): Promise<any>;
    create(data: {
        nik?: string;
        dateOfBirth: Date;
        gender: Gender;
        bloodType?: BloodType;
        phoneNumber?: string;
        email?: string;
        address?: any;
        province?: string;
        city?: string;
        district?: string;
        maritalStatus?: MaritalStatus;
        occupation?: string;
        religion?: string;
        centerId: string;
        hospitalRecordNumber?: string;
        diagnosisDate?: Date;
        createdBy: string;
    }): Promise<any>;
    update(id: string, data: {
        nik?: string;
        dateOfBirth?: Date;
        gender?: Gender;
        bloodType?: BloodType;
        phoneNumber?: string;
        email?: string;
        address?: any;
        province?: string;
        city?: string;
        district?: string;
        maritalStatus?: MaritalStatus;
        occupation?: string;
        religion?: string;
        hospitalRecordNumber?: string;
        isActive?: boolean;
    }): Promise<any>;
    delete(id: string): Promise<void>;
    search(filters: {
        anonymousId?: string;
        inamsosRecordNumber?: string;
        hospitalRecordNumber?: string;
        centerId?: string;
        province?: string;
        city?: string;
        gender?: Gender;
        ageMin?: number;
        ageMax?: number;
        diagnosisDateFrom?: Date;
        diagnosisDateTo?: Date;
        isActive?: boolean;
        page?: number;
        limit?: number;
    }): Promise<{
        patients: any[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    getStatistics(centerId?: string): Promise<any>;
    getPII(patientId: string, requesterId: string, reason: string): Promise<any>;
}
