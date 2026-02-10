"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MstsScoresModule = void 0;
const common_1 = require("@nestjs/common");
const msts_scores_controller_1 = require("./msts-scores.controller");
const msts_scores_service_1 = require("./msts-scores.service");
let MstsScoresModule = class MstsScoresModule {
};
exports.MstsScoresModule = MstsScoresModule;
exports.MstsScoresModule = MstsScoresModule = __decorate([
    (0, common_1.Module)({
        controllers: [msts_scores_controller_1.MstsScoresController],
        providers: [msts_scores_service_1.MstsScoresService],
        exports: [msts_scores_service_1.MstsScoresService],
    })
], MstsScoresModule);
//# sourceMappingURL=msts-scores.module.js.map
