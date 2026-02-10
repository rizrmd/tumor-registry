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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchRequestsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const sensitivity_scorer_1 = require("./helpers/sensitivity-scorer");
const patient_estimator_1 = require("./helpers/patient-estimator");
let ResearchRequestsService = class ResearchRequestsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const filterErrors = (0, patient_estimator_1.validateFilters)(dto.dataFilters);
        if (filterErrors.length > 0) {
            throw new common_1.BadRequestException(`Invalid filters: ${filterErrors.join(', ')}`);
        }
        const sensitivityScore = (0, sensitivity_scorer_1.calculateSensitivityScore)(dto.requestedDataFields);
        const autoApproval = (0, sensitivity_scorer_1.isAutoApprovalEligible)(dto.requestedDataFields, dto.irbStatus === 'APPROVED');
        const estimatedCount = await (0, patient_estimator_1.estimatePatientCount)(this.prisma, dto.dataFilters);
        const year = new Date().getFullYear();
        const count = await this.prisma.researchRequest.count({
            where: { requestNumber: { startsWith: `RR-${year}` } }
        });
        const requestNumber = `RR-${year}-${String(count + 1).padStart(3, '0')}`;
        const request = await this.prisma.researchRequest.create({
            data: {
                requestNumber,
                title: dto.title,
                description: dto.researchAbstract,
                researchAbstract: dto.researchAbstract,
                objectives: dto.objectives,
                researcherPhone: dto.researcherPhone,
                researcherInstitution: dto.researcherInstitution,
                studyType: dto.researchType,
                methodology: '',
                inclusionCriteria: '',
                exclusionCriteria: '',
                sampleSize: estimatedCount,
                duration: dto.accessDurationMonths,
                requiresEthicsApproval: dto.irbStatus !== 'APPROVED',
                dataRequested: JSON.stringify(dto.requestedDataFields),
                status: 'DRAFT',
                ethicsStatus: dto.irbStatus === 'APPROVED' ? 'APPROVED' : 'PENDING',
                ethicsApprovalNumber: dto.ethicsApprovalNumber,
                ethicsApprovalDate: dto.ethicsApprovalDate ? new Date(dto.ethicsApprovalDate) : null,
                priority: 'MEDIUM',
                requestedDataFields: dto.requestedDataFields,
                dataFilters: dto.dataFilters,
                estimatedPatientCount: estimatedCount,
                dataSensitivityScore: sensitivityScore,
                isAutoApprovalEligible: autoApproval,
                needsEthicsReview: dto.irbStatus !== 'APPROVED',
                irbCertificateUrl: dto.irbCertificateUrl,
                protocolUrl: dto.protocolUrl,
                proposalUrl: dto.proposalUrl,
                cvUrl: dto.cvUrl,
                agreementSigned: dto.agreementSigned,
                agreementDate: dto.agreementDate ? new Date(dto.agreementDate) : null,
                createdBy: userId,
                principalInvestigatorId: userId,
            },
            include: {
                creator: { select: { id: true, name: true, email: true } },
            },
        });
        await this.logActivity(request.id, userId, 'CREATED', null, 'DRAFT', 'Research request created');
        return request;
    }
    async update(id, userId, dto) {
        const request = await this.findOne(id, userId);
        if (!['DRAFT', 'NEED_MORE_INFO'].includes(request.status)) {
            throw new common_1.ForbiddenException('Can only update draft or requests needing more info');
        }
        let updates = { ...dto };
        if (dto.requestedDataFields) {
            const sensitivityScore = (0, sensitivity_scorer_1.calculateSensitivityScore)(dto.requestedDataFields);
            updates.dataSensitivityScore = sensitivityScore;
            updates.isAutoApprovalEligible = (0, sensitivity_scorer_1.isAutoApprovalEligible)(dto.requestedDataFields, request.ethicsStatus === 'APPROVED');
        }
        if (dto.dataFilters) {
            const estimatedCount = await (0, patient_estimator_1.estimatePatientCount)(this.prisma, dto.dataFilters);
            updates.estimatedPatientCount = estimatedCount;
        }
        const updated = await this.prisma.researchRequest.update({
            where: { id },
            data: updates,
            include: {
                creator: { select: { id: true, name: true, email: true } },
            },
        });
        await this.logActivity(id, userId, 'UPDATED', request.status, request.status, 'Research request updated');
        return updated;
    }
    async submit(id, userId) {
        const request = await this.findOne(id, userId);
        if (request.status !== 'DRAFT') {
            throw new common_1.BadRequestException('Can only submit draft requests');
        }
        if (!request.agreementSigned) {
            throw new common_1.BadRequestException('Data protection agreement must be signed before submission');
        }
        const updated = await this.prisma.researchRequest.update({
            where: { id },
            data: {
                status: 'SUBMITTED',
                submittedAt: new Date(),
            },
        });
        await this.logActivity(id, userId, 'SUBMITTED', 'DRAFT', 'SUBMITTED', 'Research request submitted for review');
        return updated;
    }
    async findAll(userId, filters) {
        return this.prisma.researchRequest.findMany({
            where: {
                createdBy: userId,
                ...filters,
            },
            include: {
                creator: { select: { id: true, name: true, email: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findPending() {
        return this.prisma.researchRequest.findMany({
            where: {
                status: { in: ['SUBMITTED', 'PENDING_REVIEW', 'UNDER_REVIEW'] },
            },
            include: {
                creator: { select: { id: true, name: true, email: true } },
                principalInvestigator: { select: { id: true, name: true, email: true } },
            },
            orderBy: [
                { priority: 'desc' },
                { submittedAt: 'asc' },
            ],
        });
    }
    async findOne(id, userId) {
        const request = await this.prisma.researchRequest.findUnique({
            where: { id },
            include: {
                creator: { select: { id: true, name: true, email: true } },
                principalInvestigator: { select: { id: true, name: true, email: true } },
                activities: {
                    include: { actor: { select: { name: true, email: true } } },
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
            },
        });
        if (!request) {
            throw new common_1.NotFoundException('Research request not found');
        }
        if (userId && request.createdBy !== userId) {
        }
        return request;
    }
    async approveOrReject(id, adminId, dto) {
        const request = await this.findOne(id);
        if (!['SUBMITTED', 'PENDING_REVIEW', 'UNDER_REVIEW'].includes(request.status)) {
            throw new common_1.BadRequestException('Request cannot be reviewed in current status');
        }
        let newStatus;
        let actionLog;
        switch (dto.decision) {
            case 'APPROVE':
                newStatus = 'APPROVED';
                actionLog = 'Research request approved';
                break;
            case 'APPROVE_WITH_CONDITIONS':
                newStatus = 'APPROVED_WITH_CONDITIONS';
                actionLog = `Research request approved with conditions: ${dto.conditions}`;
                break;
            case 'REJECT':
                newStatus = 'REJECTED';
                actionLog = `Research request rejected: ${dto.notes}`;
                break;
            case 'REQUEST_MORE_INFO':
                newStatus = 'NEED_MORE_INFO';
                actionLog = `More information requested: ${dto.notes}`;
                break;
            default:
                throw new common_1.BadRequestException('Invalid decision');
        }
        const updated = await this.prisma.researchRequest.update({
            where: { id },
            data: {
                status: newStatus,
                reviewedAt: new Date(),
                ...(dto.decision.includes('APPROVE') && {
                    approvedAt: new Date(),
                    expiresAt: new Date(Date.now() + (dto.reducedAccessDuration || request.duration) * 30 * 24 * 60 * 60 * 1000),
                }),
                ...(dto.decision === 'REJECT' && {
                    rejectedAt: new Date(),
                }),
                notes: dto.notes,
                requestApprovals: {
                    create: {
                        approverId: adminId,
                        approverRole: 'NATIONAL_ADMIN',
                        decision: dto.decision,
                        decisionDate: new Date(),
                        notes: dto.notes,
                        conditions: dto.conditions,
                        dataAccessLevel: dto.decision.includes('APPROVE') ? request.visibilityLevel : null,
                    }
                }
            },
        });
        await this.logActivity(id, adminId, dto.decision, request.status, newStatus, actionLog);
        return updated;
    }
    async remove(id, userId) {
        const request = await this.findOne(id, userId);
        if (request.status !== 'DRAFT') {
            throw new common_1.ForbiddenException('Can only delete draft requests');
        }
        await this.prisma.researchRequest.delete({ where: { id } });
        return { message: 'Research request deleted successfully' };
    }
    async generateDataExport(id, adminId) {
        const request = await this.prisma.researchRequest.findUnique({
            where: { id },
        });
        if (!request) {
            throw new common_1.NotFoundException('Research request not found');
        }
        if (!['APPROVED', 'APPROVED_WITH_CONDITIONS'].includes(request.status)) {
            throw new common_1.BadRequestException('Can only generate export for approved requests');
        }
        const { exportPatientData, convertToCSV } = await Promise.resolve().then(() => require('./helpers/data-exporter'));
        const includeIdentifiable = request.requestedDataFields?.['demographicsIdentifiable']?.selected || false;
        const exportedData = await exportPatientData(this.prisma, {
            requestedDataFields: request.requestedDataFields,
            dataFilters: request.dataFilters,
            includeIdentifiableData: includeIdentifiable,
            format: 'csv',
        });
        const csvContent = convertToCSV(exportedData);
        const csvSizeBytes = Buffer.from(csvContent).length;
        const exportFilename = `export_${request.requestNumber}_${Date.now()}.csv`;
        const exportUrl = `/exports/${exportFilename}`;
        const updated = await this.prisma.researchRequest.update({
            where: { id },
            data: {
                status: 'DATA_READY',
                dataExportGeneratedAt: new Date(),
                dataExportUrl: exportUrl,
                dataExportFileSize: csvSizeBytes,
            },
        });
        await this.logActivity(id, adminId, 'DATA_EXPORT_GENERATED', request.status, 'DATA_READY', `Data export generated: ${exportedData.totalCount} patients`);
        return {
            ...updated,
            exportedCount: exportedData.totalCount,
            exportedFields: exportedData.exportedFields,
            csvContent,
        };
    }
    async getDownloadUrl(id, userId) {
        const request = await this.prisma.researchRequest.findUnique({
            where: { id, createdBy: userId },
        });
        if (!request) {
            throw new common_1.NotFoundException('Research request not found');
        }
        if (request.status !== 'DATA_READY' && request.status !== 'ACTIVE') {
            throw new common_1.BadRequestException('Data export is not ready for download');
        }
        if (!request.dataExportUrl) {
            throw new common_1.BadRequestException('No export file available');
        }
        if (request.expiresAt && new Date() > new Date(request.expiresAt)) {
            await this.prisma.researchRequest.update({
                where: { id },
                data: { status: 'EXPIRED' },
            });
            throw new common_1.ForbiddenException('Access has expired');
        }
        await this.trackDownload(id, userId);
        return {
            downloadUrl: request.dataExportUrl,
            fileSize: request.dataExportFileSize,
            expiresAt: request.expiresAt,
            downloadCount: request.dataDownloadCount + 1,
        };
    }
    async trackDownload(id, userId) {
        const request = await this.prisma.researchRequest.findUnique({
            where: { id },
        });
        if (!request) {
            throw new common_1.NotFoundException('Research request not found');
        }
        const updated = await this.prisma.researchRequest.update({
            where: { id },
            data: {
                status: 'ACTIVE',
                dataDownloadedAt: new Date(),
                dataDownloadCount: { increment: 1 },
            },
        });
        await this.logActivity(id, userId, 'DATA_DOWNLOADED', request.status, 'ACTIVE', `Data downloaded (count: ${updated.dataDownloadCount})`);
        return updated;
    }
    async requestExtension(id, userId, extensionMonths, justification) {
        const request = await this.prisma.researchRequest.findUnique({
            where: { id, createdBy: userId },
        });
        if (!request) {
            throw new common_1.NotFoundException('Research request not found');
        }
        if (!['ACTIVE', 'EXPIRED'].includes(request.status)) {
            throw new common_1.BadRequestException('Can only request extension for active or expired access');
        }
        const extensionNote = {
            type: 'EXTENSION_REQUEST',
            requestedMonths: extensionMonths,
            justification,
            requestedAt: new Date(),
        };
        await this.prisma.researchRequest.update({
            where: { id },
            data: {
                status: 'UNDER_REVIEW',
                notes: JSON.stringify(extensionNote),
            },
        });
        await this.logActivity(id, userId, 'EXTENSION_REQUESTED', request.status, 'UNDER_REVIEW', `Extension requested: ${extensionMonths} months - ${justification}`);
        return { message: 'Extension request submitted successfully' };
    }
    async logActivity(requestId, actorId, action, statusFrom, statusTo, notes) {
        await this.prisma.researchRequestActivity.create({
            data: {
                researchRequestId: requestId,
                actorId,
                action,
                statusFrom,
                statusTo,
                notes,
            },
        });
    }
};
exports.ResearchRequestsService = ResearchRequestsService;
exports.ResearchRequestsService = ResearchRequestsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ResearchRequestsService);
//# sourceMappingURL=research-requests.service.js.map
