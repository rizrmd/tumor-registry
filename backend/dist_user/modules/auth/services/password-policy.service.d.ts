import { PrismaService } from '@/database/prisma.service';
export declare class PasswordPolicyService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createPasswordPolicy(data: {
        name: string;
        minLength?: number;
        requireUppercase?: boolean;
        requireLowercase?: boolean;
        requireNumbers?: boolean;
        requireSpecialChars?: boolean;
        preventReuse?: number;
        maxAge?: number;
        lockoutThreshold?: number;
        lockoutDuration?: number;
        organizationId?: string;
        roleId?: string;
        isActive?: boolean;
    }): Promise<{
        centerId: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        roleId: string | null;
        minLength: number | null;
        maxAge: number | null;
        requireUppercase: boolean;
        requireLowercase: boolean;
        requireNumbers: boolean;
        requireSpecialChars: boolean;
        preventReuse: number | null;
        lockoutThreshold: number | null;
        lockoutDuration: number | null;
        maxConcurrentSessions: number | null;
        organizationId: string | null;
    }>;
    validatePassword(password: string, policyId?: string, userId?: string): Promise<{
        isValid: boolean;
        errors: string[];
        score: number;
    }>;
    isPasswordExpired(userId: string): Promise<boolean>;
    checkAccountLockout(userId: string): Promise<{
        isLocked: boolean;
        remainingAttempts?: number;
        lockoutUntil?: Date;
    }>;
    recordFailedAttempt(userId: string): Promise<void>;
    recordSuccessfulAttempt(userId: string): Promise<void>;
    getComplianceReport(organizationId?: string): Promise<{
        totalUsers: number;
        compliantPasswords: number;
        expiredPasswords: number;
        weakPasswords: number;
        complianceScore: number;
    }>;
    private getApplicablePolicy;
    private defaultPasswordValidation;
    private hasCommonPatterns;
    private isPasswordReused;
    private getFailedAttempts;
    private getLockoutUntil;
    private lockAccount;
    private getUsersWithExpiredPasswords;
    private getUsersWithWeakPasswords;
}
