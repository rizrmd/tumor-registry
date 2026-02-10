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
var PatientsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("@/database/prisma.service");
const medical_record_service_1 = require("./services/medical-record.service");
let PatientsService = PatientsService_1 = class PatientsService {
    constructor(prisma, medicalRecordService) {
        this.prisma = prisma;
        this.medicalRecordService = medicalRecordService;
        this.logger = new common_1.Logger(PatientsService_1.name);
        this.chatSessions = new Map();
    }
    async findAll(centerId, includeInactive = false, page = 1, limit = 50, search, user) {
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
                        { nik: { contains: search, mode: 'insensitive' } },
                        { phoneNumber: { contains: search, mode: 'insensitive' } },
                    ],
                }),
            };
            if (user?.role?.code === 'DATA_ENTRY') {
                where.createdById = user.id;
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
            const isObserver = user?.role?.code === 'OBSERVER';
            return {
                patients: patients.map(patient => ({
                    ...patient,
                    name: undefined,
                    nik: isObserver ? undefined : patient.nik,
                    phoneNumber: isObserver ? undefined : patient.phoneNumber,
                    address: isObserver ? undefined : patient.address,
                    emergencyContact: isObserver ? undefined : patient.emergencyContact,
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
                        allergies: {
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
                            orderBy: {
                                createdAt: 'desc',
                            },
                        },
                        vitalSigns: {
                            orderBy: {
                                recordedAt: 'desc',
                            },
                            take: 10,
                        },
                        visits: {
                            orderBy: {
                                visitDate: 'desc',
                            },
                            take: 5,
                        },
                        insuranceInfos: {
                            where: {
                                isActive: true,
                            },
                        },
                    }),
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
                            vitalSigns: true,
                        },
                    },
                },
            });
            if (!patient) {
                throw new common_1.NotFoundException(`Patient with ID ${id} not found`);
            }
            const age = this.calculateAge(patient.dateOfBirth, patient.dateOfDeath);
            return {
                ...patient,
                name: undefined,
                age,
                ageGroup: this.getAgeGroup(age),
                _count: undefined,
            };
        }
        catch (error) {
            this.logger.error(`Error finding patient by ID: ${id}`, error);
            throw error;
        }
    }
    async findByNIK(nik) {
        try {
            const patient = await this.prisma.patient.findUnique({
                where: { nik },
            });
            if (!patient) {
                throw new common_1.NotFoundException(`Patient with NIK ${nik} not found`);
            }
            return patient;
        }
        catch (error) {
            this.logger.error(`Error finding patient by NIK: ${nik}`, error);
            throw error;
        }
    }
    async findByInamsosNumber(inamsosRecordNumber) {
        try {
            const patient = await this.prisma.patient.findUnique({
                where: { inamsosRecordNumber },
            });
            if (!patient) {
                throw new common_1.NotFoundException(`Patient with INAMSOS MR ${inamsosRecordNumber} not found`);
            }
            return patient;
        }
        catch (error) {
            this.logger.error(`Error finding patient by INAMSOS MR: ${inamsosRecordNumber}`, error);
            throw error;
        }
    }
    async findByAnonymousId(anonymousId) {
        try {
            const patient = await this.prisma.patient.findUnique({
                where: { anonymousId },
            });
            if (!patient) {
                throw new common_1.NotFoundException(`Patient with anonymous ID ${anonymousId} not found`);
            }
            return patient;
        }
        catch (error) {
            this.logger.error(`Error finding patient by anonymous ID: ${anonymousId}`, error);
            throw error;
        }
    }
    async findByHospitalRecordNumber(hospitalRecordNumber) {
        try {
            const patient = await this.prisma.patient.findFirst({
                where: { hospitalRecordNumber },
            });
            if (!patient) {
                throw new common_1.NotFoundException(`Patient with Hospital MRN ${hospitalRecordNumber} not found`);
            }
            return patient;
        }
        catch (error) {
            this.logger.error(`Error finding patient by Hospital MRN: ${hospitalRecordNumber}`, error);
            throw error;
        }
    }
    async create(patientData) {
        try {
            if (patientData.nik) {
                const existingPatientByNik = await this.prisma.patient.findUnique({
                    where: { nik: patientData.nik },
                });
                if (existingPatientByNik) {
                    throw new common_1.ConflictException(`Patient with NIK ${patientData.nik} already exists`);
                }
            }
            const center = await this.prisma.center.findUnique({
                where: { id: patientData.centerId },
                select: { id: true, name: true, mrPrefix: true },
            });
            if (!center) {
                throw new common_1.NotFoundException(`Center with ID ${patientData.centerId} not found`);
            }
            if (!center.mrPrefix) {
                throw new common_1.BadRequestException(`Center "${center.name}" does not have MR prefix configured. Please configure in center settings first.`);
            }
            const diagnosisYear = patientData.diagnosisDate
                ? new Date(patientData.diagnosisDate).getFullYear()
                : new Date().getFullYear();
            const inamsosRecordNumber = await this.medicalRecordService.generateInamsosNumber(patientData.centerId, diagnosisYear);
            const anonymousId = this.medicalRecordService.generateAnonymousId(patientData.centerId, inamsosRecordNumber);
            const patient = await this.prisma.patient.create({
                data: {
                    anonymousId,
                    inamsosRecordNumber,
                    hospitalRecordNumber: patientData.hospitalRecordNumber,
                    nik: patientData.nik,
                    dateOfBirth: patientData.dateOfBirth,
                    placeOfBirth: patientData.placeOfBirth,
                    gender: patientData.gender,
                    bloodType: patientData.bloodType,
                    religion: patientData.religion,
                    maritalStatus: patientData.maritalStatus,
                    occupation: patientData.occupation,
                    education: patientData.education,
                    phoneNumber: patientData.phoneNumber,
                    email: patientData.email,
                    address: patientData.address,
                    province: patientData.province,
                    regency: patientData.regency,
                    district: patientData.district,
                    village: patientData.village,
                    postalCode: patientData.postalCode,
                    emergencyContact: patientData.emergencyContact,
                    centerId: patientData.centerId,
                    isActive: true,
                    createdById: patientData.createdBy,
                },
            });
            this.logger.log(`Patient created: ${anonymousId} (${inamsosRecordNumber})`);
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
    async update(id, updateData) {
        try {
            const existingPatient = await this.findById(id);
            const updatedPatient = await this.prisma.patient.update({
                where: { id },
                data: {
                    ...(updateData.nik !== undefined && { nik: updateData.nik }),
                    ...(updateData.phoneNumber !== undefined && { phoneNumber: updateData.phoneNumber }),
                    ...(updateData.email !== undefined && { email: updateData.email }),
                    ...(updateData.address !== undefined && { address: updateData.address }),
                    ...(updateData.province && { province: updateData.province }),
                    ...(updateData.regency !== undefined && { regency: updateData.regency }),
                    ...(updateData.district !== undefined && { district: updateData.district }),
                    ...(updateData.village !== undefined && { village: updateData.village }),
                    ...(updateData.postalCode !== undefined && { postalCode: updateData.postalCode }),
                    ...(updateData.emergencyContact !== undefined && { emergencyContact: updateData.emergencyContact }),
                    ...(updateData.bloodType && { bloodType: updateData.bloodType }),
                    ...(updateData.religion !== undefined && { religion: updateData.religion }),
                    ...(updateData.maritalStatus && { maritalStatus: updateData.maritalStatus }),
                    ...(updateData.occupation !== undefined && { occupation: updateData.occupation }),
                    ...(updateData.education !== undefined && { education: updateData.education }),
                    ...(updateData.hospitalRecordNumber !== undefined && { hospitalRecordNumber: updateData.hospitalRecordNumber }),
                    ...(updateData.isActive !== undefined && { isActive: updateData.isActive }),
                    ...(updateData.isDeceased !== undefined && { isDeceased: updateData.isDeceased }),
                    ...(updateData.dateOfDeath !== undefined && { dateOfDeath: updateData.dateOfDeath }),
                    ...(updateData.causeOfDeath !== undefined && { causeOfDeath: updateData.causeOfDeath }),
                },
            });
            this.logger.log(`Patient updated: ${updatedPatient.anonymousId}`);
            return {
                ...updatedPatient,
                name: undefined,
            };
        }
        catch (error) {
            this.logger.error(`Error updating patient with ID: ${id}`, error);
            throw error;
        }
    }
    async getPatientStatistics(centerId) {
        try {
            const where = centerId ? { centerId } : {};
            const [totalPatients, activePatients, deceasedPatients, genderStats, ageStats, bloodTypeStats,] = await Promise.all([
                this.prisma.patient.count({ where }),
                this.prisma.patient.count({
                    where: { ...where, isActive: true, isDeceased: false },
                }),
                this.prisma.patient.count({
                    where: { ...where, isDeceased: true },
                }),
                this.getGenderStatistics(where),
                this.getAgeStatistics(where),
                this.getBloodTypeStatistics(where),
            ]);
            return {
                totalPatients,
                activePatients,
                deceasedPatients,
                genderStats,
                ageStats,
                bloodTypeStats,
            };
        }
        catch (error) {
            this.logger.error('Error getting patient statistics', error);
            throw error;
        }
    }
    async searchPatients(query) {
        try {
            const page = query.page || 1;
            const limit = query.limit || 50;
            const skip = (page - 1) * limit;
            const where = {
                ...(query.centerId && { centerId: query.centerId }),
                ...(query.gender && { gender: query.gender }),
                ...(query.bloodType && { bloodType: query.bloodType }),
                ...(query.maritalStatus && { maritalStatus: query.maritalStatus }),
                ...(query.isDeceased !== undefined && { isDeceased: query.isDeceased }),
                ...(query.dateOfBirthFrom || query.dateOfBirthTo ? {
                    dateOfBirth: {
                        ...(query.dateOfBirthFrom && { gte: query.dateOfBirthFrom }),
                        ...(query.dateOfBirthTo && { lte: query.dateOfBirthTo }),
                    },
                } : {}),
                ...(query.search && {
                    OR: [
                        { name: { contains: query.search, mode: 'insensitive' } },
                        { nik: { contains: query.search, mode: 'insensitive' } },
                        { hospitalRecordNumber: { contains: query.search, mode: 'insensitive' } },
                        { phoneNumber: { contains: query.search, mode: 'insensitive' } },
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
                            },
                        },
                    },
                    orderBy: [
                        { name: 'asc' },
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
                    age: this.calculateAge(patient.dateOfBirth, patient.dateOfDeath),
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
    calculateAge(dateOfBirth, dateOfDeath) {
        const endDate = dateOfDeath || new Date();
        let age = endDate.getFullYear() - dateOfBirth.getFullYear();
        const monthDiff = endDate.getMonth() - dateOfBirth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && endDate.getDate() < dateOfBirth.getDate())) {
            age--;
        }
        return age;
    }
    getAgeGroup(age) {
        if (age < 1)
            return 'Infant';
        if (age < 12)
            return 'Child';
        if (age < 18)
            return 'Adolescent';
        if (age < 40)
            return 'Adult';
        if (age < 60)
            return 'Middle-Aged';
        return 'Elderly';
    }
    async getGenderStatistics(where) {
        const stats = await this.prisma.patient.groupBy({
            by: ['gender'],
            where,
            _count: {
                gender: true,
            },
        });
        return stats.reduce((acc, stat) => {
            acc[stat.gender] = stat._count.gender;
            return acc;
        }, {});
    }
    async getAgeStatistics(where) {
        const patients = await this.prisma.patient.findMany({
            where,
            select: {
                dateOfBirth: true,
                dateOfDeath: true,
            },
        });
        const ageGroups = patients.reduce((acc, patient) => {
            const age = this.calculateAge(patient.dateOfBirth, patient.dateOfDeath);
            const group = this.getAgeGroup(age);
            acc[group] = (acc[group] || 0) + 1;
            return acc;
        }, {});
        return ageGroups;
    }
    async getBloodTypeStatistics(where) {
        const stats = await this.prisma.patient.groupBy({
            by: ['bloodType'],
            where: {
                ...where,
                bloodType: {
                    not: null,
                },
            },
            _count: {
                bloodType: true,
            },
        });
        return stats.reduce((acc, stat) => {
            acc[stat.bloodType] = stat._count.bloodType;
            return acc;
        }, {});
    }
    async createChatSession() {
        const { v4: uuidv4 } = await Promise.resolve().then(() => require('uuid'));
        const sessionId = uuidv4();
        const session = {
            id: sessionId,
            status: 'in_progress',
            currentStep: 0,
            totalSteps: 8,
            messages: [
                {
                    id: uuidv4(),
                    type: 'system',
                    content: '👋 Selamat datang di sistem input data pasien INAMSOS. Mari kita mulai dengan nama pasien.',
                    timestamp: new Date(),
                }
            ],
            formData: {},
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.chatSessions.set(sessionId, session);
        return session;
    }
    async getChatSession(sessionId) {
        const session = this.chatSessions.get(sessionId);
        if (!session) {
            throw new common_1.NotFoundException('Session not found');
        }
        return session;
    }
    async sendChatMessage(sessionId, content, fieldName, formData) {
        const { v4: uuidv4 } = await Promise.resolve().then(() => require('uuid'));
        const session = await this.getChatSession(sessionId);
        session.messages.push({
            id: uuidv4(),
            type: 'user',
            content,
            timestamp: new Date(),
            fieldName,
        });
        if (fieldName && formData) {
            session.formData = { ...session.formData, ...formData };
        }
        const nextStep = session.currentStep + 1;
        const responses = [
            { content: '📅 Terima kasih! Sekarang masukkan tanggal lahir pasien (format: YYYY-MM-DD).' },
            { content: '👤 Jenis kelamin pasien?', options: ['Laki-laki', 'Perempuan'] },
            { content: '📞 Apakah ada nomor telepon pasien?', },
            { content: '📍 Masukkan alamat pasien.' },
            { content: '🏥 Dimana lokasi kanker utama?' },
            { content: '📊 Stadium kanker?', options: ['I', 'II', 'III', 'IV'] },
            { content: '💊 Status pengobatan?', options: ['Baru', 'Sedang Berjalan', 'Selesai', 'Paliatif'] },
            { content: '✅ Data berhasil disimpan! Terima kasih.', completed: true },
        ];
        if (nextStep < responses.length) {
            const response = responses[nextStep];
            session.messages.push({
                id: uuidv4(),
                type: 'system',
                content: response.content,
                timestamp: new Date(),
                options: response.options,
                completed: response.completed || false,
            });
            session.currentStep = nextStep;
            if (response.completed) {
                session.status = 'completed';
            }
        }
        session.updatedAt = new Date();
        this.chatSessions.set(sessionId, session);
        return session;
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = PatientsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        medical_record_service_1.MedicalRecordService])
], PatientsService);
//# sourceMappingURL=patients.service.js.map