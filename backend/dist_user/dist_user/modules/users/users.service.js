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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("@/database/prisma.service");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userData) {
        const { email, name, kolegiumId, passwordHash, phone, nik, role = 'STAFF', centerId } = userData;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        let userCenterId = centerId;
        if (!centerId) {
            const center = await this.prisma.center.create({
                data: {
                    name: 'Default Center',
                    code: 'DEFAULT',
                    province: 'DKI Jakarta',
                },
            });
            userCenterId = center.id;
        }
        const userRole = await this.prisma.role.findUnique({
            where: { code: role },
        });
        if (!userRole) {
            throw new common_1.NotFoundException(`Role ${role} not found`);
        }
        const user = await this.prisma.user.create({
            data: {
                email,
                name,
                kolegiumId,
                passwordHash,
                phone,
                nik,
                centerId: userCenterId,
                userRoles: {
                    create: {
                        roleId: userRole.id,
                        isActive: true,
                    },
                },
            },
            include: {
                center: true,
                userRoles: {
                    include: {
                        role: true,
                    },
                },
            },
        });
        return this.findById(user.id);
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                center: true,
                userRoles: {
                    where: { isActive: true },
                    include: {
                        role: true,
                    },
                },
            },
        });
        return user;
    }
    async findByEmail(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: {
                center: true,
                userRoles: {
                    where: { isActive: true },
                    include: {
                        role: true,
                    },
                },
            },
        });
        return user;
    }
    async update(id, updateData) {
        const user = await this.prisma.user.update({
            where: { id },
            data: updateData,
            include: {
                center: true,
                userRoles: {
                    where: { isActive: true },
                    include: {
                        role: true,
                    },
                },
            },
        });
        return user;
    }
    async getUserRole(userId) {
        const userRole = await this.prisma.userRole.findFirst({
            where: {
                userId,
                isActive: true,
            },
            include: {
                role: true,
            },
        });
        return userRole?.role.code || 'STAFF';
    }
    async getUserPermissions(userId) {
        const userRoles = await this.prisma.userRole.findMany({
            where: {
                userId,
                isActive: true,
            },
            include: {
                role: {
                    include: {
                        permissions: {
                            include: {
                                permission: true,
                            },
                        },
                    },
                },
            },
        });
        const permissions = userRoles.flatMap(ur => ur.role.permissions?.map(rp => rp.permission.code) || []);
        return [...new Set(permissions)];
    }
    async findAll() {
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                isActive: true,
                isEmailVerified: true,
                createdAt: true,
                center: {
                    select: {
                        name: true,
                    },
                },
                userRoles: {
                    where: { isActive: true },
                    select: {
                        role: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return users;
    }
    async updateRole(userId, roleCode) {
        const newRole = await this.prisma.role.findUnique({
            where: { code: roleCode },
        });
        if (!newRole) {
            throw new common_1.NotFoundException(`Role ${roleCode} not found`);
        }
        await this.prisma.userRole.updateMany({
            where: { userId },
            data: { isActive: false },
        });
        await this.prisma.userRole.create({
            data: {
                userId,
                roleId: newRole.id,
                isActive: true,
            },
        });
        await this.prisma.auditLog.create({
            data: {
                userId,
                action: 'ROLE_UPDATE',
                resource: 'user',
                details: {
                    old_role: 'updated',
                    new_role: roleCode,
                },
            },
        });
        return this.findById(userId);
    }
    async validatePassword(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
    async hashPassword(plainPassword) {
        return bcrypt.hash(plainPassword, 12);
    }
    async createUser(createUserDto, createdById) {
        const { password, role, isActive = true, ...userData } = createUserDto;
        const passwordHash = await this.hashPassword(password);
        const center = await this.prisma.center.findUnique({
            where: { id: userData.centerId },
        });
        if (!center) {
            throw new common_1.NotFoundException(`Center with ID ${userData.centerId} not found`);
        }
        const userRole = await this.prisma.role.findUnique({
            where: { code: role },
        });
        if (!userRole) {
            throw new common_1.NotFoundException(`Role ${role} not found`);
        }
        const user = await this.prisma.user.create({
            data: {
                ...userData,
                passwordHash,
                isActive,
                userRoles: {
                    create: {
                        roleId: userRole.id,
                        isActive: true,
                    },
                },
            },
            include: {
                center: true,
                userRoles: {
                    where: { isActive: true },
                    include: {
                        role: true,
                    },
                },
            },
        });
        await this.prisma.auditLog.create({
            data: {
                userId: createdById,
                action: 'USER_CREATE',
                resource: 'user',
                details: {
                    created_user_id: user.id,
                    created_user_email: user.email,
                    role: role,
                },
            },
        });
        const { passwordHash: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async updateUser(id, updateUserDto, updatedById) {
        const existingUser = await this.prisma.user.findUnique({
            where: { id },
            include: {
                userRoles: {
                    where: { isActive: true },
                    include: { role: true },
                },
            },
        });
        if (!existingUser) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const { password, role, centerId, email, ...updateData } = updateUserDto;
        if (email && email !== existingUser.email) {
            const emailExists = await this.prisma.user.findUnique({
                where: { email },
            });
            if (emailExists) {
                throw new common_1.ConflictException('Email is already in use by another user');
            }
        }
        if (centerId) {
            const center = await this.prisma.center.findUnique({
                where: { id: centerId },
            });
            if (!center) {
                throw new common_1.NotFoundException(`Center with ID ${centerId} not found`);
            }
        }
        let passwordHash;
        if (password) {
            passwordHash = await this.hashPassword(password);
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                ...updateData,
                ...(email && { email }),
                ...(centerId && { centerId }),
                ...(passwordHash && { passwordHash }),
            },
            include: {
                center: true,
                userRoles: {
                    where: { isActive: true },
                    include: {
                        role: true,
                    },
                },
            },
        });
        if (role) {
            await this.updateRole(id, role);
        }
        await this.prisma.auditLog.create({
            data: {
                userId: updatedById,
                action: 'USER_UPDATE',
                resource: 'user',
                details: {
                    updated_user_id: id,
                    updated_fields: Object.keys(updateUserDto),
                },
            },
        });
        return this.findById(id);
    }
    async deleteUser(id, deletedById) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        if (id === deletedById) {
            throw new common_1.ConflictException('You cannot delete your own account');
        }
        await this.prisma.user.update({
            where: { id },
            data: {
                isActive: false,
            },
        });
        await this.prisma.userRole.updateMany({
            where: { userId: id },
            data: { isActive: false },
        });
        await this.prisma.auditLog.create({
            data: {
                userId: deletedById,
                action: 'USER_DELETE',
                resource: 'user',
                details: {
                    deleted_user_id: id,
                    deleted_user_email: user.email,
                },
            },
        });
        return { message: 'User deleted successfully' };
    }
    async toggleUserStatus(id, isActive, updatedById) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        if (id === updatedById && !isActive) {
            throw new common_1.ConflictException('You cannot deactivate your own account');
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: { isActive },
            include: {
                center: true,
                userRoles: {
                    where: { isActive: true },
                    include: {
                        role: true,
                    },
                },
            },
        });
        await this.prisma.auditLog.create({
            data: {
                userId: updatedById,
                action: 'USER_STATUS_TOGGLE',
                resource: 'user',
                details: {
                    user_id: id,
                    new_status: isActive ? 'active' : 'inactive',
                },
            },
        });
        return updatedUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map
