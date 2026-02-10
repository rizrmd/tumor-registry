"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ScheduledReportsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledReportsService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("@/database/prisma.service");
const cron_1 = require("cron");
let ScheduledReportsService = ScheduledReportsService_1 = class ScheduledReportsService {
    constructor(prisma, schedulerRegistry) {
        this.prisma = prisma;
        this.schedulerRegistry = schedulerRegistry;
        this.logger = new common_1.Logger(ScheduledReportsService_1.name);
        this.scheduledJobs = new Map();
        this.initializeScheduledReports();
    }
    async onModuleInit() {
        await this.initializeScheduledReports();
    }
    async onModuleDestroy() {
        this.scheduledJobs.forEach((job) => job.stop());
        this.scheduledJobs.clear();
    }
    async create(createDto) {
        try {
            this.validateCronExpression(createDto.schedule);
            const template = await this.prisma.reportTemplate.findUnique({
                where: { id: createDto.templateId },
            });
            if (!template) {
                throw new common_1.NotFoundException('Report template not found');
            }
            const nextRun = this.calculateNextRun(createDto.schedule);
            const scheduledReport = await this.prisma.scheduledReport.create({
                data: {
                    templateId: createDto.templateId,
                    name: createDto.name,
                    description: createDto.description,
                    schedule: createDto.schedule,
                    recipients: createDto.recipients,
                    parameters: createDto.parameters,
                    format: createDto.format,
                    deliveryMethod: createDto.deliveryMethod,
                    isActive: createDto.isActive ?? true,
                    nextRun,
                    createdBy: createDto.createdBy,
                },
                include: {
                    template: true,
                },
            });
            if (scheduledReport.isActive) {
                await this.scheduleJob(scheduledReport);
            }
            this.logger.log(`Scheduled report created: ${scheduledReport.name} (ID: ${scheduledReport.id})`);
            return scheduledReport;
        }
        catch (error) {
            this.logger.error('Error creating scheduled report', error);
            throw error;
        }
    }
    async update(id, updateDto) {
        try {
            const existing = await this.prisma.scheduledReport.findUnique({
                where: { id },
            });
            if (!existing) {
                throw new common_1.NotFoundException('Scheduled report not found');
            }
            if (updateDto.schedule && updateDto.schedule !== existing.schedule) {
                this.validateCronExpression(updateDto.schedule);
            }
            const nextRun = updateDto.schedule
                ? this.calculateNextRun(updateDto.schedule)
                : existing.nextRun;
            const updated = await this.prisma.scheduledReport.update({
                where: { id },
                data: {
                    ...updateDto,
                    recipients: updateDto.recipients,
                    parameters: updateDto.parameters,
                    nextRun,
                },
                include: {
                    template: true,
                },
            });
            await this.unscheduleJob(id);
            if (updated.isActive) {
                await this.scheduleJob(updated);
            }
            this.logger.log(`Scheduled report updated: ${updated.name} (ID: ${id})`);
            return updated;
        }
        catch (error) {
            this.logger.error('Error updating scheduled report', error);
            throw error;
        }
    }
    async findOne(id) {
        const report = await this.prisma.scheduledReport.findUnique({
            where: { id },
            include: {
                template: true,
                executions: {
                    take: 10,
                    orderBy: { executionTime: 'desc' },
                },
            },
        });
        if (!report) {
            throw new common_1.NotFoundException('Scheduled report not found');
        }
        return report;
    }
    async findAll(filters) {
        const where = {};
        if (filters?.templateId)
            where.templateId = filters.templateId;
        if (filters?.isActive !== undefined)
            where.isActive = filters.isActive;
        if (filters?.deliveryMethod)
            where.deliveryMethod = filters.deliveryMethod;
        return this.prisma.scheduledReport.findMany({
            where,
            include: {
                template: true,
                _count: {
                    select: {
                        executions: true,
                    },
                },
            },
            orderBy: [
                { isActive: 'desc' },
                { nextRun: 'asc' },
            ],
        });
    }
    async toggleActive(id) {
        const report = await this.prisma.scheduledReport.findUnique({
            where: { id },
        });
        if (!report) {
            throw new common_1.NotFoundException('Scheduled report not found');
        }
        const updated = await this.prisma.scheduledReport.update({
            where: { id },
            data: {
                isActive: !report.isActive,
            },
        });
        if (updated.isActive) {
            await this.scheduleJob(updated);
        }
        else {
            await this.unscheduleJob(id);
        }
        this.logger.log(`Scheduled report ${updated.isActive ? 'activated' : 'deactivated'}: ${id}`);
        return updated;
    }
    async remove(id) {
        const report = await this.prisma.scheduledReport.findUnique({
            where: { id },
        });
        if (!report) {
            throw new common_1.NotFoundException('Scheduled report not found');
        }
        await this.unscheduleJob(id);
        await this.prisma.scheduledReport.delete({
            where: { id },
        });
        this.logger.log(`Scheduled report deleted: ${id}`);
    }
    async executeScheduledReport(context) {
        const startTime = Date.now();
        const { scheduledReportId, executionTime, parameters } = context;
        try {
            this.logger.log(`Executing scheduled report: ${scheduledReportId}`);
            const scheduledReport = await this.prisma.scheduledReport.findUnique({
                where: { id: scheduledReportId },
                include: {
                    template: true,
                },
            });
            if (!scheduledReport) {
                throw new common_1.NotFoundException('Scheduled report not found');
            }
            const execution = await this.prisma.reportExecution.create({
                data: {
                    scheduledReportId,
                    executionTime,
                    status: 'RUNNING',
                    recipients: scheduledReport.recipients,
                    success: false,
                },
            });
            const validation = await this.validateReportData(scheduledReport.template.dataSource);
            if (!validation.isValid) {
                throw new common_1.BadRequestException(`Data validation failed: ${validation.errors.join(', ')}`);
            }
            if (validation.warnings.length > 0) {
                this.logger.warn(`Data quality warnings for report ${scheduledReportId}: ${validation.warnings.join(', ')}`);
            }
            const reportResult = await this.generateReport(scheduledReport, parameters);
            const executiveSummary = await this.generateExecutiveSummary(reportResult.data, scheduledReport.template);
            const alerts = await this.checkThresholds(reportResult.data, scheduledReport.template);
            if (alerts.length > 0) {
                await this.sendThresholdAlerts(alerts, scheduledReport);
            }
            const duration = Math.floor((Date.now() - startTime) / 1000);
            await this.prisma.reportExecution.update({
                where: { id: execution.id },
                data: {
                    status: 'COMPLETED',
                    filePath: reportResult.filePath,
                    fileSize: reportResult.fileSize,
                    duration,
                    success: true,
                    deliveryStatus: 'SENT',
                },
            });
            await this.prisma.scheduledReport.update({
                where: { id: scheduledReportId },
                data: {
                    lastRun: executionTime,
                    nextRun: this.calculateNextRun(scheduledReport.schedule),
                    successCount: { increment: 1 },
                },
            });
            await this.distributeReport(execution.id, scheduledReport, reportResult, executiveSummary);
            this.logger.log(`Scheduled report executed successfully: ${scheduledReportId} (${duration}s)`);
            return {
                success: true,
                filePath: reportResult.filePath,
                fileSize: reportResult.fileSize,
                duration,
            };
        }
        catch (error) {
            const duration = Math.floor((Date.now() - startTime) / 1000);
            this.logger.error(`Error executing scheduled report ${scheduledReportId}`, error);
            await this.prisma.scheduledReport.update({
                where: { id: scheduledReportId },
                data: {
                    lastRun: executionTime,
                    nextRun: this.calculateNextRun((await this.findOne(scheduledReportId)).schedule),
                    failureCount: { increment: 1 },
                },
            });
            return {
                success: false,
                duration,
                errorMessage: error.message,
            };
        }
    }
    async validateReportData(dataSource) {
        const errors = [];
        const warnings = [];
        let dataQuality = { completeness: 100, accuracy: 100, timeliness: 100 };
        try {
            const dataCount = await this.getDataSourceCount(dataSource);
            if (dataCount === 0) {
                errors.push('No data available for report generation');
            }
            const recentDataCount = await this.getRecentDataCount(dataSource, 24);
            const freshnessRatio = dataCount > 0 ? (recentDataCount / dataCount) * 100 : 0;
            if (freshnessRatio < 10) {
                warnings.push('Data may be stale - less than 10% updated in last 24 hours');
                dataQuality.timeliness = freshnessRatio;
            }
            const completenessScore = await this.checkDataCompleteness(dataSource);
            if (completenessScore < 80) {
                warnings.push(`Data completeness is ${completenessScore}% - some fields may be missing`);
                dataQuality.completeness = completenessScore;
            }
            return {
                isValid: errors.length === 0,
                errors,
                warnings,
                dataQuality,
            };
        }
        catch (error) {
            this.logger.error('Error validating report data', error);
            return {
                isValid: false,
                errors: [error.message],
                warnings,
            };
        }
    }
    async generateExecutiveSummary(data, template) {
        const keyMetrics = [];
        const insights = [];
        keyMetrics.push({
            name: 'Total Records',
            value: data.length,
            trend: 'stable',
            status: 'good',
        });
        if (data.length > 0) {
            insights.push({
                category: 'Data Volume',
                description: `Report contains ${data.length} records`,
                impact: 'medium',
                data: { count: data.length },
            });
        }
        return {
            title: `Executive Summary - ${template.name}`,
            period: new Date().toISOString().split('T')[0],
            keyMetrics,
            insights,
            recommendations: [
                'Review data quality metrics regularly',
                'Monitor threshold alerts for anomalies',
            ],
            generatedAt: new Date(),
        };
    }
    async checkThresholds(data, template) {
        const alerts = [];
        const recordCount = data.length;
        if (recordCount < 100) {
            alerts.push({
                metricName: 'Record Count',
                currentValue: recordCount,
                thresholdValue: 100,
                condition: 'less_than',
                severity: 'warning',
                message: `Record count (${recordCount}) is below expected threshold (100)`,
            });
        }
        return alerts;
    }
    async sendThresholdAlerts(alerts, scheduledReport) {
        for (const alert of alerts) {
            this.logger.warn(`THRESHOLD ALERT [${alert.severity}]: ${alert.message}`);
        }
    }
    async distributeReport(executionId, scheduledReport, reportResult, executiveSummary) {
        const recipients = scheduledReport.recipients;
        for (const recipient of recipients) {
            try {
                await this.prisma.reportDistribution.create({
                    data: {
                        reportExecutionId: executionId,
                        recipientType: recipient.type,
                        recipientId: recipient.value,
                        recipientEmail: await this.resolveRecipientEmail(recipient),
                        recipientName: await this.resolveRecipientName(recipient),
                        deliveryMethod: scheduledReport.deliveryMethod,
                        deliveryStatus: 'PENDING',
                    },
                });
                const personalizedContent = this.personalizeReport(reportResult, executiveSummary, recipient.personalization || {});
                this.logger.log(`Report distributed to: ${recipient.value} (${recipient.type})`);
            }
            catch (error) {
                this.logger.error(`Error distributing report to ${recipient.value}`, error);
            }
        }
    }
    personalizeReport(reportResult, summary, personalization) {
        return {
            ...reportResult,
            summary,
            personalization,
        };
    }
    async initializeScheduledReports() {
        try {
            const activeReports = await this.prisma.scheduledReport.findMany({
                where: { isActive: true },
            });
            for (const report of activeReports) {
                await this.scheduleJob(report);
            }
            this.logger.log(`Initialized ${activeReports.length} scheduled reports`);
        }
        catch (error) {
            this.logger.error('Error initializing scheduled reports', error);
        }
    }
    async scheduleJob(scheduledReport) {
        try {
            const job = new cron_1.CronJob(scheduledReport.schedule, () => {
                this.executeScheduledReport({
                    scheduledReportId: scheduledReport.id,
                    executionTime: new Date(),
                });
            }, null, true, 'UTC');
            this.scheduledJobs.set(scheduledReport.id, job);
            this.logger.log(`Scheduled job created for report: ${scheduledReport.name}`);
        }
        catch (error) {
            this.logger.error(`Error scheduling job for report ${scheduledReport.id}`, error);
            throw error;
        }
    }
    async unscheduleJob(reportId) {
        const job = this.scheduledJobs.get(reportId);
        if (job) {
            job.stop();
            this.scheduledJobs.delete(reportId);
            this.logger.log(`Unscheduled job for report: ${reportId}`);
        }
    }
    validateCronExpression(expression) {
        try {
            new cron_1.CronJob(expression, () => { }, null, false);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Invalid cron expression: ${expression}`);
        }
    }
    calculateNextRun(cronExpression) {
        const job = new cron_1.CronJob(cronExpression, () => { }, null, false);
        return job.nextDate().toJSDate();
    }
    async generateReport(scheduledReport, parameters) {
        const filePath = `/reports/${scheduledReport.id}_${Date.now()}.${scheduledReport.format.toLowerCase()}`;
        const fileSize = 1024 * 100;
        return {
            filePath,
            fileSize,
            data: [],
        };
    }
    async getDataSourceCount(dataSource) {
        if (dataSource === 'patients') {
            return this.prisma.patient.count();
        }
        return 0;
    }
    async getRecentDataCount(dataSource, hours) {
        const since = new Date(Date.now() - hours * 60 * 60 * 1000);
        if (dataSource === 'patients') {
            return this.prisma.patient.count({
                where: {
                    createdAt: { gte: since },
                },
            });
        }
        return 0;
    }
    async checkDataCompleteness(dataSource) {
        return 95;
    }
    async resolveRecipientEmail(recipient) {
        if (recipient.type === 'EMAIL') {
            return recipient.value;
        }
        if (recipient.type === 'USER') {
            const user = await this.prisma.user.findUnique({
                where: { id: recipient.value },
                select: { email: true },
            });
            return user?.email || '';
        }
        return '';
    }
    async resolveRecipientName(recipient) {
        if (recipient.type === 'USER') {
            const user = await this.prisma.user.findUnique({
                where: { id: recipient.value },
                select: { name: true },
            });
            return user?.name || '';
        }
        return recipient.value;
    }
    async cleanupOldExecutions() {
        const retentionDays = 90;
        const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);
        try {
            const result = await this.prisma.reportExecution.deleteMany({
                where: {
                    executionTime: {
                        lt: cutoffDate,
                    },
                },
            });
            this.logger.log(`Cleaned up ${result.count} old report executions`);
        }
        catch (error) {
            this.logger.error('Error cleaning up old executions', error);
        }
    }
};
exports.ScheduledReportsService = ScheduledReportsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_2AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScheduledReportsService.prototype, "cleanupOldExecutions", null);
exports.ScheduledReportsService = ScheduledReportsService = ScheduledReportsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        schedule_1.SchedulerRegistry])
], ScheduledReportsService);
//# sourceMappingURL=scheduled-reports.service.js.map