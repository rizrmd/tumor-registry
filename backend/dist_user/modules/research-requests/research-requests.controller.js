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
exports.ResearchRequestsController = void 0;
const common_1 = require("@nestjs/common");
const research_requests_service_1 = require("./research-requests.service");
const create_research_request_dto_1 = require("./dto/create-research-request.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const permissions_guard_1 = require("../../auth/guards/permissions.guard");
const permissions_decorator_1 = require("../../auth/decorators/permissions.decorator");
const patient_estimator_1 = require("./helpers/patient-estimator");
const prisma_service_1 = require("../../database/prisma.service");
let ResearchRequestsController = class ResearchRequestsController {
    constructor(researchRequestsService, prisma) {
        this.researchRequestsService = researchRequestsService;
        this.prisma = prisma;
    }
    create(req, dto) {
        return this.researchRequestsService.create(req.user.userId, dto);
    }
    findAll(req, filters) {
        return this.researchRequestsService.findAll(req.user.userId, filters);
    }
    findPending() {
        return this.researchRequestsService.findPending();
    }
    async estimatePatients(filters) {
        const count = await (0, patient_estimator_1.estimatePatientCount)(this.prisma, filters);
        return {
            estimatedCount: count,
            message: `Approximately ${count} patients match your criteria`,
        };
    }
    findOne(req, id) {
        return this.researchRequestsService.findOne(id, req.user.userId);
    }
    update(req, id, dto) {
        return this.researchRequestsService.update(id, req.user.userId, dto);
    }
    submit(req, id) {
        return this.researchRequestsService.submit(id, req.user.userId);
    }
    approveOrReject(req, id, dto) {
        return this.researchRequestsService.approveOrReject(id, req.user.userId, dto);
    }
    generateExport(req, id) {
        return this.researchRequestsService.generateDataExport(id, req.user.userId);
    }
    getDownload(req, id) {
        return this.researchRequestsService.getDownloadUrl(id, req.user.userId);
    }
    requestExtension(req, id, dto) {
        return this.researchRequestsService.requestExtension(id, req.user.userId, dto.extensionMonths, dto.justification);
    }
    remove(req, id) {
        return this.researchRequestsService.remove(id, req.user.userId);
    }
};
exports.ResearchRequestsController = ResearchRequestsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_research_request_dto_1.CreateResearchRequestDto]),
    __metadata("design:returntype", void 0)
], ResearchRequestsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ResearchRequestsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pending'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)('RESEARCH_REQUESTS_REVIEW'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResearchRequestsController.prototype, "findPending", null);
__decorate([
    (0, common_1.Post)('estimate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_research_request_dto_1.DataFiltersDto]),
    __metadata("design:returntype", Promise)
], ResearchRequestsController.prototype, "estimatePatients", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ResearchRequestsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_research_request_dto_1.UpdateResearchRequestDto]),
    __metadata("design:returntype", void 0)
], ResearchRequestsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ResearchRequestsController.prototype, "submit", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)('RESEARCH_REQUESTS_APPROVE'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_research_request_dto_1.ApproveResearchRequestDto]),
    __metadata("design:returntype", void 0)
], ResearchRequestsController.prototype, "approveOrReject", null);
__decorate([
    (0, common_1.Post)(':id/generate-export'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)('RESEARCH_REQUESTS_APPROVE'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ResearchRequestsController.prototype, "generateExport", null);
__decorate([
    (0, common_1.Get)(':id/download'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ResearchRequestsController.prototype, "getDownload", null);
__decorate([
    (0, common_1.Post)(':id/request-extension'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ResearchRequestsController.prototype, "requestExtension", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ResearchRequestsController.prototype, "remove", null);
exports.ResearchRequestsController = ResearchRequestsController = __decorate([
    (0, common_1.Controller)('research-requests'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [research_requests_service_1.ResearchRequestsService,
        prisma_service_1.PrismaService])
], ResearchRequestsController);
//# sourceMappingURL=research-requests.controller.js.map