import type { FastifyReply } from 'fastify';
import { AggregateSearchDto } from './dto/aggregate-search.dto';
import { NationalDashboardService } from './national-dashboard.service';
export declare class NationalDashboardController {
    private readonly dashboardService;
    constructor(dashboardService: NationalDashboardService);
    getStatistics(): Promise<{
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
    getSummary(): Promise<{
        totalPatients: number;
        newPatients: number;
        activeCenters: number;
        limbSalvageRate: number;
        followUpComplianceRate: number;
    }>;
    searchAggregated(filters: AggregateSearchDto): Promise<{
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
    exportData(filters: AggregateSearchDto, res: FastifyReply): Promise<never>;
}
