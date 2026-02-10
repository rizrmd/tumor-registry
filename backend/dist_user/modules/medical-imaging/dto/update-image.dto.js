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
exports.UpdateImageDto = exports.ImageQuality = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ImageQuality;
(function (ImageQuality) {
    ImageQuality["EXCELLENT"] = "EXCELLENT";
    ImageQuality["GOOD"] = "GOOD";
    ImageQuality["STANDARD"] = "STANDARD";
    ImageQuality["POOR"] = "POOR";
    ImageQuality["NEEDS_REVIEW"] = "NEEDS_REVIEW";
})(ImageQuality || (exports.ImageQuality = ImageQuality = {}));
class UpdateImageDto {
}
exports.UpdateImageDto = UpdateImageDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Image description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateImageDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Clinical findings' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateImageDto.prototype, "findings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Body part imaged' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateImageDto.prototype, "bodyPart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tags for categorization', type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateImageDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Image annotations', type: Object }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateImageDto.prototype, "annotations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ImageQuality }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ImageQuality),
    __metadata("design:type", String)
], UpdateImageDto.prototype, "quality", void 0);
//# sourceMappingURL=update-image.dto.js.map