export declare class DataFieldCategory {
    selected: boolean;
    justification?: string;
    subFields?: Record<string, boolean>;
}
export declare class DataFieldsSelectionDto {
    demographics?: DataFieldCategory;
    demographicsIdentifiable?: DataFieldCategory;
    clinicalPresentation?: DataFieldCategory;
    diagnosisClassification?: DataFieldCategory;
    stagingData?: DataFieldCategory;
    diagnosticInvestigations?: DataFieldCategory;
    treatmentManagement?: DataFieldCategory;
    followUpOutcomes?: DataFieldCategory;
    clinicalPhotosImaging?: DataFieldCategory;
    cpcRecords?: DataFieldCategory;
}
export declare enum DataFieldPreset {
    BASIC_RESEARCH = "basic_research",
    OUTCOME_STUDY = "outcome_study",
    SURVIVAL_ANALYSIS = "survival_analysis",
    TREATMENT_COMPARISON = "treatment_comparison",
    CUSTOM = "custom"
}
export declare function getPresetDataFields(preset: DataFieldPreset): DataFieldsSelectionDto;
