import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import type { FastifyRequest } from 'fastify';
declare const JwtRefreshStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptions] | [opt: import("passport-jwt").StrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private readonly configService;
    private readonly authService;
    constructor(configService: ConfigService, authService: AuthService);
    validate(req: FastifyRequest, payload: any): Promise<{
        userId: any;
        email: any;
        roles: any;
        permissions: any;
        centerId: any;
    }>;
}
export {};
