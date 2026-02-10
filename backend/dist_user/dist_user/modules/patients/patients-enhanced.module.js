"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsEnhancedModule = void 0;
const common_1 = require("@nestjs/common");
const patients_enhanced_controller_1 = require("./patients-enhanced.controller");
const patients_enhanced_service_1 = require("./patients-enhanced.service");
const medical_record_module_1 = require("../medical-record/medical-record.module");
let PatientsEnhancedModule = class PatientsEnhancedModule {
};
exports.PatientsEnhancedModule = PatientsEnhancedModule;
exports.PatientsEnhancedModule = PatientsEnhancedModule = __decorate([
    (0, common_1.Module)({
        imports: [medical_record_module_1.MedicalRecordModule],
        controllers: [patients_enhanced_controller_1.PatientsEnhancedController],
        providers: [patients_enhanced_service_1.PatientsEnhancedService],
        exports: [patients_enhanced_service_1.PatientsEnhancedService],
    })
], PatientsEnhancedModule);
//# sourceMappingURL=patients-enhanced.module.js.map
