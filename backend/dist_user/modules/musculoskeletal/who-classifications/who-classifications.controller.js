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
exports.WhoClassificationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const who_classifications_service_1 = require("./who-classifications.service");
const who_classification_dto_1 = require("./dto/who-classification.dto");
let WhoClassificationsController = class WhoClassificationsController {
    constructor(service) {
        this.service = service;
    }
    async getAllBoneTumors(query) {
        return this.service.findAllBoneTumors(query.category, query.subcategory, query.isMalignant, query.search);
    }
    async getBoneTumorCategories() {
        return this.service.getBoneTumorCategories();
    }
    async getBoneTumorSubcategories(category) {
        return this.service.getBoneTumorSubcategories(category);
    }
    async getBoneTumorById(id) {
        return this.service.findBoneTumorById(id);
    }
    async getAllSoftTissueTumors(query) {
        return this.service.findAllSoftTissueTumors(query.category, query.subcategory, query.isMalignant, query.search);
    }
    async getSoftTissueTumorCategories() {
        return this.service.getSoftTissueTumorCategories();
    }
    async getSoftTissueTumorSubcategories(category) {
        return this.service.getSoftTissueTumorSubcategories(category);
    }
    async getSoftTissueTumorById(id) {
        return this.service.findSoftTissueTumorById(id);
    }
};
exports.WhoClassificationsController = WhoClassificationsController;
__decorate([
    (0, common_1.Get)('bone'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all WHO bone tumor classifications' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [who_classification_dto_1.GetBoneTumorsQueryDto]),
    __metadata("design:returntype", Promise)
], WhoClassificationsController.prototype, "getAllBoneTumors", null);
__decorate([
    (0, common_1.Get)('bone/categories'),
    (0, swagger_1.ApiOperation)({ summary: 'Get bone tumor categories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WhoClassificationsController.prototype, "getBoneTumorCategories", null);
__decorate([
    (0, common_1.Get)('bone/subcategories'),
    (0, swagger_1.ApiOperation)({ summary: 'Get bone tumor subcategories' }),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WhoClassificationsController.prototype, "getBoneTumorSubcategories", null);
__decorate([
    (0, common_1.Get)('bone/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get bone tumor classification by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WhoClassificationsController.prototype, "getBoneTumorById", null);
__decorate([
    (0, common_1.Get)('soft-tissue'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all WHO soft tissue tumor classifications' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [who_classification_dto_1.GetSoftTissueTumorsQueryDto]),
    __metadata("design:returntype", Promise)
], WhoClassificationsController.prototype, "getAllSoftTissueTumors", null);
__decorate([
    (0, common_1.Get)('soft-tissue/categories'),
    (0, swagger_1.ApiOperation)({ summary: 'Get soft tissue tumor categories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WhoClassificationsController.prototype, "getSoftTissueTumorCategories", null);
__decorate([
    (0, common_1.Get)('soft-tissue/subcategories'),
    (0, swagger_1.ApiOperation)({ summary: 'Get soft tissue tumor subcategories' }),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WhoClassificationsController.prototype, "getSoftTissueTumorSubcategories", null);
__decorate([
    (0, common_1.Get)('soft-tissue/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get soft tissue tumor classification by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WhoClassificationsController.prototype, "getSoftTissueTumorById", null);
exports.WhoClassificationsController = WhoClassificationsController = __decorate([
    (0, swagger_1.ApiTags)('WHO Tumor Classifications'),
    (0, common_1.Controller)('who-classifications'),
    __metadata("design:paramtypes", [who_classifications_service_1.WhoClassificationsService])
], WhoClassificationsController);
//# sourceMappingURL=who-classifications.controller.js.map