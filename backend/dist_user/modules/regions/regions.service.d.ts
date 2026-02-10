import { Province, Regency, District, Village } from './entities/region.entity';
export declare class RegionsService {
    private readonly provinces;
    private readonly regencies;
    private readonly districts;
    private readonly villages;
    findAllProvinces(): Promise<Province[]>;
    findProvinceById(id: string): Promise<Province | null>;
    findRegenciesByProvinceId(provinceId: string): Promise<Regency[]>;
    findDistrictsByRegencyId(regencyId: string): Promise<District[]>;
    findVillagesByDistrictId(districtId: string): Promise<Village[]>;
}
