import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ActivityLogService {
    private readonly logger = new Logger(ActivityLogService.name);

    constructor(private prisma: PrismaService) { }

    async log(data: {
        actorId?: string;
        action: string;
        entity?: string;
        entityId?: string;
        description?: string; // mapped to changes/details
        centerId?: string;
        ipAddress?: string;
        userAgent?: string;
        requestMethod?: string;
        requestPath?: string;
    }) {
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
                    description: data.description,
                    // Optionally populate denormalized fields if actorId is provided but User record might be deleted later
                    // changesAfter: data.description ? { description: data.description } : undefined,
                },
            });
        } catch (error) {
            this.logger.error('Failed to write activity log', error);
            // Fail silently to not block main flow
        }
    }
    async findAll(params: {
        skip?: number;
        take?: number;
        centerId?: string;
        actorId?: string;
    }) {
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
}
