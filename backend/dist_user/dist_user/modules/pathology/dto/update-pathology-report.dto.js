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
exports.UpdatePathologyReportDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_pathology_report_dto_1 = require("./create-pathology-report.dto");
class UpdatePathologyReportDto {
}
exports.UpdatePathologyReportDto = UpdatePathologyReportDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Gross description of the specimen' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePathologyReportDto.prototype, "grossDescription", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Microscopic examination findings' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePathologyReportDto.prototype, "microscopicDescription", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Final diagnosis' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePathologyReportDto.prototype, "diagnosis", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: create_pathology_report_dto_1.TumorGrade, description: 'Tumor histological grade' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(create_pathology_report_dto_1.TumorGrade),
    __metadata("design:type", String)
], UpdatePathologyReportDto.prototype, "tumorGrade", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mitosis count per 10 HPF' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePathologyReportDto.prototype, "mitosisCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Percentage of necrosis' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePathologyReportDto.prototype, "necrosisPercentage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tumor cellularity percentage' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePathologyReportDto.prototype, "cellularity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Immunohistochemistry findings' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePathologyReportDto.prototype, "immunohistochemistry", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Molecular/genetic testing results' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePathologyReportDto.prototype, "molecularFindings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Margins status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePathologyReportDto.prototype, "marginsStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Is malignant?' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdatePathologyReportDto.prototype, "isMalignant", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: create_pathology_report_dto_1.PathologyStatus, description: 'Status of the pathology report' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(create_pathology_report_dto_1.PathologyStatus),
    __metadata("design:type", String)
], UpdatePathologyReportDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional comments or notes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePathologyReportDto.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date when report was finalized' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdatePathologyReportDto.prototype, "reportDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Special stains used', type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdatePathologyReportDto.prototype, "specialStains", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'IHC markers used', type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdatePathologyReportDto.prototype, "ihcMarkers", void 0);
//# sourceMappingURL=update-pathology-report.dto.js.map
