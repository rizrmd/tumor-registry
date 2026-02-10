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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathologyTypesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pathology_types_service_1 = require("./pathology-types.service");
const pathology_type_dto_1 = require("./dto/pathology-type.dto");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
let PathologyTypesController = class PathologyTypesController {
    constructor(pathologyTypesService) {
        this.pathologyTypesService = pathologyTypesService;
    }
    async findAll() {
        return this.pathologyTypesService.findAll();
    }
    async findOne(id) {
        return this.pathologyTypesService.findOne(id);
    }
    async findByCode(code) {
        return this.pathologyTypesService.findByCode(code);
    }
    async create(createDto) {
        return this.pathologyTypesService.create(createDto);
    }
    async update(id, updateDto) {
        return this.pathologyTypesService.update(id, updateDto);
    }
    async remove(id) {
        return this.pathologyTypesService.remove(id);
    }
};
exports.PathologyTypesController = PathologyTypesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all pathology types (Public - no auth required)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all active pathology types', type: [pathology_type_dto_1.PathologyTypeDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PathologyTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pathology type by ID (Public - no auth required)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns pathology type', type: pathology_type_dto_1.PathologyTypeDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pathology type not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PathologyTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pathology type by code (Public - no auth required)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns pathology type', type: pathology_type_dto_1.PathologyTypeDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pathology type not found' }),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PathologyTypesController.prototype, "findByCode", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new pathology type' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Pathology type created', type: pathology_type_dto_1.PathologyTypeDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pathology_type_dto_1.CreatePathologyTypeDto]),
    __metadata("design:returntype", Promise)
], PathologyTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update pathology type' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pathology type updated', type: pathology_type_dto_1.PathologyTypeDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pathology type not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pathology_type_dto_1.UpdatePathologyTypeDto]),
    __metadata("design:returntype", Promise)
], PathologyTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete pathology type' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pathology type deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pathology type not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PathologyTypesController.prototype, "remove", null);
exports.PathologyTypesController = PathologyTypesController = __decorate([
    (0, swagger_1.ApiTags)('Pathology Types'),
    (0, common_1.Controller)('pathology-types'),
    __metadata("design:paramtypes", [pathology_types_service_1.PathologyTypesService])
], PathologyTypesController);
//# sourceMappingURL=pathology-types.controller.js.map