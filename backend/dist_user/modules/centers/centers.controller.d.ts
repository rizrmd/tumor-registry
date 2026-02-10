import { CentersService } from './centers.service';
import { JwtPayload } from '@/auth/interfaces/jwt-payload.interface';
export declare class CentersController {
    private readonly centersService;
    constructor(centersService: CentersService);
    findAll(includeInactive?: string): Promise<{
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        province: string;
        regency: string | null;
        address: string | null;
        remoteDbUrl: string | null;
        remoteDbApiKey: string | null;
        mrPrefix: string | null;
        mrSequenceCounter: number;
        mrSequenceYear: number;
    }[]>;
    getMyRemoteDbConfig(req: {
        user: JwtPayload;
    }): Promise<{
        enabled: boolean;
        message: string;
        url?: undefined;
        apiKey?: undefined;
    } | {
        enabled: boolean;
        url: string;
        apiKey: string;
        message?: undefined;
    }>;
    getStatistics(): Promise<any>;
    findById(id: string, includeUsers?: string): Promise<any>;
    getCenterUsers(id: string): Promise<any[]>;
    create(createCenterDto: {
        name: string;
        code: string;
        province: string;
        regency?: string;
        address?: string;
        mrPrefix: string;
    }): Promise<{
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        province: string;
        regency: string | null;
        address: string | null;
        remoteDbUrl: string | null;
        remoteDbApiKey: string | null;
        mrPrefix: string | null;
        mrSequenceCounter: number;
        mrSequenceYear: number;
    }>;
    update(id: string, updateCenterDto: {
        name?: string;
        province?: string;
        regency?: string;
        address?: string;
        isActive?: boolean;
    }): Promise<{
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        province: string;
        regency: string | null;
        address: string | null;
        remoteDbUrl: string | null;
        remoteDbApiKey: string | null;
        mrPrefix: string | null;
        mrSequenceCounter: number;
        mrSequenceYear: number;
    }>;
    activate(id: string): Promise<{
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        province: string;
        regency: string | null;
        address: string | null;
        remoteDbUrl: string | null;
        remoteDbApiKey: string | null;
        mrPrefix: string | null;
        mrSequenceCounter: number;
        mrSequenceYear: number;
    }>;
    deactivate(id: string): Promise<{
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        province: string;
        regency: string | null;
        address: string | null;
        remoteDbUrl: string | null;
        remoteDbApiKey: string | null;
        mrPrefix: string | null;
        mrSequenceCounter: number;
        mrSequenceYear: number;
    }>;
    delete(id: string): Promise<void>;
    updateRemoteDbConfig(id: string, configDto: {
        remoteDbUrl?: string | null;
        remoteDbApiKey?: string | null;
    }): Promise<{
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        province: string;
        regency: string | null;
        address: string | null;
        remoteDbUrl: string | null;
        remoteDbApiKey: string | null;
        mrPrefix: string | null;
        mrSequenceCounter: number;
        mrSequenceYear: number;
    }>;
}
