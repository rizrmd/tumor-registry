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
var MutationInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const offline_queue_service_1 = require("./offline-queue.service");
const sync_offline_data_dto_1 = require("./dto/sync-offline-data.dto");
let MutationInterceptor = MutationInterceptor_1 = class MutationInterceptor {
    constructor(offlineQueueService) {
        this.offlineQueueService = offlineQueueService;
        this.logger = new common_1.Logger(MutationInterceptor_1.name);
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url } = request;
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
            if (url.includes('/offline-queue')) {
                return next.handle();
            }
            return next.handle().pipe((0, operators_1.tap)({
                next: (response) => {
                    this.handleMutation(request, response);
                },
            }));
        }
        return next.handle();
    }
    async handleMutation(request, response) {
        try {
            const { method, url, body, user } = request;
            const parts = url.split('/').filter((p) => p && p !== 'api' && p !== 'v1');
            if (parts.length === 0)
                return;
            const entityType = parts[0].slice(0, -1);
            let entityId = parts.length > 1 ? parts[1] : null;
            const entityMap = {
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
            let operation;
            let payload = { ...body };
            switch (method) {
                case 'POST':
                    operation = sync_offline_data_dto_1.OfflineOperation.CREATE;
                    if (!entityId && response?.id) {
                        entityId = response.id;
                    }
                    if (entityId && !payload.id) {
                        payload.id = entityId;
                    }
                    break;
                case 'PUT':
                case 'PATCH':
                    operation = sync_offline_data_dto_1.OfflineOperation.UPDATE;
                    break;
                case 'DELETE':
                    operation = sync_offline_data_dto_1.OfflineOperation.DELETE;
                    break;
                default:
                    return;
            }
            if (['auth', 'health', 'app-config'].includes(normalizedEntityType)) {
                return;
            }
            await this.offlineQueueService.queueOfflineData({
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
            }, user?.id || null);
        }
        catch (error) {
            this.logger.error('Error in MutationInterceptor', error);
        }
    }
};
exports.MutationInterceptor = MutationInterceptor;
exports.MutationInterceptor = MutationInterceptor = MutationInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [offline_queue_service_1.OfflineQueueService])
], MutationInterceptor);
//# sourceMappingURL=mutation.interceptor.js.map