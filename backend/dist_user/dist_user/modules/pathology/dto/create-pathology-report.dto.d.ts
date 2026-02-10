export declare enum BiopsyType {
    INCISIONAL = "Incisional",
    EXCISIONAL = "Excisional",
    CORE_NEEDLE = "Core needle",
    FINE_NEEDLE_ASPIRATION = "Fine needle aspiration",
    BONE_BIOPSY = "Bone biopsy",
    SOFT_TISSUE_BIOPSY = "Soft tissue biopsy"
}
export declare enum PathologyStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    REVIEWED = "REVIEWED",
    AMENDED = "AMENDED"
}
export declare enum TumorGrade {
    LOW_GRADE_G1 = "Low-grade (G1)",
    HIGH_GRADE_G2 = "High-grade (G2)",
    UNDIFFERENTIATED_G3 = "Undifferentiated (G3)"
}
export declare class CreatePathologyReportDto {
    patientId: string;
    reportNumber: string;
    biopsyType: BiopsyType;
    biopsyDate: string;
    specimenReceivedDate?: string;
    specimenSite: string;
    specimenDescription?: string;
    grossDescription: string;
    microscopicDescription: string;
    diagnosis: string;
    tumorGrade?: TumorGrade;
    mitosisCount?: string;
    necrosisPercentage?: string;
    cellularity?: string;
    immunohistochemistry?: string;
    molecularFindings?: string;
    marginsStatus?: string;
    isMalignant?: boolean;
    status: PathologyStatus;
    comments?: string;
    pathologistId: string;
    reportDate?: string;
    specialStains?: string[];
    ihcMarkers?: string[];
}
