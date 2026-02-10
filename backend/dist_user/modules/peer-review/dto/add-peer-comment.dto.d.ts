export declare enum CommentType {
    GENERAL = "GENERAL",
    QUESTION = "QUESTION",
    CONCERN = "CONCERN",
    SUGGESTION = "SUGGESTION",
    APPROVAL = "APPROVAL",
    REJECTION = "REJECTION",
    CLARIFICATION = "CLARIFICATION",
    FOLLOW_UP = "FOLLOW_UP"
}
export declare enum CommentSeverity {
    INFO = "INFO",
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    CRITICAL = "CRITICAL"
}
export declare class AddPeerCommentDto {
    comment: string;
    parentId?: string;
    commentType?: CommentType;
    severity?: CommentSeverity;
    lineReference?: string;
    suggestion?: string;
    isInternal?: boolean;
    mentions?: string[];
    attachments?: any;
}
