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
exports.LocationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const locations_service_1 = require("./locations.service");
const location_dto_1 = require("./dto/location.dto");
let LocationsController = class LocationsController {
    constructor(service) {
        this.service = service;
    }
    async getAllBoneLocations(query) {
        return this.service.findAllBoneLocations(query.level, query.region, query.includeChildren);
    }
    async getBoneRegions() {
        return this.service.getBoneRegions();
    }
    async getBoneLocationById(id) {
        return this.service.findBoneLocationById(id);
    }
    async getBoneLocationChildren(id) {
        return this.service.findBoneLocationsByParentId(id);
    }
    async getAllSoftTissueLocations(query) {
        return this.service.findAllSoftTissueLocations(query.anatomicalRegion);
    }
    async getSoftTissueRegions() {
        return this.service.getSoftTissueRegions();
    }
    async getSoftTissueLocationById(id) {
        return this.service.findSoftTissueLocationById(id);
    }
};
exports.LocationsController = LocationsController;
__decorate([
    (0, common_1.Get)('bone'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all bone locations (Public - no auth required)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [location_dto_1.GetBoneLocationsQueryDto]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getAllBoneLocations", null);
__decorate([
    (0, common_1.Get)('bone/regions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get bone regions (Level 1) (Public - no auth required)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getBoneRegions", null);
__decorate([
    (0, common_1.Get)('bone/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get bone location by ID (Public - no auth required)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getBoneLocationById", null);
__decorate([
    (0, common_1.Get)('bone/:id/children'),
    (0, swagger_1.ApiOperation)({ summary: 'Get children of bone location (Public - no auth required)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getBoneLocationChildren", null);
__decorate([
    (0, common_1.Get)('soft-tissue'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all soft tissue locations (Public - no auth required)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [location_dto_1.GetSoftTissueLocationsQueryDto]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getAllSoftTissueLocations", null);
__decorate([
    (0, common_1.Get)('soft-tissue/regions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get soft tissue anatomical regions (Public - no auth required)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getSoftTissueRegions", null);
__decorate([
    (0, common_1.Get)('soft-tissue/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get soft tissue location by ID (Public - no auth required)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getSoftTissueLocationById", null);
exports.LocationsController = LocationsController = __decorate([
    (0, swagger_1.ApiTags)('Anatomical Locations'),
    (0, common_1.Controller)('locations'),
    __metadata("design:paramtypes", [locations_service_1.LocationsService])
], LocationsController);
//# sourceMappingURL=locations.controller.js.map