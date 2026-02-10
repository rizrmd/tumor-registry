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
exports.UpdateTreatmentDto = exports.CreateTreatmentDto = exports.TreatmentManagementDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const TREATMENT_TYPES = ['Surgery', 'Chemotherapy', 'Radiotherapy', 'Targeted Therapy', 'Immunotherapy'];
const SURGERY_TYPES = ['Limb Salvage', 'Amputation', 'Wide Excision', 'Curettage', 'Biopsy'];
const SURGICAL_MARGINS = ['Wide', 'Marginal', 'Intralesional', 'Contaminated'];
const TREATMENT_STATUS = ['Planned', 'Ongoing', 'Completed', 'Discontinued'];
const RESPONSE_TYPES = ['Complete', 'Partial', 'Stable', 'Progressive'];
const HUVOS_GRADES = ['I', 'II', 'III', 'IV'];
class TreatmentManagementDto {
}
exports.TreatmentManagementDto = TreatmentManagementDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TreatmentManagementDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TreatmentManagementDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: TREATMENT_TYPES }),
    __metadata("design:type", String)
], TreatmentManagementDto.prototype, "treatmentType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: SURGERY_TYPES }),
    __metadata("design:type", String)
], TreatmentManagementDto.prototype, "surgeryType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TreatmentManagementDto.prototype, "reconstructionMethod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: SURGICAL_MARGINS }),
    __metadata("design:type", String)
], TreatmentManagementDto.prototype, "surgicalMargin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], TreatmentManagementDto.prototype, "marginDistance", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TreatmentManagementDto.prototype, "amputationLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TreatmentManagementDto.prototype, "chemotherapyProtocol", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], TreatmentManagementDto.prototype, "numberOfCycles", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], TreatmentManagementDto.prototype, "cyclesCompleted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], TreatmentManagementDto.prototype, "radiotherapyDose", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], TreatmentManagementDto.prototype, "numberOfFractions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], TreatmentManagementDto.prototype, "fractionsCompleted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], TreatmentManagementDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], TreatmentManagementDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: TREATMENT_STATUS }),
    __metadata("design:type", String)
], TreatmentManagementDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: RESPONSE_TYPES }),
    __metadata("design:type", String)
], TreatmentManagementDto.prototype, "response", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: HUVOS_GRADES }),
    __metadata("design:type", String)
], TreatmentManagementDto.prototype, "huvosGrade", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TreatmentManagementDto.prototype, "complications", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TreatmentManagementDto.prototype, "adverseEvents", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TreatmentManagementDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TreatmentManagementDto.prototype, "performedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], TreatmentManagementDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], TreatmentManagementDto.prototype, "updatedAt", void 0);
class CreateTreatmentDto {
}
exports.CreateTreatmentDto = CreateTreatmentDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: TREATMENT_TYPES, example: 'Surgery' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(TREATMENT_TYPES),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "treatmentType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: SURGERY_TYPES, example: 'Limb Salvage' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(SURGERY_TYPES),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "surgeryType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Endoprosthesis' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "reconstructionMethod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: SURGICAL_MARGINS, example: 'Wide' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(SURGICAL_MARGINS),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "surgicalMargin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5, description: 'Margin distance in mm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTreatmentDto.prototype, "marginDistance", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Below-knee' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "amputationLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'MAP (Methotrexate, Adriamycin, Cisplatin)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "chemotherapyProtocol", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 6 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateTreatmentDto.prototype, "numberOfCycles", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 3 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateTreatmentDto.prototype, "cyclesCompleted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 50, description: 'Total dose in Gy' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTreatmentDto.prototype, "radiotherapyDose", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 25 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateTreatmentDto.prototype, "numberOfFractions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateTreatmentDto.prototype, "fractionsCompleted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-12-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-06-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: TREATMENT_STATUS, default: 'Planned' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(TREATMENT_STATUS),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: RESPONSE_TYPES }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(RESPONSE_TYPES),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "response", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: HUVOS_GRADES, description: 'Chemotherapy response grading for osteosarcoma' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(HUVOS_GRADES),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "huvosGrade", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "complications", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "adverseEvents", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "performedBy", void 0);
class UpdateTreatmentDto {
}
exports.UpdateTreatmentDto = UpdateTreatmentDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: SURGERY_TYPES }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTreatmentDto.prototype, "surgeryType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTreatmentDto.prototype, "reconstructionMethod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: SURGICAL_MARGINS }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTreatmentDto.prototype, "surgicalMargin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateTreatmentDto.prototype, "marginDistance", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTreatmentDto.prototype, "amputationLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTreatmentDto.prototype, "chemotherapyProtocol", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateTreatmentDto.prototype, "numberOfCycles", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateTreatmentDto.prototype, "cyclesCompleted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateTreatmentDto.prototype, "radiotherapyDose", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateTreatmentDto.prototype, "numberOfFractions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateTreatmentDto.prototype, "fractionsCompleted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateTreatmentDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateTreatmentDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: TREATMENT_STATUS }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTreatmentDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: RESPONSE_TYPES }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTreatmentDto.prototype, "response", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: HUVOS_GRADES }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTreatmentDto.prototype, "huvosGrade", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTreatmentDto.prototype, "complications", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTreatmentDto.prototype, "adverseEvents", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTreatmentDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTreatmentDto.prototype, "performedBy", void 0);
//# sourceMappingURL=treatment.dto.js.map