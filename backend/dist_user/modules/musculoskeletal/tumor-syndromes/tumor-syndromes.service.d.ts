import { PrismaService } from '../../../database/prisma.service';
import { CreateTumorSyndromeDto } from './dto/tumor-syndrome.dto';
export declare class TumorSyndromesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        description: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        geneticMarker: string | null;
        associatedTumors: string | null;
    }[]>;
    findOne(id: string): Promise<{
        description: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        geneticMarker: string | null;
        associatedTumors: string | null;
    }>;
    create(dto: CreateTumorSyndromeDto): Promise<{
        description: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        geneticMarker: string | null;
        associatedTumors: string | null;
    }>;
}
