import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { EmailService } from './email.service';
import { PrismaService } from '@/database/prisma.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private emailService;
    private prisma;
    constructor(usersService: UsersService, jwtService: JwtService, emailService: EmailService, prisma: PrismaService);
    register(registerDto: RegisterDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            isActive: boolean;
            isEmailVerified: boolean;
            mfaEnabled: boolean;
            role: string;
        };
        message: string;
        verificationToken: string;
        mfaSecret: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        requireMFA: boolean;
        tempToken: string;
        message: string;
    } | {
        requireMFA: boolean;
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            centerId: string;
        };
        tempToken?: undefined;
        message?: undefined;
    }>;
    verifyMFA(tempToken: string, mfaCode: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            centerId: string;
        };
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    validateRefreshToken(userId: string, refreshToken: string): Promise<{
        center: {
            name: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            province: string;
            regency: string | null;
            address: string | null;
            remoteDbUrl: string | null;
            remoteDbApiKey: string | null;
            mrPrefix: string | null;
            mrSequenceCounter: number;
            mrSequenceYear: number;
        };
        userRoles: ({
            role: {
                description: string | null;
                name: string;
                id: string;
                code: string;
                level: number;
            };
        } & {
            id: string;
            isActive: boolean;
            createdAt: Date;
            roleId: string;
            userId: string;
        })[];
    } & {
        centerId: string | null;
        email: string;
        name: string;
        kolegiumId: string | null;
        passwordHash: string;
        phone: string | null;
        nik: string | null;
        id: string;
        isActive: boolean;
        isEmailVerified: boolean;
        mfaEnabled: boolean;
        mfaSecret: string | null;
        lastLoginAt: Date | null;
        isLocked: boolean;
        lockedUntil: Date | null;
        isSsoUser: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUserProfile(userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        role: string;
        centerId: string;
        isActive: boolean;
        isEmailVerified: boolean;
        mfaEnabled: boolean;
    }>;
    logout(userId: string, refreshToken: string): Promise<{
        message: string;
    }>;
    revokeAllUserTokens(userId: string): Promise<void>;
    validateUser(email: string, password: string): Promise<{
        center: {
            name: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            province: string;
            regency: string | null;
            address: string | null;
            remoteDbUrl: string | null;
            remoteDbApiKey: string | null;
            mrPrefix: string | null;
            mrSequenceCounter: number;
            mrSequenceYear: number;
        };
        userRoles: ({
            role: {
                description: string | null;
                name: string;
                id: string;
                code: string;
                level: number;
            };
        } & {
            id: string;
            isActive: boolean;
            createdAt: Date;
            roleId: string;
            userId: string;
        })[];
    } & {
        centerId: string | null;
        email: string;
        name: string;
        kolegiumId: string | null;
        passwordHash: string;
        phone: string | null;
        nik: string | null;
        id: string;
        isActive: boolean;
        isEmailVerified: boolean;
        mfaEnabled: boolean;
        mfaSecret: string | null;
        lastLoginAt: Date | null;
        isLocked: boolean;
        lockedUntil: Date | null;
        isSsoUser: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    private generateTokens;
    validateToken(token: string): Promise<any>;
    private storeRefreshToken;
    private validateKolegiumId;
    private determineInitialRole;
}
