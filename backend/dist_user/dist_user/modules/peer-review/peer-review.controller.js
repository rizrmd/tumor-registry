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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeerReviewController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const peer_review_service_1 = require("./peer-review.service");
const jwt_guard_1 = require("@/modules/auth/guards/jwt.guard");
const create_peer_review_dto_1 = require("./dto/create-peer-review.dto");
const add_peer_comment_dto_1 = require("./dto/add-peer-comment.dto");
const complete_review_dto_1 = require("./dto/complete-review.dto");
let PeerReviewController = class PeerReviewController {
    constructor(peerReviewService) {
        this.peerReviewService = peerReviewService;
    }
    async requestReview(createDto, req) {
        const userId = req.user.userId;
        return await this.peerReviewService.requestReview(createDto, userId);
    }
    async findAll(status, reviewType, assignedTo, requestedBy, page, limit) {
        return await this.peerReviewService.findAll(status, reviewType, assignedTo, requestedBy, page ? parseInt(page) : 1, limit ? parseInt(limit) : 50);
    }
    async getStatistics(req) {
        const userId = req.user.userId;
        return await this.peerReviewService.getReviewStatistics(userId);
    }
    async findById(id) {
        return await this.peerReviewService.findById(id);
    }
    async assign(id, assignedTo, req) {
        const userId = req.user.userId;
        return await this.peerReviewService.assignReview(id, assignedTo, userId);
    }
    async addComment(id, commentDto, req) {
        const userId = req.user.userId;
        return await this.peerReviewService.addComment(id, commentDto, userId);
    }
    async resolveComment(commentId, req) {
        const userId = req.user.userId;
        return await this.peerReviewService.resolveComment(commentId, userId);
    }
    async approve(id, completeDto, req) {
        const userId = req.user.userId;
        return await this.peerReviewService.approveReview(id, completeDto, userId);
    }
    async reject(id, completeDto, req) {
        const userId = req.user.userId;
        return await this.peerReviewService.rejectReview(id, completeDto, userId);
    }
    async awardRecognition(id, reviewerId, recognitionType, title, description, points, req) {
        const userId = req.user.userId;
        return await this.peerReviewService.awardRecognition(id, reviewerId, recognitionType, title, description || '', points || 10, userId);
    }
};
exports.PeerReviewController = PeerReviewController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Request a peer review for data validation' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Peer review requested successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_peer_review_dto_1.CreatePeerReviewDto, Object]),
    __metadata("design:returntype", Promise)
], PeerReviewController.prototype, "requestReview", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all peer reviews with filters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Peer reviews retrieved successfully' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'reviewType', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'assignedTo', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'requestedBy', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('reviewType')),
    __param(2, (0, common_1.Query)('assignedTo')),
    __param(3, (0, common_1.Query)('requestedBy')),
    __param(4, (0, common_1.Query)('page')),
    __param(5, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], PeerReviewController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get peer review statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Statistics retrieved successfully' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PeerReviewController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get peer review details by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Peer Review ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Peer review retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Peer review not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PeerReviewController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id/assign'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign peer review to a reviewer' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Peer Review ID' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                assignedTo: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Peer review assigned successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('assignedTo')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], PeerReviewController.prototype, "assign", null);
__decorate([
    (0, common_1.Post)(':id/comments'),
    (0, swagger_1.ApiOperation)({ summary: 'Add threaded comment to peer review' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Peer Review ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Comment added successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_peer_comment_dto_1.AddPeerCommentDto, Object]),
    __metadata("design:returntype", Promise)
], PeerReviewController.prototype, "addComment", null);
__decorate([
    (0, common_1.Put)('comments/:commentId/resolve'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark comment as resolved' }),
    (0, swagger_1.ApiParam)({ name: 'commentId', description: 'Comment ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Comment resolved successfully' }),
    __param(0, (0, common_1.Param)('commentId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PeerReviewController.prototype, "resolveComment", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve peer review' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Peer Review ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Peer review approved successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, complete_review_dto_1.CompleteReviewDto, Object]),
    __metadata("design:returntype", Promise)
], PeerReviewController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject peer review with reasons' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Peer Review ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Peer review rejected successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, complete_review_dto_1.CompleteReviewDto, Object]),
    __metadata("design:returntype", Promise)
], PeerReviewController.prototype, "reject", null);
__decorate([
    (0, common_1.Post)(':id/recognition'),
    (0, swagger_1.ApiOperation)({ summary: 'Award recognition for quality review' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Peer Review ID' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                reviewerId: { type: 'string' },
                recognitionType: { type: 'string', enum: ['EXCELLENT_REVIEW', 'THOROUGH_ANALYSIS', 'QUICK_TURNAROUND', 'HELPFUL_FEEDBACK', 'QUALITY_IMPROVEMENT', 'EXCEPTIONAL_INSIGHT', 'COLLABORATIVE_APPROACH', 'MENTORSHIP'] },
                title: { type: 'string' },
                description: { type: 'string' },
                points: { type: 'number', default: 10 },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Recognition awarded successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('reviewerId')),
    __param(2, (0, common_1.Body)('recognitionType')),
    __param(3, (0, common_1.Body)('title')),
    __param(4, (0, common_1.Body)('description')),
    __param(5, (0, common_1.Body)('points')),
    __param(6, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Number, Object]),
    __metadata("design:returntype", Promise)
], PeerReviewController.prototype, "awardRecognition", null);
exports.PeerReviewController = PeerReviewController = __decorate([
    (0, swagger_1.ApiTags)('Peer Review'),
    (0, common_1.Controller)('peer-review'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [peer_review_service_1.PeerReviewService])
], PeerReviewController);
//# sourceMappingURL=peer-review.controller.js.map
