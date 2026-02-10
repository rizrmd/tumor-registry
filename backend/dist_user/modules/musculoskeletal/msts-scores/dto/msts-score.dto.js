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
exports.UpdateMstsScoreDto = exports.CreateMstsScoreDto = exports.MstsScoreDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class MstsScoreDto {
}
exports.MstsScoreDto = MstsScoreDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MstsScoreDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MstsScoreDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], MstsScoreDto.prototype, "followUpVisitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Pain score (0-5 points)', minimum: 0, maximum: 5 }),
    __metadata("design:type", Number)
], MstsScoreDto.prototype, "pain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Function score (0-5 points)', minimum: 0, maximum: 5 }),
    __metadata("design:type", Number)
], MstsScoreDto.prototype, "function", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Emotional acceptance score (0-5 points)', minimum: 0, maximum: 5 }),
    __metadata("design:type", Number)
], MstsScoreDto.prototype, "emotionalAcceptance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Supports score (0-5 points)', minimum: 0, maximum: 5 }),
    __metadata("design:type", Number)
], MstsScoreDto.prototype, "supports", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Walking score (0-5 points)', minimum: 0, maximum: 5 }),
    __metadata("design:type", Number)
], MstsScoreDto.prototype, "walking", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Gait score (0-5 points)', minimum: 0, maximum: 5 }),
    __metadata("design:type", Number)
], MstsScoreDto.prototype, "gait", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total score (0-30 points)', minimum: 0, maximum: 30 }),
    __metadata("design:type", Number)
], MstsScoreDto.prototype, "totalScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], MstsScoreDto.prototype, "assessmentDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MstsScoreDto.prototype, "assessedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], MstsScoreDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], MstsScoreDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], MstsScoreDto.prototype, "updatedAt", void 0);
class CreateMstsScoreDto {
}
exports.CreateMstsScoreDto = CreateMstsScoreDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Patient ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMstsScoreDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Follow-up visit ID if part of follow-up' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMstsScoreDto.prototype, "followUpVisitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Pain score (0-5)', minimum: 0, maximum: 5, example: 4 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateMstsScoreDto.prototype, "pain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Function score (0-5)', minimum: 0, maximum: 5, example: 3 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateMstsScoreDto.prototype, "function", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Emotional acceptance (0-5)', minimum: 0, maximum: 5, example: 4 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateMstsScoreDto.prototype, "emotionalAcceptance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Supports score (0-5)', minimum: 0, maximum: 5, example: 5 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateMstsScoreDto.prototype, "supports", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Walking score (0-5)', minimum: 0, maximum: 5, example: 3 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateMstsScoreDto.prototype, "walking", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Gait score (0-5)', minimum: 0, maximum: 5, example: 3 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateMstsScoreDto.prototype, "gait", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assessment date', example: '2025-12-11' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateMstsScoreDto.prototype, "assessmentDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assessed by (user ID or name)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMstsScoreDto.prototype, "assessedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional notes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMstsScoreDto.prototype, "notes", void 0);
class UpdateMstsScoreDto {
}
exports.UpdateMstsScoreDto = UpdateMstsScoreDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], UpdateMstsScoreDto.prototype, "pain", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], UpdateMstsScoreDto.prototype, "function", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], UpdateMstsScoreDto.prototype, "emotionalAcceptance", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], UpdateMstsScoreDto.prototype, "supports", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], UpdateMstsScoreDto.prototype, "walking", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], UpdateMstsScoreDto.prototype, "gait", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateMstsScoreDto.prototype, "assessmentDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMstsScoreDto.prototype, "assessedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMstsScoreDto.prototype, "notes", void 0);
//# sourceMappingURL=msts-score.dto.js.map