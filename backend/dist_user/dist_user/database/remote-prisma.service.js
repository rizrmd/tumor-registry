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
var RemotePrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemotePrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const remote_config_service_1 = require("./remote-config.service");
let RemotePrismaService = RemotePrismaService_1 = class RemotePrismaService {
    constructor(remoteConfigService) {
        this.remoteConfigService = remoteConfigService;
        this.logger = new common_1.Logger(RemotePrismaService_1.name);
        this.prismaClient = null;
        return new Proxy(this, {
            get: (target, prop) => {
                if (prop in target || typeof prop === 'symbol') {
                    return target[prop];
                }
                const specialProps = ['then', 'catch', 'finally', 'onModuleInit', 'onModuleDestroy', 'onApplicationBootstrap', 'onApplicationShutdown'];
                if (specialProps.includes(prop)) {
                    return undefined;
                }
                const client = target.getClientOrNull();
                if (client) {
                    const value = client[prop];
                    if (typeof value === 'function') {
                        return value.bind(client);
                    }
                    return value;
                }
                return (...args) => {
                    throw new Error(`Remote Prisma client not initialized. ` +
                        `Cannot access '${String(prop)}'. ` +
                        `Call initialize() first or check isInitialized().`);
                };
            },
        });
    }
    getClientOrNull() {
        return this.prismaClient;
    }
    async initialize() {
        try {
            const config = await this.remoteConfigService.fetchRemoteDbConfig();
            if (!config?.enabled || !config.url) {
                this.logger.log('Remote database not configured or disabled');
                return false;
            }
            if (this.prismaClient) {
                await this.prismaClient.$disconnect();
                this.prismaClient = null;
            }
            this.prismaClient = new client_1.PrismaClient({
                datasources: {
                    db: {
                        url: config.url,
                    },
                },
                log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
            });
            this.logger.log('Remote Prisma client initialized successfully');
            return true;
        }
        catch (error) {
            this.logger.error('Failed to initialize remote Prisma client', error);
            this.prismaClient = null;
            return false;
        }
    }
    getClient() {
        if (!this.prismaClient) {
            throw new Error('Remote Prisma client not initialized. Call initialize() first.');
        }
        return this.prismaClient;
    }
    isInitialized() {
        return this.prismaClient !== null;
    }
    async checkConnection() {
        try {
            if (!this.prismaClient) {
                const initialized = await this.initialize();
                if (!initialized) {
                    return false;
                }
            }
            await this.prismaClient.$connect();
            await this.prismaClient.$disconnect();
            return true;
        }
        catch (e) {
            this.logger.warn('Remote database connection check failed', e);
            return false;
        }
    }
    async connect() {
        if (!this.prismaClient) {
            const initialized = await this.initialize();
            if (!initialized) {
                throw new Error('Failed to initialize remote database connection');
            }
        }
        await this.prismaClient.$connect();
    }
    async disconnect() {
        if (this.prismaClient) {
            await this.prismaClient.$disconnect();
        }
    }
    async onModuleDestroy() {
        await this.disconnect();
        this.logger.log('Remote Database disconnected');
    }
};
exports.RemotePrismaService = RemotePrismaService;
exports.RemotePrismaService = RemotePrismaService = RemotePrismaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [remote_config_service_1.RemoteConfigService])
], RemotePrismaService);
//# sourceMappingURL=remote-prisma.service.js.map
