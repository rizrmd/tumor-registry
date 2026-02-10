"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataFieldPreset = exports.DataFieldsSelectionDto = exports.DataFieldCategory = void 0;
exports.getPresetDataFields = getPresetDataFields;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class DataFieldCategory {
}
exports.DataFieldCategory = DataFieldCategory;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DataFieldCategory.prototype, "selected", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DataFieldCategory.prototype, "justification", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], DataFieldCategory.prototype, "subFields", void 0);
class DataFieldsSelectionDto {
}
exports.DataFieldsSelectionDto = DataFieldsSelectionDto;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DataFieldCategory),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", DataFieldCategory)
], DataFieldsSelectionDto.prototype, "demographics", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DataFieldCategory),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", DataFieldCategory)
], DataFieldsSelectionDto.prototype, "demographicsIdentifiable", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DataFieldCategory),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", DataFieldCategory)
], DataFieldsSelectionDto.prototype, "clinicalPresentation", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DataFieldCategory),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", DataFieldCategory)
], DataFieldsSelectionDto.prototype, "diagnosisClassification", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DataFieldCategory),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", DataFieldCategory)
], DataFieldsSelectionDto.prototype, "stagingData", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DataFieldCategory),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", DataFieldCategory)
], DataFieldsSelectionDto.prototype, "diagnosticInvestigations", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DataFieldCategory),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", DataFieldCategory)
], DataFieldsSelectionDto.prototype, "treatmentManagement", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DataFieldCategory),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", DataFieldCategory)
], DataFieldsSelectionDto.prototype, "followUpOutcomes", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DataFieldCategory),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", DataFieldCategory)
], DataFieldsSelectionDto.prototype, "clinicalPhotosImaging", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DataFieldCategory),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", DataFieldCategory)
], DataFieldsSelectionDto.prototype, "cpcRecords", void 0);
var DataFieldPreset;
(function (DataFieldPreset) {
    DataFieldPreset["BASIC_RESEARCH"] = "basic_research";
    DataFieldPreset["OUTCOME_STUDY"] = "outcome_study";
    DataFieldPreset["SURVIVAL_ANALYSIS"] = "survival_analysis";
    DataFieldPreset["TREATMENT_COMPARISON"] = "treatment_comparison";
    DataFieldPreset["CUSTOM"] = "custom";
})(DataFieldPreset || (exports.DataFieldPreset = DataFieldPreset = {}));
function getPresetDataFields(preset) {
    const presets = {
        [DataFieldPreset.BASIC_RESEARCH]: {
            demographics: {
                selected: true,
                justification: 'Basic demographics for patient characterization',
                subFields: { age: true, gender: true, region: true },
            },
            diagnosisClassification: {
                selected: true,
                justification: 'Diagnosis and classification for tumor type analysis',
            },
            stagingData: {
                selected: true,
                justification: 'Staging data for disease severity assessment',
            },
        },
        [DataFieldPreset.OUTCOME_STUDY]: {
            diagnosisClassification: {
                selected: true,
                justification: 'Diagnosis for outcome stratification',
            },
            stagingData: {
                selected: true,
                justification: 'Staging for baseline disease severity',
            },
            treatmentManagement: {
                selected: true,
                justification: 'Treatment details for outcome correlation',
            },
            followUpOutcomes: {
                selected: true,
                justification: 'Follow-up data and MSTS scores for outcome measurement',
            },
        },
        [DataFieldPreset.SURVIVAL_ANALYSIS]: {
            demographics: {
                selected: true,
                justification: 'Age and demographics as survival predictors',
                subFields: { age: true, gender: true },
            },
            diagnosisClassification: {
                selected: true,
                justification: 'Tumor type and grade for survival analysis',
            },
            stagingData: {
                selected: true,
                justification: 'Stage is primary survival predictor',
            },
            treatmentManagement: {
                selected: true,
                justification: 'Treatment modality affects survival',
            },
            followUpOutcomes: {
                selected: true,
                justification: 'Survival status and duration',
                subFields: { survivalStatus: true, survivalDuration: true },
            },
        },
        [DataFieldPreset.TREATMENT_COMPARISON]: {
            diagnosisClassification: {
                selected: true,
                justification: 'Diagnosis for treatment stratification',
            },
            stagingData: {
                selected: true,
                justification: 'Baseline staging for comparison groups',
            },
            treatmentManagement: {
                selected: true,
                justification: 'Treatment details for comparison',
            },
            followUpOutcomes: {
                selected: true,
                justification: 'Outcomes for treatment effectiveness comparison',
            },
        },
        [DataFieldPreset.CUSTOM]: {},
    };
    return presets[preset];
}
//# sourceMappingURL=data-fields-selection.dto.js.map
