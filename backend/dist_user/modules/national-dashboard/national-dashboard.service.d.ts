import { PrismaService } from '../../database/prisma.service';
export declare class NationalDashboardService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getNationalStatistics(): Promise<{
        id: string;
        expiresAt: Date | null;
        totalCenters: number;
        totalPatients: number;
        periodStart: Date | null;
        periodEnd: Date | null;
        statisticType: string;
        byGender: import("@prisma/client/runtime/library").JsonValue;
        byAgeGroup: import("@prisma/client/runtime/library").JsonValue | null;
        byCancerStage: import("@prisma/client/runtime/library").JsonValue | null;
        byTreatmentStatus: import("@prisma/client/runtime/library").JsonValue | null;
        byPrimarySite: import("@prisma/client/runtime/library").JsonValue | null;
        byProvince: import("@prisma/client/runtime/library").JsonValue | null;
        byCenter: import("@prisma/client/runtime/library").JsonValue | null;
        generatedAt: Date;
        lastUpdatedAt: Date;
    }>;
    private generateStatistics;
    searchAggregatedData(filters: any): Promise<{
        totalMatches: number;
        filters: any;
        breakdown: {
            byGender: {};
            byPathology: {};
            byStage: {};
            byProvince: {};
            byRegency: {};
        };
    }>;
    generateExport(filters: any): Promise<string>;
    getDashboardSummary(): Promise<{
        totalPatients: number;
        newPatients: number;
        activeCenters: number;
        limbSalvageRate: number;
        followUpComplianceRate: number;
    }>;
}
