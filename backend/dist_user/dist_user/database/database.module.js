"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const prisma_service_1 = require("./prisma.service");
const remote_prisma_service_1 = require("./remote-prisma.service");
const remote_config_service_1 = require("./remote-config.service");
const remote_config_controller_1 = require("./remote-config.controller");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [remote_config_controller_1.RemoteConfigController],
        providers: [prisma_service_1.PrismaService, remote_prisma_service_1.RemotePrismaService, remote_config_service_1.RemoteConfigService],
        exports: [prisma_service_1.PrismaService, remote_prisma_service_1.RemotePrismaService, remote_config_service_1.RemoteConfigService],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map
