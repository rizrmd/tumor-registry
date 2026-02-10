import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ToggleStatusDto } from './dto/toggle-status.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    getProfile(id: string): Promise<any>;
    getUsersByCenter(centerId: string): Promise<{
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
    getStatistics(): Promise<{
        total: number;
        active: number;
        inactive: number;
        verified: number;
        byRole: any;
        byCenterCount: any;
    }>;
    findOne(id: string): Promise<any>;
    create(createUserDto: CreateUserDto, req: any): Promise<{
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
    update(id: string, updateUserDto: UpdateUserDto, req: any): Promise<{
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
    toggleStatus(id: string, toggleStatusDto: ToggleStatusDto, req: any): Promise<{
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
    updateRole(id: string, body: {
        roleCode: string;
    }, req: any): Promise<{
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
    delete(id: string, req: any): Promise<{
        message: string;
    }>;
}
