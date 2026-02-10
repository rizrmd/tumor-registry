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
exports.LocationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
let LocationsService = class LocationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    formatBoneLocationName(location) {
        if (location.level === 1) {
            return location.region;
        }
        else if (location.level === 2) {
            return location.boneName;
        }
        else if (location.level === 3) {
            return location.segment
                ? `${location.boneName} - ${location.segment}`
                : location.boneName;
        }
        return location.code;
    }
    async findAllBoneLocations(level, region, includeChildren = false) {
        const where = { isActive: true };
        if (level)
            where.level = level;
        if (region)
            where.region = region;
        const locations = await this.prisma.boneLocation.findMany({
            where,
            orderBy: { sortOrder: 'asc' },
            include: includeChildren
                ? {
                    children: {
                        where: { isActive: true },
                        orderBy: { sortOrder: 'asc' },
                        include: {
                            children: {
                                where: { isActive: true },
                                orderBy: { sortOrder: 'asc' },
                            },
                        },
                    },
                }
                : undefined,
        });
        return locations.map(loc => ({
            ...loc,
            name: this.formatBoneLocationName(loc),
            children: loc.children?.map(child => ({
                ...child,
                name: this.formatBoneLocationName(child),
                children: child.children?.map(grandchild => ({
                    ...grandchild,
                    name: this.formatBoneLocationName(grandchild),
                })),
            })),
        }));
    }
    async findBoneLocationById(id) {
        const location = await this.prisma.boneLocation.findUnique({
            where: { id },
            include: {
                children: {
                    where: { isActive: true },
                    orderBy: { sortOrder: 'asc' },
                },
                parent: true,
            },
        });
        if (!location) {
            throw new common_1.NotFoundException(`Bone location not found`);
        }
        return {
            ...location,
            name: this.formatBoneLocationName(location),
            children: location.children?.map(child => ({
                ...child,
                name: this.formatBoneLocationName(child),
            })),
            parent: location.parent ? {
                ...location.parent,
                name: this.formatBoneLocationName(location.parent),
            } : null,
        };
    }
    async findBoneLocationsByParentId(parentId) {
        const locations = await this.prisma.boneLocation.findMany({
            where: { parentId, isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
        return locations.map(loc => ({
            ...loc,
            name: this.formatBoneLocationName(loc),
        }));
    }
    formatSoftTissueLocationName(location) {
        if (location.specificLocation) {
            return location.specificLocation;
        }
        return location.code;
    }
    async findAllSoftTissueLocations(anatomicalRegion) {
        const where = { isActive: true };
        if (anatomicalRegion)
            where.anatomicalRegion = anatomicalRegion;
        const locations = await this.prisma.softTissueLocation.findMany({
            where,
            orderBy: { sortOrder: 'asc' },
        });
        return locations.map(loc => ({
            ...loc,
            name: this.formatSoftTissueLocationName(loc),
        }));
    }
    async findSoftTissueLocationById(id) {
        const location = await this.prisma.softTissueLocation.findUnique({
            where: { id },
        });
        if (!location) {
            throw new common_1.NotFoundException(`Soft tissue location not found`);
        }
        return {
            ...location,
            name: this.formatSoftTissueLocationName(location),
        };
    }
    async getBoneRegions() {
        const regions = await this.prisma.boneLocation.findMany({
            where: { level: 1, isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
        return regions.map(loc => ({
            ...loc,
            name: this.formatBoneLocationName(loc),
        }));
    }
    async getSoftTissueRegions() {
        const regions = await this.prisma.softTissueLocation.groupBy({
            by: ['anatomicalRegion'],
            where: { isActive: true },
            orderBy: { anatomicalRegion: 'asc' },
        });
        return regions.map((r) => r.anatomicalRegion);
    }
};
exports.LocationsService = LocationsService;
exports.LocationsService = LocationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LocationsService);
//# sourceMappingURL=locations.service.js.map