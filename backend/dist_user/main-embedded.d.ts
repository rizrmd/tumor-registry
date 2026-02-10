import { NestFastifyApplication } from '@nestjs/platform-fastify';
export declare function startEmbeddedServer(): Promise<{
    port: number;
    app: NestFastifyApplication<import("fastify").RawServerDefault>;
}>;
