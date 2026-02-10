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
var PathologyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathologyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("@/database/prisma.service");
let PathologyService = PathologyService_1 = class PathologyService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(PathologyService_1.name);
    }
    async create(createDto) {
        try {
            const existing = await this.prisma.pathologyReport.findUnique({
                where: { reportNumber: createDto.reportNumber },
            });
            if (existing) {
                throw new common_1.ConflictException('Pathology report number already exists');
            }
            const patient = await this.prisma.patient.findUnique({
                where: { id: createDto.patientId },
            });
            if (!patient) {
                throw new common_1.NotFoundException('Patient not found');
            }
            const report = await this.prisma.pathologyReport.create({
                data: {
                    patientId: createDto.patientId,
                    reportNumber: createDto.reportNumber,
                    biopsyType: createDto.biopsyType,
                    biopsyDate: new Date(createDto.biopsyDate),
                    specimenReceivedDate: createDto.specimenReceivedDate
                        ? new Date(createDto.specimenReceivedDate)
                        : undefined,
                    specimenSite: createDto.specimenSite,
                    specimenDescription: createDto.specimenDescription,
                    grossDescription: createDto.grossDescription,
                    microscopicDescription: createDto.microscopicDescription,
                    diagnosis: createDto.diagnosis,
                    tumorGrade: createDto.tumorGrade,
                    mitosisCount: createDto.mitosisCount,
                    necrosisPercentage: createDto.necrosisPercentage,
                    cellularity: createDto.cellularity,
                    immunohistochemistry: createDto.immunohistochemistry,
                    molecularFindings: createDto.molecularFindings,
                    marginsStatus: createDto.marginsStatus,
                    isMalignant: createDto.isMalignant,
                    status: createDto.status,
                    comments: createDto.comments,
                    pathologistId: createDto.pathologistId,
                    reportDate: createDto.reportDate ? new Date(createDto.reportDate) : undefined,
                    specialStains: createDto.specialStains || [],
                    ihcMarkers: createDto.ihcMarkers || [],
                },
                include: {
                    patient: {
                        select: {
                            id: true,
                            name: true,
                            hospitalRecordNumber: true,
                        },
                    },
                },
            });
            this.logger.log(`Pathology report created: ${report.reportNumber} for patient ${patient.name}`);
            return report;
        }
        catch (error) {
            this.logger.error('Error creating pathology report', error);
            throw error;
        }
    }
    async findAll(patientId, status, isMalignant, page = 1, limit = 50) {
        try {
            const skip = (page - 1) * limit;
            const where = {
                ...(patientId && { patientId }),
                ...(status && { status }),
                ...(isMalignant !== undefined && { isMalignant }),
            };
            const [reports, total] = await Promise.all([
                this.prisma.pathologyReport.findMany({
                    where,
                    include: {
                        patient: {
                            select: {
                                id: true,
                                name: true,
                                hospitalRecordNumber: true,
                            },
                        },
                    },
                    orderBy: [{ biopsyDate: 'desc' }],
                    skip,
                    take: limit,
                }),
                this.prisma.pathologyReport.count({ where }),
            ]);
            const totalPages = Math.ceil(total / limit);
            return { reports, total, page, totalPages };
        }
        catch (error) {
            this.logger.error('Error finding pathology reports', error);
            throw error;
        }
    }
    async findById(id) {
        try {
            const report = await this.prisma.pathologyReport.findUnique({
                where: { id },
                include: {
                    patient: {
                        select: {
                            id: true,
                            name: true,
                            hospitalRecordNumber: true,
                            dateOfBirth: true,
                            gender: true,
                        },
                    },
                },
            });
            if (!report) {
                throw new common_1.NotFoundException(`Pathology report with ID ${id} not found`);
            }
            return report;
        }
        catch (error) {
            this.logger.error(`Error finding pathology report ${id}`, error);
            throw error;
        }
    }
    async findByReportNumber(reportNumber) {
        try {
            const report = await this.prisma.pathologyReport.findUnique({
                where: { reportNumber },
                include: {
                    patient: {
                        select: {
                            id: true,
                            name: true,
                            hospitalRecordNumber: true,
                        },
                    },
                },
            });
            if (!report) {
                throw new common_1.NotFoundException(`Pathology report ${reportNumber} not found`);
            }
            return report;
        }
        catch (error) {
            this.logger.error(`Error finding pathology report ${reportNumber}`, error);
            throw error;
        }
    }
    async findByPatient(patientId) {
        try {
            return this.prisma.pathologyReport.findMany({
                where: { patientId },
                orderBy: [{ biopsyDate: 'desc' }],
            });
        }
        catch (error) {
            this.logger.error(`Error finding pathology reports for patient ${patientId}`, error);
            throw error;
        }
    }
    async update(id, updateDto) {
        try {
            const existing = await this.findById(id);
            const updated = await this.prisma.pathologyReport.update({
                where: { id },
                data: {
                    ...(updateDto.grossDescription !== undefined && {
                        grossDescription: updateDto.grossDescription,
                    }),
                    ...(updateDto.microscopicDescription !== undefined && {
                        microscopicDescription: updateDto.microscopicDescription,
                    }),
                    ...(updateDto.diagnosis !== undefined && { diagnosis: updateDto.diagnosis }),
                    ...(updateDto.tumorGrade !== undefined && { tumorGrade: updateDto.tumorGrade }),
                    ...(updateDto.mitosisCount !== undefined && { mitosisCount: updateDto.mitosisCount }),
                    ...(updateDto.necrosisPercentage !== undefined && {
                        necrosisPercentage: updateDto.necrosisPercentage,
                    }),
                    ...(updateDto.cellularity !== undefined && { cellularity: updateDto.cellularity }),
                    ...(updateDto.immunohistochemistry !== undefined && {
                        immunohistochemistry: updateDto.immunohistochemistry,
                    }),
                    ...(updateDto.molecularFindings !== undefined && {
                        molecularFindings: updateDto.molecularFindings,
                    }),
                    ...(updateDto.marginsStatus !== undefined && { marginsStatus: updateDto.marginsStatus }),
                    ...(updateDto.isMalignant !== undefined && { isMalignant: updateDto.isMalignant }),
                    ...(updateDto.status !== undefined && { status: updateDto.status }),
                    ...(updateDto.comments !== undefined && { comments: updateDto.comments }),
                    ...(updateDto.reportDate !== undefined && {
                        reportDate: new Date(updateDto.reportDate),
                    }),
                    ...(updateDto.specialStains !== undefined && { specialStains: updateDto.specialStains }),
                    ...(updateDto.ihcMarkers !== undefined && { ihcMarkers: updateDto.ihcMarkers }),
                },
                include: {
                    patient: {
                        select: {
                            id: true,
                            name: true,
                            hospitalRecordNumber: true,
                        },
                    },
                },
            });
            this.logger.log(`Pathology report updated: ${id}`);
            return updated;
        }
        catch (error) {
            this.logger.error(`Error updating pathology report ${id}`, error);
            throw error;
        }
    }
    async delete(id) {
        try {
            const existing = await this.findById(id);
            const deleted = await this.prisma.pathologyReport.delete({
                where: { id },
            });
            this.logger.log(`Pathology report deleted: ${id}`);
            return deleted;
        }
        catch (error) {
            this.logger.error(`Error deleting pathology report ${id}`, error);
            throw error;
        }
    }
    async getMalignantCount(centerId) {
        try {
            const where = { isMalignant: true };
            if (centerId) {
                where.patient = { centerId };
            }
            return this.prisma.pathologyReport.count({ where });
        }
        catch (error) {
            this.logger.error('Error getting malignant count', error);
            throw error;
        }
    }
    async getStatistics(centerId) {
        try {
            const where = {};
            if (centerId) {
                where.patient = { centerId };
            }
            const [totalReports, malignantReports, pendingReports, completedReports, reportsByBiopsyType,] = await Promise.all([
                this.prisma.pathologyReport.count({ where }),
                this.prisma.pathologyReport.count({ where: { ...where, isMalignant: true } }),
                this.prisma.pathologyReport.count({ where: { ...where, status: 'PENDING' } }),
                this.prisma.pathologyReport.count({ where: { ...where, status: 'COMPLETED' } }),
                this.getReportsByBiopsyType(where),
            ]);
            return {
                totalReports,
                malignantReports,
                benignReports: totalReports - malignantReports,
                pendingReports,
                completedReports,
                reportsByBiopsyType,
            };
        }
        catch (error) {
            this.logger.error('Error getting pathology statistics', error);
            throw error;
        }
    }
    async getReportsByBiopsyType(where) {
        const stats = await this.prisma.pathologyReport.groupBy({
            by: ['biopsyType'],
            where,
            _count: {
                biopsyType: true,
            },
        });
        return stats.reduce((acc, stat) => {
            acc[stat.biopsyType] = stat._count.biopsyType;
            return acc;
        }, {});
    }
};
exports.PathologyService = PathologyService;
exports.PathologyService = PathologyService = PathologyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PathologyService);
//# sourceMappingURL=pathology.service.js.map