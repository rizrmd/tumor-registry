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
var LaboratoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaboratoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let LaboratoryService = LaboratoryService_1 = class LaboratoryService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(LaboratoryService_1.name);
    }
    async create(createDto) {
        try {
            const patient = await this.prisma.patient.findUnique({
                where: { id: createDto.patientId },
            });
            if (!patient) {
                throw new common_1.NotFoundException('Patient not found');
            }
            const labResult = await this.prisma.laboratoryResult.create({
                data: {
                    patientId: createDto.patientId,
                    testType: createDto.testType,
                    testName: createDto.testName,
                    result: createDto.result,
                    normalRange: createDto.normalRange,
                    unit: createDto.unit,
                    status: createDto.status,
                    notes: createDto.notes,
                    orderedBy: createDto.orderedBy,
                    performedAt: createDto.performedAt ? new Date(createDto.performedAt) : undefined,
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
            this.logger.log(`Lab result created: ${labResult.testName} for patient ${patient.name}`);
            return labResult;
        }
        catch (error) {
            this.logger.error('Error creating lab result', error);
            throw error;
        }
    }
    async findAll(patientId, testType, status, page = 1, limit = 50) {
        try {
            const skip = (page - 1) * limit;
            const where = {
                ...(patientId && { patientId }),
                ...(testType && { testType }),
                ...(status && { status }),
            };
            const [results, total] = await Promise.all([
                this.prisma.laboratoryResult.findMany({
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
                    orderBy: [{ performedAt: 'desc' }, { createdAt: 'desc' }],
                    skip,
                    take: limit,
                }),
                this.prisma.laboratoryResult.count({ where }),
            ]);
            const totalPages = Math.ceil(total / limit);
            return {
                results: results.map(result => ({
                    ...result,
                    isAbnormal: this.checkIfAbnormal(result.result, result.normalRange),
                })),
                total,
                page,
                totalPages,
            };
        }
        catch (error) {
            this.logger.error('Error finding lab results', error);
            throw error;
        }
    }
    async findById(id) {
        try {
            const result = await this.prisma.laboratoryResult.findUnique({
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
            if (!result) {
                throw new common_1.NotFoundException(`Lab result with ID ${id} not found`);
            }
            return {
                ...result,
                isAbnormal: this.checkIfAbnormal(result.result, result.normalRange),
                patientAge: this.calculateAge(result.patient.dateOfBirth),
            };
        }
        catch (error) {
            this.logger.error(`Error finding lab result ${id}`, error);
            throw error;
        }
    }
    async findByPatient(patientId, testType) {
        try {
            const where = {
                patientId,
                ...(testType && { testType }),
            };
            const results = await this.prisma.laboratoryResult.findMany({
                where,
                orderBy: [{ performedAt: 'desc' }, { createdAt: 'desc' }],
            });
            return results.map(result => ({
                ...result,
                isAbnormal: this.checkIfAbnormal(result.result, result.normalRange),
            }));
        }
        catch (error) {
            this.logger.error(`Error finding lab results for patient ${patientId}`, error);
            throw error;
        }
    }
    async getTumorMarkers(patientId) {
        try {
            const tumorMarkers = await this.prisma.laboratoryResult.findMany({
                where: {
                    patientId,
                    testType: 'TUMOR_MARKER',
                },
                orderBy: { performedAt: 'desc' },
            });
            const markerTrends = {};
            tumorMarkers.forEach(marker => {
                if (!markerTrends[marker.testName]) {
                    markerTrends[marker.testName] = [];
                }
                markerTrends[marker.testName].push({
                    date: marker.performedAt,
                    value: marker.result,
                    unit: marker.unit,
                    status: marker.status,
                    isAbnormal: this.checkIfAbnormal(marker.result, marker.normalRange),
                });
            });
            return {
                markers: tumorMarkers,
                trends: markerTrends,
            };
        }
        catch (error) {
            this.logger.error(`Error getting tumor markers for patient ${patientId}`, error);
            throw error;
        }
    }
    async update(id, updateDto) {
        try {
            const existing = await this.findById(id);
            const updated = await this.prisma.laboratoryResult.update({
                where: { id },
                data: {
                    ...(updateDto.result !== undefined && { result: updateDto.result }),
                    ...(updateDto.normalRange !== undefined && { normalRange: updateDto.normalRange }),
                    ...(updateDto.unit !== undefined && { unit: updateDto.unit }),
                    ...(updateDto.status !== undefined && { status: updateDto.status }),
                    ...(updateDto.notes !== undefined && { notes: updateDto.notes }),
                    ...(updateDto.performedAt !== undefined && {
                        performedAt: new Date(updateDto.performedAt),
                    }),
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
            this.logger.log(`Lab result updated: ${id}`);
            return updated;
        }
        catch (error) {
            this.logger.error(`Error updating lab result ${id}`, error);
            throw error;
        }
    }
    async delete(id) {
        try {
            const existing = await this.findById(id);
            const deleted = await this.prisma.laboratoryResult.delete({
                where: { id },
            });
            this.logger.log(`Lab result deleted: ${id}`);
            return deleted;
        }
        catch (error) {
            this.logger.error(`Error deleting lab result ${id}`, error);
            throw error;
        }
    }
    async getAbnormalResults(patientId) {
        try {
            const results = await this.prisma.laboratoryResult.findMany({
                where: {
                    patientId,
                    status: { in: ['ABNORMAL', 'CRITICAL'] },
                },
                orderBy: { performedAt: 'desc' },
            });
            return results.map(result => ({
                ...result,
                isAbnormal: true,
            }));
        }
        catch (error) {
            this.logger.error(`Error getting abnormal results for patient ${patientId}`, error);
            throw error;
        }
    }
    async getStatistics(centerId) {
        try {
            const where = {};
            if (centerId) {
                where.patient = { centerId };
            }
            const [totalTests, pendingTests, abnormalTests, criticalTests, testsByType,] = await Promise.all([
                this.prisma.laboratoryResult.count({ where }),
                this.prisma.laboratoryResult.count({ where: { ...where, status: 'PENDING' } }),
                this.prisma.laboratoryResult.count({ where: { ...where, status: 'ABNORMAL' } }),
                this.prisma.laboratoryResult.count({ where: { ...where, status: 'CRITICAL' } }),
                this.getTestsByType(where),
            ]);
            return {
                totalTests,
                pendingTests,
                abnormalTests,
                criticalTests,
                testsByType,
            };
        }
        catch (error) {
            this.logger.error('Error getting lab statistics', error);
            throw error;
        }
    }
    checkIfAbnormal(result, normalRange) {
        if (!normalRange)
            return false;
        try {
            const numericResult = parseFloat(result);
            if (isNaN(numericResult))
                return false;
            if (normalRange.includes('-')) {
                const [min, max] = normalRange.split('-').map(v => parseFloat(v.trim()));
                return numericResult < min || numericResult > max;
            }
            else if (normalRange.startsWith('<')) {
                const max = parseFloat(normalRange.substring(1).trim());
                return numericResult >= max;
            }
            else if (normalRange.startsWith('>')) {
                const min = parseFloat(normalRange.substring(1).trim());
                return numericResult <= min;
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }
    calculateAge(dateOfBirth) {
        const today = new Date();
        let age = today.getFullYear() - dateOfBirth.getFullYear();
        const monthDiff = today.getMonth() - dateOfBirth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
            age--;
        }
        return age;
    }
    async getTestsByType(where) {
        const stats = await this.prisma.laboratoryResult.groupBy({
            by: ['testType'],
            where,
            _count: {
                testType: true,
            },
        });
        return stats.reduce((acc, stat) => {
            acc[stat.testType] = stat._count.testType;
            return acc;
        }, {});
    }
};
exports.LaboratoryService = LaboratoryService;
exports.LaboratoryService = LaboratoryService = LaboratoryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LaboratoryService);
//# sourceMappingURL=laboratory.service.js.map