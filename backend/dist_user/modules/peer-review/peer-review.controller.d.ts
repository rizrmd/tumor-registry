import { PeerReviewService } from './peer-review.service';
import { CreatePeerReviewDto } from './dto/create-peer-review.dto';
import { AddPeerCommentDto } from './dto/add-peer-comment.dto';
import { CompleteReviewDto } from './dto/complete-review.dto';
export declare class PeerReviewController {
    private readonly peerReviewService;
    constructor(peerReviewService: PeerReviewService);
    requestReview(createDto: CreatePeerReviewDto, req: any): Promise<any>;
    findAll(status?: string, reviewType?: string, assignedTo?: string, requestedBy?: string, page?: string, limit?: string): Promise<any>;
    getStatistics(req: any): Promise<any>;
    findById(id: string): Promise<any>;
    assign(id: string, assignedTo: string, req: any): Promise<any>;
    addComment(id: string, commentDto: AddPeerCommentDto, req: any): Promise<any>;
    resolveComment(commentId: string, req: any): Promise<any>;
    approve(id: string, completeDto: CompleteReviewDto, req: any): Promise<any>;
    reject(id: string, completeDto: CompleteReviewDto, req: any): Promise<any>;
    awardRecognition(id: string, reviewerId: string, recognitionType: string, title: string, description: string, points: number, req: any): Promise<any>;
}
