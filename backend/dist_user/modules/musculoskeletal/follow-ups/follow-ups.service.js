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
exports.FollowUpsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
let FollowUpsService = class FollowUpsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateSchedule(dto) {
        const patient = await this.prisma.patient.findUnique({
            where: { id: dto.patientId },
        });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient not found`);
        }
        const existing = await this.prisma.followUpVisit.count({
            where: { patientId: dto.patientId },
        });
        if (existing > 0) {
            throw new common_1.ConflictException(`Follow-up schedule already exists for this patient`);
        }
        const baseDate = new Date(dto.treatmentCompletionDate);
        const visits = [];
        for (let i = 1; i <= 8; i++) {
            const scheduledDate = new Date(baseDate);
            scheduledDate.setMonth(baseDate.getMonth() + i * 3);
            visits.push({
                patientId: dto.patientId,
                visitNumber: i,
                scheduledDate,
                visitType: '3-month',
                status: 'scheduled',
            });
        }
        for (let i = 1; i <= 6; i++) {
            const scheduledDate = new Date(baseDate);
            scheduledDate.setMonth(baseDate.getMonth() + 24 + i * 6);
            visits.push({
                patientId: dto.patientId,
                visitNumber: 8 + i,
                scheduledDate,
                visitType: '6-month',
                status: 'scheduled',
            });
        }
        const created = await this.prisma.followUpVisit.createMany({
            data: visits,
        });
        return {
            patientId: dto.patientId,
            totalVisits: created.count,
            message: `Generated ${created.count} follow-up visits for patient`,
        };
    }
    async create(createDto) {
        const patient = await this.prisma.patient.findUnique({
            where: { id: createDto.patientId },
        });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient not found`);
        }
        const existing = await this.prisma.followUpVisit.findUnique({
            where: {
                patientId_visitNumber: {
                    patientId: createDto.patientId,
                    visitNumber: createDto.visitNumber,
                },
            },
        });
        if (existing) {
            throw new common_1.ConflictException(`Visit number ${createDto.visitNumber} already exists for this patient`);
        }
        return this.prisma.followUpVisit.create({
            data: {
                ...createDto,
                scheduledDate: new Date(createDto.scheduledDate),
                actualDate: createDto.actualDate ? new Date(createDto.actualDate) : undefined,
                status: createDto.status || 'scheduled',
            },
        });
    }
    async findAll(patientId, status) {
        const where = {};
        if (patientId)
            where.patientId = patientId;
        if (status)
            where.status = status;
        return this.prisma.followUpVisit.findMany({
            where,
            orderBy: [{ patientId: 'asc' }, { visitNumber: 'asc' }],
            include: {
                patient: {
                    select: {
                        id: true,
                        name: true,
                        hospitalRecordNumber: true,
                        inamsosRecordNumber: true,
                    },
                },
            },
        });
    }
    async findOne(id) {
        const visit = await this.prisma.followUpVisit.findUnique({
            where: { id },
            include: {
                patient: {
                    select: {
                        id: true,
                        name: true,
                        hospitalRecordNumber: true,
                        inamsosRecordNumber: true,
                    },
                },
            },
        });
        if (!visit) {
            throw new common_1.NotFoundException(`Follow-up visit not found`);
        }
        return visit;
    }
    async findByPatient(patientId) {
        return this.prisma.followUpVisit.findMany({
            where: { patientId },
            orderBy: { visitNumber: 'asc' },
        });
    }
    async update(id, updateDto) {
        await this.findOne(id);
        return this.prisma.followUpVisit.update({
            where: { id },
            data: {
                ...updateDto,
                actualDate: updateDto.actualDate ? new Date(updateDto.actualDate) : undefined,
                nextVisitDate: updateDto.nextVisitDate ? new Date(updateDto.nextVisitDate) : undefined,
                reminderDate: updateDto.reminderDate ? new Date(updateDto.reminderDate) : undefined,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.followUpVisit.delete({ where: { id } });
    }
    async getPatientFollowUpSummary(patientId) {
        const visits = await this.findByPatient(patientId);
        const summary = {
            patientId,
            totalVisits: visits.length,
            completed: visits.filter((v) => v.status === 'completed').length,
            scheduled: visits.filter((v) => v.status === 'scheduled').length,
            missed: visits.filter((v) => v.status === 'missed').length,
            cancelled: visits.filter((v) => v.status === 'cancelled').length,
            upcomingVisit: visits.find((v) => v.status === 'scheduled' && v.scheduledDate > new Date()),
            lastCompletedVisit: visits
                .filter((v) => v.status === 'completed')
                .sort((a, b) => b.actualDate.getTime() - a.actualDate.getTime())[0],
            recurrence: {
                local: visits.some((v) => v.localRecurrence === true),
                distant: visits.some((v) => v.distantMetastasis === true),
            },
        };
        return summary;
    }
};
exports.FollowUpsService = FollowUpsService;
exports.FollowUpsService = FollowUpsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FollowUpsService);
//# sourceMappingURL=follow-ups.service.js.map