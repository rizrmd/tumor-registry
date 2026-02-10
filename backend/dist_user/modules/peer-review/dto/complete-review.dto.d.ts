export declare enum ReviewRecommendation {
    APPROVE = "APPROVE",
    APPROVE_WITH_CHANGES = "APPROVE_WITH_CHANGES",
    MINOR_REVISION = "MINOR_REVISION",
    MAJOR_REVISION = "MAJOR_REVISION",
    REJECT = "REJECT",
    ESCALATE = "ESCALATE",
    NEEDS_DISCUSSION = "NEEDS_DISCUSSION"
}
export declare class CompleteReviewDto {
    score?: number;
    recommendation: ReviewRecommendation;
    requiresChanges?: boolean;
    findings?: any;
    rejectionReason?: string;
    timeSpent?: number;
}
