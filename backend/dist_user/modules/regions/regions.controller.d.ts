import { RegionsService } from './regions.service';
export declare class RegionsController {
    private readonly regionsService;
    constructor(regionsService: RegionsService);
    findAllProvinces(): Promise<import("./entities/region.entity").Province[]>;
    findProvinceById(provinceId: string): Promise<import("./entities/region.entity").Province | {
        success: boolean;
        message: string;
    }>;
    findRegenciesByProvinceId(provinceId: string): Promise<import("./entities/region.entity").Regency[]>;
    findDistrictsByRegencyId(regencyId: string): Promise<import("./entities/region.entity").District[]>;
    findVillagesByDistrictId(districtId: string): Promise<import("./entities/region.entity").Village[]>;
}
