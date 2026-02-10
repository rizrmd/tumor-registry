import { PrismaService } from '../../../database/prisma.service';
export interface ExportOptions {
    requestedDataFields: any;
    dataFilters: any;
    includeIdentifiableData: boolean;
    format: 'csv' | 'xlsx';
}
export interface ExportedData {
    patients: any[];
    totalCount: number;
    exportedFields: string[];
}
export declare function exportPatientData(prisma: PrismaService, options: ExportOptions): Promise<ExportedData>;
export declare function convertToCSV(data: ExportedData): string;
