import { Module, Global } from '@nestjs/common';
import { AuditLogService } from '../modules/audit/audit.service';

@Global()
@Module({
  providers: [AuditLogService],
  exports: [AuditLogService],
})
export class CommonModule { }
