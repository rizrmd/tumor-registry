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
var CentersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CentersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("@/database/prisma.service");
const medical_record_service_1 = require("../patients/services/medical-record.service");
let CentersService = CentersService_1 = class CentersService {
    constructor(prisma, medicalRecordService) {
        this.prisma = prisma;
        this.medicalRecordService = medicalRecordService;
        this.logger = new common_1.Logger(CentersService_1.name);
    }
    async findAll(includeInactive = false) {
        try {
            const centers = await this.prisma.center.findMany({
                where: {
                    ...(includeInactive === false && { isActive: true }),
                },
                include: {
                    _count: {
                        select: {
                            users: {
                                where: {
                                    isActive: true,
                                },
                            },
                        },
                    },
                },
                orderBy: [
                    { name: 'asc' },
                ],
            });
            return centers;
        }
        catch (error) {
            this.logger.error('Error finding all centers', error);
            throw error;
        }
    }
    async findById(id, includeUsers = false) {
        try {
            const center = await this.prisma.center.findUnique({
                where: { id },
                include: {
                    ...(includeUsers && {
                        users: {
                            where: {
                                isActive: true,
                            },
                            select: {
                                id: true,
                                email: true,
                                name: true,
                                kolegiumId: true,
                                isActive: true,
                                createdAt: true,
                                userRoles: {
                                    include: {
                                        role: true,
                                    },
                                },
                            },
                            orderBy: {
                                name: 'asc',
                            },
                        },
                    }),
                    _count: {
                        select: {
                            users: {
                                where: {
                                    isActive: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!center) {
                throw new common_1.NotFoundException(`Center with ID ${id} not found`);
            }
            return {
                ...center,
                userCount: center._count.users,
                _count: undefined,
            };
        }
        catch (error) {
            this.logger.error(`Error finding center by ID: ${id}`, error);
            throw error;
        }
    }
    async findByCode(code) {
        try {
            const center = await this.prisma.center.findUnique({
                where: { code },
            });
            if (!center) {
                throw new common_1.NotFoundException(`Center with code ${code} not found`);
            }
            return center;
        }
        catch (error) {
            this.logger.error(`Error finding center by code: ${code}`, error);
            throw error;
        }
    }
    async create(centerData) {
        try {
            if (!this.medicalRecordService.validateMrPrefix(centerData.mrPrefix)) {
                throw new common_1.BadRequestException('MR Prefix must be exactly 3 uppercase letters (e.g., SBY, JKT, BDG)');
            }
            const existingCenterByCode = await this.prisma.center.findUnique({
                where: { code: centerData.code.toUpperCase() },
            });
            if (existingCenterByCode) {
                throw new common_1.ConflictException(`Center with code ${centerData.code} already exists`);
            }
            const isUnique = await this.medicalRecordService.isMrPrefixUnique(centerData.mrPrefix.toUpperCase());
            if (!isUnique) {
                throw new common_1.ConflictException(`MR Prefix ${centerData.mrPrefix} is already used by another center. Please choose a different prefix.`);
            }
            const center = await this.prisma.center.create({
                data: {
                    name: centerData.name,
                    code: centerData.code.toUpperCase(),
                    province: centerData.province,
                    regency: centerData.regency,
                    address: centerData.address,
                    mrPrefix: centerData.mrPrefix.toUpperCase(),
                    mrSequenceCounter: 0,
                    mrSequenceYear: new Date().getFullYear(),
                },
            });
            this.logger.log(`Center created: ${center.name} (${center.code}) with MR prefix: ${center.mrPrefix}`);
            return center;
        }
        catch (error) {
            this.logger.error(`Error creating center: ${centerData.name}`, error);
            throw error;
        }
    }
    async update(id, updateData) {
        try {
            const center = await this.prisma.center.findUnique({
                where: { id },
                include: {
                    _count: {
                        select: {
                            patients: true,
                        },
                    },
                },
            });
            if (!center) {
                throw new common_1.NotFoundException(`Center with ID ${id} not found`);
            }
            if (center.code === 'DEFAULT' && updateData.isActive !== undefined) {
                throw new common_1.ConflictException('Cannot modify active status of default center');
            }
            if (updateData.mrPrefix && updateData.mrPrefix !== center.mrPrefix) {
                if (!this.medicalRecordService.validateMrPrefix(updateData.mrPrefix)) {
                    throw new common_1.BadRequestException('MR Prefix must be exactly 3 uppercase letters (e.g., SBY, JKT, BDG)');
                }
                const isUnique = await this.medicalRecordService.isMrPrefixUnique(updateData.mrPrefix.toUpperCase(), id);
                if (!isUnique) {
                    throw new common_1.ConflictException(`MR Prefix ${updateData.mrPrefix} is already used by another center`);
                }
                if (center._count.patients > 0) {
                    this.logger.warn(`Changing MR prefix for center ${center.name} which already has ${center._count.patients} patients. ` +
                        `Existing patient MR numbers will NOT be changed.`);
                    throw new common_1.BadRequestException(`Cannot change MR prefix for center with existing patients (${center._count.patients} patients). ` +
                        `Contact system administrator if prefix change is absolutely necessary.`);
                }
                updateData.mrPrefix = updateData.mrPrefix.toUpperCase();
            }
            if (updateData.code && updateData.code.toUpperCase() !== center.code) {
                const existingCenter = await this.prisma.center.findUnique({
                    where: { code: updateData.code.toUpperCase() },
                });
                if (existingCenter) {
                    throw new common_1.ConflictException(`Center with code ${updateData.code} already exists`);
                }
                updateData.code = updateData.code.toUpperCase();
            }
            const updatedCenter = await this.prisma.center.update({
                where: { id },
                data: {
                    ...(updateData.name && { name: updateData.name }),
                    ...(updateData.code && { code: updateData.code }),
                    ...(updateData.province && { province: updateData.province }),
                    ...(updateData.regency !== undefined && { regency: updateData.regency }),
                    ...(updateData.address !== undefined && { address: updateData.address }),
                    ...(updateData.mrPrefix && { mrPrefix: updateData.mrPrefix }),
                    ...(updateData.isActive !== undefined && { isActive: updateData.isActive }),
                },
            });
            this.logger.log(`Center updated: ${updatedCenter.name}`);
            return updatedCenter;
        }
        catch (error) {
            this.logger.error(`Error updating center: ${id}`, error);
            throw error;
        }
    }
    async delete(id) {
        try {
            const center = await this.findById(id);
            if (center.code === 'DEFAULT') {
                throw new common_1.ConflictException('Cannot delete default center');
            }
            const userCount = await this.prisma.user.count({
                where: {
                    centerId: id,
                    isActive: true,
                },
            });
            if (userCount > 0) {
                throw new common_1.ConflictException(`Cannot delete center with ${userCount} active users`);
            }
            await this.prisma.center.delete({
                where: { id },
            });
            this.logger.log(`Center deleted: ${center.name} (${center.code})`);
        }
        catch (error) {
            this.logger.error(`Error deleting center with ID: ${id}`, error);
            throw error;
        }
    }
    async deactivate(id) {
        try {
            const center = await this.findById(id);
            if (center.code === 'DEFAULT') {
                throw new common_1.ConflictException('Cannot deactivate default center');
            }
            const deactivatedCenter = await this.prisma.center.update({
                where: { id },
                data: { isActive: false },
            });
            this.logger.log(`Center deactivated: ${deactivatedCenter.name} (${deactivatedCenter.code})`);
            return deactivatedCenter;
        }
        catch (error) {
            this.logger.error(`Error deactivating center with ID: ${id}`, error);
            throw error;
        }
    }
    async activate(id) {
        try {
            const activatedCenter = await this.prisma.center.update({
                where: { id },
                data: { isActive: true },
            });
            this.logger.log(`Center activated: ${activatedCenter.name} (${activatedCenter.code})`);
            return activatedCenter;
        }
        catch (error) {
            this.logger.error(`Error activating center with ID: ${id}`, error);
            throw error;
        }
    }
    async getStatistics() {
        try {
            const [totalCenters, activeCenters, inactiveCenters] = await Promise.all([
                this.prisma.center.count(),
                this.prisma.center.count({
                    where: { isActive: true },
                }),
                this.prisma.center.count({
                    where: { isActive: false },
                }),
            ]);
            const centerUserStats = await this.prisma.center.findMany({
                select: {
                    id: true,
                    name: true,
                    code: true,
                    _count: {
                        select: {
                            users: {
                                where: {
                                    isActive: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    name: 'asc',
                },
            });
            return {
                totalCenters,
                activeCenters,
                inactiveCenters,
                centerUserStats: centerUserStats.map(center => ({
                    id: center.id,
                    name: center.name,
                    code: center.code,
                    userCount: center._count.users,
                })),
            };
        }
        catch (error) {
            this.logger.error('Error getting center statistics', error);
            throw error;
        }
    }
    async getCenterUsers(centerId) {
        try {
            const users = await this.prisma.user.findMany({
                where: {
                    centerId,
                    isActive: true,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    kolegiumId: true,
                    isActive: true,
                    createdAt: true,
                    userRoles: {
                        include: {
                            role: true,
                        },
                    },
                },
                orderBy: {
                    name: 'asc',
                },
            });
            return users.map(user => ({
                ...user,
                roles: user.userRoles.map(ur => ur.role),
                userRoles: undefined,
            }));
        }
        catch (error) {
            this.logger.error(`Error getting users for center ${centerId}`, error);
            throw error;
        }
    }
    async checkMrPrefixAvailability(prefix) {
        try {
            const upperPrefix = prefix.toUpperCase();
            const valid = this.medicalRecordService.validateMrPrefix(upperPrefix);
            if (!valid) {
                return {
                    available: false,
                    valid: false,
                    message: 'Invalid format. Must be 3 uppercase letters (e.g., SBY, JKT, BDG)',
                };
            }
            const isUnique = await this.medicalRecordService.isMrPrefixUnique(upperPrefix);
            if (!isUnique) {
                const existingCenter = await this.prisma.center.findFirst({
                    where: { mrPrefix: upperPrefix },
                    select: { name: true },
                });
                return {
                    available: false,
                    valid: true,
                    message: `Already used by ${existingCenter?.name}`,
                };
            }
            return {
                available: true,
                valid: true,
                message: 'Available',
            };
        }
        catch (error) {
            this.logger.error(`Error checking MR prefix availability: ${prefix}`, error);
            throw error;
        }
    }
    async getRemoteDbConfig(centerId) {
        try {
            const center = await this.prisma.center.findUnique({
                where: { id: centerId },
                select: {
                    id: true,
                    remoteDbUrl: true,
                    remoteDbApiKey: true,
                },
            });
            if (!center || !center.remoteDbUrl) {
                return null;
            }
            return {
                url: center.remoteDbUrl,
                apiKey: center.remoteDbApiKey,
            };
        }
        catch (error) {
            this.logger.error(`Error getting remote DB config for center ${centerId}`, error);
            throw error;
        }
    }
    async updateRemoteDbConfig(centerId, config) {
        try {
            const center = await this.prisma.center.findUnique({
                where: { id: centerId },
            });
            if (!center) {
                throw new common_1.NotFoundException(`Center with ID ${centerId} not found`);
            }
            const updatedCenter = await this.prisma.center.update({
                where: { id: centerId },
                data: {
                    ...(config.remoteDbUrl !== undefined && { remoteDbUrl: config.remoteDbUrl }),
                    ...(config.remoteDbApiKey !== undefined && { remoteDbApiKey: config.remoteDbApiKey }),
                },
            });
            this.logger.log(`Remote DB config updated for center: ${center.name}`);
            return updatedCenter;
        }
        catch (error) {
            this.logger.error(`Error updating remote DB config for center ${centerId}`, error);
            throw error;
        }
    }
};
exports.CentersService = CentersService;
exports.CentersService = CentersService = CentersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        medical_record_service_1.MedicalRecordService])
], CentersService);
//# sourceMappingURL=centers.service.js.map
