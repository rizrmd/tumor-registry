import { Module } from '@nestjs/common';
import { CentersController } from './centers.controller';
import { CentersService } from './centers.service';
import { DatabaseModule } from '../../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { PatientsModule } from '../patients/patients.module';

@Module({
  imports: [DatabaseModule, AuthModule, PatientsModule],
  controllers: [CentersController],
  providers: [CentersService],
  exports: [CentersService],
})
export class CentersModule {}