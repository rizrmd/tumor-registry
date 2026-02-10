import { PrismaService } from '../../../database/prisma.service';
import { CreatePathologyTypeDto, UpdatePathologyTypeDto } from './dto/pathology-type.dto';
export declare class PathologyTypesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        description: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        sortOrder: number;
    }[]>;
    findOne(id: string): Promise<{
        description: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        sortOrder: number;
    }>;
    findByCode(code: string): Promise<{
        description: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        sortOrder: number;
    }>;
    create(createDto: CreatePathologyTypeDto): Promise<{
        description: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        sortOrder: number;
    }>;
    update(id: string, updateDto: UpdatePathologyTypeDto): Promise<{
        description: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        sortOrder: number;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        sortOrder: number;
    }>;
}
