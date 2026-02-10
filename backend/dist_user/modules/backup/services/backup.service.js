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
var BackupService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
const database_backup_strategy_1 = require("../strategies/database-backup.strategy");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
let BackupService = BackupService_1 = class BackupService {
    constructor(prisma, databaseBackupStrategy) {
        this.prisma = prisma;
        this.databaseBackupStrategy = databaseBackupStrategy;
        this.logger = new common_1.Logger(BackupService_1.name);
        this.scheduledJobs = new Map();
        this.initializeScheduledBackups();
    }
    async createBackupJob(createBackupJobDto) {
        try {
            await this.validateStorageLocation(createBackupJobDto.storageLocation);
            const backupJob = await this.prisma.backupJob.create({
                data: {
                    ...createBackupJobDto,
                    estimatedSize: BigInt(0),
                },
            });
            if (createBackupJobDto.schedule && createBackupJobDto.isActive) {
                this.scheduleBackupJob(backupJob);
            }
            this.logger.log(`Backup job created: ${backupJob.name}`);
            return backupJob;
        }
        catch (error) {
            this.logger.error('Error creating backup job', error);
            throw error;
        }
    }
    async executeBackup(backupJobId) {
        try {
            const backupJob = await this.prisma.backupJob.findUnique({
                where: { id: backupJobId },
            });
            if (!backupJob) {
                throw new common_1.NotFoundException('Backup job not found');
            }
            if (!backupJob.isActive) {
                throw new common_1.BadRequestException('Backup job is not active');
            }
            const execution = await this.prisma.backupExecution.create({
                data: {
                    backupJobId,
                    status: 'RUNNING',
                    startTime: new Date(),
                    retryCount: 0,
                },
            });
            const outputPath = this.generateBackupFilePath(backupJob, execution.id);
            let executionResult;
            if (backupJob.dataSource.startsWith('database:')) {
                executionResult = await this.databaseBackupStrategy.executeBackup(backupJob.dataSource, outputPath, backupJob.backupOptions);
            }
            else {
                throw new common_1.BadRequestException(`Unsupported data source: ${backupJob.dataSource}`);
            }
            const updatedExecution = await this.prisma.backupExecution.update({
                where: { id: execution.id },
                data: {
                    status: executionResult.status,
                    endTime: executionResult.endTime,
                    duration: executionResult.duration,
                    fileSize: executionResult.fileSize || BigInt(0),
                    compressedSize: executionResult.compressedSize || BigInt(0),
                    filesCount: executionResult.filesCount || 0,
                    filePath: executionResult.filePath,
                    checksum: executionResult.checksum,
                    verificationPassed: executionResult.verificationPassed || false,
                    errorMessage: executionResult.errorMessage,
                },
            });
            await this.updateBackupJobStats(backupJobId, executionResult);
            this.scheduleCleanup(backupJob);
            this.logger.log(`Backup execution completed: ${execution.id}`);
            return updatedExecution;
        }
        catch (error) {
            this.logger.error(`Backup execution failed: ${backupJobId}`, error);
            throw error;
        }
    }
    async restoreFromBackup(executionId, options) {
        try {
            const execution = await this.prisma.backupExecution.findUnique({
                where: { id: executionId },
                include: {
                    backupJob: true,
                },
            });
            if (!execution) {
                throw new common_1.NotFoundException('Backup execution not found');
            }
            if (!execution.filePath) {
                throw new common_1.BadRequestException('No backup file available for restore');
            }
            if (!fs.existsSync(execution.filePath)) {
                throw new common_1.NotFoundException('Backup file not found on disk');
            }
            if (execution.checksum && options.verifyIntegrity !== false) {
                const isValid = await this.verifyBackupChecksum(execution.filePath, execution.checksum);
                if (!isValid) {
                    throw new common_1.BadRequestException('Backup file integrity check failed');
                }
            }
            let restoreResult;
            if (execution.backupJob.dataSource.startsWith('database:')) {
                restoreResult = await this.databaseBackupStrategy.restoreFromBackup(execution.filePath, options.targetDatabase || execution.backupJob.dataSource, options);
            }
            else {
                throw new common_1.BadRequestException(`Unsupported data source for restore: ${execution.backupJob.dataSource}`);
            }
            await this.logRestoreOperation(executionId, options, restoreResult);
            this.logger.log(`Restore completed for backup execution: ${executionId}`);
            return restoreResult;
        }
        catch (error) {
            this.logger.error(`Restore failed: ${executionId}`, error);
            throw error;
        }
    }
    async getBackupJobs(filters) {
        const where = {};
        if (filters?.backupType)
            where.backupType = filters.backupType;
        if (filters?.dataSource)
            where.dataSource = filters.dataSource;
        if (filters?.isActive !== undefined)
            where.isActive = filters.isActive;
        return this.prisma.backupJob.findMany({
            where,
            include: {
                _count: {
                    select: {
                        executions: true,
                    },
                },
                executions: {
                    where: {
                        executionTime: {
                            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                        },
                    },
                    orderBy: { executionTime: 'desc' },
                    take: 5,
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getBackupExecutions(filters) {
        const where = {};
        if (filters?.backupJobId)
            where.backupJobId = filters.backupJobId;
        if (filters?.status)
            where.status = filters.status;
        if (filters?.startDate || filters?.endDate) {
            where.executionTime = {};
            if (filters?.startDate)
                where.executionTime.gte = filters.startDate;
            if (filters?.endDate)
                where.executionTime.lte = filters.endDate;
        }
        return this.prisma.backupExecution.findMany({
            where,
            include: {
                backupJob: true,
            },
            orderBy: { executionTime: 'desc' },
            take: filters?.limit || 50,
        });
    }
    async getBackupStatistics(centerId) {
        const jobWhere = {};
        const executionWhere = {};
        const [totalJobs, activeJobs, completedBackups, failedBackups, storageUsed, typeDistribution,] = await Promise.all([
            this.prisma.backupJob.count({ where: jobWhere }),
            this.prisma.backupJob.count({ where: { ...jobWhere, isActive: true } }),
            this.prisma.backupExecution.count({
                where: { ...executionWhere, status: 'COMPLETED' },
            }),
            this.prisma.backupExecution.count({
                where: { ...executionWhere, status: 'FAILED' },
            }),
            this.calculateStorageUsed(centerId),
            this.prisma.backupJob.groupBy({
                by: ['backupType'],
                where: jobWhere,
                _count: { id: true },
            }),
        ]);
        const [averageBackupTime, lastBackupTime, nextScheduledBackup] = await Promise.all([
            this.calculateAverageBackupTime(centerId),
            this.getLastBackupTime(centerId),
            this.getNextScheduledBackup(centerId),
        ]);
        const storageDistribution = await this.getStorageDistribution(centerId);
        return {
            totalJobs,
            activeJobs,
            completedBackups,
            failedBackups,
            totalStorageUsed: storageUsed,
            averageBackupTime,
            successRate: completedBackups + failedBackups > 0
                ? Math.round((completedBackups / (completedBackups + failedBackups)) * 100)
                : 100,
            lastBackupTime,
            nextScheduledBackup,
            storageDistribution,
            typeDistribution: typeDistribution.reduce((acc, item) => {
                acc[item.backupType] = item._count.id;
                return acc;
            }, {}),
        };
    }
    async getBackupHealthStatus(centerId) {
        const [lastSuccessfulBackup, failedCount, storageCapacity] = await Promise.all([
            this.getLastSuccessfulBackup(centerId),
            this.getFailedBackupCount(centerId),
            this.getStorageCapacity(),
        ]);
        const upcomingBackups = await this.getUpcomingBackups(centerId);
        const alerts = await this.generateBackupAlerts(lastSuccessfulBackup, failedCount, storageCapacity);
        let overall = 'HEALTHY';
        if (!lastSuccessfulBackup || (new Date().getTime() - lastSuccessfulBackup.getTime() > 48 * 60 * 60 * 1000)) {
            overall = 'CRITICAL';
        }
        else if (failedCount > 3 || storageCapacity.percentage > 80) {
            overall = 'WARNING';
        }
        return {
            overall,
            lastSuccessfulBackup,
            failedBackupCount: failedCount,
            storageCapacity,
            upcomingBackups,
            alerts,
        };
    }
    async deleteBackupExecution(executionId) {
        const execution = await this.prisma.backupExecution.findUnique({
            where: { id: executionId },
        });
        if (!execution) {
            throw new common_1.NotFoundException('Backup execution not found');
        }
        if (execution.filePath && fs.existsSync(execution.filePath)) {
            try {
                fs.unlinkSync(execution.filePath);
                this.logger.log(`Deleted backup file: ${execution.filePath}`);
            }
            catch (error) {
                this.logger.warn(`Failed to delete backup file: ${error.message}`);
            }
        }
        await this.prisma.backupExecution.delete({
            where: { id: executionId },
        });
        this.logger.log(`Backup execution deleted: ${executionId}`);
    }
    async deleteBackupJob(jobId) {
        const backupJob = await this.prisma.backupJob.findUnique({
            where: { id: jobId },
            include: {
                executions: true,
            },
        });
        if (!backupJob) {
            throw new common_1.NotFoundException('Backup job not found');
        }
        for (const execution of backupJob.executions) {
            if (execution.filePath && fs.existsSync(execution.filePath)) {
                try {
                    fs.unlinkSync(execution.filePath);
                }
                catch (error) {
                    this.logger.warn(`Failed to delete backup file: ${error.message}`);
                }
            }
        }
        if (this.scheduledJobs.has(jobId)) {
            this.scheduledJobs.get(jobId)?.stop();
            this.scheduledJobs.delete(jobId);
        }
        await this.prisma.backupJob.delete({
            where: { id: jobId },
        });
        this.logger.log(`Backup job deleted: ${jobId}`);
    }
    async initializeScheduledBackups() {
        const scheduledBackupJobs = await this.prisma.backupJob.findMany({
            where: { isActive: true, schedule: { not: null } },
        });
        for (const backupJob of scheduledBackupJobs) {
            this.scheduleBackupJob(backupJob);
        }
    }
    scheduleBackupJob(backupJob) {
        if (!backupJob.schedule || this.scheduledJobs.has(backupJob.id)) {
            return;
        }
        try {
            const task = cron.schedule(backupJob.schedule, () => {
                this.executeBackup(backupJob.id).catch(error => {
                    this.logger.error(`Scheduled backup failed: ${backupJob.name}`, error);
                });
            }, {
                timezone: 'UTC',
            });
            this.scheduledJobs.set(backupJob.id, task);
            this.logger.log(`Backup job scheduled: ${backupJob.name} (${backupJob.schedule})`);
        }
        catch (error) {
            this.logger.error(`Failed to schedule backup job: ${backupJob.name}`, error);
        }
    }
    generateBackupFilePath(backupJob, executionId) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${backupJob.name}_${timestamp}_${executionId}`;
        const baseDir = process.env.BACKUP_STORAGE_PATH || './backups';
        const subDir = backupJob.backupType;
        const outputDir = path.join(baseDir, subDir);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        let extension = '.backup';
        if (backupJob.backupType.includes('DATABASE')) {
            extension = backupJob.compression ? '.sql.gz' : '.sql';
        }
        return path.join(outputDir, `${filename}${extension}`);
    }
    async validateStorageLocation(storageLocation) {
        if (!storageLocation) {
            throw new common_1.BadRequestException('Storage location is required');
        }
        if (storageLocation.startsWith('local:') || storageLocation.startsWith('/')) {
            const storagePath = storageLocation.replace('local:', '');
            try {
                if (!fs.existsSync(storagePath)) {
                    fs.mkdirSync(storagePath, { recursive: true });
                }
                const testFile = path.join(storagePath, '.backup_test');
                fs.writeFileSync(testFile, 'test');
                fs.unlinkSync(testFile);
            }
            catch (error) {
                throw new common_1.BadRequestException(`Storage location is not accessible: ${error.message}`);
            }
        }
    }
    async verifyBackupChecksum(filePath, expectedChecksum) {
        try {
            const crypto = require('crypto');
            const hash = crypto.createHash('sha256');
            const stream = fs.createReadStream(filePath);
            return new Promise((resolve, reject) => {
                stream.on('data', (data) => hash.update(data));
                stream.on('end', () => {
                    const actualChecksum = hash.digest('hex');
                    resolve(actualChecksum === expectedChecksum);
                });
                stream.on('error', reject);
            });
        }
        catch (error) {
            this.logger.error('Error verifying backup integrity', error);
            return false;
        }
    }
    async updateBackupJobStats(backupJobId, execution) {
        const stats = execution.status === 'COMPLETED'
            ? { successCount: { increment: 1 }, totalSize: { increment: execution.fileSize || BigInt(0) } }
            : { failureCount: { increment: 1 } };
        await this.prisma.backupJob.update({
            where: { id: backupJobId },
            data: {
                ...stats,
                lastBackup: execution.endTime,
            },
        });
    }
    async logRestoreOperation(executionId, options, result) {
        this.logger.log(`Restore operation logged for execution: ${executionId}, success: ${result.success}`);
    }
    async scheduleCleanup(backupJob) {
    }
    async calculateStorageUsed(centerId) {
        const executions = await this.prisma.backupExecution.findMany({
            where: {
                status: 'COMPLETED',
                fileSize: { not: null },
            },
            select: { fileSize: true },
        });
        return executions.reduce((total, exec) => total + (exec.fileSize || BigInt(0)), BigInt(0));
    }
    async calculateAverageBackupTime(centerId) {
        const executions = await this.prisma.backupExecution.findMany({
            where: {
                status: 'COMPLETED',
                duration: { not: null },
                executionTime: {
                    gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                },
            },
            select: { duration: true },
        });
        if (executions.length === 0)
            return 0;
        const totalDuration = executions.reduce((sum, exec) => sum + (exec.duration || 0), 0);
        return Math.round(totalDuration / executions.length / 1000);
    }
    async getLastBackupTime(centerId) {
        const lastBackup = await this.prisma.backupExecution.findFirst({
            where: {
                status: 'COMPLETED',
            },
            orderBy: { executionTime: 'desc' },
            select: { executionTime: true },
        });
        return lastBackup?.executionTime || null;
    }
    async getNextScheduledBackup(centerId) {
        const nextBackup = await this.prisma.backupJob.findFirst({
            where: {
                isActive: true,
                nextBackup: { not: null },
            },
            orderBy: { nextBackup: 'asc' },
            select: { nextBackup: true },
        });
        return nextBackup?.nextBackup || null;
    }
    async getStorageDistribution(centerId) {
        const jobs = await this.prisma.backupJob.groupBy({
            by: ['storageLocation'],
            _sum: { totalSize: true },
        });
        return jobs.reduce((acc, job) => {
            acc[job.storageLocation] = job._sum.totalSize || BigInt(0);
            return acc;
        }, {});
    }
    async getFailedBackupCount(centerId) {
        return this.prisma.backupExecution.count({
            where: {
                status: 'FAILED',
                executionTime: {
                    gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                },
            },
        });
    }
    async getLastSuccessfulBackup(centerId) {
        const lastSuccess = await this.prisma.backupExecution.findFirst({
            where: {
                status: 'COMPLETED',
            },
            orderBy: { executionTime: 'desc' },
            select: { executionTime: true },
        });
        return lastSuccess?.executionTime || null;
    }
    async getStorageCapacity() {
        return {
            used: BigInt(1024 * 1024 * 1024 * 100),
            total: BigInt(1024 * 1024 * 1024 * 500),
            percentage: 20,
        };
    }
    async getUpcomingBackups(centerId) {
        const upcoming = await this.prisma.backupJob.findMany({
            where: {
                isActive: true,
                nextBackup: {
                    gte: new Date(),
                    lte: new Date(Date.now() + 24 * 60 * 60 * 1000),
                },
            },
            select: {
                id: true,
                name: true,
                nextBackup: true,
                backupType: true,
                estimatedSize: true,
            },
            orderBy: { nextBackup: 'asc' },
            take: 10,
        });
        return upcoming.map(job => ({
            jobId: job.id,
            jobName: job.name,
            scheduledTime: job.nextBackup,
            estimatedDuration: this.estimateBackupDuration(job.backupType, job.estimatedSize || BigInt(0)),
        }));
    }
    async generateBackupAlerts(lastSuccessfulBackup, failedCount, storageCapacity) {
        const alerts = [];
        if (!lastSuccessfulBackup || (new Date().getTime() - lastSuccessfulBackup.getTime() > 48 * 60 * 60 * 1000)) {
            alerts.push({
                type: 'BACKUP_FAILURE',
                message: 'No successful backup in the last 48 hours',
                severity: 'CRITICAL',
            });
        }
        if (failedCount > 5) {
            alerts.push({
                type: 'BACKUP_FAILURE',
                message: `High number of failed backups: ${failedCount} in the last 7 days`,
                severity: 'HIGH',
            });
        }
        if (storageCapacity.percentage > 90) {
            alerts.push({
                type: 'STORAGE_FULL',
                message: `Storage capacity critically low: ${storageCapacity.percentage}% used`,
                severity: 'CRITICAL',
            });
        }
        else if (storageCapacity.percentage > 75) {
            alerts.push({
                type: 'STORAGE_FULL',
                message: `Storage capacity running low: ${storageCapacity.percentage}% used`,
                severity: 'MEDIUM',
            });
        }
        return alerts;
    }
    estimateBackupDuration(backupType, estimatedSize) {
        const sizeInGB = Number(estimatedSize) / (1024 * 1024 * 1024);
        switch (backupType) {
            case 'FULL':
                return Math.max(300, sizeInGB * 60);
            case 'INCREMENTAL':
                return Math.max(60, sizeInGB * 10);
            case 'DIFFERENTIAL':
                return Math.max(120, sizeInGB * 30);
            default:
                return 300;
        }
    }
    async performCleanup(options) {
        this.logger.log(`Performing cleanup with options: ${JSON.stringify(options)}`);
        const retentionDays = options.retentionDays || 30;
        const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);
        const where = {
            executionTime: { lt: cutoffDate },
            status: 'COMPLETED',
        };
        if (options.backupJobId)
            where.backupJobId = options.backupJobId;
        const executions = await this.prisma.backupExecution.findMany({
            where,
            include: { backupJob: true },
        });
        if (options.dryRun) {
            return {
                deletedBackups: executions.length,
                freedSpace: executions.reduce((sum, exec) => sum + (exec.fileSize || BigInt(0)), BigInt(0)),
                errors: [],
                deletedFiles: executions.map(e => e.filePath).filter(Boolean),
            };
        }
        let deletedBackups = 0;
        let freedSpace = BigInt(0);
        const errors = [];
        const deletedFiles = [];
        for (const execution of executions) {
            try {
                if (execution.filePath && fs.existsSync(execution.filePath)) {
                    fs.unlinkSync(execution.filePath);
                    deletedFiles.push(execution.filePath);
                    freedSpace += execution.fileSize || BigInt(0);
                }
                await this.prisma.backupExecution.delete({
                    where: { id: execution.id },
                });
                deletedBackups++;
            }
            catch (error) {
                errors.push(`Failed to delete execution ${execution.id}: ${error.message}`);
            }
        }
        return {
            deletedBackups,
            freedSpace,
            errors,
            deletedFiles,
        };
    }
    async getStorageUsage(centerId) {
        const storageUsed = await this.calculateStorageUsed(centerId);
        const storageDistribution = await this.getStorageDistribution(centerId);
        return {
            totalUsed: storageUsed,
            byLocation: storageDistribution,
            capacity: await this.getStorageCapacity(),
        };
    }
    async getRetentionPolicy(centerId) {
        return {
            dailyBackups: 7,
            weeklyBackups: 4,
            monthlyBackups: 12,
            yearlyBackups: 5,
        };
    }
    async getRestoreHistory(filters) {
        this.logger.log(`Getting restore history with filters: ${JSON.stringify(filters)}`);
        return [];
    }
    async verifyBackupIntegrity(executionId) {
        const execution = await this.prisma.backupExecution.findUnique({
            where: { id: executionId },
        });
        if (!execution) {
            throw new common_1.NotFoundException('Backup execution not found');
        }
        if (!execution.filePath || !fs.existsSync(execution.filePath)) {
            throw new common_1.NotFoundException('Backup file not found');
        }
        const isValid = await this.verifyBackupChecksum(execution.filePath, execution.checksum || '');
        await this.prisma.backupExecution.update({
            where: { id: executionId },
            data: { verificationPassed: isValid },
        });
        return {
            executionId,
            valid: isValid,
            checksum: execution.checksum,
            filePath: execution.filePath,
        };
    }
    async createBackupTemplate(templateData) {
        this.logger.log(`Creating backup template: ${templateData.name}`);
        return {
            id: 'template-' + Date.now(),
            ...templateData,
            createdAt: new Date(),
        };
    }
    async testStorageConnection(jobId) {
        const backupJob = await this.prisma.backupJob.findUnique({
            where: { id: jobId },
        });
        if (!backupJob) {
            throw new common_1.NotFoundException('Backup job not found');
        }
        try {
            await this.validateStorageLocation(backupJob.storageLocation);
            return {
                success: true,
                message: 'Storage connection successful',
                location: backupJob.storageLocation,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Storage connection failed: ${error.message}`,
                location: backupJob.storageLocation,
            };
        }
    }
    async getBackupAlerts(options) {
        const healthStatus = await this.getBackupHealthStatus();
        let alerts = healthStatus.alerts;
        if (options.severity) {
            alerts = alerts.filter(alert => alert.severity === options.severity);
        }
        if (options.limit) {
            alerts = alerts.slice(0, options.limit);
        }
        return alerts;
    }
    async rescheduleBackupJob(jobId, rescheduleData) {
        const backupJob = await this.prisma.backupJob.findUnique({
            where: { id: jobId },
        });
        if (!backupJob) {
            throw new common_1.NotFoundException('Backup job not found');
        }
        if (this.scheduledJobs.has(jobId)) {
            this.scheduledJobs.get(jobId)?.stop();
            this.scheduledJobs.delete(jobId);
        }
        const updatedJob = await this.prisma.backupJob.update({
            where: { id: jobId },
            data: { schedule: rescheduleData.schedule },
        });
        this.scheduleBackupJob(updatedJob);
        return updatedJob;
    }
};
exports.BackupService = BackupService;
exports.BackupService = BackupService = BackupService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        database_backup_strategy_1.DatabaseBackupStrategy])
], BackupService);
//# sourceMappingURL=backup.service.js.map