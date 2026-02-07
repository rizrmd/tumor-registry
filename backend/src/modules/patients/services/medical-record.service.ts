import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';

/**
 * Medical Record Number Service
 * Handles generation and validation of INAMSOS Medical Record Numbers
 * Format: {CENTER_PREFIX}-{YEAR}-{SEQUENTIAL}
 * Example: SBY-2025-00001
 */
@Injectable()
export class MedicalRecordService {
  constructor(private prisma: PrismaService) { }

  /**
   * Generate INAMSOS Medical Record Number
   * Thread-safe with database transactions
   *
   * @param centerId - Treatment center ID
   * @param diagnosisYear - Year of diagnosis (optional, defaults to current year)
   * @returns Generated MR number (e.g., 'SBY-2025-00001')
   */
  async generateInamsosNumber(
    centerId: string,
    diagnosisYear?: number
  ): Promise<string> {
    // Get center with MR prefix
    const center = await this.prisma.center.findUnique({
      where: { id: centerId },
      select: { mrPrefix: true, name: true },
    });

    if (!center) {
      throw new BadRequestException(`Center ${centerId} not found`);
    }

    if (!center.mrPrefix) {
      throw new BadRequestException(
        `Center "${center.name}" does not have MR prefix configured. Please configure in center settings.`
      );
    }

    // Use diagnosis year or current year
    const year = diagnosisYear || new Date().getFullYear();

    // Generate sequence number with transaction (thread-safe)
    const sequence = await this.prisma.$transaction(async (tx) => {
      // Try to find existing sequence record for this center+year
      let seqRecord = await tx.medicalRecordSequence.findUnique({
        where: {
          centerId_year: {
            centerId,
            year,
          },
        },
      });

      if (!seqRecord) {
        // First patient for this center this year
        seqRecord = await tx.medicalRecordSequence.create({
          data: {
            centerId,
            year,
            lastSequence: 1,
          },
        });
        return 1;
      } else {
        // Increment sequence
        const updated = await tx.medicalRecordSequence.update({
          where: { id: seqRecord.id },
          data: {
            lastSequence: { increment: 1 },
            updatedAt: new Date(),
          },
        });
        return updated.lastSequence;
      }
    });

    // Format: SBY-2025-000001 (Base36 support)
    // Using Base36 allows for millions of records with fewer characters
    // 6 chars Base36 capacity = 2.1 billion
    const sequenceStr = sequence.toString(36).toUpperCase().padStart(6, '0');
    const mrNumber = `${center.mrPrefix}-${year}-${sequenceStr}`;

    return mrNumber;
  }

  /**
   * Generate Anonymous Patient ID
   * Format: P-{CENTER_PREFIX}-{SEQUENTIAL}
   * Example: P-SBY-00123
   *
   * @param centerId - Treatment center ID
   * @param inamsosRecordNumber - INAMSOS MR number to extract sequence from
   * @returns Anonymous ID
   */
  generateAnonymousId(centerId: string, inamsosRecordNumber: string): string {
    // Parse INAMSOS MR number to get components
    const parsed = this.parseInamsosNumber(inamsosRecordNumber);

    if (!parsed) {
      throw new BadRequestException('Invalid INAMSOS MR number format');
    }

    // Format: P-SBY-00001
    return `P-${parsed.centerPrefix}-${String(parsed.sequence).padStart(5, '0')}`;
  }

  /**
   * Validate INAMSOS MR number format
   * Format: XXX-YYYY-NNNNN (3 letters, 4 digits, 5 digits)
   *
   * @param mrNumber - MR number to validate
   * @returns true if valid format
   */
  validateFormat(mrNumber: string): boolean {
    // Base36 support: SBY-2025-00A1B (alphanumeric suffix)
    const regex = /^[A-Z]{3}-\d{4}-[A-Z0-9]{5,6}$/;
    return regex.test(mrNumber);
  }

  /**
   * Parse INAMSOS MR number into components
   *
   * @param mrNumber - MR number to parse (e.g., 'SBY-2025-00001')
   * @returns Parsed components or null if invalid
   */
  parseInamsosNumber(mrNumber: string): {
    centerPrefix: string;
    year: number;
    sequence: number;
  } | null {
    if (!this.validateFormat(mrNumber)) {
      return null;
    }

    const parts = mrNumber.split('-');

    return {
      centerPrefix: parts[0],
      year: parseInt(parts[1], 10),
      // Fix parsing for Base36
      sequence: parseInt(parts[2], 36),
    };
  }

