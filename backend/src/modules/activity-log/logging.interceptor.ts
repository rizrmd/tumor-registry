import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { ActivityLogService } from './activity-log.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

    constructor(
        private activityLogService: ActivityLogService,
        private reflector: Reflector,
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const { method, url, body, user, ip } = request;

        // Only log state-changing methods or specific GETs if critical
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
            return next.handle().pipe(
                tap({
                    next: () => {
                        this.logActivity(request, user, 'SUCCESS');
                    },
                    error: (error) => {
                        this.logActivity(request, user, 'FAILED', error.message);
                    },
                }),
            );
        }

        return next.handle();
    }

    private async logActivity(request: any, user: any, status: string, errorMessage?: string) {
        try {
            const { method, url, params, query } = request;

            // Determine action and entity from URL (simplified heuristics)
            // e.g., /api/v1/patients/123 -> Entity: Patient, EntityId: 123
            const urlPath = url.replace('/api/v1/', '').split('?')[0];
            const parts = urlPath.split('/').filter(p => p);

            let entity = 'SYSTEM';
            let entityId = null;

            if (parts.length > 0) {
                entity = parts[0].toUpperCase().replace(/-/g, '_');
                if (parts.length > 1) {
                    // Check if second part is ID (Simplified: not a sub-resource like 'sync')
                    if (parts[1].length > 10 || parts[1].match(/^\d+$/)) {
                        entityId = parts[1];
                    }
                }
            }

            const actionLabel = {
                'POST': 'Menambahkan',
                'PUT': 'Memperbarui',
                'PATCH': 'Mengubah',
                'DELETE': 'Menghapus'
            }[method] || 'Melakukan';

            const entityLabel = entity.charAt(0) + entity.slice(1).toLowerCase().replace(/_/g, ' ');
            const action = `${method}_${entity}`.replace(/S$/, ''); // Singularize if ends with S

            await this.activityLogService.log({
                actorId: user?.userId || user?.id, // Fallback just in case
                action: status === 'FAILED' ? `${action}_FAILED` : action,
                entity: entity.replace(/S$/, ''), // Singular
                entityId: entityId || undefined,
                description: errorMessage
                    ? `Gagal: ${errorMessage}`
                    : `${actionLabel} ${entityLabel}${entityId ? ` (${entityId})` : ''}`,
                centerId: user?.centerId,
                ipAddress: request.ip,
                userAgent: request.headers['user-agent'],
                requestMethod: method,
                requestPath: url,
            });
        } catch (err) {
            this.logger.error('Logging interceptor error', err);
        }
    }
}
