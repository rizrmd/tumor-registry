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
var PatientsEnhancedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsEnhancedService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const medical_record_service_1 = require("../medical-record/medical-record.service");
let PatientsEnhancedService = PatientsEnhancedService_1 = class PatientsEnhancedService {
    constructor(prisma, medicalRecordService) {
        this.prisma = prisma;
        this.medicalRecordService = medicalRecordService;
        this.logger = new common_1.Logger(PatientsEnhancedService_1.name);
    }
    async create(createDto) {
        try {
            const center = await this.prisma.center.findUnique({
                where: { id: createDto.centerId },
            });
            if (!center) {
                throw new common_1.NotFoundException('Center not found');
            }
            const existingNik = await this.prisma.patient.findUnique({
                where: { nik: createDto.nik },
            });
            if (existingNik) {
                throw new common_1.ConflictException('Patient with this NIK already exists');
            }
            if (createDto.hospitalRecordNumber) {
                const existingMrn = await this.prisma.patient.findFirst({
                    where: { hospitalRecordNumber: createDto.hospitalRecordNumber },
                });
                if (existingMrn) {
                    throw new common_1.ConflictException('Patient with this Hospital Medical Record Number already exists');
                }
            }
            if (createDto.pathologyType === 'bone_tumor') {
                if (createDto.whoBoneTumorId) {
                    const boneTumor = await this.prisma.whoBoneTumorClassification.findUnique({
                        where: { id: createDto.whoBoneTumorId },
                    });
                    if (!boneTumor) {
                        throw new common_1.BadRequestException('Invalid WHO Bone Tumor Classification ID');
                    }
                }
                if (createDto.boneLocationId) {
                    const boneLocation = await this.prisma.boneLocation.findUnique({
                        where: { id: createDto.boneLocationId },
                    });
                    if (!boneLocation) {
                        throw new common_1.BadRequestException('Invalid Bone Location ID');
                    }
                }
            }
            else if (createDto.pathologyType === 'soft_tissue_tumor') {
                if (createDto.whoSoftTissueTumorId) {
                    const softTissueTumor = await this.prisma.whoSoftTissueTumorClassification.findUnique({
                        where: { id: createDto.whoSoftTissueTumorId },
                    });
                    if (!softTissueTumor) {
                        throw new common_1.BadRequestException('Invalid WHO Soft Tissue Tumor Classification ID');
                    }
                }
                if (createDto.softTissueLocationId) {
                    const softTissueLocation = await this.prisma.softTissueLocation.findUnique({
                        where: { id: createDto.softTissueLocationId },
                    });
                    if (!softTissueLocation) {
                        throw new common_1.BadRequestException('Invalid Soft Tissue Location ID');
                    }
                }
            }
            if (createDto.tumorSyndromeId) {
                const syndrome = await this.prisma.tumorSyndrome.findUnique({
                    where: { id: createDto.tumorSyndromeId },
                });
                if (!syndrome) {
                    throw new common_1.BadRequestException('Invalid Tumor Syndrome ID');
                }
            }
            const inamsosRecordNumber = await this.medicalRecordService.generateInamsosNumber(createDto.centerId);
            const { dateOfBirth, onsetDate, biopsyDate, hospitalRecordNumber, ...rest } = createDto;
            const patient = await this.prisma.patient.create({
                data: {
                    ...rest,
                    inamsosRecordNumber,
                    hospitalRecordNumber,
                    anonymousId: `P-${createDto.centerId}-${inamsosRecordNumber.split('-')[2]}`,
                    dateOfBirth: new Date(dateOfBirth),
                    onsetDate: onsetDate ? new Date(onsetDate) : undefined,
                    biopsyDate: biopsyDate ? new Date(biopsyDate) : undefined,
                    isActive: rest.isActive !== undefined ? rest.isActive : true,
                },
                include: {
                    Center: true,
                    whoBoneTumor: true,
                    whoSoftTissueTumor: true,
                    boneLocation: true,
                    softTissueLocation: true,
                    tumorSyndrome: true,
                },
            });
            this.logger.log(`Patient created: ${patient.id} - ${patient.name}`);
            return patient;
        }
        catch (error) {
            this.logger.error('Error creating patient', error);
            throw error;
        }
    }
    async findAll(centerId, pathologyType, includeInactive = false, page = 1, limit = 50, search) {
        try {
            const skip = (page - 1) * limit;
            const where = {
                ...(centerId && { centerId }),
                ...(pathologyType && { pathologyType }),
                ...(includeInactive === false && { isActive: true }),
                ...(search && {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { nik: { contains: search, mode: 'insensitive' } },
                        { hospitalRecordNumber: { contains: search, mode: 'insensitive' } },
                        { phoneNumber: { contains: search, mode: 'insensitive' } },
                    ],
                }),
            };
            const [patients, total] = await Promise.all([
                this.prisma.patient.findMany({
                    where,
                    include: {
                        Center: {
                            select: {
                                id: true,
                                name: true,
                                code: true,
                                regency: true,
                                province: true,
                            },
                        },
                        whoBoneTumor: {
                            select: {
                                id: true,
                                diagnosis: true,
                                category: true,
                                subcategory: true,
                                isMalignant: true,
                            },
                        },
                        whoSoftTissueTumor: {
                            select: {
                                id: true,
                                diagnosis: true,
                                category: true,
                                subcategory: true,
                                isMalignant: true,
                            },
                        },
                        boneLocation: {
                            select: {
                                id: true,
                                code: true,
                                level: true,
                                region: true,
                                boneName: true,
                                segment: true,
                            },
                        },
                        softTissueLocation: {
                            select: {
                                id: true,
                                code: true,
                                anatomicalRegion: true,
                                specificLocation: true,
                            },
                        },
                        tumorSyndrome: true,
                        _count: {
                            select: {
                                mstsScores: true,
                                followUpVisits: true,
                                treatments: true,
                                cpcConferences: true,
                            },
                        },
                    },
                    orderBy: [{ createdAt: 'desc' }],
                    skip,
                    take: limit,
                }),
                this.prisma.patient.count({ where }),
            ]);
            const totalPages = Math.ceil(total / limit);
            return {
                patients: patients.map((patient) => ({
                    ...patient,
                    mstsScoreCount: patient._count?.mstsScores || 0,
                    followUpVisitCount: patient._count?.followUpVisits || 0,
                    treatmentCount: patient._count?.treatments || 0,
                    cpcConferenceCount: patient._count?.cpcConferences || 0,
                    _count: undefined,
                })),
                total,
                page,
                totalPages,
            };
        }
        catch (error) {
            this.logger.error('Error finding all patients', error);
            throw error;
        }
    }
    async findById(id, includeFullHistory = false) {
        try {
            const patient = await this.prisma.patient.findUnique({
                where: { id },
                include: {
                    Center: true,
                    whoBoneTumor: true,
                    whoSoftTissueTumor: true,
                    boneLocation: {
                        include: {
                            parent: true,
                            children: true,
                        },
                    },
                    softTissueLocation: true,
                    tumorSyndrome: true,
                    ...(includeFullHistory && {
                        mstsScores: {
                            orderBy: { assessmentDate: 'desc' },
                        },
                        followUpVisits: {
                            orderBy: { scheduledDate: 'desc' },
                        },
                        treatments: {
                            orderBy: { createdAt: 'desc' },
                        },
                        cpcConferences: {
                            orderBy: { conferenceDate: 'desc' },
                        },
                    }),
                    _count: {
                        select: {
                            mstsScores: true,
                            followUpVisits: true,
                            treatments: true,
                            cpcConferences: true,
                        },
                    },
                },
            });
            if (!patient) {
                throw new common_1.NotFoundException('Patient not found');
            }
            return patient;
        }
        catch (error) {
            this.logger.error(`Error finding patient ${id}`, error);
            throw error;
        }
    }
    async findByNIK(nik) {
        try {
            const patient = await this.prisma.patient.findUnique({
                where: { nik },
                include: {
                    Center: true,
                    whoBoneTumor: true,
                    whoSoftTissueTumor: true,
                    boneLocation: true,
                    softTissueLocation: true,
                    tumorSyndrome: true,
                },
            });
            if (!patient) {
                throw new common_1.NotFoundException('Patient not found');
            }
            return patient;
        }
        catch (error) {
            this.logger.error(`Error finding patient by NIK ${nik}`, error);
            throw error;
        }
    }
    async findByMRN(mrn) {
        try {
            const patient = await this.prisma.patient.findFirst({
                where: { hospitalRecordNumber: mrn },
                include: {
                    Center: true,
                    whoBoneTumor: true,
                    whoSoftTissueTumor: true,
                    boneLocation: true,
                    softTissueLocation: true,
                    tumorSyndrome: true,
                },
            });
            if (!patient) {
                throw new common_1.NotFoundException('Patient not found');
            }
            return patient;
        }
        catch (error) {
            this.logger.error(`Error finding patient by MRN ${mrn}`, error);
            throw error;
        }
    }
    async update(id, updateDto) {
        try {
            await this.findById(id);
            if (updateDto.pathologyType === 'bone_tumor') {
                if (updateDto.whoBoneTumorId) {
                    const boneTumor = await this.prisma.whoBoneTumorClassification.findUnique({
                        where: { id: updateDto.whoBoneTumorId },
                    });
                    if (!boneTumor) {
                        throw new common_1.BadRequestException('Invalid WHO Bone Tumor Classification ID');
                    }
                }
                if (updateDto.boneLocationId) {
                    const boneLocation = await this.prisma.boneLocation.findUnique({
                        where: { id: updateDto.boneLocationId },
                    });
                    if (!boneLocation) {
                        throw new common_1.BadRequestException('Invalid Bone Location ID');
                    }
                }
            }
            else if (updateDto.pathologyType === 'soft_tissue_tumor') {
                if (updateDto.whoSoftTissueTumorId) {
                    const softTissueTumor = await this.prisma.whoSoftTissueTumorClassification.findUnique({
                        where: { id: updateDto.whoSoftTissueTumorId },
                    });
                    if (!softTissueTumor) {
                        throw new common_1.BadRequestException('Invalid WHO Soft Tissue Tumor Classification ID');
                    }
                }
                if (updateDto.softTissueLocationId) {
                    const softTissueLocation = await this.prisma.softTissueLocation.findUnique({
                        where: { id: updateDto.softTissueLocationId },
                    });
                    if (!softTissueLocation) {
                        throw new common_1.BadRequestException('Invalid Soft Tissue Location ID');
                    }
                }
            }
            const { dateOfBirth, onsetDate, biopsyDate, dateOfDeath, ...updateRest } = updateDto;
            const patient = await this.prisma.patient.update({
                where: { id },
                data: {
                    ...updateRest,
                    dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
                    onsetDate: onsetDate ? new Date(onsetDate) : undefined,
                    biopsyDate: biopsyDate ? new Date(biopsyDate) : undefined,
                    dateOfDeath: dateOfDeath ? new Date(dateOfDeath) : undefined,
                },
                include: {
                    Center: true,
                    whoBoneTumor: true,
                    whoSoftTissueTumor: true,
                    boneLocation: true,
                    softTissueLocation: true,
                    tumorSyndrome: true,
                },
            });
            this.logger.log(`Patient updated: ${patient.id} - ${patient.name}`);
            return patient;
        }
        catch (error) {
            this.logger.error(`Error updating patient ${id}`, error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const patient = await this.prisma.patient.update({
                where: { id },
                data: { isActive: false },
            });
            this.logger.log(`Patient soft deleted: ${patient.id} - ${patient.name}`);
            return patient;
        }
        catch (error) {
            this.logger.error(`Error removing patient ${id}`, error);
            throw error;
        }
    }
    async getPatientSummary(id) {
        try {
            const patient = await this.findById(id, true);
            const summary = {
                patient: {
                    id: patient.id,
                    mrn: patient.inamsosRecordNumber,
                    hospitalMrn: patient.hospitalRecordNumber,
                    nik: patient.nik,
                    name: patient.name,
                    age: this.calculateAge(patient.dateOfBirth),
                    gender: patient.gender,
                    center: patient.Center.name,
                },
                diagnosis: {
                    pathologyType: patient.pathologyType,
                    whoBoneTumor: patient.whoBoneTumor,
                    whoSoftTissueTumor: patient.whoSoftTissueTumor,
                    boneLocation: patient.boneLocation,
                    softTissueLocation: patient.softTissueLocation,
                    histopathologyGrade: patient.histopathologyGrade,
                    ennekingStage: patient.ennekingStage,
                    ajccStage: patient.ajccStage,
                    metastasisPresent: patient.metastasisPresent,
                },
                clinical: {
                    chiefComplaint: patient.chiefComplaint,
                    symptomDuration: patient.symptomDuration,
                    tumorSize: patient.tumorSizeAtPresentation,
                    karnofskysScore: patient.karnofskysScore,
                    biopsyResult: patient.biopsyResult,
                },
                mstsScores: {
                    total: patient._count.mstsScores,
                    latest: patient.mstsScores?.[0],
                    average: this.calculateAverageMstsScore(patient.mstsScores),
                },
                followUps: {
                    total: patient._count.followUpVisits,
                    completed: patient.followUpVisits?.filter((v) => v.status === 'Completed').length || 0,
                    scheduled: patient.followUpVisits?.filter((v) => v.status === 'Scheduled').length || 0,
                    missed: patient.followUpVisits?.filter((v) => v.status === 'Missed').length || 0,
                    recurrenceDetected: patient.followUpVisits?.some((v) => v.localRecurrence || v.distantMetastasis) || false,
                },
                treatments: {
                    total: patient._count.treatments,
                    byType: this.groupTreatmentsByType(patient.treatments),
                    activeTreatments: patient.treatments?.filter((t) => t.status === 'Ongoing').length || 0,
                },
                cpcConferences: {
                    total: patient._count.cpcConferences,
                    latest: patient.cpcConferences?.[0],
                },
            };
            return summary;
        }
        catch (error) {
            this.logger.error(`Error getting patient summary ${id}`, error);
            throw error;
        }
    }
    async getPatientStatistics(centerId) {
        try {
            const where = {
                isActive: true,
                ...(centerId && { centerId }),
            };
            const [total, byPathologyType, byGender, deceased, withMetastasis, avgAge,] = await Promise.all([
                this.prisma.patient.count({ where }),
                this.prisma.patient.groupBy({
                    by: ['pathologyType'],
                    where,
                    _count: true,
                }),
                this.prisma.patient.groupBy({
                    by: ['gender'],
                    where,
                    _count: true,
                }),
                this.prisma.patient.count({ where: { ...where, isDeceased: true } }),
                this.prisma.patient.count({ where: { ...where, metastasisPresent: true } }),
                this.prisma.patient.aggregate({
                    where,
                    _avg: {
                        karnofskysScore: true,
                    },
                }),
            ]);
            return {
                total,
                byPathologyType: byPathologyType.reduce((acc, item) => {
                    acc[item.pathologyType || 'unknown'] = item._count;
                    return acc;
                }, {}),
                byGender: byGender.reduce((acc, item) => {
                    acc[item.gender] = item._count;
                    return acc;
                }, {}),
                deceased,
                withMetastasis,
                avgKarnofskysScore: avgAge._avg.karnofskysScore || 0,
            };
        }
        catch (error) {
            this.logger.error('Error getting patient statistics', error);
            throw error;
        }
    }
    async searchPatients(filters) {
        try {
            const { search, centerId, pathologyType, gender, ennekingStage, ajccStage, isDeceased, metastasisPresent, page = 1, limit = 50, } = filters;
            const skip = (page - 1) * limit;
            const where = {
                ...(centerId && { centerId }),
                ...(pathologyType && { pathologyType }),
                ...(gender && { gender }),
                ...(ennekingStage && { ennekingStage }),
                ...(ajccStage && { ajccStage }),
                ...(isDeceased !== undefined && { isDeceased }),
                ...(metastasisPresent !== undefined && { metastasisPresent }),
                ...(search && {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { nik: { contains: search, mode: 'insensitive' } },
                        { hospitalRecordNumber: { contains: search, mode: 'insensitive' } },
                    ],
                }),
            };
            const [patients, total] = await Promise.all([
                this.prisma.patient.findMany({
                    where,
                    include: {
                        Center: true,
                        whoBoneTumor: true,
                        whoSoftTissueTumor: true,
                        boneLocation: true,
                        softTissueLocation: true,
                    },
                    orderBy: [{ createdAt: 'desc' }],
                    skip,
                    take: limit,
                }),
                this.prisma.patient.count({ where }),
            ]);
            return {
                patients,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this.logger.error('Error searching patients', error);
            throw error;
        }
    }
    calculateAge(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    calculateAverageMstsScore(scores) {
        if (!scores || scores.length === 0)
            return 0;
        const sum = scores.reduce((acc, score) => acc + score.totalScore, 0);
        return Math.round((sum / scores.length) * 10) / 10;
    }
    groupTreatmentsByType(treatments) {
        if (!treatments)
            return {};
        return treatments.reduce((acc, treatment) => {
            const type = treatment.treatmentType;
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});
    }
};
exports.PatientsEnhancedService = PatientsEnhancedService;
exports.PatientsEnhancedService = PatientsEnhancedService = PatientsEnhancedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        medical_record_service_1.MedicalRecordService])
], PatientsEnhancedService);
//# sourceMappingURL=patients-enhanced.service.js.map