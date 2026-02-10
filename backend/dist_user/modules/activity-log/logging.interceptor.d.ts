import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ActivityLogService } from './activity-log.service';
export declare class LoggingInterceptor implements NestInterceptor {
    private activityLogService;
    private reflector;
    private readonly logger;
    constructor(activityLogService: ActivityLogService, reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private logActivity;
}
