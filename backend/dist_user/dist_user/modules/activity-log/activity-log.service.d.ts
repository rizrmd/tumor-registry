import { PrismaService } from '../../database/prisma.service';
export declare class ActivityLogService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    log(data: {
        actorId?: string;
        action: string;
        entity?: string;
        entityId?: string;
        description?: string;
        centerId?: string;
        ipAddress?: string;
        userAgent?: string;
        requestMethod?: string;
        requestPath?: string;
    }): Promise<void>;
    findAll(params: {
        skip?: number;
        take?: number;
        centerId?: string;
        actorId?: string;
    }): Promise<{
        data: ({
            center: {
                name: string;
            };
            actor: {
                email: string;
                name: string;
            };
        } & {
            centerId: string | null;
            id: string;
            createdAt: Date;
            action: string;
            ipAddress: string | null;
            userAgent: string | null;
            sessionId: string | null;
            actorId: string | null;
            entityId: string | null;
            actorName: string | null;
            actorRole: string | null;
            actorCenterId: string | null;
            entity: string | null;
            changesBefore: import("@prisma/client/runtime/library").JsonValue | null;
            changesAfter: import("@prisma/client/runtime/library").JsonValue | null;
            requestMethod: string | null;
            requestPath: string | null;
        })[];
        total: number;
    }>;
}
