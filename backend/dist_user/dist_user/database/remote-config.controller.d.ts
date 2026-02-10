import { RemoteConfigService } from './remote-config.service';
import { JwtPayload } from '@/auth/interfaces/jwt-payload.interface';
interface UpdateTokenDto {
    jwtToken: string;
}
export declare class RemoteConfigController {
    private readonly remoteConfigService;
    private readonly logger;
    constructor(remoteConfigService: RemoteConfigService);
    updateToken(dto: UpdateTokenDto, req: {
        user: JwtPayload;
    }): Promise<{
        success: boolean;
        message: string;
        enabled: boolean;
        centerId?: undefined;
    } | {
        success: boolean;
        message: string;
        enabled: boolean;
        centerId: string;
    }>;
    getStatus(): Promise<{
        enabled: boolean;
        hasUrl: boolean;
        urlMask: string;
    }>;
}
export {};
