export declare class WhoBoneTumorDto {
    id: string;
    category: string;
    subcategory: string;
    diagnosis: string;
    icdO3Code?: string;
    pageReference?: string;
    isMalignant: boolean;
    sortOrder: number;
}
export declare class WhoSoftTissueTumorDto {
    id: string;
    category: string;
    subcategory: string;
    diagnosis: string;
    icdO3Code?: string;
    isMalignant: boolean;
    sortOrder: number;
}
export declare class GetBoneTumorsQueryDto {
    category?: string;
    subcategory?: string;
    isMalignant?: boolean;
    search?: string;
}
export declare class GetSoftTissueTumorsQueryDto {
    category?: string;
    subcategory?: string;
    isMalignant?: boolean;
    search?: string;
}
