"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfflineQueueModule = void 0;
const common_1 = require("@nestjs/common");
const offline_queue_controller_1 = require("./offline-queue.controller");
const offline_queue_service_1 = require("./offline-queue.service");
const file_sync_service_1 = require("./file-sync.service");
const prisma_service_1 = require("@/database/prisma.service");
const remote_prisma_service_1 = require("@/database/remote-prisma.service");
let OfflineQueueModule = class OfflineQueueModule {
};
exports.OfflineQueueModule = OfflineQueueModule;
exports.OfflineQueueModule = OfflineQueueModule = __decorate([
    (0, common_1.Module)({
        controllers: [offline_queue_controller_1.OfflineQueueController],
        providers: [
            offline_queue_service_1.OfflineQueueService,
            file_sync_service_1.FileSyncService,
            prisma_service_1.PrismaService,
            remote_prisma_service_1.RemotePrismaService,
        ],
        exports: [offline_queue_service_1.OfflineQueueService, file_sync_service_1.FileSyncService],
    })
], OfflineQueueModule);
//# sourceMappingURL=offline-queue.module.js.map
