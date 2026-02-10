export declare enum MedicalImageType {
    HISTOLOGY = "HISTOLOGY",
    RADIOLOGY = "RADIOLOGY",
    CLINICAL_PHOTO = "CLINICAL_PHOTO",
    PATHOLOGY = "PATHOLOGY",
    ENDOSCOPY = "ENDOSCOPY",
    ULTRASOUND = "ULTRASOUND",
    CT_SCAN = "CT_SCAN",
    MRI = "MRI",
    XRAY = "XRAY",
    PET_SCAN = "PET_SCAN",
    MAMMOGRAPHY = "MAMMOGRAPHY",
    OTHER = "OTHER"
}
export declare enum ImageCategory {
    HISTOLOGY = "HISTOLOGY",
    RADIOLOGY = "RADIOLOGY",
    CLINICAL = "CLINICAL",
    PATHOLOGY = "PATHOLOGY",
    DIAGNOSTIC = "DIAGNOSTIC",
    SURGICAL = "SURGICAL",
    FOLLOW_UP = "FOLLOW_UP",
    SCREENING = "SCREENING",
    OTHER = "OTHER"
}
export declare class UploadImageDto {
    patientId: string;
    recordId?: string;
    imageType: MedicalImageType;
    category: ImageCategory;
    description?: string;
    findings?: string;
    bodyPart?: string;
    modality?: string;
    studyDate?: string;
    seriesNumber?: string;
    instanceNumber?: string;
    tags?: string[];
    isDicom?: boolean;
    dicomMetadata?: any;
    annotations?: any;
}
