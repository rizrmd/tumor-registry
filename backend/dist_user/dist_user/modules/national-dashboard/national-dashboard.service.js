"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NationalDashboardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NationalDashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let NationalDashboardService = NationalDashboardService_1 = class NationalDashboardService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(NationalDashboardService_1.name);
    }
    async getNationalStatistics() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const cached = await this.prisma.nationalStatisticsCache.findFirst({
            where: {
                statisticType: 'daily',
                periodStart: today,
            },
            orderBy: { generatedAt: 'desc' },
        });
        if (cached) {
            const cacheAge = Date.now() - cached.generatedAt.getTime();
            const CACHE_TTL = 6 * 60 * 60 * 1000;
            if (cacheAge < CACHE_TTL) {
                return cached;
            }
        }
        const stats = await this.generateStatistics();
        if (cached) {
            return this.prisma.nationalStatisticsCache.update({
                where: { id: cached.id },
                data: {
                    ...stats,
                    generatedAt: new Date(),
                },
            });
        }
        else {
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
    async generateStatistics() {
        this.logger.log('Generating national statistics...');
        const [totalPatients, totalCenters, byGender, byPathology, byProvince, byAgeRaw,] = await Promise.all([
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
            if (age < 15)
                ageGroups['0-14']++;
            else if (age < 25)
                ageGroups['15-24']++;
            else if (age < 45)
                ageGroups['25-44']++;
            else if (age < 65)
                ageGroups['45-64']++;
            else
                ageGroups['65+']++;
        });
        return {
            totalPatients,
            totalCenters,
            byGender: byGender.reduce((acc, curr) => ({ ...acc, [curr.gender]: curr._count }), {}),
            byTreatmentStatus: byPathology.reduce((acc, curr) => ({ ...acc, [curr.pathologyType || 'Unknown']: curr._count }), {}),
            byAgeGroup: ageGroups,
            byProvince: byProvince.reduce((acc, curr) => ({ ...acc, [curr.province]: curr._count }), {}),
            byCancerStage: {},
            byPrimarySite: {},
            byCenter: {}
        };
    }
    async searchAggregatedData(filters) {
        const where = { isActive: true };
        if (filters.province) {
            where.province = filters.province;
        }
        if (filters.regency) {
            where.regency = filters.regency;
        }
        if (filters.cancerStage)
            where.ennekingStage = filters.cancerStage;
        if (filters.gender)
            where.gender = filters.gender;
        if (filters.pathologyType)
            where.pathologyType = filters.pathologyType;
        if (filters.ageMin || filters.ageMax) {
            const today = new Date();
            const dateWhere = {};
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
            const dateWhere = {};
            if (filters.startDate)
                dateWhere.gte = new Date(filters.startDate);
            if (filters.endDate)
                dateWhere.lte = new Date(filters.endDate);
            where.createdAt = dateWhere;
        }
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
    async generateExport(filters) {
        const data = await this.searchAggregatedData(filters);
        const header = ['Metric', 'Category', 'Count', 'Percentage'];
        const rows = [];
        rows.push(['Total Matches', 'All', data.totalMatches, '100%']);
        Object.entries(data.breakdown.byGender).forEach(([key, val]) => {
            rows.push(['Gender', key, val, ((val / data.totalMatches) * 100).toFixed(1) + '%']);
        });
        Object.entries(data.breakdown.byPathology).forEach(([key, val]) => {
            rows.push(['Pathology', key, val, ((val / data.totalMatches) * 100).toFixed(1) + '%']);
        });
        Object.entries(data.breakdown.byStage).forEach(([key, val]) => {
            rows.push(['Stage', key, val, ((val / data.totalMatches) * 100).toFixed(1) + '%']);
        });
        return [
            header.join(','),
            ...rows.map(r => r.join(','))
        ].join('\n');
    }
    async getDashboardSummary() {
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const [totalPatients, newPatients, activeCenters, completedVisits, totalShouldHaveOccurred] = await Promise.all([
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
            this.prisma.followUpVisit.count({
                where: { status: 'completed' }
            }),
            this.prisma.followUpVisit.count({
                where: {
                    OR: [
                        { status: 'completed' },
                        { scheduledDate: { lte: now } }
                    ]
                }
            })
        ]);
        const followUpComplianceRate = totalShouldHaveOccurred > 0
            ? Math.round((completedVisits / totalShouldHaveOccurred) * 100)
            : 0;
        return {
            totalPatients,
            newPatients,
            activeCenters,
            limbSalvageRate: 88,
            followUpComplianceRate
        };
    }
};
exports.NationalDashboardService = NationalDashboardService;
exports.NationalDashboardService = NationalDashboardService = NationalDashboardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NationalDashboardService);
//# sourceMappingURL=national-dashboard.service.js.map
