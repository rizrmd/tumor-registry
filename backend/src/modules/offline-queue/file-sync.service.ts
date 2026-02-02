import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '@/common/database/prisma.service';
import { RemotePrismaService } from '@/database/remote-prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import FormData from 'form-data';

export interface FileSyncJob {
  id: string;
  entityType: 'medical-image' | 'clinical-photo' | 'pathology-report' | 'document';
  entityId: string;
  filePath: string;
  remoteUrl?: string;
  operation: 'UPLOAD' | 'DOWNLOAD';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  retryCount: number;
  maxRetries: number;
  errorMessage?: string;
  checksum?: string;
  fileSize?: number;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SyncStats {
  dataSync: {
    pending: number;
    processing: number;
    synced: number;
    failed: number;
    conflict: number;
    lastSyncAt?: Date;
  };
  fileSync: {
    pending: number;
    inProgress: number;
    completed: number;
    failed: number;
    totalSize: number;
    currentFile?: string;
    currentProgress: number;
  };
  isOnline: boolean;
  lastCheckAt: Date;
}

@Injectable()
export class FileSyncService {
  private readonly logger = new Logger(FileSyncService.name);
  private readonly uploadDir: string;
  private readonly maxFileSize = 100 * 1024 * 1024; // 100MB
  private readonly jobQueue: Map<string, FileSyncJob> = new Map();
  private isProcessing = false;
  private lastSyncStats: Partial<SyncStats> = {};

  constructor(
    private prisma: PrismaService,
    private remotePrismaService: RemotePrismaService,
  ) {
    this.uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
    this.ensureUploadDirExists();
  }

  // Getter to cast RemotePrismaService to PrismaClient for type compatibility
  private get remotePrisma(): PrismaClient {
    return this.remotePrismaService as unknown as PrismaClient;
  }

