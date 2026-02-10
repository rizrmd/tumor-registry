export declare enum PeerReviewEntity {
    PATIENT_RECORD = "PATIENT_RECORD",
    DIAGNOSIS = "DIAGNOSIS",
    TREATMENT_PLAN = "TREATMENT_PLAN",
    MEDICAL_RECORD = "MEDICAL_RECORD",
    LABORATORY_RESULT = "LABORATORY_RESULT",
    RADIOLOGY_REPORT = "RADIOLOGY_REPORT",
    PATHOLOGY_REPORT = "PATHOLOGY_REPORT",
    CASE_REVIEW = "CASE_REVIEW",
    RESEARCH_DATA = "RESEARCH_DATA",
    DATA_ENTRY = "DATA_ENTRY"
}
export declare enum PeerReviewType {
    QUALITY_CHECK = "QUALITY_CHECK",
    DATA_VALIDATION = "DATA_VALIDATION",
    CLINICAL_REVIEW = "CLINICAL_REVIEW",
    COMPLETENESS_CHECK = "COMPLETENESS_CHECK",
    ACCURACY_VERIFICATION = "ACCURACY_VERIFICATION",
    PROTOCOL_COMPLIANCE = "PROTOCOL_COMPLIANCE",
    DOCUMENTATION_REVIEW = "DOCUMENTATION_REVIEW",
    PEER_CONSULTATION = "PEER_CONSULTATION"
}
export declare enum ReviewPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    URGENT = "URGENT",
    CRITICAL = "CRITICAL"
}
export declare class CreatePeerReviewDto {
    entityType: PeerReviewEntity;
    entityId: string;
    reviewType?: PeerReviewType;
    assignedTo?: string;
    priority?: ReviewPriority;
    dueDate?: string;
    title: string;
    description?: string;
    context?: any;
    checklist?: any;
    tags?: string[];
}
