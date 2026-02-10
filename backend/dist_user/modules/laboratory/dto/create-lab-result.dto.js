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
exports.CreateLabResultDto = exports.LabResultStatus = exports.LabTestType = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var LabTestType;
(function (LabTestType) {
    LabTestType["TUMOR_MARKER"] = "TUMOR_MARKER";
    LabTestType["CBC"] = "CBC";
    LabTestType["CHEMISTRY"] = "CHEMISTRY";
    LabTestType["COAGULATION"] = "COAGULATION";
    LabTestType["URINALYSIS"] = "URINALYSIS";
    LabTestType["GENETIC"] = "GENETIC";
    LabTestType["MOLECULAR"] = "MOLECULAR";
    LabTestType["OTHER"] = "OTHER";
})(LabTestType || (exports.LabTestType = LabTestType = {}));
var LabResultStatus;
(function (LabResultStatus) {
    LabResultStatus["PENDING"] = "PENDING";
    LabResultStatus["COMPLETED"] = "COMPLETED";
    LabResultStatus["ABNORMAL"] = "ABNORMAL";
    LabResultStatus["CRITICAL"] = "CRITICAL";
    LabResultStatus["CANCELLED"] = "CANCELLED";
})(LabResultStatus || (exports.LabResultStatus = LabResultStatus = {}));
class CreateLabResultDto {
}
exports.CreateLabResultDto = CreateLabResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Patient ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabResultDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: LabTestType, description: 'Type of laboratory test' }),
    (0, class_validator_1.IsEnum)(LabTestType),
    __metadata("design:type", String)
], CreateLabResultDto.prototype, "testType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the test', example: 'Alkaline Phosphatase (ALP)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabResultDto.prototype, "testName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Test result value', example: '150' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabResultDto.prototype, "result", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Normal range for this test', example: '30-120 U/L' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabResultDto.prototype, "normalRange", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Unit of measurement', example: 'U/L' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabResultDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: LabResultStatus, description: 'Status of the test result' }),
    (0, class_validator_1.IsEnum)(LabResultStatus),
    __metadata("design:type", String)
], CreateLabResultDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional notes or comments' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabResultDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID of who ordered the test' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabResultDto.prototype, "orderedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date when test was performed' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateLabResultDto.prototype, "performedAt", void 0);
//# sourceMappingURL=create-lab-result.dto.js.map