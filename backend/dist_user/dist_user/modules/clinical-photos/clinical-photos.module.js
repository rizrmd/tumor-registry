"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicalPhotosModule = void 0;
const common_1 = require("@nestjs/common");
const clinical_photos_controller_1 = require("./clinical-photos.controller");
const clinical_photos_service_1 = require("./clinical-photos.service");
const prisma_service_1 = require("@/database/prisma.service");
let ClinicalPhotosModule = class ClinicalPhotosModule {
};
exports.ClinicalPhotosModule = ClinicalPhotosModule;
exports.ClinicalPhotosModule = ClinicalPhotosModule = __decorate([
    (0, common_1.Module)({
        controllers: [clinical_photos_controller_1.ClinicalPhotosController],
        providers: [clinical_photos_service_1.ClinicalPhotosService, prisma_service_1.PrismaService],
        exports: [clinical_photos_service_1.ClinicalPhotosService],
    })
], ClinicalPhotosModule);
//# sourceMappingURL=clinical-photos.module.js.map
