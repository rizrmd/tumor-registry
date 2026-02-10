import { PrismaService } from '@/database/prisma.service';
export declare class MedicalRecordService {
    private prisma;
    constructor(prisma: PrismaService);
    generateInamsosNumber(centerId: string, diagnosisYear?: number): Promise<string>;
    generateAnonymousId(centerId: string, inamsosRecordNumber: string): string;
    validateFormat(mrNumber: string): boolean;
    parseInamsosNumber(mrNumber: string): {
        centerPrefix: string;
        year: number;
        sequence: number;
    } | null;
    validateMrPrefix(prefix: string): boolean;
    isMrPrefixUnique(prefix: string, excludeCenterId?: string): Promise<boolean>;
    getStatistics(centerId?: string): Promise<{
        totalSequences: number;
        centers: any[];
    }>;
    resetSequenceCounter(centerId: string, year: number): Promise<void>;
    getCurrentSequence(centerId: string, year?: number): Promise<number>;
    previewNextNumber(centerId: string, year?: number): Promise<string>;
}
