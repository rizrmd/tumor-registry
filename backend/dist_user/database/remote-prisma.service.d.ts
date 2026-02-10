import { OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RemoteConfigService } from './remote-config.service';
export type RemotePrismaClient = PrismaClient;
export declare class RemotePrismaService implements OnModuleDestroy {
    private readonly remoteConfigService;
    private readonly logger;
    private prismaClient;
    constructor(remoteConfigService: RemoteConfigService);
    private getClientOrNull;
    initialize(): Promise<boolean>;
    getClient(): RemotePrismaClient;
    isInitialized(): boolean;
    checkConnection(): Promise<boolean>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