  /**
   * Validate MR prefix format (3 uppercase letters)
   *
   * @param prefix - Prefix to validate
   * @returns true if valid
   */
  validateMrPrefix(prefix: string): boolean {
    const regex = /^[A-Z]{3}$/;
    return regex.test(prefix);
  }

  /**
   * Check if MR prefix is unique (not used by other centers)
   *
   * @param prefix - Prefix to check
   * @param excludeCenterId - Center ID to exclude (for updates)
   * @returns true if unique
   */
  async isMrPrefixUnique(
    prefix: string,
    excludeCenterId?: string
  ): Promise<boolean> {
    const whereClause: any = {
      mrPrefix: prefix,
    };

    if (excludeCenterId) {
      whereClause.id = { not: excludeCenterId };
    }

    const existingCenter = await this.prisma.center.findFirst({
      where: whereClause,
    });

    return !existingCenter;
  }

  /**
   * Get statistics for MR number generation
   *
   * @param centerId - Center ID (optional, for specific center)
   * @returns Statistics
   */
  async getStatistics(centerId?: string) {
    const where: any = {};

    if (centerId) {
      where.centerId = centerId;
    }

    const sequences = await this.prisma.medicalRecordSequence.findMany({
      where,
      include: {
        center: {
          select: {
            id: true,
            name: true,
            mrPrefix: true,
          },
        },
      },
      orderBy: [{ year: 'desc' }, { lastSequence: 'desc' }],
    });

    // Group by center
    const byCenter = sequences.reduce((acc, seq) => {
      const centerId = seq.center.id;

      if (!acc[centerId]) {
        acc[centerId] = {
          centerName: seq.center.name,
          mrPrefix: seq.center.mrPrefix,
          years: [],
          totalPatients: 0,
        };
      }

      acc[centerId].years.push({
        year: seq.year,
        patientCount: seq.lastSequence,
      });

      acc[centerId].totalPatients += seq.lastSequence;

      return acc;
    }, {} as Record<string, any>);

    return {
      totalSequences: sequences.length,
      centers: Object.values(byCenter),
    };
  }

  /**
   * Reset sequence counter for new year (admin function)
   * Note: This is usually not needed as system auto-creates new year sequences
   *
   * @param centerId - Center ID
   * @param year - Year to reset
   */
  async resetSequenceCounter(centerId: string, year: number): Promise<void> {
    const existing = await this.prisma.medicalRecordSequence.findUnique({
      where: {
        centerId_year: { centerId, year },
      },
    });

    if (existing) {
      throw new ConflictException(
        `Sequence for center ${centerId} year ${year} already exists with ${existing.lastSequence} patients. Cannot reset.`
      );
    }

    // Create new sequence for the year
    await this.prisma.medicalRecordSequence.create({
      data: {
        centerId,
        year,
        lastSequence: 0,
      },
    });
  }

  /**
   * Get current sequence number for center+year
   *
   * @param centerId - Center ID
   * @param year - Year (optional, defaults to current year)
   * @returns Current sequence number (0 if not started)
   */
  async getCurrentSequence(centerId: string, year?: number): Promise<number> {
    const targetYear = year || new Date().getFullYear();

    const sequence = await this.prisma.medicalRecordSequence.findUnique({
      where: {
        centerId_year: { centerId, year: targetYear },
      },
    });

    return sequence?.lastSequence || 0;
  }

  /**
   * Preview next MR number that would be generated
   * (Does not actually generate or increment)
   *
   * @param centerId - Center ID
   * @param year - Year (optional)
   * @returns Preview of next MR number
   */
  async previewNextNumber(centerId: string, year?: number): Promise<string> {
    const center = await this.prisma.center.findUnique({
      where: { id: centerId },
      select: { mrPrefix: true },
    });

    if (!center?.mrPrefix) {
      throw new BadRequestException('Center does not have MR prefix configured');
    }

    const targetYear = year || new Date().getFullYear();
    const currentSequence = await this.getCurrentSequence(centerId, targetYear);
    const nextSequence = currentSequence + 1;

    const nextSequenceStr = nextSequence.toString(36).toUpperCase().padStart(6, '0');
    return `${center.mrPrefix}-${targetYear}-${nextSequenceStr}`;
  }
}
