import { ScheduledReportsService } from '../services/scheduled-reports.service';
import { CreateScheduledReportDto } from '../dto/create-scheduled-report.dto';
import { UpdateScheduledReportDto } from '../dto/update-scheduled-report.dto';
export declare class ScheduledReportsController {
    private readonly scheduledReportsService;
    constructor(scheduledReportsService: ScheduledReportsService);
    create(createDto: CreateScheduledReportDto, req: any): Promise<any>;
    findAll(templateId?: string, isActive?: string, deliveryMethod?: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateDto: UpdateScheduledReportDto): Promise<any>;
    toggleActive(id: string): Promise<any>;
    remove(id: string): Promise<void>;
    executeNow(id: string, parameters?: any): Promise<import("../interfaces/scheduled-reports.interface").ExecutionResult>;
}
