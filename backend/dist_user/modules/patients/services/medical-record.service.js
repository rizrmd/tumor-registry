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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalRecordService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
let MedicalRecordService = class MedicalRecordService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateInamsosNumber(centerId, diagnosisYear) {
        const center = await this.prisma.center.findUnique({
            where: { id: centerId },
            select: { mrPrefix: true, name: true },
        });
        if (!center) {
            throw new common_1.BadRequestException(`Center ${centerId} not found`);
        }
        if (!center.mrPrefix) {
            throw new common_1.BadRequestException(`Center "${center.name}" does not have MR prefix configured. Please configure in center settings.`);
        }
        const year = diagnosisYear || new Date().getFullYear();
        const sequence = await this.prisma.$transaction(async (tx) => {
            let seqRecord = await tx.medicalRecordSequence.findUnique({
                where: {
                    centerId_year: {
                        centerId,
                        year,
                    },
                },
            });
            if (!seqRecord) {
                seqRecord = await tx.medicalRecordSequence.create({
                    data: {
                        centerId,
                        year,
                        lastSequence: 1,
                    },
                });
                return 1;
            }
            else {
                const updated = await tx.medicalRecordSequence.update({
                    where: { id: seqRecord.id },
                    data: {
                        lastSequence: { increment: 1 },
                        updatedAt: new Date(),
                    },
                });
                return updated.lastSequence;
            }
        });
        const sequenceStr = sequence.toString(36).toUpperCase().padStart(6, '0');
        const mrNumber = `${center.mrPrefix}-${year}-${sequenceStr}`;
        return mrNumber;
    }
    generateAnonymousId(centerId, inamsosRecordNumber) {
        const parsed = this.parseInamsosNumber(inamsosRecordNumber);
        if (!parsed) {
            throw new common_1.BadRequestException('Invalid INAMSOS MR number format');
        }
        return `P-${parsed.centerPrefix}-${String(parsed.sequence).padStart(5, '0')}`;
    }
    validateFormat(mrNumber) {
        const regex = /^[A-Z]{3}-\d{4}-[A-Z0-9]{5,6}$/;
        return regex.test(mrNumber);
    }
    parseInamsosNumber(mrNumber) {
        if (!this.validateFormat(mrNumber)) {
            return null;
        }
        const parts = mrNumber.split('-');
        return {
            centerPrefix: parts[0],
            year: parseInt(parts[1], 10),
            sequence: parseInt(parts[2], 36),
        };
    }
    validateMrPrefix(prefix) {
        const regex = /^[A-Z]{3}$/;
        return regex.test(prefix);
    }
    async isMrPrefixUnique(prefix, excludeCenterId) {
        const whereClause = {
            mrPrefix: prefix,
        };
        if (excludeCenterId) {
            whereClause.id = { not: excludeCenterId };
        }
        const existingCenter = await this.prisma.center.findFirst({
            where: whereClause,
        });
        return !existingCenter;
    }
    async getStatistics(centerId) {
        const where = {};
        if (centerId) {
            where.centerId = centerId;
        }
        const sequences = await this.prisma.medicalRecordSequence.findMany({
            where,
            include: {
                center: {
                    select: {
                        id: true,
                        name: true,
                        mrPrefix: true,
                    },
                },
            },
            orderBy: [{ year: 'desc' }, { lastSequence: 'desc' }],
        });
        const byCenter = sequences.reduce((acc, seq) => {
            const centerId = seq.center.id;
            if (!acc[centerId]) {
                acc[centerId] = {
                    centerName: seq.center.name,
                    mrPrefix: seq.center.mrPrefix,
                    years: [],
                    totalPatients: 0,
                };
            }
            acc[centerId].years.push({
                year: seq.year,
                patientCount: seq.lastSequence,
            });
            acc[centerId].totalPatients += seq.lastSequence;
            return acc;
        }, {});
        return {
            totalSequences: sequences.length,
            centers: Object.values(byCenter),
        };
    }
    async resetSequenceCounter(centerId, year) {
        const existing = await this.prisma.medicalRecordSequence.findUnique({
            where: {
                centerId_year: { centerId, year },
            },
        });
        if (existing) {
            throw new common_1.ConflictException(`Sequence for center ${centerId} year ${year} already exists with ${existing.lastSequence} patients. Cannot reset.`);
        }
        await this.prisma.medicalRecordSequence.create({
            data: {
                centerId,
                year,
                lastSequence: 0,
            },
        });
    }
    async getCurrentSequence(centerId, year) {
        const targetYear = year || new Date().getFullYear();
        const sequence = await this.prisma.medicalRecordSequence.findUnique({
            where: {
                centerId_year: { centerId, year: targetYear },
            },
        });
        return sequence?.lastSequence || 0;
    }
    async previewNextNumber(centerId, year) {
        const center = await this.prisma.center.findUnique({
            where: { id: centerId },
            select: { mrPrefix: true },
        });
        if (!center?.mrPrefix) {
            throw new common_1.BadRequestException('Center does not have MR prefix configured');
        }
        const targetYear = year || new Date().getFullYear();
        const currentSequence = await this.getCurrentSequence(centerId, targetYear);
        const nextSequence = currentSequence + 1;
        const nextSequenceStr = nextSequence.toString(36).toUpperCase().padStart(6, '0');
        return `${center.mrPrefix}-${targetYear}-${nextSequenceStr}`;
    }
};
exports.MedicalRecordService = MedicalRecordService;
exports.MedicalRecordService = MedicalRecordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MedicalRecordService);
//# sourceMappingURL=medical-record.service.js.map