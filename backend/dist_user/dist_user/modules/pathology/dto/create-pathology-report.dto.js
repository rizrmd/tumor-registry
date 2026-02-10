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
exports.CreatePathologyReportDto = exports.TumorGrade = exports.PathologyStatus = exports.BiopsyType = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var BiopsyType;
(function (BiopsyType) {
    BiopsyType["INCISIONAL"] = "Incisional";
    BiopsyType["EXCISIONAL"] = "Excisional";
    BiopsyType["CORE_NEEDLE"] = "Core needle";
    BiopsyType["FINE_NEEDLE_ASPIRATION"] = "Fine needle aspiration";
    BiopsyType["BONE_BIOPSY"] = "Bone biopsy";
    BiopsyType["SOFT_TISSUE_BIOPSY"] = "Soft tissue biopsy";
})(BiopsyType || (exports.BiopsyType = BiopsyType = {}));
var PathologyStatus;
(function (PathologyStatus) {
    PathologyStatus["PENDING"] = "PENDING";
    PathologyStatus["IN_PROGRESS"] = "IN_PROGRESS";
    PathologyStatus["COMPLETED"] = "COMPLETED";
    PathologyStatus["REVIEWED"] = "REVIEWED";
    PathologyStatus["AMENDED"] = "AMENDED";
})(PathologyStatus || (exports.PathologyStatus = PathologyStatus = {}));
var TumorGrade;
(function (TumorGrade) {
    TumorGrade["LOW_GRADE_G1"] = "Low-grade (G1)";
    TumorGrade["HIGH_GRADE_G2"] = "High-grade (G2)";
    TumorGrade["UNDIFFERENTIATED_G3"] = "Undifferentiated (G3)";
})(TumorGrade || (exports.TumorGrade = TumorGrade = {}));
class CreatePathologyReportDto {
}
exports.CreatePathologyReportDto = CreatePathologyReportDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Patient ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Pathology report number/identifier' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "reportNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: BiopsyType, description: 'Type of biopsy performed' }),
    (0, class_validator_1.IsEnum)(BiopsyType),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "biopsyType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date when biopsy was performed' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "biopsyDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date when specimen was received' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "specimenReceivedDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site/location where biopsy was taken', example: 'Right distal femur' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "specimenSite", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Description of the specimen' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "specimenDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Gross description of the specimen' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "grossDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Microscopic examination findings' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "microscopicDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Final diagnosis' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "diagnosis", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: TumorGrade, description: 'Tumor histological grade' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TumorGrade),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "tumorGrade", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mitosis count per 10 HPF' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "mitosisCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Percentage of necrosis', example: '20%' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "necrosisPercentage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tumor cellularity percentage', example: '80%' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "cellularity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Immunohistochemistry findings' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "immunohistochemistry", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Molecular/genetic testing results' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "molecularFindings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Margins status (for excisional biopsies)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "marginsStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Is malignant?' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePathologyReportDto.prototype, "isMalignant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: PathologyStatus, description: 'Status of the pathology report' }),
    (0, class_validator_1.IsEnum)(PathologyStatus),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional comments or notes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Pathologist ID who prepared the report' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "pathologistId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date when report was finalized' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePathologyReportDto.prototype, "reportDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Special stains used', type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatePathologyReportDto.prototype, "specialStains", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'IHC markers used', type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatePathologyReportDto.prototype, "ihcMarkers", void 0);
//# sourceMappingURL=create-pathology-report.dto.js.map
