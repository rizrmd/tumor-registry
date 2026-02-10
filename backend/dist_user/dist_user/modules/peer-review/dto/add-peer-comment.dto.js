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
exports.AddPeerCommentDto = exports.CommentSeverity = exports.CommentType = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var CommentType;
(function (CommentType) {
    CommentType["GENERAL"] = "GENERAL";
    CommentType["QUESTION"] = "QUESTION";
    CommentType["CONCERN"] = "CONCERN";
    CommentType["SUGGESTION"] = "SUGGESTION";
    CommentType["APPROVAL"] = "APPROVAL";
    CommentType["REJECTION"] = "REJECTION";
    CommentType["CLARIFICATION"] = "CLARIFICATION";
    CommentType["FOLLOW_UP"] = "FOLLOW_UP";
})(CommentType || (exports.CommentType = CommentType = {}));
var CommentSeverity;
(function (CommentSeverity) {
    CommentSeverity["INFO"] = "INFO";
    CommentSeverity["LOW"] = "LOW";
    CommentSeverity["MEDIUM"] = "MEDIUM";
    CommentSeverity["HIGH"] = "HIGH";
    CommentSeverity["CRITICAL"] = "CRITICAL";
})(CommentSeverity || (exports.CommentSeverity = CommentSeverity = {}));
class AddPeerCommentDto {
}
exports.AddPeerCommentDto = AddPeerCommentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Comment text' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddPeerCommentDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Parent comment ID for threaded comments' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddPeerCommentDto.prototype, "parentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: CommentType, default: 'GENERAL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(CommentType),
    __metadata("design:type", String)
], AddPeerCommentDto.prototype, "commentType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: CommentSeverity, default: 'INFO' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(CommentSeverity),
    __metadata("design:type", String)
], AddPeerCommentDto.prototype, "severity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Reference to specific data field/line' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddPeerCommentDto.prototype, "lineReference", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Suggested correction or improvement' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddPeerCommentDto.prototype, "suggestion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Is this an internal comment', default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AddPeerCommentDto.prototype, "isInternal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'User IDs mentioned in the comment', type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AddPeerCommentDto.prototype, "mentions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Attachments', type: Object }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], AddPeerCommentDto.prototype, "attachments", void 0);
//# sourceMappingURL=add-peer-comment.dto.js.map
