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
exports.CreatePatientDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const GENDERS = ['MALE', 'FEMALE'];
const BLOOD_TYPES = ['A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE'];
const MARITAL_STATUSES = ['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'];
const PATHOLOGY_TYPES = ['bone_tumor', 'soft_tissue_tumor', 'metastatic_bone_disease'];
const BIOPSY_TYPES = ['Incisional', 'Excisional', 'Core needle', 'Fine needle aspiration'];
const EDUCATION_LEVELS = ['SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3'];
const RELIGIONS = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'];
const ENNEKING_STAGES = ['IA', 'IB', 'IIA', 'IIB', 'III'];
const AJCC_STAGES = ['IA', 'IB', 'IIA', 'IIB', 'III', 'IVA', 'IVB'];
const TUMOR_GRADES = ['Low-grade (G1)', 'High-grade (G2)', 'Undifferentiated (G3)'];
class CreatePatientDto {
}
exports.CreatePatientDto = CreatePatientDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Center ID where patient is registered' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "centerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: PATHOLOGY_TYPES, example: 'bone_tumor' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(PATHOLOGY_TYPES),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "pathologyType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MR-2025-00001' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "hospitalRecordNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '3173051234567890', description: 'Indonesian National ID (16 digits)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{16}$/, { message: 'NIK must be 16 digits' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "nik", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmad Sudarsono' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 200),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1985-05-15' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Jakarta' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "placeOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: GENDERS, example: 'MALE' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(GENDERS),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: BLOOD_TYPES, example: 'O_POSITIVE' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(BLOOD_TYPES),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "bloodType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: RELIGIONS, example: 'Islam' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(RELIGIONS),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "religion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: MARITAL_STATUSES, example: 'MARRIED' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(MARITAL_STATUSES),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "maritalStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Software Engineer' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "occupation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: EDUCATION_LEVELS, example: 'S1' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(EDUCATION_LEVELS),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "education", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+628123456789' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'patient@example.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Jl. Sudirman No. 123' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'DKI Jakarta' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "province", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Jakarta Selatan' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "regency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Kebayoran Baru' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "district", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Senayan' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "village", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '12190' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'object',
        additionalProperties: true,
        example: { name: 'Siti Aminah', relationship: 'Wife', phone: '+628987654321' }
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreatePatientDto.prototype, "emergencyContact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Nyeri dan benjolan di paha kanan' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "chiefComplaint", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-10-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "onsetDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 6, description: 'Duration of symptoms in months' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePatientDto.prototype, "symptomDuration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '{"pain": true, "swelling": true, "mass": true, "pathologicalFracture": false, "functionalImpairment": true}'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "presentingSymptoms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 8.5, description: 'Tumor size in cm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePatientDto.prototype, "tumorSizeAtPresentation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Father had bone cancer' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "familyHistoryCancer", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tumor syndrome ID if applicable' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "tumorSyndromeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 80, description: 'Karnofsky Performance Score (0-100)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreatePatientDto.prototype, "karnofskysScore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-11-15' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "biopsyDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: BIOPSY_TYPES, example: 'Core needle' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(BIOPSY_TYPES),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "biopsyType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'High-grade osteosarcoma' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "biopsyResult", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '{"xray": true, "ct": true, "mri": true, "boneScan": false, "petCt": true}'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "imagingStudies", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'WHO Bone Tumor Classification ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((o) => o.pathologyType === 'bone_tumor'),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "whoBoneTumorId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'WHO Soft Tissue Tumor Classification ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((o) => o.pathologyType === 'soft_tissue_tumor'),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "whoSoftTissueTumorId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Bone Location ID (for bone tumors)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((o) => o.pathologyType === 'bone_tumor'),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "boneLocationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Soft Tissue Location ID (for soft tissue tumors)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((o) => o.pathologyType === 'soft_tissue_tumor'),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "softTissueLocationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: TUMOR_GRADES, example: 'High-grade (G2)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(TUMOR_GRADES),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "histopathologyGrade", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Conventional osteoblastic osteosarcoma' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "histopathologyDetails", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ENNEKING_STAGES, example: 'IIB' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(ENNEKING_STAGES),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "ennekingStage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: AJCC_STAGES, example: 'IIB' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(AJCC_STAGES),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "ajccStage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePatientDto.prototype, "metastasisPresent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Lung metastasis (3 nodules)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((o) => o.metastasisPresent === true),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "metastasisSites", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePatientDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-patient.dto.js.map