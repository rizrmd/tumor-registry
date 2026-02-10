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
exports.UploadClinicalPhotoDto = exports.ViewType = void 0;
const class_validator_1 = require("class-validator");
var ViewType;
(function (ViewType) {
    ViewType["ANTERIOR"] = "ANTERIOR";
    ViewType["POSTERIOR"] = "POSTERIOR";
    ViewType["LATERAL_LEFT"] = "LATERAL_LEFT";
    ViewType["LATERAL_RIGHT"] = "LATERAL_RIGHT";
    ViewType["OTHER"] = "OTHER";
})(ViewType || (exports.ViewType = ViewType = {}));
class UploadClinicalPhotoDto {
}
exports.UploadClinicalPhotoDto = UploadClinicalPhotoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadClinicalPhotoDto.prototype, "patientId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadClinicalPhotoDto.prototype, "anatomicalLocation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ViewType),
    __metadata("design:type", String)
], UploadClinicalPhotoDto.prototype, "viewType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadClinicalPhotoDto.prototype, "description", void 0);
//# sourceMappingURL=upload-clinical-photo.dto.js.map
