import { LocationsService } from './locations.service';
import { BoneLocationDto, SoftTissueLocationDto, GetBoneLocationsQueryDto, GetSoftTissueLocationsQueryDto } from './dto/location.dto';
export declare class LocationsController {
    private readonly service;
    constructor(service: LocationsService);
    getAllBoneLocations(query: GetBoneLocationsQueryDto): Promise<BoneLocationDto[]>;
    getBoneRegions(): Promise<BoneLocationDto[]>;
    getBoneLocationById(id: string): Promise<BoneLocationDto>;
    getBoneLocationChildren(id: string): Promise<BoneLocationDto[]>;
    getAllSoftTissueLocations(query: GetSoftTissueLocationsQueryDto): Promise<SoftTissueLocationDto[]>;
    getSoftTissueRegions(): Promise<string[]>;
    getSoftTissueLocationById(id: string): Promise<SoftTissueLocationDto>;
}
