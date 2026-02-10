import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
interface RemoteDbConfig {
    enabled: boolean;
    url?: string;
    apiKey?: string;
    message?: string;
}
export declare class RemoteConfigService {
    private readonly configService;
    private readonly httpService;
    private readonly logger;
    private cachedConfig;
    private lastFetchTime;
    private readonly CACHE_TTL;
    private jwtToken;
    constructor(configService: ConfigService, httpService: HttpService);
    setJwtToken(token: string): void;
    fetchRemoteDbConfig(): Promise<RemoteDbConfig | null>;
    getRemoteDbUrl(): string | null;
    getRemoteDbApiKey(): string | null;
    isRemoteDbEnabled(): boolean;
    clearCache(): void;
    refreshConfig(): Promise<RemoteDbConfig | null>;
}
export {};
