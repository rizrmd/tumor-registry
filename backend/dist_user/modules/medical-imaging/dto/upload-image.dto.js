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
exports.UploadImageDto = exports.ImageCategory = exports.MedicalImageType = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var MedicalImageType;
(function (MedicalImageType) {
    MedicalImageType["HISTOLOGY"] = "HISTOLOGY";
    MedicalImageType["RADIOLOGY"] = "RADIOLOGY";
    MedicalImageType["CLINICAL_PHOTO"] = "CLINICAL_PHOTO";
    MedicalImageType["PATHOLOGY"] = "PATHOLOGY";
    MedicalImageType["ENDOSCOPY"] = "ENDOSCOPY";
    MedicalImageType["ULTRASOUND"] = "ULTRASOUND";
    MedicalImageType["CT_SCAN"] = "CT_SCAN";
    MedicalImageType["MRI"] = "MRI";
    MedicalImageType["XRAY"] = "XRAY";
    MedicalImageType["PET_SCAN"] = "PET_SCAN";
    MedicalImageType["MAMMOGRAPHY"] = "MAMMOGRAPHY";
    MedicalImageType["OTHER"] = "OTHER";
})(MedicalImageType || (exports.MedicalImageType = MedicalImageType = {}));
var ImageCategory;
(function (ImageCategory) {
    ImageCategory["HISTOLOGY"] = "HISTOLOGY";
    ImageCategory["RADIOLOGY"] = "RADIOLOGY";
    ImageCategory["CLINICAL"] = "CLINICAL";
    ImageCategory["PATHOLOGY"] = "PATHOLOGY";
    ImageCategory["DIAGNOSTIC"] = "DIAGNOSTIC";
    ImageCategory["SURGICAL"] = "SURGICAL";
    ImageCategory["FOLLOW_UP"] = "FOLLOW_UP";
    ImageCategory["SCREENING"] = "SCREENING";
    ImageCategory["OTHER"] = "OTHER";
})(ImageCategory || (exports.ImageCategory = ImageCategory = {}));
class UploadImageDto {
}
exports.UploadImageDto = UploadImageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Patient ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadImageDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Related medical record ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadImageDto.prototype, "recordId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: MedicalImageType }),
    (0, class_validator_1.IsEnum)(MedicalImageType),
    __metadata("design:type", String)
], UploadImageDto.prototype, "imageType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ImageCategory }),
    (0, class_validator_1.IsEnum)(ImageCategory),
    __metadata("design:type", String)
], UploadImageDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Image description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadImageDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Clinical findings' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadImageDto.prototype, "findings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Body part imaged' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadImageDto.prototype, "bodyPart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Imaging modality' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadImageDto.prototype, "modality", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Study date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UploadImageDto.prototype, "studyDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Series number' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadImageDto.prototype, "seriesNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Instance number' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadImageDto.prototype, "instanceNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tags for categorization', type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UploadImageDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Is DICOM format' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UploadImageDto.prototype, "isDicom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'DICOM metadata', type: Object }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UploadImageDto.prototype, "dicomMetadata", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Image annotations', type: Object }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UploadImageDto.prototype, "annotations", void 0);
//# sourceMappingURL=upload-image.dto.js.map