export declare class FollowUpVisitDto {
    id: string;
    patientId: string;
    visitNumber: number;
    scheduledDate: Date;
    actualDate?: Date;
    visitType: string;
    status: string;
    examinedBy?: string;
    chiefComplaint?: string;
    physicalExamination?: string;
    supportingExamination?: string;
    clinicalStatus?: string;
    localRecurrence?: boolean;
    distantMetastasis?: boolean;
    metastasisSites?: string;
    currentTreatment?: string;
    mstsScoreId?: string;
    karnofskyScore?: number;
    imagingPerformed?: string;
    imagingFindings?: string;
    labResults?: string;
    complications?: string;
    nextVisitDate?: Date;
    notes?: string;
    reminderSent?: boolean;
    reminderDate?: Date;
    reminderMethod?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CreateFollowUpVisitDto {
    patientId: string;
    visitNumber: number;
    scheduledDate: string;
    visitType: string;
    actualDate?: string;
    status?: string;
}
export declare class UpdateFollowUpVisitDto {
    actualDate?: string;
    status?: string;
    examinedBy?: string;
    chiefComplaint?: string;
    physicalExamination?: string;
    supportingExamination?: string;
    clinicalStatus?: string;
    localRecurrence?: boolean;
    distantMetastasis?: boolean;
    metastasisSites?: string;
    currentTreatment?: string;
    mstsScoreId?: string;
    karnofskyScore?: number;
    imagingPerformed?: string;
    imagingFindings?: string;
    labResults?: string;
    complications?: string;
    nextVisitDate?: string;
    notes?: string;
    reminderSent?: boolean;
    reminderDate?: string;
    reminderMethod?: string;
}
export declare class GenerateFollowUpScheduleDto {
    patientId: string;
    treatmentCompletionDate: string;
}
