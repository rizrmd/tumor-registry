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

            // Avoid intercepting read-only search/query operations that might use POST
            // These endpoints don't modify data and shouldn't be synced to remote
            if (url.includes('/search') ||
                url.includes('/search-aggregated') ||
                url.includes('/searchAggregated') ||
                url.includes('/export') ||
                url.includes('/summary') ||
                url.includes('/stats') ||
                url.includes('/statistics') ||
                url.includes('/aggregate') ||
                url.includes('/analytics')) {
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
                'vital-signs': 'vital-sign',
                'laboratory-results': 'laboratory-result',
                'radiology-results': 'radiology-result',
                'pathology-reports': 'pathology-report',
                'medical-records': 'medical-record',
                'medical-imaging': 'medical-image',
                'centers': 'center',
                'users': 'user',
                'clinical-photos': 'clinical-photo',
                'staging-data': 'staging-data',
                'musculoskeletal': 'msts-score',
                'msts-scores': 'msts-score',
                'follow-ups': 'follow-up-visit',
                'research-requests': 'research-request',
            };

            const normalizedEntityType = entityMap[parts[0]] || parts[0];

            // Determine operation
            let operation: OfflineOperation;
            let payload = { ...body };

            switch (method) {
                case 'POST':
                    operation = OfflineOperation.CREATE;
                    // For POST, the ID might be in the response
                    if (!entityId && response?.id) {
                        entityId = response.id;
                    }
                    if (entityId && !payload.id) {
                        payload.id = entityId;
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

            // Skip common non-entity endpoints and analytics/reporting endpoints
            // These are query-only operations that don't modify core data
            const skipEndpoints = [
                'auth', 'health', 'app-config',
                'national-dashboard', 'dashboard', 'analytics',
                'report', 'export', 'statistics', 'aggregate'
            ];
            if (skipEndpoints.some(ep => normalizedEntityType.includes(ep))) {
                return;
            }

            await this.offlineQueueService.queueOfflineData(
                {
                    entityType: normalizedEntityType,
                    entityId: entityId || undefined,
                    operation,
                    data: payload,
                    localTimestamp: new Date().toISOString(),
                    metadata: {
                        url,
                        method,
                        timestamp: new Date().toISOString(),
                    },
                },
                user?.id || null,
            );
        } catch (error) {
            this.logger.error('Error in MutationInterceptor', error);
        }
    }
}
