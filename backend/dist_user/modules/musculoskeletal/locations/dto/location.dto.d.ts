export declare class BoneLocationDto {
    id: string;
    code: string;
    level: number;
    region: string;
    boneName?: string;
    segment?: string;
    parentId?: string;
    sortOrder: number;
    children?: BoneLocationDto[];
}
export declare class SoftTissueLocationDto {
    id: string;
    code: string;
    anatomicalRegion: string;
    specificLocation: string;
    sortOrder: number;
}
export declare class GetBoneLocationsQueryDto {
    level?: number;
    region?: string;
    includeChildren?: boolean;
}
export declare class GetSoftTissueLocationsQueryDto {
    anatomicalRegion?: string;
}
