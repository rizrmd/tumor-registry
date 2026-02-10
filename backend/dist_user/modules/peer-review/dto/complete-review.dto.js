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
exports.CompleteReviewDto = exports.ReviewRecommendation = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ReviewRecommendation;
(function (ReviewRecommendation) {
    ReviewRecommendation["APPROVE"] = "APPROVE";
    ReviewRecommendation["APPROVE_WITH_CHANGES"] = "APPROVE_WITH_CHANGES";
    ReviewRecommendation["MINOR_REVISION"] = "MINOR_REVISION";
    ReviewRecommendation["MAJOR_REVISION"] = "MAJOR_REVISION";
    ReviewRecommendation["REJECT"] = "REJECT";
    ReviewRecommendation["ESCALATE"] = "ESCALATE";
    ReviewRecommendation["NEEDS_DISCUSSION"] = "NEEDS_DISCUSSION";
})(ReviewRecommendation || (exports.ReviewRecommendation = ReviewRecommendation = {}));
class CompleteReviewDto {
}
exports.CompleteReviewDto = CompleteReviewDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Quality score 0-100' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CompleteReviewDto.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ReviewRecommendation }),
    (0, class_validator_1.IsEnum)(ReviewRecommendation),
    __metadata("design:type", String)
], CompleteReviewDto.prototype, "recommendation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Does this require changes', default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CompleteReviewDto.prototype, "requiresChanges", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Review findings', type: Object }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CompleteReviewDto.prototype, "findings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Reason for rejection (if applicable)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompleteReviewDto.prototype, "rejectionReason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Time spent in minutes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CompleteReviewDto.prototype, "timeSpent", void 0);
//# sourceMappingURL=complete-review.dto.js.map