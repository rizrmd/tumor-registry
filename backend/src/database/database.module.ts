import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RemotePrismaService } from './remote-prisma.service';

@Global()
@Module({
  providers: [PrismaService, RemotePrismaService],
  exports: [PrismaService, RemotePrismaService],
})
export class DatabaseModule { }