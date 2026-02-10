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
exports.SyncOfflineDataDto = exports.OfflineOperation = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var OfflineOperation;
(function (OfflineOperation) {
    OfflineOperation["CREATE"] = "CREATE";
    OfflineOperation["UPDATE"] = "UPDATE";
    OfflineOperation["DELETE"] = "DELETE";
    OfflineOperation["SYNC"] = "SYNC";
})(OfflineOperation || (exports.OfflineOperation = OfflineOperation = {}));
class SyncOfflineDataDto {
}
exports.SyncOfflineDataDto = SyncOfflineDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Entity type (patient, diagnosis, medication, etc.)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SyncOfflineDataDto.prototype, "entityType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Entity ID (null for creates)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SyncOfflineDataDto.prototype, "entityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: OfflineOperation }),
    (0, class_validator_1.IsEnum)(OfflineOperation),
    __metadata("design:type", String)
], SyncOfflineDataDto.prototype, "operation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The actual data payload', type: Object }),
    __metadata("design:type", Object)
], SyncOfflineDataDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Priority (higher = more important)', default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SyncOfflineDataDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Local timestamp when created offline' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SyncOfflineDataDto.prototype, "localTimestamp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Device ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SyncOfflineDataDto.prototype, "deviceId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Session ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SyncOfflineDataDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional metadata', type: Object }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], SyncOfflineDataDto.prototype, "metadata", void 0);
//# sourceMappingURL=sync-offline-data.dto.js.map