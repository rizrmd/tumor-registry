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
exports.ApproveResearchRequestDto = exports.UpdateResearchRequestDto = exports.CreateResearchRequestDto = exports.DataFiltersDto = exports.IRBStatus = exports.ResearchType = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const data_fields_selection_dto_1 = require("./data-fields-selection.dto");
var ResearchType;
(function (ResearchType) {
    ResearchType["ACADEMIC"] = "ACADEMIC";
    ResearchType["CLINICAL_TRIAL"] = "CLINICAL_TRIAL";
    ResearchType["OBSERVATIONAL"] = "OBSERVATIONAL";
    ResearchType["SYSTEMATIC_REVIEW"] = "SYSTEMATIC_REVIEW";
    ResearchType["META_ANALYSIS"] = "META_ANALYSIS";
    ResearchType["OTHER"] = "OTHER";
})(ResearchType || (exports.ResearchType = ResearchType = {}));
var IRBStatus;
(function (IRBStatus) {
    IRBStatus["APPROVED"] = "APPROVED";
    IRBStatus["IN_PROGRESS"] = "IN_PROGRESS";
    IRBStatus["PENDING"] = "PENDING";
})(IRBStatus || (exports.IRBStatus = IRBStatus = {}));
class DataFiltersDto {
}
exports.DataFiltersDto = DataFiltersDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], DataFiltersDto.prototype, "periodStart", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], DataFiltersDto.prototype, "periodEnd", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DataFiltersDto.prototype, "tumorTypes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DataFiltersDto.prototype, "whoClassifications", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DataFiltersDto.prototype, "ennekingStages", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DataFiltersDto.prototype, "ajccStages", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(120),
    __metadata("design:type", Number)
], DataFiltersDto.prototype, "ageMin", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(120),
    __metadata("design:type", Number)
], DataFiltersDto.prototype, "ageMax", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DataFiltersDto.prototype, "genders", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DataFiltersDto.prototype, "centerIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DataFiltersDto.prototype, "treatmentTypes", void 0);
class CreateResearchRequestDto {
}
exports.CreateResearchRequestDto = CreateResearchRequestDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateResearchRequestDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(ResearchType),
    __metadata("design:type", String)
], CreateResearchRequestDto.prototype, "researchType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateResearchRequestDto.prototype, "researchAbstract", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(300),
    __metadata("design:type", String)
], CreateResearchRequestDto.prototype, "objectives", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResearchRequestDto.prototype, "researcherPhone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResearchRequestDto.prototype, "researcherInstitution", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DataFiltersDto),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", DataFiltersDto)
], CreateResearchRequestDto.prototype, "dataFilters", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateResearchRequestDto.prototype, "estimatedPatientCount", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => data_fields_selection_dto_1.DataFieldsSelectionDto),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", data_fields_selection_dto_1.DataFieldsSelectionDto)
], CreateResearchRequestDto.prototype, "requestedDataFields", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(IRBStatus),
    __metadata("design:type", String)
], CreateResearchRequestDto.prototype, "irbStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResearchRequestDto.prototype, "ethicsApprovalNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateResearchRequestDto.prototype, "ethicsApprovalDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResearchRequestDto.prototype, "irbCertificateUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResearchRequestDto.prototype, "protocolUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResearchRequestDto.prototype, "proposalUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResearchRequestDto.prototype, "cvUrl", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateResearchRequestDto.prototype, "researchStart", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateResearchRequestDto.prototype, "researchEnd", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(24),
    __metadata("design:type", Number)
], CreateResearchRequestDto.prototype, "accessDurationMonths", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateResearchRequestDto.prototype, "agreementSigned", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateResearchRequestDto.prototype, "agreementDate", void 0);
class UpdateResearchRequestDto {
}
exports.UpdateResearchRequestDto = UpdateResearchRequestDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateResearchRequestDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ResearchType),
    __metadata("design:type", String)
], UpdateResearchRequestDto.prototype, "researchType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateResearchRequestDto.prototype, "researchAbstract", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateResearchRequestDto.prototype, "objectives", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DataFiltersDto),
    __metadata("design:type", DataFiltersDto)
], UpdateResearchRequestDto.prototype, "dataFilters", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => data_fields_selection_dto_1.DataFieldsSelectionDto),
    __metadata("design:type", data_fields_selection_dto_1.DataFieldsSelectionDto)
], UpdateResearchRequestDto.prototype, "requestedDataFields", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(IRBStatus),
    __metadata("design:type", String)
], UpdateResearchRequestDto.prototype, "irbStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateResearchRequestDto.prototype, "accessDurationMonths", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateResearchRequestDto.prototype, "agreementSigned", void 0);
class ApproveResearchRequestDto {
}
exports.ApproveResearchRequestDto = ApproveResearchRequestDto;
__decorate([
    (0, class_validator_1.IsEnum)(['APPROVE', 'APPROVE_WITH_CONDITIONS', 'REJECT', 'REQUEST_MORE_INFO']),
    __metadata("design:type", String)
], ApproveResearchRequestDto.prototype, "decision", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApproveResearchRequestDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApproveResearchRequestDto.prototype, "conditions", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ApproveResearchRequestDto.prototype, "reducedAccessDuration", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ApproveResearchRequestDto.prototype, "excludedFields", void 0);
//# sourceMappingURL=create-research-request.dto.js.map