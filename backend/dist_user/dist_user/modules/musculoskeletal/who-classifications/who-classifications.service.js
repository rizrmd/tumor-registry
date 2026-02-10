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
exports.WhoClassificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
let WhoClassificationsService = class WhoClassificationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllBoneTumors(category, subcategory, isMalignant, search) {
        const where = { isActive: true };
        if (category)
            where.category = category;
        if (subcategory)
            where.subcategory = subcategory;
        if (isMalignant !== undefined)
            where.isMalignant = isMalignant;
        if (search) {
            where.diagnosis = { contains: search, mode: 'insensitive' };
        }
        return this.prisma.whoBoneTumorClassification.findMany({
            where,
            orderBy: { sortOrder: 'asc' },
        });
    }
    async findBoneTumorById(id) {
        const tumor = await this.prisma.whoBoneTumorClassification.findUnique({
            where: { id },
        });
        if (!tumor)
            throw new common_1.NotFoundException(`Bone tumor classification not found`);
        return tumor;
    }
    async getBoneTumorCategories() {
        const categories = await this.prisma.whoBoneTumorClassification.groupBy({
            by: ['category'],
            where: { isActive: true },
            orderBy: { category: 'asc' },
        });
        return categories.map((c) => c.category);
    }
    async getBoneTumorSubcategories(category) {
        const where = { isActive: true };
        if (category)
            where.category = category;
        const subcategories = await this.prisma.whoBoneTumorClassification.groupBy({
            by: ['subcategory', 'category'],
            where,
            orderBy: { subcategory: 'asc' },
        });
        return subcategories;
    }
    async findAllSoftTissueTumors(category, subcategory, isMalignant, search) {
        const where = { isActive: true };
        if (category)
            where.category = category;
        if (subcategory)
            where.subcategory = subcategory;
        if (isMalignant !== undefined)
            where.isMalignant = isMalignant;
        if (search) {
            where.diagnosis = { contains: search, mode: 'insensitive' };
        }
        return this.prisma.whoSoftTissueTumorClassification.findMany({
            where,
            orderBy: { sortOrder: 'asc' },
        });
    }
    async findSoftTissueTumorById(id) {
        const tumor = await this.prisma.whoSoftTissueTumorClassification.findUnique({
            where: { id },
        });
        if (!tumor)
            throw new common_1.NotFoundException(`Soft tissue tumor classification not found`);
        return tumor;
    }
    async getSoftTissueTumorCategories() {
        const categories = await this.prisma.whoSoftTissueTumorClassification.groupBy({
            by: ['category'],
            where: { isActive: true },
            orderBy: { category: 'asc' },
        });
        return categories.map((c) => c.category);
    }
    async getSoftTissueTumorSubcategories(category) {
        const where = { isActive: true };
        if (category)
            where.category = category;
        const subcategories = await this.prisma.whoSoftTissueTumorClassification.groupBy({
            by: ['subcategory', 'category'],
            where,
            orderBy: { subcategory: 'asc' },
        });
        return subcategories;
    }
};
exports.WhoClassificationsService = WhoClassificationsService;
exports.WhoClassificationsService = WhoClassificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WhoClassificationsService);
//# sourceMappingURL=who-classifications.service.js.map
