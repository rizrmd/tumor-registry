import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OfflineQueueService } from './offline-queue.service';
export declare class MutationInterceptor implements NestInterceptor {
    private offlineQueueService;
    private readonly logger;
    constructor(offlineQueueService: OfflineQueueService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private handleMutation;
}
