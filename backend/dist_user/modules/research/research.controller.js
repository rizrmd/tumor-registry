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
exports.ResearchController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const research_service_1 = require("./research.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let ResearchController = class ResearchController {
    constructor(researchService) {
        this.researchService = researchService;
    }
    async findAll(req) {
        const userId = req.user.userId;
        return await this.researchService.findAll(userId);
    }
    async findById(id, req) {
        const userId = req.user.userId;
        return await this.researchService.findById(id, userId);
    }
    async create(createDto, req) {
        const userId = req.user.userId;
        return await this.researchService.create(createDto, userId);
    }
    async update(id, updateDto, req) {
        const userId = req.user.userId;
        return await this.researchService.update(id, updateDto, userId);
    }
    async delete(id, req) {
        const userId = req.user.userId;
        return await this.researchService.delete(id, userId);
    }
};
exports.ResearchController = ResearchController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all research requests for current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Research requests retrieved successfully' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResearchController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get research request by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Research request retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Research request not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ResearchController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new research request' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Research request created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ResearchController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update research request' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Research request updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Research request not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ResearchController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete research request' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Research request deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Research request not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ResearchController.prototype, "delete", null);
exports.ResearchController = ResearchController = __decorate([
    (0, swagger_1.ApiTags)('Research'),
    (0, common_1.Controller)('research/requests'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [research_service_1.ResearchService])
], ResearchController);
//# sourceMappingURL=research.controller.js.map