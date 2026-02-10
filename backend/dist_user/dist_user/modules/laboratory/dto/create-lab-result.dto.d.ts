export declare enum LabTestType {
    TUMOR_MARKER = "TUMOR_MARKER",
    CBC = "CBC",
    CHEMISTRY = "CHEMISTRY",
    COAGULATION = "COAGULATION",
    URINALYSIS = "URINALYSIS",
    GENETIC = "GENETIC",
    MOLECULAR = "MOLECULAR",
    OTHER = "OTHER"
}
export declare enum LabResultStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    ABNORMAL = "ABNORMAL",
    CRITICAL = "CRITICAL",
    CANCELLED = "CANCELLED"
}
export declare class CreateLabResultDto {
    patientId: string;
    testType: LabTestType;
    testName: string;
    result: string;
    normalRange?: string;
    unit?: string;
    status: LabResultStatus;
    notes?: string;
    orderedBy: string;
    performedAt?: string;
}
