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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let AppController = class AppController {
    constructor() {
        this.desktopVersions = {
            '1.0.1': {
                version: '1.0.1',
                downloadUrl: 'https://releases.inamsos.com/desktop/inamsos-desktop-1.0.1.dmg',
                releaseDate: '2025-01-15',
                mandatory: false,
                changelog: [
                    'Fixed sync indicator not showing file progress',
                    'Added download sync support',
                    'Improved offline mode reliability',
                ],
            },
            '1.0.2': {
                version: '1.0.2',
                downloadUrl: 'https://releases.inamsos.com/desktop/inamsos-desktop-1.0.2.dmg',
                releaseDate: '2025-01-20',
                mandatory: false,
                changelog: [
                    'Enhanced full sync progress tracking',
                    'Fixed bug with file upload timeouts',
                    'Added auto-update checker',
                ],
            },
        };
        this.latestVersion = '1.0.2';
        this.minRequiredVersion = '1.0.0';
    }
    getStatus() {
        return {
            status: 'success',
            message: 'INAMSOS API is running',
            version: '1.0.0',
            api_base: '/api/v1',
            docs: '/api/docs',
        };
    }
    getDesktopVersion(platform) {
        const validPlatforms = ['darwin', 'windows', 'linux'];
        if (!validPlatforms.includes(platform)) {
            return {
                status: 'error',
                message: `Invalid platform. Must be one of: ${validPlatforms.join(', ')}`,
            };
        }
        const platformExtensions = {
            darwin: '.dmg',
            windows: '.exe',
            linux: '.AppImage',
        };
        const versionInfo = this.desktopVersions[this.latestVersion];
        return {
            status: 'success',
            data: {
                ...versionInfo,
                downloadUrl: versionInfo.downloadUrl.replace(platformExtensions.darwin, platformExtensions[platform]),
                minRequiredVersion: this.minRequiredVersion,
                platform,
            },
        };
    }
    checkDesktopUpdate(currentVersion) {
        const needsUpdate = this.compareVersions(currentVersion, this.latestVersion) < 0;
        const isMandatory = this.compareVersions(currentVersion, this.minRequiredVersion) < 0;
        if (!needsUpdate) {
            return {
                status: 'success',
                data: {
                    updateAvailable: false,
                    currentVersion,
                    latestVersion: this.latestVersion,
                    message: 'You are running the latest version',
                },
            };
        }
        const versionInfo = this.desktopVersions[this.latestVersion];
        return {
            status: 'success',
            data: {
                updateAvailable: true,
                currentVersion,
                latestVersion: this.latestVersion,
                mandatory: isMandatory || versionInfo.mandatory,
                ...versionInfo,
            },
        };
    }
    compareVersions(v1, v2) {
        const parts1 = v1.split('.').map(Number);
        const parts2 = v2.split('.').map(Number);
        for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
            const part1 = parts1[i] || 0;
            const part2 = parts2[i] || 0;
            if (part1 !== part2) {
                return part1 - part2;
            }
        }
        return 0;
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('status'),
    (0, swagger_1.ApiOperation)({ summary: 'Server Status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Server is running' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Get)('version/desktop/:platform'),
    (0, swagger_1.ApiOperation)({ summary: 'Get latest desktop version for a platform' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Latest version info' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid platform' }),
    __param(0, (0, common_1.Param)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getDesktopVersion", null);
__decorate([
    (0, common_1.Get)('version/desktop/check/:currentVersion'),
    (0, swagger_1.ApiOperation)({ summary: 'Check if desktop update is available' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Update check result' }),
    __param(0, (0, common_1.Param)('currentVersion')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "checkDesktopUpdate", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('App')
], AppController);
//# sourceMappingURL=app.controller.js.map