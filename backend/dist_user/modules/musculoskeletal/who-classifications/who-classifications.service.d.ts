import { PrismaService } from '../../../database/prisma.service';
export declare class WhoClassificationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAllBoneTumors(category?: string, subcategory?: string, isMalignant?: boolean, search?: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        diagnosis: string;
        category: string;
        subcategory: string;
        icdO3Code: string | null;
        pageReference: string | null;
        isMalignant: boolean;
        sortOrder: number;
    }[]>;
    findBoneTumorById(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        diagnosis: string;
        category: string;
        subcategory: string;
        icdO3Code: string | null;
        pageReference: string | null;
        isMalignant: boolean;
        sortOrder: number;
    }>;
    getBoneTumorCategories(): Promise<string[]>;
    getBoneTumorSubcategories(category?: string): Promise<(import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.WhoBoneTumorClassificationGroupByOutputType, ("category" | "subcategory")[]> & {})[]>;
    findAllSoftTissueTumors(category?: string, subcategory?: string, isMalignant?: boolean, search?: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        diagnosis: string;
        category: string;
        subcategory: string;
        icdO3Code: string | null;
        isMalignant: boolean;
        sortOrder: number;
    }[]>;
    findSoftTissueTumorById(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        diagnosis: string;
        category: string;
        subcategory: string;
        icdO3Code: string | null;
        isMalignant: boolean;
        sortOrder: number;
    }>;
    getSoftTissueTumorCategories(): Promise<string[]>;
    getSoftTissueTumorSubcategories(category?: string): Promise<(import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.WhoSoftTissueTumorClassificationGroupByOutputType, ("category" | "subcategory")[]> & {})[]>;
}
