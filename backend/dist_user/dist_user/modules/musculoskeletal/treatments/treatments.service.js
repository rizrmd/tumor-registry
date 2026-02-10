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
exports.TreatmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
let TreatmentsService = class TreatmentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        const patient = await this.prisma.patient.findUnique({
            where: { id: createDto.patientId },
        });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient not found`);
        }
        return this.prisma.treatmentManagement.create({
            data: {
                ...createDto,
                startDate: createDto.startDate ? new Date(createDto.startDate) : undefined,
                endDate: createDto.endDate ? new Date(createDto.endDate) : undefined,
                status: createDto.status || 'Planned',
            },
        });
    }
    async findAll(patientId, treatmentType, status) {
        const where = {};
        if (patientId)
            where.patientId = patientId;
        if (treatmentType)
            where.treatmentType = treatmentType;
        if (status)
            where.status = status;
        return this.prisma.treatmentManagement.findMany({
            where,
            orderBy: { createdAt: 'desc' },
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
    }
    async findOne(id) {
        const treatment = await this.prisma.treatmentManagement.findUnique({
            where: { id },
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
        if (!treatment) {
            throw new common_1.NotFoundException(`Treatment not found`);
        }
        return treatment;
    }
    async findByPatient(patientId) {
        return this.prisma.treatmentManagement.findMany({
            where: { patientId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async update(id, updateDto) {
        await this.findOne(id);
        return this.prisma.treatmentManagement.update({
            where: { id },
            data: {
                ...updateDto,
                startDate: updateDto.startDate ? new Date(updateDto.startDate) : undefined,
                endDate: updateDto.endDate ? new Date(updateDto.endDate) : undefined,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.treatmentManagement.delete({ where: { id } });
    }
    async getPatientTreatmentSummary(patientId) {
        const treatments = await this.findByPatient(patientId);
        const summary = {
            patientId,
            totalTreatments: treatments.length,
            byType: {
                surgery: treatments.filter((t) => t.treatmentType === 'Surgery').length,
                chemotherapy: treatments.filter((t) => t.treatmentType === 'Chemotherapy').length,
                radiotherapy: treatments.filter((t) => t.treatmentType === 'Radiotherapy').length,
                targetedTherapy: treatments.filter((t) => t.treatmentType === 'Targeted Therapy').length,
                immunotherapy: treatments.filter((t) => t.treatmentType === 'Immunotherapy').length,
            },
            byStatus: {
                planned: treatments.filter((t) => t.status === 'Planned').length,
                ongoing: treatments.filter((t) => t.status === 'Ongoing').length,
                completed: treatments.filter((t) => t.status === 'Completed').length,
                discontinued: treatments.filter((t) => t.status === 'Discontinued').length,
            },
            surgeryDetails: treatments
                .filter((t) => t.treatmentType === 'Surgery')
                .map((t) => ({
                id: t.id,
                surgeryType: t.surgeryType,
                surgicalMargin: t.surgicalMargin,
                reconstructionMethod: t.reconstructionMethod,
                status: t.status,
            })),
            activeChemotherapy: treatments.find((t) => t.treatmentType === 'Chemotherapy' && t.status === 'Ongoing'),
        };
        return summary;
    }
};
exports.TreatmentsService = TreatmentsService;
exports.TreatmentsService = TreatmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TreatmentsService);
//# sourceMappingURL=treatments.service.js.map
