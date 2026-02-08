import { Injectable, Logger, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { Patient, Gender, BloodType, MaritalStatus } from '@prisma/client';
import { MedicalRecordService } from './services/medical-record.service';

@Injectable()
export class PatientsService {
  private readonly logger = new Logger(PatientsService.name);

  constructor(
    private prisma: PrismaService,
    private medicalRecordService: MedicalRecordService,
  ) { }

  async findAll(
    centerId?: string,
    includeInactive = false,
    page = 1,
    limit = 50,
    search?: string,
    user?: any
  ): Promise<{ patients: any[], total: number, page: number, totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const where: any = {
        ...(centerId && { centerId }),
        ...(includeInactive === false && { isActive: true }),
        ...(search && {
          OR: [
            // Search by anonymousId, INAMSOS MR numbers - NOT by name
            { anonymousId: { contains: search, mode: 'insensitive' } },
            { inamsosRecordNumber: { contains: search, mode: 'insensitive' } },
            { hospitalRecordNumber: { contains: search, mode: 'insensitive' } },
            { nik: { contains: search, mode: 'insensitive' } },
            { phoneNumber: { contains: search, mode: 'insensitive' } },
          ],
        }),
      };

      // Implement Granular Role Access
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
            // Order by anonymousId instead of name
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
          // Explicitly exclude name field from response
          name: undefined,
          // Mask sensitive data for OBSERVER
          nik: isObserver ? undefined : patient.nik,
          phoneNumber: isObserver ? undefined : patient.phoneNumber,
          address: isObserver ? undefined : patient.address,
          emergencyContact: isObserver ? undefined : patient.emergencyContact,

          activeDiagnoses: (patient as any)._count?.diagnoses || 0,
          activeMedications: (patient as any)._count?.medications || 0,
          totalVisits: (patient as any)._count?.visits || 0,
          _count: undefined,
        })),
        total,
        page,
        totalPages,
      };
    } catch (error) {
      this.logger.error('Error finding all patients', error);
      throw error;
    }
  }

  async findById(id: string, includeMedicalHistory = false): Promise<any> {
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
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }

      // Calculate age
      const age = this.calculateAge(patient.dateOfBirth, patient.dateOfDeath);

      return {
        ...patient,
        // Explicitly exclude name from response
        name: undefined,
        age,
        ageGroup: this.getAgeGroup(age),
        _count: undefined,
      };
    } catch (error) {
      this.logger.error(`Error finding patient by ID: ${id}`, error);
      throw error;
    }
  }

  async findByNIK(nik: string): Promise<Patient> {
    try {
      const patient = await this.prisma.patient.findUnique({
        where: { nik },
      });

      if (!patient) {
        throw new NotFoundException(`Patient with NIK ${nik} not found`);
      }

      return patient;
    } catch (error) {
      this.logger.error(`Error finding patient by NIK: ${nik}`, error);
      throw error;
    }
  }

  async findByInamsosNumber(inamsosRecordNumber: string): Promise<Patient> {
    try {
      const patient = await this.prisma.patient.findUnique({
        where: { inamsosRecordNumber },
      });

      if (!patient) {
        throw new NotFoundException(`Patient with INAMSOS MR ${inamsosRecordNumber} not found`);
      }

      return patient;
    } catch (error) {
      this.logger.error(`Error finding patient by INAMSOS MR: ${inamsosRecordNumber}`, error);
      throw error;
    }
  }

  async findByAnonymousId(anonymousId: string): Promise<Patient> {
    try {
      const patient = await this.prisma.patient.findUnique({
        where: { anonymousId },
      });

      if (!patient) {
        throw new NotFoundException(`Patient with anonymous ID ${anonymousId} not found`);
      }

      return patient;
    } catch (error) {
      this.logger.error(`Error finding patient by anonymous ID: ${anonymousId}`, error);
      throw error;
    }
  }

  async findByHospitalRecordNumber(hospitalRecordNumber: string): Promise<Patient> {
    try {
      const patient = await this.prisma.patient.findFirst({
        where: { hospitalRecordNumber },
      });

      if (!patient) {
        throw new NotFoundException(`Patient with Hospital MRN ${hospitalRecordNumber} not found`);
      }

      return patient;
    } catch (error) {
      this.logger.error(`Error finding patient by Hospital MRN: ${hospitalRecordNumber}`, error);
      throw error;
    }
  }

  /**
   * Create new patient (anonymized)
   * Automatically generates anonymousId and inamsosRecordNumber
   */
  async create(patientData: {
    // NO name field - privacy compliant
    nik?: string;
    dateOfBirth: Date;
    placeOfBirth?: string;
    gender: Gender;
    bloodType?: BloodType;
    religion?: string;
    maritalStatus?: MaritalStatus;
    occupation?: string;
    education?: string;
    phoneNumber?: string;
    email?: string;
    address?: string;
    province?: string;
    regency?: string;
    district?: string;
    village?: string;
    postalCode?: string;
    emergencyContact?: any;
    centerId: string;
    hospitalRecordNumber?: string; // Optional hospital MR
    diagnosisDate?: Date; // For MR number year
    createdBy?: string;
  }): Promise<Patient> {
    try {
      // Check if NIK already exists (if provided)
      if (patientData.nik) {
        const existingPatientByNik = await this.prisma.patient.findUnique({
          where: { nik: patientData.nik },
        });

        if (existingPatientByNik) {
          throw new ConflictException(`Patient with NIK ${patientData.nik} already exists`);
        }
      }

      // Validate center exists and has MR prefix
      const center = await this.prisma.center.findUnique({
        where: { id: patientData.centerId },
        select: { id: true, name: true, mrPrefix: true },
      });

      if (!center) {
        throw new NotFoundException(`Center with ID ${patientData.centerId} not found`);
      }

      if (!center.mrPrefix) {
        throw new BadRequestException(
          `Center "${center.name}" does not have MR prefix configured. Please configure in center settings first.`
        );
      }

      // Get diagnosis year or current year
      const diagnosisYear = patientData.diagnosisDate
        ? new Date(patientData.diagnosisDate).getFullYear()
        : new Date().getFullYear();

      // Generate INAMSOS MR number (XXX-YYYY-NNNNN)
      const inamsosRecordNumber = await this.medicalRecordService.generateInamsosNumber(
        patientData.centerId,
        diagnosisYear
      );

      // Generate Anonymous ID (P-XXX-NNNNN)
      const anonymousId = this.medicalRecordService.generateAnonymousId(
        patientData.centerId,
        inamsosRecordNumber
      );

      // Create patient
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
        } as any,
      });

      this.logger.log(`Patient created: ${anonymousId} (${inamsosRecordNumber})`);

      return {
        ...patient,
        name: undefined, // Explicitly exclude name
      } as Patient;
    } catch (error) {
      this.logger.error('Error creating patient', error);
      throw error;
    }
  }

  /**
   * Update patient (anonymized)
   * Cannot update name (field does not exist)
   */
  async update(
    id: string,
    updateData: {
      // NO name field - privacy compliant
      nik?: string;
      phoneNumber?: string;
      email?: string;
      address?: string;
      province?: string;
      regency?: string;
      district?: string;
      village?: string;
      postalCode?: string;
      emergencyContact?: any;
      bloodType?: BloodType;
      religion?: string;
      maritalStatus?: MaritalStatus;
      occupation?: string;
      education?: string;
      hospitalRecordNumber?: string;
      isActive?: boolean;
      isDeceased?: boolean;
      dateOfDeath?: Date;
      causeOfDeath?: string;
    },
  ): Promise<Patient> {
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
        name: undefined, // Explicitly exclude name
      } as Patient;
    } catch (error) {
      this.logger.error(`Error updating patient with ID: ${id}`, error);
      throw error;
    }
  }

  async getPatientStatistics(centerId?: string): Promise<any> {
    try {
      const where = centerId ? { centerId } : {};

      const [
        totalPatients,
        activePatients,
        deceasedPatients,
        genderStats,
        ageStats,
        bloodTypeStats,
      ] = await Promise.all([
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
    } catch (error) {
      this.logger.error('Error getting patient statistics', error);
      throw error;
    }
  }

  async searchPatients(query: {
    search?: string;
    centerId?: string;
    gender?: Gender;
    bloodType?: BloodType;
    maritalStatus?: MaritalStatus;
    isDeceased?: boolean;
    dateOfBirthFrom?: Date;
    dateOfBirthTo?: Date;
    page?: number;
    limit?: number;
  }): Promise<{ patients: any[], total: number, page: number, totalPages: number }> {
    try {
      const page = query.page || 1;
      const limit = query.limit || 50;
      const skip = (page - 1) * limit;

      const where: any = {
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
    } catch (error) {
      this.logger.error('Error searching patients', error);
      throw error;
    }
  }

  /**
   * Old method removed - now using MedicalRecordService.generateInamsosNumber()
   * Medical record numbers are auto-generated with format: XXX-YYYY-NNNNN
   */

  private calculateAge(dateOfBirth: Date, dateOfDeath?: Date): number {
    const endDate = dateOfDeath || new Date();
    let age = endDate.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = endDate.getMonth() - dateOfBirth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && endDate.getDate() < dateOfBirth.getDate())) {
      age--;
    }

    return age;
  }

  private getAgeGroup(age: number): string {
    if (age < 1) return 'Infant';
    if (age < 12) return 'Child';
    if (age < 18) return 'Adolescent';
    if (age < 40) return 'Adult';
    if (age < 60) return 'Middle-Aged';
    return 'Elderly';
  }

  private async getGenderStatistics(where: any) {
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

  private async getAgeStatistics(where: any) {
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

  private async getBloodTypeStatistics(where: any) {
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
      acc[stat.bloodType!] = stat._count.bloodType;
      return acc;
    }, {});
  }

  // Chat session management (in-memory for now)
  private chatSessions = new Map<string, any>();

  async createChatSession() {
    const { v4: uuidv4 } = await import('uuid');
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

  async getChatSession(sessionId: string) {
    const session = this.chatSessions.get(sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }
    return session;
  }

  async sendChatMessage(sessionId: string, content: string, fieldName?: string, formData?: any) {
    const { v4: uuidv4 } = await import('uuid');
    const session = await this.getChatSession(sessionId);

    // Add user message
    session.messages.push({
      id: uuidv4(),
      type: 'user',
      content,
      timestamp: new Date(),
      fieldName,
    });

    // Update form data
    if (fieldName && formData) {
      session.formData = { ...session.formData, ...formData };
    }

    // Generate system response
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
}
