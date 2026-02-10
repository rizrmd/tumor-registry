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
exports.CreatePeerReviewDto = exports.ReviewPriority = exports.PeerReviewType = exports.PeerReviewEntity = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var PeerReviewEntity;
(function (PeerReviewEntity) {
    PeerReviewEntity["PATIENT_RECORD"] = "PATIENT_RECORD";
    PeerReviewEntity["DIAGNOSIS"] = "DIAGNOSIS";
    PeerReviewEntity["TREATMENT_PLAN"] = "TREATMENT_PLAN";
    PeerReviewEntity["MEDICAL_RECORD"] = "MEDICAL_RECORD";
    PeerReviewEntity["LABORATORY_RESULT"] = "LABORATORY_RESULT";
    PeerReviewEntity["RADIOLOGY_REPORT"] = "RADIOLOGY_REPORT";
    PeerReviewEntity["PATHOLOGY_REPORT"] = "PATHOLOGY_REPORT";
    PeerReviewEntity["CASE_REVIEW"] = "CASE_REVIEW";
    PeerReviewEntity["RESEARCH_DATA"] = "RESEARCH_DATA";
    PeerReviewEntity["DATA_ENTRY"] = "DATA_ENTRY";
})(PeerReviewEntity || (exports.PeerReviewEntity = PeerReviewEntity = {}));
var PeerReviewType;
(function (PeerReviewType) {
    PeerReviewType["QUALITY_CHECK"] = "QUALITY_CHECK";
    PeerReviewType["DATA_VALIDATION"] = "DATA_VALIDATION";
    PeerReviewType["CLINICAL_REVIEW"] = "CLINICAL_REVIEW";
    PeerReviewType["COMPLETENESS_CHECK"] = "COMPLETENESS_CHECK";
    PeerReviewType["ACCURACY_VERIFICATION"] = "ACCURACY_VERIFICATION";
    PeerReviewType["PROTOCOL_COMPLIANCE"] = "PROTOCOL_COMPLIANCE";
    PeerReviewType["DOCUMENTATION_REVIEW"] = "DOCUMENTATION_REVIEW";
    PeerReviewType["PEER_CONSULTATION"] = "PEER_CONSULTATION";
})(PeerReviewType || (exports.PeerReviewType = PeerReviewType = {}));
var ReviewPriority;
(function (ReviewPriority) {
    ReviewPriority["LOW"] = "LOW";
    ReviewPriority["MEDIUM"] = "MEDIUM";
    ReviewPriority["HIGH"] = "HIGH";
    ReviewPriority["URGENT"] = "URGENT";
    ReviewPriority["CRITICAL"] = "CRITICAL";
})(ReviewPriority || (exports.ReviewPriority = ReviewPriority = {}));
class CreatePeerReviewDto {
}
exports.CreatePeerReviewDto = CreatePeerReviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: PeerReviewEntity }),
    (0, class_validator_1.IsEnum)(PeerReviewEntity),
    __metadata("design:type", String)
], CreatePeerReviewDto.prototype, "entityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Entity ID being reviewed' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePeerReviewDto.prototype, "entityId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: PeerReviewType, default: 'QUALITY_CHECK' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(PeerReviewType),
    __metadata("design:type", String)
], CreatePeerReviewDto.prototype, "reviewType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'User ID to assign the review to' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePeerReviewDto.prototype, "assignedTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ReviewPriority, default: 'MEDIUM' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ReviewPriority),
    __metadata("design:type", String)
], CreatePeerReviewDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Due date for review' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePeerReviewDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Review title' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePeerReviewDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Detailed description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePeerReviewDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Context data snapshot', type: Object }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreatePeerReviewDto.prototype, "context", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Review checklist items', type: Object }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreatePeerReviewDto.prototype, "checklist", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tags for categorization', type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatePeerReviewDto.prototype, "tags", void 0);
//# sourceMappingURL=create-peer-review.dto.js.map