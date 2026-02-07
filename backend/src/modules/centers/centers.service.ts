import { Injectable, Logger, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { Center } from '@prisma/client';
import { MedicalRecordService } from '../patients/services/medical-record.service';

@Injectable()
export class CentersService {
  private readonly logger = new Logger(CentersService.name);

  constructor(
    private prisma: PrismaService,
    private medicalRecordService: MedicalRecordService,
  ) {}

  async findAll(includeInactive = false): Promise<Center[]> {
    try {
      const centers = await this.prisma.center.findMany({
        where: {
          ...(includeInactive === false && { isActive: true }),
        },
        include: {
          _count: {
            select: {
              users: {
                where: {
                  isActive: true,
                },
              },
            },
          },
        },
        orderBy: [
          { name: 'asc' },
        ],
      });

      return centers;
    } catch (error) {
      this.logger.error('Error finding all centers', error);
      throw error;
    }
  }

  async findById(id: string, includeUsers = false): Promise<any> {
    try {
      const center = await this.prisma.center.findUnique({
        where: { id },
        include: {
          ...(includeUsers && {
            users: {
              where: {
                isActive: true,
              },
              select: {
                id: true,
                email: true,
                name: true,
                kolegiumId: true,
                isActive: true,
                createdAt: true,
                userRoles: {
                  include: {
                    role: true,
                  },
                },
              },
              orderBy: {
                name: 'asc',
              },
            },
          }),
          _count: {
            select: {
              users: {
                where: {
                  isActive: true,
                },
              },
            },
          },
        },
      });

      if (!center) {
        throw new NotFoundException(`Center with ID ${id} not found`);
      }

      return {
        ...center,
        userCount: center._count.users,
        _count: undefined,
      };
    } catch (error) {
      this.logger.error(`Error finding center by ID: ${id}`, error);
      throw error;
    }
  }

  async findByCode(code: string): Promise<Center> {
    try {
      const center = await this.prisma.center.findUnique({
        where: { code },
      });

      if (!center) {
        throw new NotFoundException(`Center with code ${code} not found`);
      }

      return center;
    } catch (error) {
      this.logger.error(`Error finding center by code: ${code}`, error);
      throw error;
    }
  }

  /**
   * Create new center with MR prefix validation
   */
  async create(centerData: {
    name: string;
    code: string;
    province: string;
    regency?: string;
    address?: string;
    mrPrefix: string; // REQUIRED - 3 uppercase letters
  }): Promise<Center> {
    try {
      // Validate MR prefix format (3 uppercase letters)
      if (!this.medicalRecordService.validateMrPrefix(centerData.mrPrefix)) {
        throw new BadRequestException(
          'MR Prefix must be exactly 3 uppercase letters (e.g., SBY, JKT, BDG)'
        );
      }

      // Check if center code already exists
      const existingCenterByCode = await this.prisma.center.findUnique({
        where: { code: centerData.code.toUpperCase() },
      });

      if (existingCenterByCode) {
        throw new ConflictException(`Center with code ${centerData.code} already exists`);
      }

      // Check if MR prefix is unique
      const isUnique = await this.medicalRecordService.isMrPrefixUnique(
        centerData.mrPrefix.toUpperCase()
      );

      if (!isUnique) {
        throw new ConflictException(
          `MR Prefix ${centerData.mrPrefix} is already used by another center. Please choose a different prefix.`
        );
      }

      // Create center with MR prefix configuration
      const center = await this.prisma.center.create({
        data: {
          name: centerData.name,
          code: centerData.code.toUpperCase(),
          province: centerData.province,
          regency: centerData.regency,
          address: centerData.address,
          mrPrefix: centerData.mrPrefix.toUpperCase(),
          mrSequenceCounter: 0,
          mrSequenceYear: new Date().getFullYear(),
        },
      });

      this.logger.log(`Center created: ${center.name} (${center.code}) with MR prefix: ${center.mrPrefix}`);
      return center;
    } catch (error) {
      this.logger.error(`Error creating center: ${centerData.name}`, error);
      throw error;
    }
  }

  /**
   * Update center with MR prefix validation
   */
  async update(
    id: string,
    updateData: {
      name?: string;
      code?: string;
      province?: string;
      regency?: string;
      address?: string;
      mrPrefix?: string; // Optional - validates if changed
      isActive?: boolean;
    },
  ): Promise<Center> {
    try {
      const center = await this.prisma.center.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              patients: true,
            },
          },
        },
      });

      if (!center) {
        throw new NotFoundException(`Center with ID ${id} not found`);
      }

      // Prevent updating the default center's active status
      if (center.code === 'DEFAULT' && updateData.isActive !== undefined) {
        throw new ConflictException('Cannot modify active status of default center');
      }

      // If updating MR prefix
      if (updateData.mrPrefix && updateData.mrPrefix !== center.mrPrefix) {
        // Validate format
        if (!this.medicalRecordService.validateMrPrefix(updateData.mrPrefix)) {
          throw new BadRequestException(
            'MR Prefix must be exactly 3 uppercase letters (e.g., SBY, JKT, BDG)'
          );
        }

        // Check uniqueness (excluding current center)
        const isUnique = await this.medicalRecordService.isMrPrefixUnique(
          updateData.mrPrefix.toUpperCase(),
          id
        );

        if (!isUnique) {
          throw new ConflictException(
            `MR Prefix ${updateData.mrPrefix} is already used by another center`
          );
        }

        // Warn if center already has patients
        if (center._count.patients > 0) {
          this.logger.warn(
            `Changing MR prefix for center ${center.name} which already has ${center._count.patients} patients. ` +
            `Existing patient MR numbers will NOT be changed.`
          );

          throw new BadRequestException(
            `Cannot change MR prefix for center with existing patients (${center._count.patients} patients). ` +
            `Contact system administrator if prefix change is absolutely necessary.`
          );
        }

        updateData.mrPrefix = updateData.mrPrefix.toUpperCase();
      }

      // If updating code, check uniqueness
      if (updateData.code && updateData.code.toUpperCase() !== center.code) {
        const existingCenter = await this.prisma.center.findUnique({
          where: { code: updateData.code.toUpperCase() },
        });

        if (existingCenter) {
          throw new ConflictException(`Center with code ${updateData.code} already exists`);
        }

        updateData.code = updateData.code.toUpperCase();
      }

      // Update center
      const updatedCenter = await this.prisma.center.update({
        where: { id },
        data: {
          ...(updateData.name && { name: updateData.name }),
          ...(updateData.code && { code: updateData.code }),
          ...(updateData.province && { province: updateData.province }),
          ...(updateData.regency !== undefined && { regency: updateData.regency }),
          ...(updateData.address !== undefined && { address: updateData.address }),
          ...(updateData.mrPrefix && { mrPrefix: updateData.mrPrefix }),
          ...(updateData.isActive !== undefined && { isActive: updateData.isActive }),
        },
      });

      this.logger.log(`Center updated: ${updatedCenter.name}`);
      return updatedCenter;
    } catch (error) {
      this.logger.error(`Error updating center: ${id}`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const center = await this.findById(id);

      // Prevent deleting the default center
      if (center.code === 'DEFAULT') {
        throw new ConflictException('Cannot delete default center');
      }

      // Check if center has active users
      const userCount = await this.prisma.user.count({
        where: {
          centerId: id,
          isActive: true,
        },
      });

      if (userCount > 0) {
        throw new ConflictException(`Cannot delete center with ${userCount} active users`);
      }

      await this.prisma.center.delete({
        where: { id },
      });

      this.logger.log(`Center deleted: ${center.name} (${center.code})`);
    } catch (error) {
      this.logger.error(`Error deleting center with ID: ${id}`, error);
      throw error;
    }
  }

  async deactivate(id: string): Promise<Center> {
    try {
      const center = await this.findById(id);

      // Prevent deactivating the default center
      if (center.code === 'DEFAULT') {
        throw new ConflictException('Cannot deactivate default center');
      }

      const deactivatedCenter = await this.prisma.center.update({
        where: { id },
        data: { isActive: false },
      });

      this.logger.log(`Center deactivated: ${deactivatedCenter.name} (${deactivatedCenter.code})`);
      return deactivatedCenter;
    } catch (error) {
      this.logger.error(`Error deactivating center with ID: ${id}`, error);
      throw error;
    }
  }

  async activate(id: string): Promise<Center> {
    try {
      const activatedCenter = await this.prisma.center.update({
        where: { id },
        data: { isActive: true },
      });

      this.logger.log(`Center activated: ${activatedCenter.name} (${activatedCenter.code})`);
      return activatedCenter;
    } catch (error) {
      this.logger.error(`Error activating center with ID: ${id}`, error);
      throw error;
    }
  }

  async getStatistics(): Promise<any> {
    try {
      const [totalCenters, activeCenters, inactiveCenters] = await Promise.all([
        this.prisma.center.count(),
        this.prisma.center.count({
          where: { isActive: true },
        }),
        this.prisma.center.count({
          where: { isActive: false },
        }),
      ]);

      // Get user statistics per center
      const centerUserStats = await this.prisma.center.findMany({
        select: {
          id: true,
          name: true,
          code: true,
          _count: {
            select: {
              users: {
                where: {
                  isActive: true,
                },
              },
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      });

      return {
        totalCenters,
        activeCenters,
        inactiveCenters,
        centerUserStats: centerUserStats.map(center => ({
          id: center.id,
          name: center.name,
          code: center.code,
          userCount: center._count.users,
        })),
      };
    } catch (error) {
      this.logger.error('Error getting center statistics', error);
      throw error;
    }
  }

  async getCenterUsers(centerId: string): Promise<any[]> {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          centerId,
          isActive: true,
        },
        select: {
          id: true,
          email: true,
          name: true,
          kolegiumId: true,
          isActive: true,
          createdAt: true,
          userRoles: {
            include: {
              role: true,
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      });

      return users.map(user => ({
        ...user,
        roles: user.userRoles.map(ur => ur.role),
        userRoles: undefined,
      }));
    } catch (error) {
      this.logger.error(`Error getting users for center ${centerId}`, error);
      throw error;
    }
  }

  /**
   * Get MR prefix availability (for validation UI)
   */
  async checkMrPrefixAvailability(prefix: string): Promise<{
    available: boolean;
    valid: boolean;
    message: string;
  }> {
    try {
      const upperPrefix = prefix.toUpperCase();

      // Validate format
      const valid = this.medicalRecordService.validateMrPrefix(upperPrefix);

      if (!valid) {
        return {
          available: false,
          valid: false,
          message: 'Invalid format. Must be 3 uppercase letters (e.g., SBY, JKT, BDG)',
        };
      }

      // Check uniqueness
      const isUnique = await this.medicalRecordService.isMrPrefixUnique(upperPrefix);

      if (!isUnique) {
        const existingCenter = await this.prisma.center.findFirst({
          where: { mrPrefix: upperPrefix },
          select: { name: true },
        });

        return {
          available: false,
          valid: true,
          message: `Already used by ${existingCenter?.name}`,
        };
      }

      return {
        available: true,
        valid: true,
        message: 'Available',
      };
    } catch (error) {
      this.logger.error(`Error checking MR prefix availability: ${prefix}`, error);
      throw error;
    }
  }

  /**
   * Get remote database configuration for a center (for desktop sync)
   * Returns null if no remote DB is configured
   */
  async getRemoteDbConfig(centerId: string): Promise<{
    url: string | null;
    apiKey: string | null;
  } | null> {
    try {
      const center = await this.prisma.center.findUnique({
        where: { id: centerId },
        select: {
          id: true,
          remoteDbUrl: true,
          remoteDbApiKey: true,
        },
      });

      if (!center || !center.remoteDbUrl) {
        return null;
      }

      return {
        url: center.remoteDbUrl,
        apiKey: center.remoteDbApiKey,
      };
    } catch (error) {
      this.logger.error(`Error getting remote DB config for center ${centerId}`, error);
      throw error;
    }
  }

  /**
   * Update remote database configuration for a center
   */
  async updateRemoteDbConfig(
    centerId: string,
    config: {
      remoteDbUrl?: string | null;
      remoteDbApiKey?: string | null;
    },
  ): Promise<Center> {
    try {
      const center = await this.prisma.center.findUnique({
        where: { id: centerId },
      });

      if (!center) {
        throw new NotFoundException(`Center with ID ${centerId} not found`);
      }

      const updatedCenter = await this.prisma.center.update({
        where: { id: centerId },
        data: {
          ...(config.remoteDbUrl !== undefined && { remoteDbUrl: config.remoteDbUrl }),
          ...(config.remoteDbApiKey !== undefined && { remoteDbApiKey: config.remoteDbApiKey }),
        },
      });

      this.logger.log(`Remote DB config updated for center: ${center.name}`);
      return updatedCenter;
    } catch (error) {
      this.logger.error(`Error updating remote DB config for center ${centerId}`, error);
      throw error;
    }
  }
}
