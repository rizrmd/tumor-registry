"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledReportsModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const scheduled_reports_controller_1 = require("./controllers/scheduled-reports.controller");
const scheduled_reports_service_1 = require("./services/scheduled-reports.service");
const prisma_service_1 = require("@/database/prisma.service");
let ScheduledReportsModule = class ScheduledReportsModule {
};
exports.ScheduledReportsModule = ScheduledReportsModule;
exports.ScheduledReportsModule = ScheduledReportsModule = __decorate([
    (0, common_1.Module)({
        imports: [schedule_1.ScheduleModule.forRoot()],
        controllers: [scheduled_reports_controller_1.ScheduledReportsController],
        providers: [scheduled_reports_service_1.ScheduledReportsService, prisma_service_1.PrismaService],
        exports: [scheduled_reports_service_1.ScheduledReportsService],
    })
], ScheduledReportsModule);
//# sourceMappingURL=scheduled-reports.module.js.map
