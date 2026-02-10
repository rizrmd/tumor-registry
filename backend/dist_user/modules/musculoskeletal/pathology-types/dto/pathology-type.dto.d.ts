export declare class PathologyTypeDto {
    id: string;
    code: string;
    name: string;
    description?: string;
    isActive: boolean;
    sortOrder: number;
}
export declare class CreatePathologyTypeDto {
    code: string;
    name: string;
    description?: string;
    sortOrder?: number;
}
export declare class UpdatePathologyTypeDto {
    name?: string;
    description?: string;
    isActive?: boolean;
    sortOrder?: number;
}
