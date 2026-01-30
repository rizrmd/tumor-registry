import apiClient from './api.config';

export interface ActivityLog {
    id: string;
    actorId: string;
    action: string;
    entity?: string;
    entityId?: string;
    description?: string;
    centerId?: string;
    ipAddress?: string;
    userAgent?: string;
    createdAt: string;
    changesAfter?: any;
    actor?: {
        name: string;
        email: string;
    };
    center?: {
        name: string;
    };
}

export interface AuditLogResponse {
    data: ActivityLog[];
    total: number;
}

export interface AuditLogParams {
    page?: number;
    limit?: number;
    centerId?: string;
    actorId?: string;
}

class AuditLogsService {
    /**
     * Get activity logs
     */
    async getLogs(params: AuditLogParams = {}): Promise<AuditLogResponse> {
        const response = await apiClient.get<AuditLogResponse>('/activity-logs', {
            params,
        });
        return response.data;
    }
}

export default new AuditLogsService();
