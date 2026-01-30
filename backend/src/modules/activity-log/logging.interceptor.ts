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
            // e.g., /patients/123 -> Entity: Patient, EntityId: 123
            const parts = url.split('/').filter(p => p);
            let entity = 'UNKNOWN';
            let entityId = null;

            if (parts.length > 0) {
                entity = parts[0].toUpperCase().replace(/-/g, '_'); // e.g. RESEARCH_REQUESTS
                if (parts.length > 1) {
                    // Check if second part is ID (simplified check)
                    if (parts[1].match(/^[a-zA-Z0-9-]+$/)) {
                        entityId = parts[1];
                    }
                }
            }

            const action = `${method}_${entity.slice(0, -1)}`; // CREATE_PATIENT

            await this.activityLogService.log({
                actorId: user?.id,
                action: status === 'FAILED' ? `${action}_FAILED` : action,
                entity: entity.slice(0, -1), // Singular
                entityId: entityId || undefined,
                description: errorMessage ? `Failed: ${errorMessage}` : `Operation ${method} on ${url}`,
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
