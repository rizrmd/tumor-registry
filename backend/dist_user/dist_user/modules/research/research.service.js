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
exports.ResearchService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let ResearchService = class ResearchService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId) {
        const requests = await this.prisma.researchRequest.findMany({
            where: {
                createdBy: userId,
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                principalInvestigator: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return requests.map((req) => ({
            id: req.id,
            title: req.title,
            description: req.description,
            status: req.status,
            studyType: req.studyType,
            submittedAt: req.submittedAt,
            createdAt: req.createdAt,
            creator: req.creator,
            principalInvestigator: req.principalInvestigator,
        }));
    }
    async findById(id, userId) {
        return this.prisma.researchRequest.findFirst({
            where: {
                id,
                createdBy: userId,
            },
            include: {
                creator: true,
                principalInvestigator: true,
            },
        });
    }
    async create(data, userId) {
        return this.prisma.researchRequest.create({
            data: {
                title: data.title,
                description: data.description,
                principalInvestigatorId: userId,
                studyType: data.studyType || 'OBSERVATIONAL',
                objectives: data.objectives || '',
                methodology: data.methodology || '',
                inclusionCriteria: data.inclusionCriteria || '',
                exclusionCriteria: data.exclusionCriteria || '',
                sampleSize: data.sampleSize || 100,
                duration: data.duration || 12,
                dataRequested: data.dataRequested || '',
                createdBy: userId,
            },
            include: {
                creator: true,
                principalInvestigator: true,
            },
        });
    }
    async update(id, data, userId) {
        return this.prisma.researchRequest.update({
            where: {
                id,
                createdBy: userId,
            },
            data: {
                title: data.title,
                description: data.description,
                objectives: data.objectives,
                methodology: data.methodology,
                status: data.status,
                updatedAt: new Date(),
            },
            include: {
                creator: true,
                principalInvestigator: true,
            },
        });
    }
    async delete(id, userId) {
        return this.prisma.researchRequest.delete({
            where: {
                id,
                createdBy: userId,
            },
        });
    }
};
exports.ResearchService = ResearchService;
exports.ResearchService = ResearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ResearchService);
//# sourceMappingURL=research.service.js.map
