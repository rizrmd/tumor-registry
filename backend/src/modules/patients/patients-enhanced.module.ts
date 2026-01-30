import { Module } from '@nestjs/common';
import { PatientsEnhancedController } from './patients-enhanced.controller';
import { PatientsEnhancedService } from './patients-enhanced.service';
import { MedicalRecordModule } from '../medical-record/medical-record.module';

@Module({
  imports: [MedicalRecordModule],
  controllers: [PatientsEnhancedController],
  providers: [PatientsEnhancedService],
  exports: [PatientsEnhancedService],
})
export class PatientsEnhancedModule { }
