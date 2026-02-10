"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathologyTypesModule = void 0;
const common_1 = require("@nestjs/common");
const pathology_types_controller_1 = require("./pathology-types.controller");
const pathology_types_service_1 = require("./pathology-types.service");
let PathologyTypesModule = class PathologyTypesModule {
};
exports.PathologyTypesModule = PathologyTypesModule;
exports.PathologyTypesModule = PathologyTypesModule = __decorate([
    (0, common_1.Module)({
        controllers: [pathology_types_controller_1.PathologyTypesController],
        providers: [pathology_types_service_1.PathologyTypesService],
        exports: [pathology_types_service_1.PathologyTypesService],
    })
], PathologyTypesModule);
//# sourceMappingURL=pathology-types.module.js.map