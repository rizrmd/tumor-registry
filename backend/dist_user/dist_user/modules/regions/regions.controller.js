"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const regions_service_1 = require("./regions.service");
let RegionsController = class RegionsController {
    constructor(regionsService) {
        this.regionsService = regionsService;
    }
    async findAllProvinces() {
        return await this.regionsService.findAllProvinces();
    }
    async findProvinceById(provinceId) {
        const province = await this.regionsService.findProvinceById(provinceId);
        if (!province) {
            return { success: false, message: 'Province not found' };
        }
        return province;
    }
    async findRegenciesByProvinceId(provinceId) {
        return await this.regionsService.findRegenciesByProvinceId(provinceId);
    }
    async findDistrictsByRegencyId(regencyId) {
        return await this.regionsService.findDistrictsByRegencyId(regencyId);
    }
    async findVillagesByDistrictId(districtId) {
        return await this.regionsService.findVillagesByDistrictId(districtId);
    }
};
exports.RegionsController = RegionsController;
__decorate([
    (0, common_1.Get)('provinces'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all Indonesian provinces (Public - no auth required)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all 34 provinces' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "findAllProvinces", null);
__decorate([
    (0, common_1.Get)('provinces/:provinceId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get province by ID (Public - no auth required)' }),
    (0, swagger_1.ApiParam)({ name: 'provinceId', description: 'Province ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns province details' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Province not found' }),
    __param(0, (0, common_1.Param)('provinceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "findProvinceById", null);
__decorate([
    (0, common_1.Get)('provinces/:provinceId/regencies'),
    (0, swagger_1.ApiOperation)({ summary: 'Get regencies by province ID (Public - no auth required)' }),
    (0, swagger_1.ApiParam)({ name: 'provinceId', description: 'Province ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns regencies (kabupaten/kota) in the province' }),
    __param(0, (0, common_1.Param)('provinceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "findRegenciesByProvinceId", null);
__decorate([
    (0, common_1.Get)('regencies/:regencyId/districts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get districts by regency ID (Public - no auth required)' }),
    (0, swagger_1.ApiParam)({ name: 'regencyId', description: 'Regency ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns districts (kecamatan) in the regency' }),
    __param(0, (0, common_1.Param)('regencyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "findDistrictsByRegencyId", null);
__decorate([
    (0, common_1.Get)('districts/:districtId/villages'),
    (0, swagger_1.ApiOperation)({ summary: 'Get villages by district ID (Public - no auth required)' }),
    (0, swagger_1.ApiParam)({ name: 'districtId', description: 'District ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns villages (kelurahan/desa) in the district' }),
    __param(0, (0, common_1.Param)('districtId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "findVillagesByDistrictId", null);
exports.RegionsController = RegionsController = __decorate([
    (0, swagger_1.ApiTags)('Regions'),
    (0, common_1.Controller)('regions'),
    __metadata("design:paramtypes", [regions_service_1.RegionsService])
], RegionsController);
//# sourceMappingURL=regions.controller.js.map
