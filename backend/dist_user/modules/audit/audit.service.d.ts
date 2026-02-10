import { PrismaService } from '@/database/prisma.service';
export declare class AuditLogService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    log(action: string, userId: string, details?: any): Promise<void>;
    logResearchAction(action: string, userId: string, researchId: string, details?: any): Promise<void>;
}
