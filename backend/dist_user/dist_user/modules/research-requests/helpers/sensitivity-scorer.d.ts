import { DataFieldsSelectionDto } from '../dto/data-fields-selection.dto';
export declare function calculateSensitivityScore(dataFields: DataFieldsSelectionDto): number;
export declare function getSensitivityLevel(score: number): string;
export declare function isAutoApprovalEligible(dataFields: DataFieldsSelectionDto, irbApproved: boolean): boolean;
export declare function getSensitivityWarnings(dataFields: DataFieldsSelectionDto): string[];
