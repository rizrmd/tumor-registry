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
var ActivityLogService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let ActivityLogService = ActivityLogService_1 = class ActivityLogService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(ActivityLogService_1.name);
    }
    async log(data) {
        try {
            await this.prisma.activityLog.create({
                data: {
                    actorId: data.actorId,
                    action: data.action,
                    entity: data.entity,
                    entityId: data.entityId,
                    centerId: data.centerId,
                    ipAddress: data.ipAddress,
                    userAgent: data.userAgent,
                    requestMethod: data.requestMethod,
                    requestPath: data.requestPath,
                    changesAfter: data.description ? { description: data.description } : undefined,
                },
            });
        }
        catch (error) {
            this.logger.error('Failed to write activity log', error);
        }
    }
    async findAll(params) {
        const { skip, take, centerId, actorId } = params;
        const [data, total] = await Promise.all([
            this.prisma.activityLog.findMany({
                skip,
                take,
                where: {
                    centerId,
                    actorId
                },
                include: {
                    actor: {
                        select: {
                            name: true,
                            email: true
                        }
                    },
                    center: {
                        select: {
                            name: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            this.prisma.activityLog.count({
                where: {
                    centerId,
                    actorId
                }
            })
        ]);
        return { data, total };
    }
};
exports.ActivityLogService = ActivityLogService;
exports.ActivityLogService = ActivityLogService = ActivityLogService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ActivityLogService);
//# sourceMappingURL=activity-log.service.js.map