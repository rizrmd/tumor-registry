import { PrismaService } from '../../database/prisma.service';
export declare class MedicalRecordService {
    private prisma;
    constructor(prisma: PrismaService);
    generateInamsosNumber(centerId: string): Promise<string>;
    validateFormat(mrNumber: string): boolean;
    parseNumber(mrNumber: string): {
        centerPrefix: string;
        year: number;
        sequence: number;
    };
}
