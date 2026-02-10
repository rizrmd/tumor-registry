"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NationalDashboardModule = void 0;
const common_1 = require("@nestjs/common");
const national_dashboard_controller_1 = require("./national-dashboard.controller");
const national_dashboard_service_1 = require("./national-dashboard.service");
const prisma_service_1 = require("../../database/prisma.service");
let NationalDashboardModule = class NationalDashboardModule {
};
exports.NationalDashboardModule = NationalDashboardModule;
exports.NationalDashboardModule = NationalDashboardModule = __decorate([
    (0, common_1.Module)({
        controllers: [national_dashboard_controller_1.NationalDashboardController],
        providers: [national_dashboard_service_1.NationalDashboardService, prisma_service_1.PrismaService],
    })
], NationalDashboardModule);
//# sourceMappingURL=national-dashboard.module.js.map
