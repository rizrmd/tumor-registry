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
var FileSyncService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSyncService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("@/database/prisma.service");
const remote_prisma_service_1 = require("@/database/remote-prisma.service");
const fs = require("fs");
const path = require("path");
const axios_1 = require("axios");
const form_data_1 = require("form-data");
let FileSyncService = FileSyncService_1 = class FileSyncService {
    constructor(prisma, remotePrismaService) {
        this.prisma = prisma;
        this.remotePrismaService = remotePrismaService;
        this.logger = new common_1.Logger(FileSyncService_1.name);
        this.maxFileSize = 100 * 1024 * 1024;
        this.jobQueue = new Map();
        this.isProcessing = false;
        this.lastSyncStats = {};
        this.uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
        this.ensureUploadDirExists();
    }
    get remotePrisma() {
        return this.remotePrismaService;
    }
    ensureUploadDirExists() {
        const dirs = [
            this.uploadDir,
            path.join(this.uploadDir, 'clinical-photos'),
            path.join(this.uploadDir, 'medical-imaging'),
            path.join(this.uploadDir, 'pathology'),
            path.join(this.uploadDir, 'documents'),
            path.join(this.uploadDir, 'temp'),
        ];
        for (const dir of dirs) {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        }
    }
    generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    async calculateChecksum(filePath) {
        try {
            const crypto = await Promise.resolve().then(() => require('crypto'));
            const fileBuffer = fs.readFileSync(filePath);
            return crypto.createHash('sha256').update(fileBuffer).digest('hex');
        }
        catch (error) {
            return null;
        }
    }
    async queueFile(entityType, entityId, filePath, operation = 'UPLOAD', remoteUrl, fileSize) {
        const existing = Array.from(this.jobQueue.values()).find(job => job.entityId === entityId && job.operation === operation &&
            ['PENDING', 'IN_PROGRESS'].includes(job.status));
        if (existing) {
            return existing;
        }
        const job = {
            id: this.generateId(),
            entityType,
            entityId,
            filePath,
            remoteUrl,
            operation,
            status: 'PENDING',
            retryCount: 0,
            maxRetries: 3,
            fileSize,
            progress: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            checksum: operation === 'UPLOAD' ? await this.calculateChecksum(filePath) : undefined,
        };
        this.jobQueue.set(job.id, job);
        this.logger.log(`File queued for ${operation}: ${filePath}`);
        return job;
    }
    async queueFilesForSync(entityType, since) {
        let queuedCount = 0;
        try {
            switch (entityType) {
                case 'medical-image':
                    queuedCount += await this.queueMedicalImages(since);
                    break;
                case 'clinical-photo':
                    queuedCount += await this.queueClinicalPhotos(since);
                    break;
            }
            return queuedCount;
        }
        catch (error) {
            this.logger.error(`Error queuing files for ${entityType}:`, error);
            return 0;
        }
    }
    async queueMedicalImages(since) {
        const images = await this.prisma.medicalImage.findMany({
            where: {
                updatedAt: { gt: since },
                isDeleted: false,
            },
        });
        let count = 0;
        for (const image of images) {
            if (image.filePath && fs.existsSync(image.filePath)) {
                await this.queueFile('medical-image', image.id, image.filePath, 'UPLOAD');
                count++;
            }
        }
        return count;
    }
    async queueClinicalPhotos(since) {
        const photos = await this.prisma.clinicalPhoto.findMany({
            where: {
                updatedAt: { gt: since },
            },
        });
        let count = 0;
        for (const photo of photos) {
            if (photo.fileUrl && fs.existsSync(photo.fileUrl)) {
                await this.queueFile('clinical-photo', photo.id, photo.fileUrl, 'UPLOAD');
                count++;
            }
        }
        return count;
    }
    async queueFilesForDownload() {
        let queuedCount = 0;
        try {
            if (!(await this.remotePrismaService.checkConnection())) {
                this.logger.log('Remote unavailable - skipping download queue');
                return 0;
            }
            const remoteImages = await this.remotePrisma.medicalImage.findMany({
                where: {
                    isDeleted: false,
                },
                take: 100,
            });
            for (const remoteImage of remoteImages) {
                const localExists = await this.prisma.medicalImage.findUnique({
                    where: { id: remoteImage.id },
                });
                if (!localExists && remoteImage.filePath) {
                    const localPath = path.join(this.uploadDir, 'medical-imaging', path.basename(remoteImage.filePath));
                    if (!fs.existsSync(localPath)) {
                        await this.queueFile('medical-image', remoteImage.id, localPath, 'DOWNLOAD', remoteImage.filePath, Number(remoteImage.fileSize));
                        queuedCount++;
                    }
                }
            }
            const remotePhotos = await this.remotePrisma.clinicalPhoto.findMany({
                take: 100,
            });
            for (const remotePhoto of remotePhotos) {
                const localExists = await this.prisma.clinicalPhoto.findUnique({
                    where: { id: remotePhoto.id },
                });
                if (!localExists && remotePhoto.fileUrl) {
                    const localPath = path.join(this.uploadDir, 'clinical-photos', path.basename(remotePhoto.fileUrl));
                    if (!fs.existsSync(localPath)) {
                        await this.queueFile('clinical-photo', remotePhoto.id, localPath, 'DOWNLOAD', remotePhoto.fileUrl, remotePhoto.fileSize || undefined);
                        queuedCount++;
                    }
                }
            }
            this.logger.log(`Queued ${queuedCount} files for download`);
            return queuedCount;
        }
        catch (error) {
            this.logger.error('Error queueing files for download:', error);
            return 0;
        }
    }
    async processPendingFileSyncs() {
        const results = { processed: 0, succeeded: 0, failed: 0 };
        if (this.isProcessing) {
            this.logger.log('File sync already in progress');
            return results;
        }
        if (!(await this.remotePrismaService.checkConnection())) {
            this.logger.log('Remote unavailable - skipping file sync');
            return results;
        }
        this.isProcessing = true;
        try {
            await this.queueFilesForDownload();
            const pendingJobs = Array.from(this.jobQueue.values()).filter(job => job.status === 'PENDING' && job.retryCount < job.maxRetries);
            for (const job of pendingJobs) {
                results.processed++;
                try {
                    await this.processFileSyncJob(job);
                    results.succeeded++;
                }
                catch (error) {
                    results.failed++;
                    this.logger.error(`File sync failed for job ${job.id}:`, error.message);
                    job.status = 'FAILED';
                    job.retryCount++;
                    job.errorMessage = error.message;
                    job.updatedAt = new Date();
                    this.jobQueue.set(job.id, job);
                }
            }
            this.lastSyncStats.fileSync = {
                ...this.getFileSyncStats(),
                currentProgress: 100,
            };
            return results;
        }
        catch (error) {
            this.logger.error('Error processing file syncs:', error);
            return results;
        }
        finally {
            this.isProcessing = false;
        }
    }
    async processFileSyncJob(job) {
        job.status = 'IN_PROGRESS';
        job.updatedAt = new Date();
        this.jobQueue.set(job.id, job);
        if (job.operation === 'UPLOAD') {
            await this.uploadFileToRemote(job);
        }
        else if (job.operation === 'DOWNLOAD') {
            await this.downloadFileFromRemote(job);
        }
        job.status = 'COMPLETED';
        job.progress = 100;
        job.updatedAt = new Date();
        this.jobQueue.set(job.id, job);
        setTimeout(() => {
            this.jobQueue.delete(job.id);
        }, 60 * 60 * 1000);
    }
    async uploadFileToRemote(job) {
        if (!fs.existsSync(job.filePath)) {
            throw new Error(`File not found: ${job.filePath}`);
        }
        const stats = fs.statSync(job.filePath);
        if (stats.size > this.maxFileSize) {
            throw new Error(`File too large: ${stats.size} bytes (max: ${this.maxFileSize})`);
        }
        const formData = new form_data_1.default();
        formData.append('file', fs.createReadStream(job.filePath));
        formData.append('entityType', job.entityType);
        formData.append('entityId', job.entityId);
        formData.append('checksum', job.checksum || '');
        const remoteUrl = process.env.REMOTE_API_URL || 'http://localhost:3000';
        const response = await axios_1.default.post(`${remoteUrl}/api/v1/files/upload`, formData, {
            headers: {
                ...formData.getHeaders(),
                'Authorization': `Bearer ${process.env.SYNC_TOKEN}`,
            },
            maxBodyLength: this.maxFileSize,
            maxContentLength: this.maxFileSize,
            timeout: 120000,
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    job.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    this.jobQueue.set(job.id, job);
                }
            },
        });
        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }
        this.logger.log(`File uploaded successfully: ${job.filePath}`);
    }
    async downloadFileFromRemote(job) {
        if (!job.remoteUrl) {
            throw new Error('No remote URL provided for download');
        }
        const dir = path.dirname(job.filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const remoteUrl = process.env.REMOTE_API_URL || 'http://localhost:3000';
        const downloadUrl = job.remoteUrl.startsWith('http')
            ? job.remoteUrl
            : `${remoteUrl}${job.remoteUrl}`;
        const response = await axios_1.default.get(downloadUrl, {
            responseType: 'stream',
            headers: {
                'Authorization': `Bearer ${process.env.SYNC_TOKEN}`,
            },
            timeout: 120000,
            onDownloadProgress: (progressEvent) => {
                if (job.fileSize && progressEvent.loaded) {
                    job.progress = Math.round((progressEvent.loaded * 100) / job.fileSize);
                    this.jobQueue.set(job.id, job);
                }
            },
        });
        const writer = fs.createWriteStream(job.filePath);
        response.data.pipe(writer);
        await new Promise((resolve, reject) => {
            writer.on('finish', () => resolve());
            writer.on('error', reject);
        });
        if (job.entityType === 'medical-image') {
            const remoteRecord = await this.remotePrisma.medicalImage.findUnique({
                where: { id: job.entityId },
            });
            if (remoteRecord) {
                await this.prisma.medicalImage.create({
                    data: {
                        ...remoteRecord,
                        filePath: job.filePath,
                    },
                });
            }
        }
        else if (job.entityType === 'clinical-photo') {
            const remoteRecord = await this.remotePrisma.clinicalPhoto.findUnique({
                where: { id: job.entityId },
            });
            if (remoteRecord) {
                await this.prisma.clinicalPhoto.create({
                    data: {
                        ...remoteRecord,
                        fileUrl: job.filePath,
                    },
                });
            }
        }
        this.logger.log(`File downloaded successfully: ${job.filePath}`);
    }
    getFileSyncStats() {
        const jobs = Array.from(this.jobQueue.values());
        const pending = jobs.filter(j => j.status === 'PENDING').length;
        const inProgress = jobs.filter(j => j.status === 'IN_PROGRESS').length;
        const completed = jobs.filter(j => j.status === 'COMPLETED').length;
        const failed = jobs.filter(j => j.status === 'FAILED').length;
        const currentJob = jobs.find(j => j.status === 'IN_PROGRESS');
        let totalSize = 0;
        for (const job of jobs.filter(j => j.status === 'PENDING' || j.status === 'IN_PROGRESS')) {
            if (job.fileSize) {
                totalSize += job.fileSize;
            }
            else {
                try {
                    if (fs.existsSync(job.filePath)) {
                        const stats = fs.statSync(job.filePath);
                        totalSize += stats.size;
                    }
                }
                catch (error) {
                }
            }
        }
        return {
            pending,
            inProgress,
            completed,
            failed,
            totalSize,
            currentFile: currentJob?.filePath,
            currentProgress: currentJob?.progress || 0,
        };
    }
    async getSyncStatus() {
        const isOnline = await this.remotePrismaService.checkConnection();
        const dataStats = await this.prisma.offlineDataQueue.groupBy({
            by: ['status'],
            _count: { status: true },
        });
        const dataSync = {
            pending: dataStats.find(s => s.status === 'PENDING')?._count?.status || 0,
            processing: dataStats.find(s => s.status === 'PROCESSING')?._count?.status || 0,
            synced: dataStats.find(s => s.status === 'SYNCED')?._count?.status || 0,
            failed: dataStats.find(s => s.status === 'FAILED')?._count?.status || 0,
            conflict: dataStats.find(s => s.status === 'CONFLICT')?._count?.status || 0,
        };
        return {
            dataSync,
            fileSync: this.getFileSyncStats(),
            isOnline,
            lastCheckAt: new Date(),
        };
    }
    getPendingJobs(limit) {
        const jobs = Array.from(this.jobQueue.values())
            .filter(job => ['PENDING', 'FAILED', 'IN_PROGRESS'].includes(job.status))
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        return limit ? jobs.slice(0, limit) : jobs;
    }
    cleanupOldJobs(minutes = 60) {
        const cutoffTime = new Date(Date.now() - minutes * 60 * 1000);
        let count = 0;
        for (const [id, job] of this.jobQueue.entries()) {
            if ((job.status === 'COMPLETED' || job.status === 'FAILED') &&
                job.updatedAt < cutoffTime) {
                this.jobQueue.delete(id);
                count++;
            }
        }
        return count;
    }
};
exports.FileSyncService = FileSyncService;
exports.FileSyncService = FileSyncService = FileSyncService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        remote_prisma_service_1.RemotePrismaService])
], FileSyncService);
//# sourceMappingURL=file-sync.service.js.map