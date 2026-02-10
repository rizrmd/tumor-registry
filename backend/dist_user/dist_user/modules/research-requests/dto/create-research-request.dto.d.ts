import { DataFieldsSelectionDto } from './data-fields-selection.dto';
export declare enum ResearchType {
    ACADEMIC = "ACADEMIC",
    CLINICAL_TRIAL = "CLINICAL_TRIAL",
    OBSERVATIONAL = "OBSERVATIONAL",
    SYSTEMATIC_REVIEW = "SYSTEMATIC_REVIEW",
    META_ANALYSIS = "META_ANALYSIS",
    OTHER = "OTHER"
}
export declare enum IRBStatus {
    APPROVED = "APPROVED",
    IN_PROGRESS = "IN_PROGRESS",
    PENDING = "PENDING"
}
export declare class DataFiltersDto {
    periodStart?: string;
    periodEnd?: string;
    tumorTypes?: string[];
    whoClassifications?: string[];
    ennekingStages?: string[];
    ajccStages?: string[];
    ageMin?: number;
    ageMax?: number;
    genders?: string[];
    centerIds?: string[];
    treatmentTypes?: string[];
}
export declare class CreateResearchRequestDto {
    title: string;
    researchType: ResearchType;
    researchAbstract: string;
    objectives: string;
    researcherPhone?: string;
    researcherInstitution?: string;
    dataFilters: DataFiltersDto;
    estimatedPatientCount?: number;
    requestedDataFields: DataFieldsSelectionDto;
    irbStatus?: IRBStatus;
    ethicsApprovalNumber?: string;
    ethicsApprovalDate?: string;
    irbCertificateUrl?: string;
    protocolUrl?: string;
    proposalUrl?: string;
    cvUrl?: string;
    researchStart: string;
    researchEnd: string;
    accessDurationMonths: number;
    agreementSigned: boolean;
    agreementDate?: string;
}
export declare class UpdateResearchRequestDto {
    title?: string;
    researchType?: ResearchType;
    researchAbstract?: string;
    objectives?: string;
    dataFilters?: DataFiltersDto;
    requestedDataFields?: DataFieldsSelectionDto;
    irbStatus?: IRBStatus;
    accessDurationMonths?: number;
    agreementSigned?: boolean;
}
export declare class ApproveResearchRequestDto {
    decision: string;
    notes?: string;
    conditions?: string;
    reducedAccessDuration?: number;
    excludedFields?: string[];
}
