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
exports.CreateScheduledReportDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class RecipientDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['USER', 'ROLE', 'EMAIL', 'GROUP'] }),
    (0, class_validator_1.IsEnum)(['USER', 'ROLE', 'EMAIL', 'GROUP']),
    __metadata("design:type", String)
], RecipientDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecipientDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], RecipientDto.prototype, "personalization", void 0);
class CreateScheduledReportDto {
}
exports.CreateScheduledReportDto = CreateScheduledReportDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateScheduledReportDto.prototype, "templateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateScheduledReportDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateScheduledReportDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cron expression for schedule' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateScheduledReportDto.prototype, "schedule", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [RecipientDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RecipientDto),
    __metadata("design:type", Array)
], CreateScheduledReportDto.prototype, "recipients", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateScheduledReportDto.prototype, "parameters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['PDF', 'EXCEL', 'CSV', 'JSON', 'HTML'] }),
    (0, class_validator_1.IsEnum)(['PDF', 'EXCEL', 'CSV', 'JSON', 'HTML']),
    __metadata("design:type", String)
], CreateScheduledReportDto.prototype, "format", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['EMAIL', 'FILE_SHARE', 'API_WEBHOOK', 'SFTP', 'CLOUD_STORAGE'] }),
    (0, class_validator_1.IsEnum)(['EMAIL', 'FILE_SHARE', 'API_WEBHOOK', 'SFTP', 'CLOUD_STORAGE']),
    __metadata("design:type", String)
], CreateScheduledReportDto.prototype, "deliveryMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateScheduledReportDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateScheduledReportDto.prototype, "createdBy", void 0);
//# sourceMappingURL=create-scheduled-report.dto.js.map
