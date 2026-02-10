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
exports.UpdatePathologyTypeDto = exports.CreatePathologyTypeDto = exports.PathologyTypeDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class PathologyTypeDto {
}
exports.PathologyTypeDto = PathologyTypeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Pathology type ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PathologyTypeDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique code' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PathologyTypeDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Pathology type name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PathologyTypeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PathologyTypeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Active status' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PathologyTypeDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sort order' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PathologyTypeDto.prototype, "sortOrder", void 0);
class CreatePathologyTypeDto {
}
exports.CreatePathologyTypeDto = CreatePathologyTypeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique code', example: 'bone_tumor' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePathologyTypeDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Pathology type name', example: 'Tumor Tulang (Bone Tumor)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePathologyTypeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePathologyTypeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Sort order', default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePathologyTypeDto.prototype, "sortOrder", void 0);
class UpdatePathologyTypeDto {
}
exports.UpdatePathologyTypeDto = UpdatePathologyTypeDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Pathology type name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePathologyTypeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePathologyTypeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Active status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdatePathologyTypeDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Sort order' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdatePathologyTypeDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=pathology-type.dto.js.map