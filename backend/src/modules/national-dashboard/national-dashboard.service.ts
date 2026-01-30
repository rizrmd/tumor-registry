import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class NationalDashboardService {
    private readonly logger = new Logger(NationalDashboardService.name);

    constructor(private prisma: PrismaService) { }

    /**
     * Get public national statistics (cached or fresh)
     */
    async getNationalStatistics() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // 1. Check valid cache for today
        const cached = await this.prisma.nationalStatisticsCache.findFirst({
            where: {
                statisticType: 'daily',
                periodStart: today,
            },
            orderBy: { generatedAt: 'desc' },
        });

        // Reuse cache if generated within last 6 hours (or custom duration)
        if (cached) {
            const cacheAge = Date.now() - cached.generatedAt.getTime();
            const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours
            if (cacheAge < CACHE_TTL) {
                return cached;
            }
        }

        // 2. Generate fresh statistics
        const stats = await this.generateStatistics();

        // 3. Save to cache (update existing for today or create new)
        if (cached) {
            return this.prisma.nationalStatisticsCache.update({
                where: { id: cached.id },
                data: {
                    ...stats,
                    generatedAt: new Date(),
                },
            });
        } else {
            return this.prisma.nationalStatisticsCache.create({
                data: {
                    statisticType: 'daily',
                    periodStart: today,
                    periodEnd: today,
                    generatedAt: new Date(),
                    ...stats,
                },
            });
        }
    }

    /**
     * Generate aggregated statistics from raw data
     */
    private async generateStatistics() {
        this.logger.log('Generating national statistics...');

        // Parallel aggregate queries
        const [
            totalPatients,
            totalCenters,
            byGender,
            byPathology,
            byProvince,
            byAgeRaw,
        ] = await Promise.all([
            this.prisma.patient.count({ where: { isActive: true } }),
            this.prisma.center.count({ where: { isActive: true } }),
            this.prisma.patient.groupBy({
                by: ['gender'],
                where: { isActive: true },
                _count: true,
            }),
            this.prisma.patient.groupBy({
                by: ['pathologyType'],
                where: { isActive: true },
                _count: true,
            }),
            this.prisma.center.groupBy({
                by: ['province'],
                where: { isActive: true },
                _count: true,
            }),
            this.prisma.patient.findMany({
                where: { isActive: true },
                select: { dateOfBirth: true },
            }),
        ]);

        // Process Age Groups
        const ageGroups = {
            '0-14': 0,
            '15-24': 0,
            '25-44': 0,
            '45-64': 0,
            '65+': 0,
        };

        const now = new Date();
        byAgeRaw.forEach(p => {
            const age = now.getFullYear() - p.dateOfBirth.getFullYear();
            if (age < 15) ageGroups['0-14']++;
            else if (age < 25) ageGroups['15-24']++;
            else if (age < 45) ageGroups['25-44']++;
            else if (age < 65) ageGroups['45-64']++;
            else ageGroups['65+']++;
        });

        // Format results
        return {
            totalPatients,
            totalCenters,
            byGender: byGender.reduce((acc, curr) => ({ ...acc, [curr.gender]: curr._count }), {}),
            byTreatmentStatus: byPathology.reduce((acc, curr) => ({ ...acc, [curr.pathologyType || 'Unknown']: curr._count }), {}), // Mapping pathology to 'treatmentStatus' field for now as generic 'byCategory' or fix schema field name. Schema has byTreatmentStatus, byCancerStage etc. I'll map pathologyType to byCancerStage logic or similar.
            // Schema has: byGender, byAgeGroup, byCancerStage, byTreatmentStatus, byPrimarySite, byProvince, byCenter.
            // I will map what I can.
            byAgeGroup: ageGroups,
            byProvince: byProvince.reduce((acc, curr) => ({ ...acc, [curr.province]: curr._count }), {}),
            byCancerStage: {}, // TODO: Implement deeper aggregation
            byPrimarySite: {}, // TODO: Implement deeper aggregation
            // byCenter: {} // Probably don't want to expose per-center counts publicly unless requested
            byCenter: {}
        };
    }

    /**
     * Search aggregated data (NO identifiable info)
     */
    async searchAggregatedData(filters: any) { // Using 'any' temp, will rely on Controller DTO validation
        const where: any = { isActive: true };

        // Apply filters
        if (filters.province) {
            where.province = filters.province;
        }

        if (filters.regency) {
            where.regency = filters.regency;
        }

        if (filters.cancerStage) where.ennekingStage = filters.cancerStage;
        if (filters.gender) where.gender = filters.gender;
        if (filters.pathologyType) where.pathologyType = filters.pathologyType;

        if (filters.ageMin || filters.ageMax) {
            const today = new Date();
            const dateWhere: any = {};

            if (filters.ageMin) {
                const maxDob = new Date(today.getFullYear() - filters.ageMin, 0, 1);
                dateWhere.lte = maxDob;
            }
            if (filters.ageMax) {
                const minDob = new Date(today.getFullYear() - filters.ageMax - 1, 0, 1);
                dateWhere.gte = minDob;
            }
            where.dateOfBirth = dateWhere;
        }

        if (filters.startDate || filters.endDate) {
            const dateWhere: any = {};
            if (filters.startDate) dateWhere.gte = new Date(filters.startDate);
            if (filters.endDate) dateWhere.lte = new Date(filters.endDate);
            where.createdAt = dateWhere;
        }

        // Return aggregate ONLY - NO patient details
        const count = await this.prisma.patient.count({ where });

        const [byGender, byPathology, byStage, byProvince, byRegency] = await Promise.all([
            this.prisma.patient.groupBy({
                by: ['gender'],
                where,
                _count: true
            }),
            this.prisma.patient.groupBy({
                by: ['pathologyType'],
                where,
                _count: true
            }),
            this.prisma.patient.groupBy({
                by: ['ennekingStage'],
                where,
                _count: true
            }),
            this.prisma.patient.groupBy({
                by: ['province'],
                where,
                _count: true
            }),
            this.prisma.patient.groupBy({
                by: ['regency'],
                where,
                _count: true
            })
        ]);

        return {
            totalMatches: count,
            filters: filters,
            breakdown: {
                byGender: byGender.reduce((acc, curr) => ({ ...acc, [curr.gender]: curr._count }), {}),
                byPathology: byPathology.reduce((acc, curr) => ({ ...acc, [curr.pathologyType || 'Unknown']: curr._count }), {}),
                byStage: byStage.reduce((acc, curr) => ({ ...acc, [curr.ennekingStage || 'Unknown']: curr._count }), {}),
                byProvince: byProvince.reduce((acc, curr) => ({ ...acc, [curr.province || 'Unknown']: curr._count }), {}),
                byRegency: byRegency.reduce((acc, curr) => ({ ...acc, [curr.regency || 'Unknown']: curr._count }), {})
            }
        };
    }

    /**
     * Generate Export CSV
     */
    async generateExport(filters: any) {
        const data = await this.searchAggregatedData(filters);

        // Simple CSV generation
        const header = ['Metric', 'Category', 'Count', 'Percentage'];
        const rows = [];

        // Total
        rows.push(['Total Matches', 'All', data.totalMatches, '100%']);

        // Gender
        Object.entries(data.breakdown.byGender).forEach(([key, val]: [string, number]) => {
            rows.push(['Gender', key, val, ((val / data.totalMatches) * 100).toFixed(1) + '%']);
        });

        // Pathology
        Object.entries(data.breakdown.byPathology).forEach(([key, val]: [string, number]) => {
            rows.push(['Pathology', key, val, ((val / data.totalMatches) * 100).toFixed(1) + '%']);
        });

        // Stage
        Object.entries(data.breakdown.byStage).forEach(([key, val]: [string, number]) => {
            rows.push(['Stage', key, val, ((val / data.totalMatches) * 100).toFixed(1) + '%']);
        });

        return [
            header.join(','),
            ...rows.map(r => r.join(','))
        ].join('\n');
    }

    /**
     * Get Dashboard Summary
     */
    async getDashboardSummary() {
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        const [totalPatients, newPatients, activeCenters, totalVisits, completedVisits] = await Promise.all([
            this.prisma.patient.count(),
            this.prisma.patient.count({
                where: {
                    createdAt: {
                        gte: thirtyDaysAgo
                    }
                }
            }),
            this.prisma.center.count({
                where: { isActive: true }
            }),
            this.prisma.followUpVisit.count(),
            this.prisma.followUpVisit.count({
                where: { status: 'completed' }
            })
        ]);

        const followUpComplianceRate = totalVisits > 0
            ? Math.round((completedVisits / totalVisits) * 100)
            : 0;

        return {
            totalPatients,
            newPatients,
            activeCenters,
            limbSalvageRate: 88, // Placeholder
            followUpComplianceRate
        };
    }
}
