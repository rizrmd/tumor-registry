"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhoClassificationsModule = void 0;
const common_1 = require("@nestjs/common");
const who_classifications_controller_1 = require("./who-classifications.controller");
const who_classifications_service_1 = require("./who-classifications.service");
let WhoClassificationsModule = class WhoClassificationsModule {
};
exports.WhoClassificationsModule = WhoClassificationsModule;
exports.WhoClassificationsModule = WhoClassificationsModule = __decorate([
    (0, common_1.Module)({
        controllers: [who_classifications_controller_1.WhoClassificationsController],
        providers: [who_classifications_service_1.WhoClassificationsService],
        exports: [who_classifications_service_1.WhoClassificationsService],
    })
], WhoClassificationsModule);
//# sourceMappingURL=who-classifications.module.js.map