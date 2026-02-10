import { LabResultStatus } from './create-lab-result.dto';
export declare class UpdateLabResultDto {
    result?: string;
    normalRange?: string;
    unit?: string;
    status?: LabResultStatus;
    notes?: string;
    performedAt?: string;
}
