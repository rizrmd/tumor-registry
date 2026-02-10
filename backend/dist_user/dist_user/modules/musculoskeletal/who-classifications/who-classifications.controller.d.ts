import { WhoClassificationsService } from './who-classifications.service';
import { WhoBoneTumorDto, WhoSoftTissueTumorDto, GetBoneTumorsQueryDto, GetSoftTissueTumorsQueryDto } from './dto/who-classification.dto';
export declare class WhoClassificationsController {
    private readonly service;
    constructor(service: WhoClassificationsService);
    getAllBoneTumors(query: GetBoneTumorsQueryDto): Promise<WhoBoneTumorDto[]>;
    getBoneTumorCategories(): Promise<string[]>;
    getBoneTumorSubcategories(category?: string): Promise<(import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.WhoBoneTumorClassificationGroupByOutputType, ("category" | "subcategory")[]> & {})[]>;
    getBoneTumorById(id: string): Promise<WhoBoneTumorDto>;
    getAllSoftTissueTumors(query: GetSoftTissueTumorsQueryDto): Promise<WhoSoftTissueTumorDto[]>;
    getSoftTissueTumorCategories(): Promise<string[]>;
    getSoftTissueTumorSubcategories(category?: string): Promise<(import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.WhoSoftTissueTumorClassificationGroupByOutputType, ("category" | "subcategory")[]> & {})[]>;
    getSoftTissueTumorById(id: string): Promise<WhoSoftTissueTumorDto>;
}
