export declare enum ViewType {
    ANTERIOR = "ANTERIOR",
    POSTERIOR = "POSTERIOR",
    LATERAL_LEFT = "LATERAL_LEFT",
    LATERAL_RIGHT = "LATERAL_RIGHT",
    OTHER = "OTHER"
}
export declare class UploadClinicalPhotoDto {
    patientId: string;
    anatomicalLocation?: string;
    viewType?: ViewType;
    description?: string;
}
