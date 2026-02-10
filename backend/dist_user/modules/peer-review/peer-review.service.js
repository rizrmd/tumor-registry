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
var PeerReviewService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeerReviewService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("@/database/prisma.service");
let PeerReviewService = PeerReviewService_1 = class PeerReviewService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(PeerReviewService_1.name);
    }
    async requestReview(createDto, userId) {
        try {
            await this.verifyEntity(createDto.entityType, createDto.entityId);
            const peerReview = await this.prisma.peerReview.create({
                data: {
                    entityType: createDto.entityType,
                    entityId: createDto.entityId,
                    reviewType: createDto.reviewType || 'QUALITY_CHECK',
                    requestedBy: userId,
                    assignedTo: createDto.assignedTo,
                    assignedAt: createDto.assignedTo ? new Date() : undefined,
                    status: createDto.assignedTo ? 'ASSIGNED' : 'PENDING',
                    priority: createDto.priority || 'MEDIUM',
                    dueDate: createDto.dueDate ? new Date(createDto.dueDate) : undefined,
                    title: createDto.title,
                    description: createDto.description,
                    context: createDto.context,
                    checklist: createDto.checklist,
                    tags: createDto.tags || [],
                },
                include: {
                    comments: true,
                    recognitions: true,
                },
            });
            await this.prisma.auditLog.create({
                data: {
                    userId,
                    action: 'REQUEST_PEER_REVIEW',
                    resource: 'PeerReview',
                    details: {
                        peerReviewId: peerReview.id,
                        entityType: createDto.entityType,
                        entityId: createDto.entityId,
                        reviewType: createDto.reviewType,
                    },
                },
            });
            this.logger.log(`Peer review requested: ${peerReview.id} for ${createDto.entityType} ${createDto.entityId}`);
            return peerReview;
        }
        catch (error) {
            this.logger.error('Error requesting peer review', error);
            throw error;
        }
    }
    async findAll(status, reviewType, assignedTo, requestedBy, page = 1, limit = 50) {
        try {
            const skip = (page - 1) * limit;
            const where = {
                isActive: true,
                ...(status && { status }),
                ...(reviewType && { reviewType }),
                ...(assignedTo && { assignedTo }),
                ...(requestedBy && { requestedBy }),
            };
            const [reviews, total] = await Promise.all([
                this.prisma.peerReview.findMany({
                    where,
                    include: {
                        _count: {
                            select: {
                                comments: true,
                                recognitions: true,
                            },
                        },
                    },
                    orderBy: [
                        { priority: 'desc' },
                        { requestedAt: 'desc' },
                    ],
                    skip,
                    take: limit,
                }),
                this.prisma.peerReview.count({ where }),
            ]);
            const totalPages = Math.ceil(total / limit);
            return {
                reviews,
                total,
                page,
                totalPages,
            };
        }
        catch (error) {
            this.logger.error('Error finding peer reviews', error);
            throw error;
        }
    }
    async findById(id) {
        try {
            const peerReview = await this.prisma.peerReview.findUnique({
                where: { id },
                include: {
                    comments: {
                        where: { isDeleted: false },
                        orderBy: { createdAt: 'asc' },
                        include: {
                            replies: {
                                where: { isDeleted: false },
                            },
                        },
                    },
                    recognitions: {
                        orderBy: { awardedAt: 'desc' },
                    },
                },
            });
            if (!peerReview) {
                throw new common_1.NotFoundException(`Peer review with ID ${id} not found`);
            }
            if (!peerReview.isActive) {
                throw new common_1.NotFoundException(`Peer review with ID ${id} is not active`);
            }
            return peerReview;
        }
        catch (error) {
            this.logger.error(`Error finding peer review by ID: ${id}`, error);
            throw error;
        }
    }
    async assignReview(id, assignedTo, userId) {
        try {
            const peerReview = await this.findById(id);
            const updated = await this.prisma.peerReview.update({
                where: { id },
                data: {
                    assignedTo,
                    assignedAt: new Date(),
                    status: 'ASSIGNED',
                },
            });
            await this.prisma.auditLog.create({
                data: {
                    userId,
                    action: 'ASSIGN_PEER_REVIEW',
                    resource: 'PeerReview',
                    details: {
                        peerReviewId: id,
                        assignedTo,
                    },
                },
            });
            this.logger.log(`Peer review ${id} assigned to ${assignedTo}`);
            return updated;
        }
        catch (error) {
            this.logger.error(`Error assigning peer review ${id}`, error);
            throw error;
        }
    }
    async addComment(peerReviewId, commentDto, userId) {
        try {
            const peerReview = await this.findById(peerReviewId);
            if (commentDto.parentId) {
                const parentComment = await this.prisma.peerReviewComment.findUnique({
                    where: { id: commentDto.parentId },
                });
                if (!parentComment || parentComment.peerReviewId !== peerReviewId) {
                    throw new common_1.BadRequestException('Invalid parent comment');
                }
            }
            const comment = await this.prisma.peerReviewComment.create({
                data: {
                    peerReviewId,
                    parentId: commentDto.parentId,
                    userId,
                    comment: commentDto.comment,
                    commentType: commentDto.commentType || 'GENERAL',
                    severity: commentDto.severity || 'INFO',
                    lineReference: commentDto.lineReference,
                    suggestion: commentDto.suggestion,
                    isInternal: commentDto.isInternal || false,
                    mentions: commentDto.mentions || [],
                    attachments: commentDto.attachments,
                },
                include: {
                    replies: true,
                },
            });
            if (peerReview.status === 'ASSIGNED') {
                await this.prisma.peerReview.update({
                    where: { id: peerReviewId },
                    data: { status: 'IN_PROGRESS' },
                });
            }
            await this.prisma.auditLog.create({
                data: {
                    userId,
                    action: 'ADD_PEER_REVIEW_COMMENT',
                    resource: 'PeerReview',
                    details: {
                        peerReviewId,
                        commentId: comment.id,
                        commentType: commentDto.commentType,
                        severity: commentDto.severity,
                    },
                },
            });
            this.logger.log(`Comment added to peer review ${peerReviewId}`);
            return comment;
        }
        catch (error) {
            this.logger.error(`Error adding comment to peer review ${peerReviewId}`, error);
            throw error;
        }
    }
    async resolveComment(commentId, userId) {
        try {
            const comment = await this.prisma.peerReviewComment.findUnique({
                where: { id: commentId },
            });
            if (!comment) {
                throw new common_1.NotFoundException(`Comment with ID ${commentId} not found`);
            }
            const resolved = await this.prisma.peerReviewComment.update({
                where: { id: commentId },
                data: {
                    isResolved: true,
                    resolvedBy: userId,
                    resolvedAt: new Date(),
                },
            });
            this.logger.log(`Comment ${commentId} resolved by ${userId}`);
            return resolved;
        }
        catch (error) {
            this.logger.error(`Error resolving comment ${commentId}`, error);
            throw error;
        }
    }
    async approveReview(id, completeDto, userId) {
        try {
            const peerReview = await this.findById(id);
            const approved = await this.prisma.peerReview.update({
                where: { id },
                data: {
                    status: 'APPROVED',
                    score: completeDto.score,
                    recommendation: completeDto.recommendation,
                    requiresChanges: completeDto.requiresChanges || false,
                    findings: completeDto.findings,
                    approvedBy: userId,
                    approvedAt: new Date(),
                    completedAt: new Date(),
                    timeSpent: completeDto.timeSpent,
                },
            });
            await this.prisma.auditLog.create({
                data: {
                    userId,
                    action: 'APPROVE_PEER_REVIEW',
                    resource: 'PeerReview',
                    details: {
                        peerReviewId: id,
                        recommendation: completeDto.recommendation,
                        score: completeDto.score,
                    },
                },
            });
            this.logger.log(`Peer review ${id} approved by ${userId}`);
            return approved;
        }
        catch (error) {
            this.logger.error(`Error approving peer review ${id}`, error);
            throw error;
        }
    }
    async rejectReview(id, completeDto, userId) {
        try {
            const peerReview = await this.findById(id);
            const rejected = await this.prisma.peerReview.update({
                where: { id },
                data: {
                    status: 'REJECTED',
                    score: completeDto.score,
                    recommendation: completeDto.recommendation,
                    requiresChanges: true,
                    findings: completeDto.findings,
                    rejectedBy: userId,
                    rejectedAt: new Date(),
                    rejectionReason: completeDto.rejectionReason,
                    completedAt: new Date(),
                    timeSpent: completeDto.timeSpent,
                },
            });
            await this.prisma.auditLog.create({
                data: {
                    userId,
                    action: 'REJECT_PEER_REVIEW',
                    resource: 'PeerReview',
                    details: {
                        peerReviewId: id,
                        recommendation: completeDto.recommendation,
                        rejectionReason: completeDto.rejectionReason,
                    },
                },
            });
            this.logger.log(`Peer review ${id} rejected by ${userId}`);
            return rejected;
        }
        catch (error) {
            this.logger.error(`Error rejecting peer review ${id}`, error);
            throw error;
        }
    }
    async awardRecognition(peerReviewId, reviewerId, recognitionType, title, description, points, userId) {
        try {
            const peerReview = await this.findById(peerReviewId);
            const recognition = await this.prisma.reviewRecognition.create({
                data: {
                    peerReviewId,
                    reviewerId,
                    recognitionType,
                    awardedBy: userId,
                    title,
                    description,
                    points,
                },
            });
            await this.prisma.auditLog.create({
                data: {
                    userId,
                    action: 'AWARD_REVIEW_RECOGNITION',
                    resource: 'PeerReview',
                    details: {
                        peerReviewId,
                        reviewerId,
                        recognitionType,
                        points,
                    },
                },
            });
            this.logger.log(`Recognition awarded for peer review ${peerReviewId} to reviewer ${reviewerId}`);
            return recognition;
        }
        catch (error) {
            this.logger.error(`Error awarding recognition for peer review ${peerReviewId}`, error);
            throw error;
        }
    }
    async getReviewStatistics(userId) {
        try {
            const where = { isActive: true };
            const [totalPending, totalInProgress, totalCompleted, totalApproved, totalRejected, byReviewType,] = await Promise.all([
                this.prisma.peerReview.count({ where: { ...where, status: 'PENDING' } }),
                this.prisma.peerReview.count({ where: { ...where, status: 'IN_PROGRESS' } }),
                this.prisma.peerReview.count({ where: { ...where, status: 'COMPLETED' } }),
                this.prisma.peerReview.count({ where: { ...where, status: 'APPROVED' } }),
                this.prisma.peerReview.count({ where: { ...where, status: 'REJECTED' } }),
                this.getReviewTypeStatistics(where),
            ]);
            let myAssignments = 0;
            let myRecognitions = 0;
            let myTotalPoints = 0;
            if (userId) {
                myAssignments = await this.prisma.peerReview.count({
                    where: {
                        assignedTo: userId,
                        isActive: true,
                        status: { in: ['ASSIGNED', 'IN_PROGRESS'] },
                    },
                });
                const recognitions = await this.prisma.reviewRecognition.findMany({
                    where: { reviewerId: userId },
                    select: { points: true },
                });
                myRecognitions = recognitions.length;
                myTotalPoints = recognitions.reduce((sum, r) => sum + r.points, 0);
            }
            return {
                totalPending,
                totalInProgress,
                totalCompleted,
                totalApproved,
                totalRejected,
                myAssignments,
                myRecognitions,
                myTotalPoints,
                byReviewType,
            };
        }
        catch (error) {
            this.logger.error('Error getting review statistics', error);
            throw error;
        }
    }
    async verifyEntity(entityType, entityId) {
        let exists = false;
        switch (entityType) {
            case 'PATIENT_RECORD':
                exists = !!(await this.prisma.patient.findUnique({ where: { id: entityId } }));
                break;
            case 'DIAGNOSIS':
                exists = !!(await this.prisma.patientDiagnosis.findUnique({ where: { id: entityId } }));
                break;
            case 'MEDICAL_RECORD':
                exists = !!(await this.prisma.medicalRecord.findUnique({ where: { id: entityId } }));
                break;
            case 'LABORATORY_RESULT':
                exists = !!(await this.prisma.laboratoryResult.findUnique({ where: { id: entityId } }));
                break;
            case 'RADIOLOGY_REPORT':
                exists = !!(await this.prisma.radiologyResult.findUnique({ where: { id: entityId } }));
                break;
            case 'CASE_REVIEW':
                exists = !!(await this.prisma.caseReview.findUnique({ where: { id: entityId } }));
                break;
            default:
                return;
        }
        if (!exists) {
            throw new common_1.NotFoundException(`Entity ${entityType} with ID ${entityId} not found`);
        }
    }
    async getReviewTypeStatistics(where) {
        const stats = await this.prisma.peerReview.groupBy({
            by: ['reviewType'],
            where,
            _count: { reviewType: true },
        });
        return stats.reduce((acc, stat) => {
            acc[stat.reviewType] = stat._count.reviewType;
            return acc;
        }, {});
    }
};
exports.PeerReviewService = PeerReviewService;
exports.PeerReviewService = PeerReviewService = PeerReviewService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PeerReviewService);
//# sourceMappingURL=peer-review.service.js.map