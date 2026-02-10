"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const core_1 = require("@nestjs/core");
const activity_log_service_1 = require("./activity-log.service");
let LoggingInterceptor = LoggingInterceptor_1 = class LoggingInterceptor {
    constructor(activityLogService, reflector) {
        this.activityLogService = activityLogService;
        this.reflector = reflector;
        this.logger = new common_1.Logger(LoggingInterceptor_1.name);
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url, body, user, ip } = request;
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
            return next.handle().pipe((0, operators_1.tap)({
                next: () => {
                    this.logActivity(request, user, 'SUCCESS');
                },
                error: (error) => {
                    this.logActivity(request, user, 'FAILED', error.message);
                },
            }));
        }
        return next.handle();
    }
    async logActivity(request, user, status, errorMessage) {
        try {
            const { method, url, params, query } = request;
            const parts = url.split('/').filter(p => p);
            let entity = 'UNKNOWN';
            let entityId = null;
            if (parts.length > 0) {
                entity = parts[0].toUpperCase().replace(/-/g, '_');
                if (parts.length > 1) {
                    if (parts[1].match(/^[a-zA-Z0-9-]+$/)) {
                        entityId = parts[1];
                    }
                }
            }
            const action = `${method}_${entity.slice(0, -1)}`;
            await this.activityLogService.log({
                actorId: user?.id,
                action: status === 'FAILED' ? `${action}_FAILED` : action,
                entity: entity.slice(0, -1),
                entityId: entityId || undefined,
                description: errorMessage ? `Failed: ${errorMessage}` : `Operation ${method} on ${url}`,
                centerId: user?.centerId,
                ipAddress: request.ip,
                userAgent: request.headers['user-agent'],
                requestMethod: method,
                requestPath: url,
            });
        }
        catch (err) {
            this.logger.error('Logging interceptor error', err);
        }
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = LoggingInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_log_service_1.ActivityLogService,
        core_1.Reflector])
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map
