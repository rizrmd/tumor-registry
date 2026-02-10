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
exports.PathologyTypesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
let PathologyTypesService = class PathologyTypesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.pathologyType.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
    }
    async findOne(id) {
        const pathologyType = await this.prisma.pathologyType.findUnique({
            where: { id },
        });
        if (!pathologyType) {
            throw new common_1.NotFoundException(`Pathology type with ID ${id} not found`);
        }
        return pathologyType;
    }
    async findByCode(code) {
        const pathologyType = await this.prisma.pathologyType.findUnique({
            where: { code },
        });
        if (!pathologyType) {
            throw new common_1.NotFoundException(`Pathology type with code ${code} not found`);
        }
        return pathologyType;
    }
    async create(createDto) {
        return this.prisma.pathologyType.create({
            data: {
                ...createDto,
                sortOrder: createDto.sortOrder ?? 0,
            },
        });
    }
    async update(id, updateDto) {
        await this.findOne(id);
        return this.prisma.pathologyType.update({
            where: { id },
            data: updateDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.pathologyType.update({
            where: { id },
            data: { isActive: false },
        });
    }
};
exports.PathologyTypesService = PathologyTypesService;
exports.PathologyTypesService = PathologyTypesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PathologyTypesService);
//# sourceMappingURL=pathology-types.service.js.map