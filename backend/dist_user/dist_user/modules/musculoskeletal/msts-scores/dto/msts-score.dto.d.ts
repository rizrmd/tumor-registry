export declare class MstsScoreDto {
    id: string;
    patientId: string;
    followUpVisitId?: string;
    pain: number;
    function: number;
    emotionalAcceptance: number;
    supports: number;
    walking: number;
    gait: number;
    totalScore: number;
    assessmentDate: Date;
    assessedBy: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CreateMstsScoreDto {
    patientId: string;
    followUpVisitId?: string;
    pain: number;
    function: number;
    emotionalAcceptance: number;
    supports: number;
    walking: number;
    gait: number;
    assessmentDate: string;
    assessedBy: string;
    notes?: string;
}
export declare class UpdateMstsScoreDto {
    pain?: number;
    function?: number;
    emotionalAcceptance?: number;
    supports?: number;
    walking?: number;
    gait?: number;
    assessmentDate?: string;
    assessedBy?: string;
    notes?: string;
}
