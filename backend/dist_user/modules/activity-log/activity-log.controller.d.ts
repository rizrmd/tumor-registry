import { ActivityLogService } from './activity-log.service';
export declare class ActivityLogController {
    private readonly activityLogService;
    constructor(activityLogService: ActivityLogService);
    findAll(page?: string, limit?: string, centerId?: string, actorId?: string): Promise<{
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
