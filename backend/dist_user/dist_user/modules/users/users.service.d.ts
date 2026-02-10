import { PrismaService } from '@/database/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userData: {
        email: string;
        name: string;
        kolegiumId?: string;
        passwordHash: string;
        phone?: string;
        nik?: string;
        role?: string;
        centerId?: string;
    }): Promise<{
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
    findById(id: string): Promise<{
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
    findByEmail(email: string): Promise<{
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
    update(id: string, updateData: Partial<{
        name: string;
        phone: string;
        nik: string;
        isActive: boolean;
        isEmailVerified: boolean;
        mfaEnabled: boolean;
        mfaSecret: string;
        lastLoginAt: Date;
    }>): Promise<{
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
    getUserRole(userId: string): Promise<string>;
    getUserPermissions(userId: string): Promise<string[]>;
    findAll(): Promise<{
        center: {
            name: string;
        };
        email: string;
        name: string;
        id: string;
        isActive: boolean;
        isEmailVerified: boolean;
        createdAt: Date;
        userRoles: {
            role: {
                name: string;
            };
        }[];
    }[]>;
    updateRole(userId: string, roleCode: string): Promise<{
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
    validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    hashPassword(plainPassword: string): Promise<string>;
    createUser(createUserDto: {
        email: string;
        name: string;
        password: string;
        kolegiumId?: string;
        phone?: string;
        nik?: string;
        centerId: string;
        role: string;
        isActive?: boolean;
    }, createdById: string): Promise<{
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
        centerId: string | null;
        email: string;
        name: string;
        kolegiumId: string | null;
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
    updateUser(id: string, updateUserDto: {
        name?: string;
        email?: string;
        kolegiumId?: string;
        phone?: string;
        nik?: string;
        centerId?: string;
        role?: string;
        isActive?: boolean;
        password?: string;
    }, updatedById: string): Promise<{
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
    deleteUser(id: string, deletedById: string): Promise<{
        message: string;
    }>;
    toggleUserStatus(id: string, isActive: boolean, updatedById: string): Promise<{
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
}
