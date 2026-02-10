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
exports.GenerateFollowUpScheduleDto = exports.UpdateFollowUpVisitDto = exports.CreateFollowUpVisitDto = exports.FollowUpVisitDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class FollowUpVisitDto {
}
exports.FollowUpVisitDto = FollowUpVisitDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FollowUpVisitDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FollowUpVisitDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Visit number (1-14)', minimum: 1, maximum: 14 }),
    __metadata("design:type", Number)
], FollowUpVisitDto.prototype, "visitNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Scheduled visit date' }),
    __metadata("design:type", Date)
], FollowUpVisitDto.prototype, "scheduledDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Actual visit date' }),
    __metadata("design:type", Date)
], FollowUpVisitDto.prototype, "actualDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Visit type', example: '3-month' }),
    __metadata("design:type", String)
], FollowUpVisitDto.prototype, "visitType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Visit status', example: 'scheduled' }),
    __metadata("design:type", String)
], FollowUpVisitDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Dokter Pemeriksa (Examining doctor)' }),
    __metadata("design:type", String)
], FollowUpVisitDto.prototype, "examinedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Keluhan (Chief complaint)' }),
    __metadata("design:type", String)
], FollowUpVisitDto.prototype, "chiefComplaint", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Pemeriksaan Fisik (Physical examination)' }),
    __metadata("design:type", String)
], FollowUpVisitDto.prototype, "physicalExamination", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Pemeriksaan Penunjang (Supporting examination summary)' }),
    __metadata("design:type", String)
], FollowUpVisitDto.prototype, "supportingExamination", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Clinical status', example: 'NED' }),
    __metadata("design:type", String)
], FollowUpVisitDto.prototype, "clinicalStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Boolean)
], FollowUpVisitDto.prototype, "localRecurrence", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Boolean)
], FollowUpVisitDto.prototype, "distantMetastasis", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], FollowUpVisitDto.prototype, "metastasisSites", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], FollowUpVisitDto.prototype, "currentTreatment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], FollowUpVisitDto.prototype, "mstsScoreId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Karnofsky Performance Score (0-100)' }),
    __metadata("design:type", Number)
], FollowUpVisitDto.prototype, "karnofskyScore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], FollowUpVisitDto.prototype, "imagingPerformed", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], FollowUpVisitDto.prototype, "imagingFindings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], FollowUpVisitDto.prototype, "labResults", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], FollowUpVisitDto.prototype, "complications", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], FollowUpVisitDto.prototype, "nextVisitDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], FollowUpVisitDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Boolean)
], FollowUpVisitDto.prototype, "reminderSent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], FollowUpVisitDto.prototype, "reminderDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], FollowUpVisitDto.prototype, "reminderMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], FollowUpVisitDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], FollowUpVisitDto.prototype, "updatedAt", void 0);
class CreateFollowUpVisitDto {
}
exports.CreateFollowUpVisitDto = CreateFollowUpVisitDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFollowUpVisitDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Visit number (1-14)', minimum: 1, maximum: 14, example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(14),
    __metadata("design:type", Number)
], CreateFollowUpVisitDto.prototype, "visitNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-03-11' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateFollowUpVisitDto.prototype, "scheduledDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '3-month', description: '3-month, 6-month, or annual' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFollowUpVisitDto.prototype, "visitType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-03-11' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateFollowUpVisitDto.prototype, "actualDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 'scheduled', description: 'scheduled, completed, missed, cancelled' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFollowUpVisitDto.prototype, "status", void 0);
class UpdateFollowUpVisitDto {
}
exports.UpdateFollowUpVisitDto = UpdateFollowUpVisitDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateFollowUpVisitDto.prototype, "actualDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFollowUpVisitDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Dokter Pemeriksa (Examining doctor)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFollowUpVisitDto.prototype, "examinedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Keluhan (Chief complaint)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFollowUpVisitDto.prototype, "chiefComplaint", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Pemeriksaan Fisik (Physical examination)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFollowUpVisitDto.prototype, "physicalExamination", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Pemeriksaan Penunjang (Supporting examination summary)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFollowUpVisitDto.prototype, "supportingExamination", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'NED, AWD, DOD, etc.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFollowUpVisitDto.prototype, "clinicalStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateFollowUpVisitDto.prototype, "localRecurrence", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateFollowUpVisitDto.prototype, "distantMetastasis", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFollowUpVisitDto.prototype, "metastasisSites", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFollowUpVisitDto.prototype, "currentTreatment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFollowUpVisitDto.prototype, "mstsScoreId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 0, maximum: 100 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], UpdateFollowUpVisitDto.prototype, "karnofskyScore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'X-ray, CT, MRI, Bone scan, PET-CT' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFollowUpVisitDto.prototype, "imagingPerformed", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFollowUpVisitDto.prototype, "imagingFindings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFollowUpVisitDto.prototype, "labResults", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFollowUpVisitDto.prototype, "complications", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateFollowUpVisitDto.prototype, "nextVisitDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFollowUpVisitDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateFollowUpVisitDto.prototype, "reminderSent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateFollowUpVisitDto.prototype, "reminderDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFollowUpVisitDto.prototype, "reminderMethod", void 0);
class GenerateFollowUpScheduleDto {
}
exports.GenerateFollowUpScheduleDto = GenerateFollowUpScheduleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Patient ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GenerateFollowUpScheduleDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Treatment completion date', example: '2025-12-11' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GenerateFollowUpScheduleDto.prototype, "treatmentCompletionDate", void 0);
//# sourceMappingURL=follow-up-visit.dto.js.map