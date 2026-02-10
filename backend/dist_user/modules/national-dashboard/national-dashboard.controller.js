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
exports.NationalDashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const aggregate_search_dto_1 = require("./dto/aggregate-search.dto");
const national_dashboard_service_1 = require("./national-dashboard.service");
let NationalDashboardController = class NationalDashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getStatistics() {
        return this.dashboardService.getNationalStatistics();
    }
    async getSummary() {
        return this.dashboardService.getDashboardSummary();
    }
    async searchAggregated(filters) {
        return this.dashboardService.searchAggregatedData(filters);
    }
    async exportData(filters, res) {
        const csv = await this.dashboardService.generateExport(filters);
        res.header('Content-Type', 'text/csv');
        res.header('Content-Disposition', 'attachment; filename="analytics_export.csv"');
        return res.send(csv);
    }
};
exports.NationalDashboardController = NationalDashboardController;
__decorate([
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get aggregated national statistics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NationalDashboardController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get dashboard summary metrics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NationalDashboardController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Post)('search-aggregated'),
    (0, swagger_1.ApiOperation)({ summary: 'Filter aggregated national data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [aggregate_search_dto_1.AggregateSearchDto]),
    __metadata("design:returntype", Promise)
], NationalDashboardController.prototype, "searchAggregated", null);
__decorate([
    (0, common_1.Post)('export'),
    (0, swagger_1.ApiOperation)({ summary: 'Export aggregated data as CSV' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [aggregate_search_dto_1.AggregateSearchDto, Object]),
    __metadata("design:returntype", Promise)
], NationalDashboardController.prototype, "exportData", null);
exports.NationalDashboardController = NationalDashboardController = __decorate([
    (0, swagger_1.ApiTags)('National Dashboard'),
    (0, common_1.Controller)('national-dashboard'),
    __metadata("design:paramtypes", [national_dashboard_service_1.NationalDashboardService])
], NationalDashboardController);
//# sourceMappingURL=national-dashboard.controller.js.map