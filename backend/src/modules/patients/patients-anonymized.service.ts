import { Injectable, Logger, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { Patient, Gender, BloodType, MaritalStatus } from '@prisma/client';
import { MedicalRecordService } from './services/medical-record.service';

/**
 * Updated Patients Service for Anonymized Patient Data
 * - No patient names (uses anonymousId)
 * - Auto-generates INAMSOS MR numbers
 * - Supports privacy-compliant search
 */
@Injectable()
export class PatientsAnonymizedService {
  private readonly logger = new Logger(PatientsAnonymizedService.name);

  constructor(
    private prisma: PrismaService,
    private medicalRecordService: MedicalRecordService,
  ) { }

  /**
   * Find all patients (anonymized)
   */
  async findAll(
    centerId?: string,
    includeInactive = false,
    page = 1,
    limit = 50,
    search?: string
  ): Promise<{ patients: any[], total: number, page: number, totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const where: any = {
        ...(centerId && { centerId }),
        ...(includeInactive === false && { isActive: true }),
        ...(search && {
          OR: [
            // Search by anonymousId, MR numbers - NOT by name
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
            // Order by anonymousId instead of name
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
          // Explicitly exclude name field from response
          name: undefined,
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

  /**
   * Find patient by ID (anonymized)
   */
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
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }

      // Explicitly exclude name from response
      return {
        ...patient,
        name: undefined,
      };
    } catch (error) {
      this.logger.error(`Error finding patient by ID ${id}`, error);
      throw error;
    }
  }

  /**
   * Find patient by anonymousId
   */
  async findByAnonymousId(anonymousId: string): Promise<any> {
    const patient = await this.prisma.patient.findUnique({
      where: { anonymousId },
      include: {
        Center: true,
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with anonymous ID ${anonymousId} not found`);
    }

    return {
      ...patient,
      name: undefined,
    };
  }

  /**
   * Find patient by INAMSOS MR number
   */
  async findByInamsosNumber(inamsosRecordNumber: string): Promise<any> {
    const patient = await this.prisma.patient.findUnique({
      where: { inamsosRecordNumber },
      include: {
        Center: true,
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with INAMSOS MR ${inamsosRecordNumber} not found`);
    }

    return {
      ...patient,
      name: undefined,
    };
  }

  /**
   * Create new patient (anonymized)
   * Automatically generates anonymousId and inamsosRecordNumber
   */
  async create(data: {
    // NO name field
    nik?: string;
    dateOfBirth: Date;
    gender: Gender;
    bloodType?: BloodType;
    phoneNumber?: string;
    email?: string;
    address?: any;
    province?: string;
    // city removed, using regency
    city?: string;
    district?: string;
    maritalStatus?: MaritalStatus;
    occupation?: string;
    religion?: string;
    centerId: string;
    hospitalRecordNumber?: string; // Optional hospital MR
    diagnosisDate?: Date;
    createdBy: string;
  }): Promise<any> {
    try {
      // Validate center exists and has MR prefix
      const center = await this.prisma.center.findUnique({
        where: { id: data.centerId },
        select: { id: true, name: true, mrPrefix: true },
      });

      if (!center) {
        throw new NotFoundException(`Center with ID ${data.centerId} not found`);
      }

      if (!center.mrPrefix) {
        throw new BadRequestException(
          `Center "${center.name}" does not have MR prefix configured. Please configure in center settings first.`
        );
      }

      // Get diagnosis year or current year
      const diagnosisYear = data.diagnosisDate
        ? new Date(data.diagnosisDate).getFullYear()
        : new Date().getFullYear();

      // Generate INAMSOS MR number
      const inamsosRecordNumber = await this.medicalRecordService.generateInamsosNumber(
        data.centerId,
        diagnosisYear
      );

      // Generate Anonymous ID
      const anonymousId = this.medicalRecordService.generateAnonymousId(
        data.centerId,
        inamsosRecordNumber
      );

      // Create patient
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
        } as any,
        include: {
          Center: true,
        },
      });

      this.logger.log(`Created patient: ${anonymousId} (${inamsosRecordNumber})`);

      return {
        ...patient,
        name: undefined,
      };
    } catch (error) {
      this.logger.error('Error creating patient', error);
      throw error;
    }
  }

  /**
   * Update patient (anonymized)
   * Cannot update name (field does not exist)
   */
  async update(id: string, data: {
    // NO name field
    nik?: string;
    dateOfBirth?: Date;
    gender?: Gender;
    bloodType?: BloodType;
    phoneNumber?: string;
    email?: string;
    address?: any;
    province?: string;
    city?: string;
    district?: string;
    maritalStatus?: MaritalStatus;
    occupation?: string;
    religion?: string;
    hospitalRecordNumber?: string;
    isActive?: boolean;
  }): Promise<any> {
    try {
      // Check patient exists
      const existing = await this.prisma.patient.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }

      // Update patient (excluding name)
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
    } catch (error) {
      this.logger.error(`Error updating patient ${id}`, error);
      throw error;
    }
  }

  /**
   * Soft delete patient
   */
  async delete(id: string): Promise<void> {
    try {
      const patient = await this.prisma.patient.findUnique({
        where: { id },
      });

      if (!patient) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }

      await this.prisma.patient.update({
        where: { id },
        data: { isActive: false },
      });

      this.logger.log(`Deleted (soft) patient: ${patient.anonymousId}`);
    } catch (error) {
      this.logger.error(`Error deleting patient ${id}`, error);
      throw error;
    }
  }

  /**
   * Search patients with advanced filters
   */
  async search(filters: {
    anonymousId?: string;
    inamsosRecordNumber?: string;
    hospitalRecordNumber?: string;
    centerId?: string;
    province?: string;
    city?: string;
    gender?: Gender;
    ageMin?: number;
    ageMax?: number;
    diagnosisDateFrom?: Date;
    diagnosisDateTo?: Date;
    isActive?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ patients: any[], total: number, page: number, totalPages: number }> {
    try {
      const page = filters.page || 1;
      const limit = filters.limit || 50;
      const skip = (page - 1) * limit;

      // Build where clause
      const where: any = {};

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

      // Age filter (calculated from dateOfBirth)
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

      // Execute search
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
          name: undefined, // Exclude name
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
   * Get patient statistics (anonymized)
   */
  async getStatistics(centerId?: string): Promise<any> {
    try {
      const where: any = {
        isActive: true,
      };

      if (centerId) {
        where.centerId = centerId;
      }

      const [
        total,
        byGender,
        byProvince,
        byMaritalStatus,
      ] = await Promise.all([
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
          if (item.gender) acc[item.gender] = item._count.id;
          return acc;
        }, {} as Record<string, number>),
        byProvince: byProvince.reduce((acc, item) => {
          if (item.province) acc[item.province] = item._count.id;
          return acc;
        }, {} as Record<string, number>),
        byMaritalStatus: byMaritalStatus.reduce((acc, item) => {
          if (item.maritalStatus) acc[item.maritalStatus] = item._count.id;
          return acc;
        }, {} as Record<string, number>),
      };
    } catch (error) {
      this.logger.error('Error getting patient statistics', error);
      throw error;
    }
  }

  /**
   * ADMIN ONLY: Get PII data for specific patient (from archive)
   * Only for SYSTEM_ADMIN with proper authorization
   */
  async getPII(patientId: string, requesterId: string, reason: string): Promise<any> {
    throw new Error('PII Archive feature not yet implemented');
  }
}
