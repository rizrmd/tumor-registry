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
var RemoteConfigService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let RemoteConfigService = RemoteConfigService_1 = class RemoteConfigService {
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
        this.logger = new common_1.Logger(RemoteConfigService_1.name);
        this.cachedConfig = null;
        this.lastFetchTime = 0;
        this.CACHE_TTL = 5 * 60 * 1000;
        this.jwtToken = null;
        this.jwtToken = this.configService.get('remoteSync.jwtToken') || null;
    }
    setJwtToken(token) {
        this.jwtToken = token;
        this.logger.log('JWT token updated for remote sync');
    }
    async fetchRemoteDbConfig() {
        try {
            const directUrl = this.configService.get('remoteSync.directUrl');
            if (directUrl) {
                this.logger.debug('Using direct REMOTE_DATABASE_URL from environment');
                return {
                    enabled: true,
                    url: directUrl,
                };
            }
            const centralServerUrl = this.configService.get('remoteSync.centralServerUrl');
            const envToken = this.configService.get('remoteSync.jwtToken');
            const jwtToken = this.jwtToken || envToken;
            if (!jwtToken) {
                this.logger.debug('JWT token not available, remote sync disabled');
                return null;
            }
            if (this.cachedConfig && Date.now() - this.lastFetchTime < this.CACHE_TTL) {
                this.logger.debug('Returning cached remote DB config');
                return this.cachedConfig;
            }
            const url = `${centralServerUrl}/api/v1/centers/my/remote-db-config`;
            this.logger.log(`Fetching remote DB config from central server`);
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
                timeout: 10000,
            }));
            this.cachedConfig = response.data;
            this.lastFetchTime = Date.now();
            if (this.cachedConfig.enabled) {
                this.logger.log('Remote DB config fetched successfully from central server');
            }
            else {
                this.logger.log('Remote DB not enabled for this center');
            }
            return this.cachedConfig;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                this.logger.error(`HTTP error fetching remote DB config: ${error.message}`);
            }
            else if (error.response) {
                this.logger.error(`Failed to fetch remote DB config: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }
            else {
                this.logger.error('Failed to fetch remote DB config', error.message || error);
            }
            return null;
        }
    }
    getRemoteDbUrl() {
        return this.cachedConfig?.enabled ? this.cachedConfig.url || null : null;
    }
    getRemoteDbApiKey() {
        return this.cachedConfig?.enabled ? this.cachedConfig.apiKey || null : null;
    }
    isRemoteDbEnabled() {
        return this.cachedConfig?.enabled === true && !!this.cachedConfig.url;
    }
    clearCache() {
        this.cachedConfig = null;
        this.lastFetchTime = 0;
        this.logger.log('Remote DB config cache cleared');
    }
    async refreshConfig() {
        this.clearCache();
        return this.fetchRemoteDbConfig();
    }
};
exports.RemoteConfigService = RemoteConfigService;
exports.RemoteConfigService = RemoteConfigService = RemoteConfigService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService])
], RemoteConfigService);
//# sourceMappingURL=remote-config.service.js.map