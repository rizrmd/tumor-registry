"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchRequestsModule = void 0;
const common_1 = require("@nestjs/common");
const research_requests_service_1 = require("./research-requests.service");
const research_requests_controller_1 = require("./research-requests.controller");
let ResearchRequestsModule = class ResearchRequestsModule {
};
exports.ResearchRequestsModule = ResearchRequestsModule;
exports.ResearchRequestsModule = ResearchRequestsModule = __decorate([
    (0, common_1.Module)({
        controllers: [research_requests_controller_1.ResearchRequestsController],
        providers: [research_requests_service_1.ResearchRequestsService],
        exports: [research_requests_service_1.ResearchRequestsService],
    })
], ResearchRequestsModule);
//# sourceMappingURL=research-requests.module.js.map