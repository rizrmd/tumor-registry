export declare enum OfflineOperation {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    SYNC = "SYNC"
}
export declare class SyncOfflineDataDto {
    entityType: string;
    entityId?: string;
    operation: OfflineOperation;
    data: any;
    priority?: number;
    localTimestamp: string;
    deviceId?: string;
    sessionId?: string;
    metadata?: any;
}
