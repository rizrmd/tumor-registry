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
const prisma_service_1 = require("../../database/prisma.service");
let MedicalRecordService = class MedicalRecordService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateInamsosNumber(centerId) {
        const center = await this.prisma.center.findUnique({
            where: { id: centerId },
            select: { mrPrefix: true }
        });
        if (!center || !center.mrPrefix) {
            throw new Error('Center MR prefix not configured');
        }
        const year = new Date().getFullYear();
        const sequence = await this.prisma.$transaction(async (tx) => {
            let seqRecord = await tx.medicalRecordSequence.findUnique({
                where: {
                    centerId_year: { centerId, year }
                }
            });
            if (!seqRecord) {
                seqRecord = await tx.medicalRecordSequence.create({
                    data: { centerId, year, lastSequence: 1 }
                });
                return 1;
            }
            else {
                const updated = await tx.medicalRecordSequence.update({
                    where: { id: seqRecord.id },
                    data: { lastSequence: { increment: 1 } }
                });
                return updated.lastSequence;
            }
        });
        const sequenceBase36 = sequence.toString(36).toUpperCase().padStart(5, '0');
        const mrNumber = `${center.mrPrefix}-${year}-${sequenceBase36}`;
        return mrNumber;
    }
    validateFormat(mrNumber) {
        const regex = /^[A-Z]{3}-\d{4}-[A-Z0-9]{5}$/;
        return regex.test(mrNumber);
    }
    parseNumber(mrNumber) {
        const parts = mrNumber.split('-');
        if (parts.length !== 3)
            return null;
        return {
            centerPrefix: parts[0],
            year: parseInt(parts[1]),
            sequence: parseInt(parts[2], 36)
        };
    }
};
exports.MedicalRecordService = MedicalRecordService;
exports.MedicalRecordService = MedicalRecordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MedicalRecordService);
//# sourceMappingURL=medical-record.service.js.map