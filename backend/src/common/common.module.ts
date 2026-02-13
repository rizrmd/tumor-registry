import { Module, Global } from '@nestjs/common';
import { AuditLogService } from '../modules/audit/audit.service';
import { DatabaseModule } from '../database/database.module';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [AuditLogService],
  exports: [AuditLogService],
})
export class CommonModule { }
