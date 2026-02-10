import { PrismaService } from '@/database/prisma.service';
import { CreatePeerReviewDto } from './dto/create-peer-review.dto';
import { AddPeerCommentDto } from './dto/add-peer-comment.dto';
import { CompleteReviewDto } from './dto/complete-review.dto';
export declare class PeerReviewService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    requestReview(createDto: CreatePeerReviewDto, userId: string): Promise<any>;
    findAll(status?: string, reviewType?: string, assignedTo?: string, requestedBy?: string, page?: number, limit?: number): Promise<any>;
    findById(id: string): Promise<any>;
    assignReview(id: string, assignedTo: string, userId: string): Promise<any>;
    addComment(peerReviewId: string, commentDto: AddPeerCommentDto, userId: string): Promise<any>;
    resolveComment(commentId: string, userId: string): Promise<any>;
    approveReview(id: string, completeDto: CompleteReviewDto, userId: string): Promise<any>;
    rejectReview(id: string, completeDto: CompleteReviewDto, userId: string): Promise<any>;
    awardRecognition(peerReviewId: string, reviewerId: string, recognitionType: string, title: string, description: string, points: number, userId: string): Promise<any>;
    getReviewStatistics(userId?: string): Promise<any>;
    private verifyEntity;
    private getReviewTypeStatistics;
}
