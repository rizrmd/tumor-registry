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
var PasswordPolicyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordPolicyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("@/database/prisma.service");
const bcrypt = require("bcryptjs");
let PasswordPolicyService = PasswordPolicyService_1 = class PasswordPolicyService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(PasswordPolicyService_1.name);
    }
    async createPasswordPolicy(data) {
        try {
            const policy = await this.prisma.passwordPolicy.create({
                data: {
                    ...data,
                    isActive: data.isActive ?? true,
                },
            });
            this.logger.log(`Password policy created: ${policy.name}`);
            return policy;
        }
        catch (error) {
            this.logger.error('Failed to create password policy', error);
            throw new common_1.ConflictException('Password policy with this name already exists');
        }
    }
    async validatePassword(password, policyId, userId) {
        const errors = [];
        let score = 0;
        const policy = await this.getApplicablePolicy(policyId, userId);
        if (!policy) {
            return this.defaultPasswordValidation(password);
        }
        if (policy.minLength && password.length < policy.minLength) {
            errors.push(`Password must be at least ${policy.minLength} characters long`);
        }
        else {
            score += 20;
        }
        if (policy.requireUppercase && !/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        else if (policy.requireUppercase) {
            score += 15;
        }
        if (policy.requireLowercase && !/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        else if (policy.requireLowercase) {
            score += 15;
        }
        if (policy.requireNumbers && !/\d/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        else if (policy.requireNumbers) {
            score += 15;
        }
        if (policy.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('Password must contain at least one special character');
        }
        else if (policy.requireSpecialChars) {
            score += 15;
        }
        if (this.hasCommonPatterns(password)) {
            errors.push('Password contains common patterns that are not allowed');
        }
        else {
            score += 10;
        }
        if (userId && policy.preventReuse && policy.preventReuse > 0) {
            const isReused = await this.isPasswordReused(userId, password, policy.preventReuse);
            if (isReused) {
                errors.push(`Cannot reuse last ${policy.preventReuse} passwords`);
            }
            else {
                score += 10;
            }
        }
        return {
            isValid: errors.length === 0,
            errors,
            score: Math.min(score, 100),
        };
    }
    async isPasswordExpired(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                updatedAt: true,
                centerId: true
            }
        });
        if (!user) {
            return true;
        }
        const policy = await this.getApplicablePolicy(undefined, userId);
        if (!policy || !policy.maxAge) {
            return false;
        }
        const now = new Date();
        const passwordAge = Math.floor((now.getTime() - user.updatedAt.getTime()) / (1000 * 60 * 60 * 24));
        return passwordAge > policy.maxAge;
    }
    async checkAccountLockout(userId) {
        const policy = await this.getApplicablePolicy(undefined, userId);
        if (!policy || !policy.lockoutThreshold || !policy.lockoutDuration) {
            return { isLocked: false };
        }
        const failedAttempts = await this.getFailedAttempts(userId);
        const lockoutUntil = await this.getLockoutUntil(userId);
        if (lockoutUntil && lockoutUntil > new Date()) {
            return {
                isLocked: true,
                lockoutUntil,
            };
        }
        const remainingAttempts = Math.max(0, policy.lockoutThreshold - failedAttempts);
        return {
            isLocked: false,
            remainingAttempts,
        };
    }
    async recordFailedAttempt(userId) {
        const policy = await this.getApplicablePolicy(undefined, userId);
        if (!policy || !policy.lockoutThreshold || !policy.lockoutDuration) {
            return;
        }
        await this.prisma.failedLoginAttempt.create({
            data: {
                userId,
                timestamp: new Date(),
            },
        });
        const failedAttempts = await this.getFailedAttempts(userId);
        if (failedAttempts >= policy.lockoutThreshold) {
            await this.lockAccount(userId, policy.lockoutDuration);
        }
    }
    async recordSuccessfulAttempt(userId) {
        await this.prisma.failedLoginAttempt.deleteMany({
            where: { userId },
        });
    }
    async getComplianceReport(organizationId) {
        const whereClause = organizationId
            ? { centerId: organizationId }
            : {};
        const totalUsers = await this.prisma.user.count({ where: whereClause });
        const expiredPasswords = await this.getUsersWithExpiredPasswords(organizationId);
        const weakPasswords = await this.getUsersWithWeakPasswords(organizationId);
        const compliantPasswords = totalUsers - expiredPasswords.length - weakPasswords.length;
        const complianceScore = totalUsers > 0 ? (compliantPasswords / totalUsers) * 100 : 0;
        return {
            totalUsers,
            compliantPasswords,
            expiredPasswords: expiredPasswords.length,
            weakPasswords: weakPasswords.length,
            complianceScore,
        };
    }
    async getApplicablePolicy(policyId, userId) {
        if (policyId) {
            return this.prisma.passwordPolicy.findUnique({
                where: { id: policyId, isActive: true },
            });
        }
        if (userId) {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                select: {
                    centerId: true
                },
            });
            if (user) {
                if (user.centerId) {
                    const centerPolicy = await this.prisma.passwordPolicy.findFirst({
                        where: { isActive: true },
                    });
                    if (centerPolicy)
                        return centerPolicy;
                }
            }
        }
        return this.prisma.passwordPolicy.findFirst({
            where: { organizationId: null, roleId: null, isActive: true },
        });
    }
    defaultPasswordValidation(password) {
        const errors = [];
        let score = 0;
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }
        else {
            score += 30;
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        else {
            score += 25;
        }
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        else {
            score += 25;
        }
        if (!/\d/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        else {
            score += 20;
        }
        return {
            isValid: errors.length === 0,
            errors,
            score,
        };
    }
    hasCommonPatterns(password) {
        const commonPatterns = [
            /123456/i,
            /password/i,
            /qwerty/i,
            /abc123/i,
            /admin/i,
            /(.)\1{2,}/,
            /012345/i,
            /111111/i,
        ];
        return commonPatterns.some(pattern => pattern.test(password));
    }
    async isPasswordReused(userId, newPassword, preventReuse) {
        const passwordHashes = await this.prisma.passwordHistory.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: preventReuse,
            select: { passwordHash: true },
        });
        for (const history of passwordHashes) {
            const isMatch = await bcrypt.compare(newPassword, history.passwordHash);
            if (isMatch)
                return true;
        }
        return false;
    }
    async getFailedAttempts(userId) {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return this.prisma.failedLoginAttempt.count({
            where: {
                userId,
                timestamp: { gte: twentyFourHoursAgo },
            },
        });
    }
    async getLockoutUntil(userId) {
        const lockout = await this.prisma.accountLockout.findFirst({
            where: { userId },
            orderBy: { lockedUntil: 'desc' },
        });
        return lockout?.lockedUntil || null;
    }
    async lockAccount(userId, durationMinutes) {
        const lockoutUntil = new Date(Date.now() + durationMinutes * 60 * 1000);
        await this.prisma.accountLockout.create({
            data: {
                userId,
                lockedUntil: lockoutUntil,
                reason: 'Too many failed login attempts',
            },
        });
        await this.prisma.user.update({
            where: { id: userId },
            data: { isActive: false },
        });
        this.logger.warn(`Account locked for user ${userId} until ${lockoutUntil}`);
    }
    async getUsersWithExpiredPasswords(organizationId) {
        const whereClause = {
            passwordChangedAt: {
                lt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
            },
        };
        if (organizationId) {
            whereClause.center = { organizationId };
        }
        return this.prisma.user.findMany({
            where: whereClause,
            select: { id: true },
        });
    }
    async getUsersWithWeakPasswords(organizationId) {
        return [];
    }
};
exports.PasswordPolicyService = PasswordPolicyService;
exports.PasswordPolicyService = PasswordPolicyService = PasswordPolicyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PasswordPolicyService);
//# sourceMappingURL=password-policy.service.js.map