  private ensureUploadDirExists() {
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

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private async calculateChecksum(filePath: string): Promise<string | null> {
    try {
      const crypto = await import('crypto');
      const fileBuffer = fs.readFileSync(filePath);
      return crypto.createHash('sha256').update(fileBuffer).digest('hex');
    } catch (error) {
      return null;
    }
  }

  /**
   * Queue a file for sync
   */
  async queueFile(
    entityType: FileSyncJob['entityType'],
    entityId: string,
    filePath: string,
    operation: 'UPLOAD' | 'DOWNLOAD' = 'UPLOAD',
    remoteUrl?: string,
    fileSize?: number,
  ): Promise<FileSyncJob> {
    // Check if already queued
    const existing = Array.from(this.jobQueue.values()).find(
      job => job.entityId === entityId && job.operation === operation && 
             ['PENDING', 'IN_PROGRESS'].includes(job.status)
    );
    
    if (existing) {
      return existing;
    }

    const job: FileSyncJob = {
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

  /**
   * Queue files for sync based on database records
   */
  async queueFilesForSync(entityType: string, since: Date): Promise<number> {
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
    } catch (error) {
      this.logger.error(`Error queuing files for ${entityType}:`, error);
      return 0;
    }
  }

  private async queueMedicalImages(since: Date): Promise<number> {
    // Queue local files for upload
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

  private async queueClinicalPhotos(since: Date): Promise<number> {
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

  /**
   * Queue files for download from remote server
   */
  async queueFilesForDownload(): Promise<number> {
    let queuedCount = 0;

    try {
      // Check if remote is available
      if (!(await this.remotePrismaService.checkConnection())) {
        this.logger.log('Remote unavailable - skipping download queue');
        return 0;
      }

      // Get remote medical images that don't exist locally
      const remoteImages = await this.remotePrisma.medicalImage.findMany({
        where: {
          isDeleted: false,
        },
        take: 100,
      });

      for (const remoteImage of remoteImages) {
        // Check if already exists locally
        const localExists = await this.prisma.medicalImage.findUnique({
          where: { id: remoteImage.id },
        });

        if (!localExists && remoteImage.filePath) {
          const localPath = path.join(this.uploadDir, 'medical-imaging', path.basename(remoteImage.filePath));
          
          if (!fs.existsSync(localPath)) {
            await this.queueFile(
              'medical-image',
              remoteImage.id,
              localPath,
              'DOWNLOAD',
              remoteImage.filePath,
              Number(remoteImage.fileSize),
            );
            queuedCount++;
          }
        }
      }

      // Get remote clinical photos
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
            await this.queueFile(
              'clinical-photo',
              remotePhoto.id,
              localPath,
              'DOWNLOAD',
              remotePhoto.fileUrl,
              remotePhoto.fileSize || undefined,
            );
            queuedCount++;
          }
        }
      }

      this.logger.log(`Queued ${queuedCount} files for download`);
      return queuedCount;
    } catch (error) {
      this.logger.error('Error queueing files for download:', error);
      return 0;
    }
  }

  /**
   * Process all pending file sync jobs
   */
  async processPendingFileSyncs(): Promise<{
    processed: number;
    succeeded: number;
    failed: number;
  }> {
    const results = { processed: 0, succeeded: 0, failed: 0 };

    if (this.isProcessing) {
      this.logger.log('File sync already in progress');
      return results;
    }

    // Check if remote is available
    if (!(await this.remotePrismaService.checkConnection())) {
      this.logger.log('Remote unavailable - skipping file sync');
      return results;
    }

    this.isProcessing = true;

    try {
      // First, queue any new downloads
      await this.queueFilesForDownload();

      const pendingJobs = Array.from(this.jobQueue.values()).filter(
        job => job.status === 'PENDING' && job.retryCount < job.maxRetries
      );

      for (const job of pendingJobs) {
        results.processed++;

        try {
          await this.processFileSyncJob(job);
          results.succeeded++;
        } catch (error: any) {
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
    } catch (error) {
      this.logger.error('Error processing file syncs:', error);
      return results;
    } finally {
      this.isProcessing = false;
    }
  }

  private async processFileSyncJob(job: FileSyncJob): Promise<void> {
    job.status = 'IN_PROGRESS';
    job.updatedAt = new Date();
    this.jobQueue.set(job.id, job);

    if (job.operation === 'UPLOAD') {
      await this.uploadFileToRemote(job);
    } else if (job.operation === 'DOWNLOAD') {
      await this.downloadFileFromRemote(job);
    }

    job.status = 'COMPLETED';
    job.progress = 100;
    job.updatedAt = new Date();
    this.jobQueue.set(job.id, job);

    // Remove from queue after some time (keep completed for 1 hour)
    setTimeout(() => {
      this.jobQueue.delete(job.id);
    }, 60 * 60 * 1000);
  }

  private async uploadFileToRemote(job: FileSyncJob): Promise<void> {
    if (!fs.existsSync(job.filePath)) {
      throw new Error(`File not found: ${job.filePath}`);
    }

    const stats = fs.statSync(job.filePath);
    if (stats.size > this.maxFileSize) {
      throw new Error(`File too large: ${stats.size} bytes (max: ${this.maxFileSize})`);
    }

    const formData = new FormData();
    formData.append('file', fs.createReadStream(job.filePath));
    formData.append('entityType', job.entityType);
    formData.append('entityId', job.entityId);
    formData.append('checksum', job.checksum || '');

    const remoteUrl = process.env.REMOTE_API_URL || 'http://localhost:3000';
    const response = await axios.post(
      `${remoteUrl}/api/v1/files/upload`,
      formData,
      {
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
      },
    );

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    this.logger.log(`File uploaded successfully: ${job.filePath}`);
  }

  private async downloadFileFromRemote(job: FileSyncJob): Promise<void> {
    if (!job.remoteUrl) {
      throw new Error('No remote URL provided for download');
    }

    // Ensure directory exists
    const dir = path.dirname(job.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const remoteUrl = process.env.REMOTE_API_URL || 'http://localhost:3000';
    const downloadUrl = job.remoteUrl.startsWith('http') 
      ? job.remoteUrl 
      : `${remoteUrl}${job.remoteUrl}`;

    const response = await axios.get(downloadUrl, {
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

    // Save file
    const writer = fs.createWriteStream(job.filePath);
    response.data.pipe(writer);

    await new Promise<void>((resolve, reject) => {
      writer.on('finish', () => resolve());
      writer.on('error', reject);
    });

    // Update database record with local path
    if (job.entityType === 'medical-image') {
      // Get remote record and create local copy
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
    } else if (job.entityType === 'clinical-photo') {
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

  /**
   * Get file sync statistics
   */
  getFileSyncStats(): {
    pending: number;
    inProgress: number;
    completed: number;
    failed: number;
    totalSize: number;
    currentFile?: string;
    currentProgress: number;
  } {
    const jobs = Array.from(this.jobQueue.values());
    
    const pending = jobs.filter(j => j.status === 'PENDING').length;
    const inProgress = jobs.filter(j => j.status === 'IN_PROGRESS').length;
    const completed = jobs.filter(j => j.status === 'COMPLETED').length;
    const failed = jobs.filter(j => j.status === 'FAILED').length;

    // Get current in-progress file
    const currentJob = jobs.find(j => j.status === 'IN_PROGRESS');

    // Calculate total size of pending files
    let totalSize = 0;
    for (const job of jobs.filter(j => j.status === 'PENDING' || j.status === 'IN_PROGRESS')) {
      if (job.fileSize) {
        totalSize += job.fileSize;
      } else {
        try {
          if (fs.existsSync(job.filePath)) {
            const stats = fs.statSync(job.filePath);
            totalSize += stats.size;
          }
        } catch (error) {
          // Ignore file stat errors
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

  /**
   * Get current sync status for frontend
   */
  async getSyncStatus(): Promise<SyncStats> {
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

  /**
   * Get pending file sync jobs
   */
  getPendingJobs(limit?: number): FileSyncJob[] {
    const jobs = Array.from(this.jobQueue.values())
      .filter(job => ['PENDING', 'FAILED', 'IN_PROGRESS'].includes(job.status))
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    return limit ? jobs.slice(0, limit) : jobs;
  }

  /**
   * Clear completed and failed jobs older than specified minutes
   */
  cleanupOldJobs(minutes: number = 60): number {
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
}
