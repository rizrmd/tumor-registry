import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from './prisma.service';
import { RemotePrismaService } from './remote-prisma.service';
import { RemoteConfigService } from './remote-config.service';
import { RemoteConfigController } from './remote-config.controller';

@Global()
@Module({
  imports: [HttpModule],
  controllers: [RemoteConfigController],
  providers: [PrismaService, RemotePrismaService, RemoteConfigService],
  exports: [PrismaService, RemotePrismaService, RemoteConfigService],
})
export class DatabaseModule { }
