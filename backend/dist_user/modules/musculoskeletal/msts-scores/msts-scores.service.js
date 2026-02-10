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
exports.MstsScoresService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
let MstsScoresService = class MstsScoresService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    calculateTotalScore(pain, func, emotionalAcceptance, supports, walking, gait) {
        return pain + func + emotionalAcceptance + supports + walking + gait;
    }
    async create(createDto) {
        const patient = await this.prisma.patient.findUnique({
            where: { id: createDto.patientId },
        });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient with ID ${createDto.patientId} not found`);
        }
        const totalScore = this.calculateTotalScore(createDto.pain, createDto.function, createDto.emotionalAcceptance, createDto.supports, createDto.walking, createDto.gait);
        if (totalScore < 0 || totalScore > 30) {
            throw new common_1.BadRequestException('Total MSTS score must be between 0 and 30');
        }
        return this.prisma.mstsScore.create({
            data: {
                ...createDto,
                assessmentDate: new Date(createDto.assessmentDate),
                totalScore,
            },
        });
    }
    async findAll(patientId) {
        const where = {};
        if (patientId)
            where.patientId = patientId;
        return this.prisma.mstsScore.findMany({
            where,
            orderBy: { assessmentDate: 'desc' },
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
        const score = await this.prisma.mstsScore.findUnique({
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
        if (!score) {
            throw new common_1.NotFoundException(`MSTS score with ID ${id} not found`);
        }
        return score;
    }
    async findByPatient(patientId) {
        return this.prisma.mstsScore.findMany({
            where: { patientId },
            orderBy: { assessmentDate: 'desc' },
        });
    }
    async update(id, updateDto) {
        const existing = await this.findOne(id);
        const pain = updateDto.pain ?? existing.pain;
        const func = updateDto.function ?? existing.function;
        const emotionalAcceptance = updateDto.emotionalAcceptance ?? existing.emotionalAcceptance;
        const supports = updateDto.supports ?? existing.supports;
        const walking = updateDto.walking ?? existing.walking;
        const gait = updateDto.gait ?? existing.gait;
        const totalScore = this.calculateTotalScore(pain, func, emotionalAcceptance, supports, walking, gait);
        return this.prisma.mstsScore.update({
            where: { id },
            data: {
                ...updateDto,
                assessmentDate: updateDto.assessmentDate ? new Date(updateDto.assessmentDate) : undefined,
                totalScore,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.mstsScore.delete({ where: { id } });
    }
    async getPatientScoreHistory(patientId) {
        const scores = await this.findByPatient(patientId);
        return {
            patientId,
            totalScores: scores.length,
            scores: scores.map(s => ({
                id: s.id,
                assessmentDate: s.assessmentDate,
                totalScore: s.totalScore,
                assessedBy: s.assessedBy,
            })),
            latestScore: scores[0] || null,
            averageScore: scores.length > 0
                ? scores.reduce((sum, s) => sum + s.totalScore, 0) / scores.length
                : null,
        };
    }
};
exports.MstsScoresService = MstsScoresService;
exports.MstsScoresService = MstsScoresService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MstsScoresService);
//# sourceMappingURL=msts-scores.service.js.map