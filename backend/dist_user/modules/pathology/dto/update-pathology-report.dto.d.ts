import { PathologyStatus, TumorGrade } from './create-pathology-report.dto';
export declare class UpdatePathologyReportDto {
    grossDescription?: string;
    microscopicDescription?: string;
    diagnosis?: string;
    tumorGrade?: TumorGrade;
    mitosisCount?: string;
    necrosisPercentage?: string;
    cellularity?: string;
    immunohistochemistry?: string;
    molecularFindings?: string;
    marginsStatus?: string;
    isMalignant?: boolean;
    status?: PathologyStatus;
    comments?: string;
    reportDate?: string;
    specialStains?: string[];
    ihcMarkers?: string[];
}
