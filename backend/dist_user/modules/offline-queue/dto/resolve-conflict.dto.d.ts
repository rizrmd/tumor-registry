export declare enum ConflictResolution {
    USE_LOCAL = "USE_LOCAL",
    USE_REMOTE = "USE_REMOTE",
    MERGE = "MERGE",
    MANUAL = "MANUAL"
}
export declare class ResolveConflictDto {
    resolution: ConflictResolution;
    mergedData?: any;
}
