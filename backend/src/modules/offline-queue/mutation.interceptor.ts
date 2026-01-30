import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OfflineQueueService } from './offline-queue.service';
import { OfflineOperation } from './dto/sync-offline-data.dto';

@Injectable()
export class MutationInterceptor implements NestInterceptor {
    private readonly logger = new Logger(MutationInterceptor.name);

    constructor(private offlineQueueService: OfflineQueueService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const { method, url } = request;

        // Only intercept state-changing methods
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
            // Avoid intercepting the offline queue operations themselves
            if (url.includes('/offline-queue')) {
                return next.handle();
            }

            return next.handle().pipe(
                tap({
                    next: (response) => {
                        // Only queue if successful (status 2xx)
                        this.handleMutation(request, response);
                    },
                }),
            );
        }

        return next.handle();
    }

    private async handleMutation(request: any, response: any) {
        try {
            const { method, url, body, user } = request;

            // Determine entity type and ID from URL
            // Heuristic: first part of path is usually the entity (e.g., /api/v1/patients -> patients)
            const parts = url.split('/').filter((p) => p && p !== 'api' && p !== 'v1');
            if (parts.length === 0) return;

            const entityType = parts[0].slice(0, -1); // patients -> patient, diagnoses -> diagnos (will fix)
            let entityId = parts.length > 1 ? parts[1] : null;

            // Handle common singular/plural mapping
            const entityMap: Record<string, string> = {
                'patients': 'patient',
                'diagnoses': 'diagnosis',
                'medications': 'medication',
                'centers': 'center',
                'users': 'user',
                'clinical-photos': 'clinical-photo',
                'medical-imaging': 'medical-imaging',
                'musculoskeletal': 'msts-score',
            };

            const normalizedEntityType = entityMap[parts[0]] || parts[0];

            // Determine operation
            let operation: OfflineOperation;
            switch (method) {
                case 'POST':
                    operation = OfflineOperation.CREATE;
                    // For POST, the ID might be in the response
                    if (!entityId && response?.id) {
                        entityId = response.id;
                    }
                    break;
                case 'PUT':
                case 'PATCH':
                    operation = OfflineOperation.UPDATE;
                    break;
                case 'DELETE':
                    operation = OfflineOperation.DELETE;
                    break;
                default:
                    return;
            }

            // Skip common non-entity endpoints
            if (['auth', 'health', 'app-config'].includes(normalizedEntityType)) {
                return;
            }

            await this.offlineQueueService.queueOfflineData(
                {
                    entityType: normalizedEntityType,
                    entityId: entityId || undefined,
                    operation,
                    data: body,
                    localTimestamp: new Date().toISOString(),
                    metadata: {
                        url,
                        method,
                        timestamp: new Date().toISOString(),
                    },
                },
                user?.id || 'SYSTEM',
            );
        } catch (error) {
            this.logger.error('Error in MutationInterceptor', error);
        }
    }
}
