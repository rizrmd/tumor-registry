import { PrismaService } from '../../../database/prisma.service';
import { DataFiltersDto } from '../dto/create-research-request.dto';
export declare function estimatePatientCount(prisma: PrismaService, filters: DataFiltersDto): Promise<number>;
export declare function validateFilters(filters: DataFiltersDto): string[];
