"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusculoskeletalModule = void 0;
const common_1 = require("@nestjs/common");
const pathology_types_module_1 = require("./pathology-types/pathology-types.module");
const tumor_syndromes_module_1 = require("./tumor-syndromes/tumor-syndromes.module");
const locations_module_1 = require("./locations/locations.module");
const who_classifications_module_1 = require("./who-classifications/who-classifications.module");
const msts_scores_module_1 = require("./msts-scores/msts-scores.module");
const follow_ups_module_1 = require("./follow-ups/follow-ups.module");
const treatments_module_1 = require("./treatments/treatments.module");
let MusculoskeletalModule = class MusculoskeletalModule {
};
exports.MusculoskeletalModule = MusculoskeletalModule;
exports.MusculoskeletalModule = MusculoskeletalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            pathology_types_module_1.PathologyTypesModule,
            tumor_syndromes_module_1.TumorSyndromesModule,
            locations_module_1.LocationsModule,
            who_classifications_module_1.WhoClassificationsModule,
            msts_scores_module_1.MstsScoresModule,
            follow_ups_module_1.FollowUpsModule,
            treatments_module_1.TreatmentsModule,
        ],
        exports: [
            pathology_types_module_1.PathologyTypesModule,
            tumor_syndromes_module_1.TumorSyndromesModule,
            locations_module_1.LocationsModule,
            who_classifications_module_1.WhoClassificationsModule,
            msts_scores_module_1.MstsScoresModule,
            follow_ups_module_1.FollowUpsModule,
            treatments_module_1.TreatmentsModule,
        ],
    })
], MusculoskeletalModule);
//# sourceMappingURL=musculoskeletal.module.js.map
