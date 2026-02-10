export declare enum ImageQuality {
    EXCELLENT = "EXCELLENT",
    GOOD = "GOOD",
    STANDARD = "STANDARD",
    POOR = "POOR",
    NEEDS_REVIEW = "NEEDS_REVIEW"
}
export declare class UpdateImageDto {
    description?: string;
    findings?: string;
    bodyPart?: string;
    tags?: string[];
    annotations?: any;
    quality?: ImageQuality;
}
