"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathologyModule = void 0;
const common_1 = require("@nestjs/common");
const pathology_controller_1 = require("./pathology.controller");
const pathology_service_1 = require("./pathology.service");
const database_module_1 = require("@/database/database.module");
const auth_module_1 = require("../auth/auth.module");
let PathologyModule = class PathologyModule {
};
exports.PathologyModule = PathologyModule;
exports.PathologyModule = PathologyModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, auth_module_1.AuthModule],
        controllers: [pathology_controller_1.PathologyController],
        providers: [pathology_service_1.PathologyService],
        exports: [pathology_service_1.PathologyService],
    })
], PathologyModule);
//# sourceMappingURL=pathology.module.js.map
