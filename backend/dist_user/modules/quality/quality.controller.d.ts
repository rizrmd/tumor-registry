import { QualityService } from './quality.service';
export declare class QualityController {
    private readonly qualityService;
    private readonly logger;
    constructor(qualityService: QualityService);
    getPatientQualityScore(patientId: string): Promise<import("./interfaces/quality.interface").QualityScore>;
    getPatientQualityTrends(patientId: string, days?: string): Promise<import("./interfaces/quality.interface").QualityTrend[]>;
    validatePatientData(patientId: string): Promise<{
        isValid: boolean;
        errors: string[];
        warnings: string[];
    }>;
    getCenterQualitySummary(centerId: string): Promise<any>;
    getNationalQualityOverview(): Promise<any>;
    getStaffPerformanceLeaderboard(centerId?: string): Promise<any[]>;
    getMissingDataHeatmap(centerId?: string): Promise<any[]>;
}
