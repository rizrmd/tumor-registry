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
var PatientsAnonymizedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsAnonymizedService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const medical_record_service_1 = require("./services/medical-record.service");
let PatientsAnonymizedService = PatientsAnonymizedService_1 = class PatientsAnonymizedService {
    constructor(prisma, medicalRecordService) {
        this.prisma = prisma;
        this.medicalRecordService = medicalRecordService;
        this.logger = new common_1.Logger(PatientsAnonymizedService_1.name);
    }
    async findAll(centerId, includeInactive = false, page = 1, limit = 50, search) {
        try {
            const skip = (page - 1) * limit;
            const where = {
                ...(centerId && { centerId }),
                ...(includeInactive === false && { isActive: true }),
                ...(search && {
                    OR: [
                        { anonymousId: { contains: search, mode: 'insensitive' } },
                        { inamsosRecordNumber: { contains: search, mode: 'insensitive' } },
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
                                mrPrefix: true,
                            },
                        },
                        _count: {
                            select: {
                                diagnoses: {
                                    where: {
                                        status: 'ACTIVE',
                                    },
                                },
                                medications: {
                                    where: {
                                        isActive: true,
                                    },
                                },
                                visits: true,
                            },
                        },
                    },
                    orderBy: [
                        { anonymousId: 'asc' },
                    ],
                    skip,
                    take: limit,
                }),
                this.prisma.patient.count({ where }),
            ]);
            const totalPages = Math.ceil(total / limit);
            return {
                patients: patients.map(patient => ({
                    ...patient,
                    name: undefined,
                    activeDiagnoses: patient._count?.diagnoses || 0,
                    activeMedications: patient._count?.medications || 0,
                    totalVisits: patient._count?.visits || 0,
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
    async findById(id, includeMedicalHistory = false) {
        try {
            const patient = await this.prisma.patient.findUnique({
                where: { id },
                include: {
                    Center: true,
                    ...(includeMedicalHistory && {
                        diagnoses: {
                            where: {
                                status: 'ACTIVE',
                            },
                            orderBy: {
                                createdAt: 'desc',
                            },
                        },
                        medications: {
                            where: {
                                isActive: true,
                            },
                        },
                        visits: {
                            orderBy: {
                                visitDate: 'desc',
                            },
                            take: 10,
                        },
                    }),
                },
            });
            if (!patient) {
                throw new common_1.NotFoundException(`Patient with ID ${id} not found`);
            }
            return {
                ...patient,
                name: undefined,
            };
        }
        catch (error) {
            this.logger.error(`Error finding patient by ID ${id}`, error);
            throw error;
        }
    }
    async findByAnonymousId(anonymousId) {
        const patient = await this.prisma.patient.findUnique({
            where: { anonymousId },
            include: {
                Center: true,
            },
        });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient with anonymous ID ${anonymousId} not found`);
        }
        return {
            ...patient,
            name: undefined,
        };
    }
    async findByInamsosNumber(inamsosRecordNumber) {
        const patient = await this.prisma.patient.findUnique({
            where: { inamsosRecordNumber },
            include: {
                Center: true,
            },
        });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient with INAMSOS MR ${inamsosRecordNumber} not found`);
        }
        return {
            ...patient,
            name: undefined,
        };
    }
    async create(data) {
        try {
            const center = await this.prisma.center.findUnique({
                where: { id: data.centerId },
                select: { id: true, name: true, mrPrefix: true },
            });
            if (!center) {
                throw new common_1.NotFoundException(`Center with ID ${data.centerId} not found`);
            }
            if (!center.mrPrefix) {
                throw new common_1.BadRequestException(`Center "${center.name}" does not have MR prefix configured. Please configure in center settings first.`);
            }
            const diagnosisYear = data.diagnosisDate
                ? new Date(data.diagnosisDate).getFullYear()
                : new Date().getFullYear();
            const inamsosRecordNumber = await this.medicalRecordService.generateInamsosNumber(data.centerId, diagnosisYear);
            const anonymousId = this.medicalRecordService.generateAnonymousId(data.centerId, inamsosRecordNumber);
            const patient = await this.prisma.patient.create({
                data: {
                    anonymousId,
                    inamsosRecordNumber,
                    hospitalRecordNumber: data.hospitalRecordNumber,
                    nik: data.nik,
                    dateOfBirth: data.dateOfBirth,
                    gender: data.gender,
                    bloodType: data.bloodType,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    address: data.address,
                    province: data.province,
                    regency: data.city,
                    district: data.district,
                    maritalStatus: data.maritalStatus,
                    occupation: data.occupation,
                    religion: data.religion,
                    centerId: data.centerId,
                    isActive: true,
                    createdById: data.createdBy,
                },
                include: {
                    Center: true,
                },
            });
            this.logger.log(`Created patient: ${anonymousId} (${inamsosRecordNumber})`);
            return {
                ...patient,
                name: undefined,
            };
        }
        catch (error) {
            this.logger.error('Error creating patient', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            const existing = await this.prisma.patient.findUnique({
                where: { id },
            });
            if (!existing) {
                throw new common_1.NotFoundException(`Patient with ID ${id} not found`);
            }
            const patient = await this.prisma.patient.update({
                where: { id },
                data,
                include: {
                    Center: true,
                },
            });
            this.logger.log(`Updated patient: ${patient.anonymousId}`);
            return {
                ...patient,
                name: undefined,
            };
        }
        catch (error) {
            this.logger.error(`Error updating patient ${id}`, error);
            throw error;
        }
    }
    async delete(id) {
        try {
            const patient = await this.prisma.patient.findUnique({
                where: { id },
            });
            if (!patient) {
                throw new common_1.NotFoundException(`Patient with ID ${id} not found`);
            }
            await this.prisma.patient.update({
                where: { id },
                data: { isActive: false },
            });
            this.logger.log(`Deleted (soft) patient: ${patient.anonymousId}`);
        }
        catch (error) {
            this.logger.error(`Error deleting patient ${id}`, error);
            throw error;
        }
    }
    async search(filters) {
        try {
            const page = filters.page || 1;
            const limit = filters.limit || 50;
            const skip = (page - 1) * limit;
            const where = {};
            if (filters.anonymousId) {
                where.anonymousId = { contains: filters.anonymousId, mode: 'insensitive' };
            }
            if (filters.inamsosRecordNumber) {
                where.inamsosRecordNumber = { contains: filters.inamsosRecordNumber, mode: 'insensitive' };
            }
            if (filters.hospitalRecordNumber) {
                where.hospitalRecordNumber = { contains: filters.hospitalRecordNumber, mode: 'insensitive' };
            }
            if (filters.centerId) {
                where.centerId = filters.centerId;
            }
            if (filters.province) {
                where.province = filters.province;
            }
            where.regency = { contains: filters.city, mode: 'insensitive' };
            if (filters.gender) {
                where.gender = filters.gender;
            }
            if (filters.ageMin !== undefined || filters.ageMax !== undefined) {
                const today = new Date();
                if (filters.ageMin !== undefined) {
                    const maxDob = new Date(today.getFullYear() - filters.ageMin, today.getMonth(), today.getDate());
                    where.dateOfBirth = { ...where.dateOfBirth, lte: maxDob };
                }
                if (filters.ageMax !== undefined) {
                    const minDob = new Date(today.getFullYear() - filters.ageMax - 1, today.getMonth(), today.getDate());
                    where.dateOfBirth = { ...where.dateOfBirth, gte: minDob };
                }
            }
            if (filters.isActive !== undefined) {
                where.isActive = filters.isActive;
            }
            const [patients, total] = await Promise.all([
                this.prisma.patient.findMany({
                    where,
                    include: {
                        Center: {
                            select: {
                                id: true,
                                name: true,
                                code: true,
                                mrPrefix: true,
                            },
                        },
                    },
                    orderBy: { anonymousId: 'asc' },
                    skip,
                    take: limit,
                }),
                this.prisma.patient.count({ where }),
            ]);
            const totalPages = Math.ceil(total / limit);
            return {
                patients: patients.map(p => ({
                    ...p,
                    name: undefined,
                })),
                total,
                page,
                totalPages,
            };
        }
        catch (error) {
            this.logger.error('Error searching patients', error);
            throw error;
        }
    }
    async getStatistics(centerId) {
        try {
            const where = {
                isActive: true,
            };
            if (centerId) {
                where.centerId = centerId;
            }
            const [total, byGender, byProvince, byMaritalStatus,] = await Promise.all([
                this.prisma.patient.count({ where }),
                this.prisma.patient.groupBy({
                    by: ['gender'],
                    where,
                    _count: { id: true },
                }),
                this.prisma.patient.groupBy({
                    by: ['province'],
                    where,
                    _count: { id: true },
                }),
                this.prisma.patient.groupBy({
                    by: ['maritalStatus'],
                    where,
                    _count: { id: true },
                }),
            ]);
            return {
                total,
                byGender: byGender.reduce((acc, item) => {
                    if (item.gender)
                        acc[item.gender] = item._count.id;
                    return acc;
                }, {}),
                byProvince: byProvince.reduce((acc, item) => {
                    if (item.province)
                        acc[item.province] = item._count.id;
                    return acc;
                }, {}),
                byMaritalStatus: byMaritalStatus.reduce((acc, item) => {
                    if (item.maritalStatus)
                        acc[item.maritalStatus] = item._count.id;
                    return acc;
                }, {}),
            };
        }
        catch (error) {
            this.logger.error('Error getting patient statistics', error);
            throw error;
        }
    }
    async getPII(patientId, requesterId, reason) {
        throw new Error('PII Archive feature not yet implemented');
    }
};
exports.PatientsAnonymizedService = PatientsAnonymizedService;
exports.PatientsAnonymizedService = PatientsAnonymizedService = PatientsAnonymizedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        medical_record_service_1.MedicalRecordService])
], PatientsAnonymizedService);
//# sourceMappingURL=patients-anonymized.service.js.map