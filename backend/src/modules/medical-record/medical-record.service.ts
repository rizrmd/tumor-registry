import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class MedicalRecordService {
    private readonly logger = new Logger(MedicalRecordService.name);

    constructor(private prisma: PrismaService) { }

    /**
     * Generate INAMSOS National Registration Number (NEW FORMAT)
     * Format: CC-YY-NNNNN (2 digit center, 2 digit year, 5 digit national sequence)
     * Example: 01-25-00001, 15-25-00421
     * 
     * Thread-safe dengan database transaction
     */
    async generateNationalRegistrationNumber(centerId: string, year?: number): Promise<string> {
        const center = await this.prisma.center.findUnique({
            where: { id: centerId },
            select: { registrationCode: true, name: true }
        });

        if (!center || !center.registrationCode) {
            throw new Error(`Center registration code not configured for center: ${center?.name || centerId}`);
        }

        const yearShort = year ? year % 100 : new Date().getFullYear() % 100;

        // Atomic increment dari tabel nasional (bukan per center)
        const sequence = await this.prisma.$transaction(async (tx) => {
            let seqRecord = await tx.nationalRegistrationSequence.findUnique({
                where: { year: yearShort }
            });

            if (!seqRecord) {
                // First patient this year nationally
                seqRecord = await tx.nationalRegistrationSequence.create({
                    data: { year: yearShort, lastSequence: 1 }
                });
                return 1;
            } else {
                // Increment national sequence
                const updated = await tx.nationalRegistrationSequence.update({
                    where: { id: seqRecord.id },
                    data: { lastSequence: { increment: 1 } }
                });
                return updated.lastSequence;
            }
        });

        // Format: 01-25-00001 (CC-YY-NNNNN)
        const mrNumber = `${center.registrationCode}-${String(yearShort).padStart(2, '0')}-${String(sequence).padStart(5, '0')}`;

        this.logger.log(`Generated national registration number: ${mrNumber} for center: ${center.name}`);
        return mrNumber;
    }

    /**
     * Generate Temporary Registration Number (for offline desktop)
     * Format: CC-YY-T####T (temporary number with T prefix and suffix)
     * Example: 01-25-T0001T
     */
    async generateTemporaryNumber(centerId: string, deviceId: string, localSequence: number): Promise<string> {
        const center = await this.prisma.center.findUnique({
            where: { id: centerId },
            select: { registrationCode: true, tempNumberPrefix: true }
        });

        if (!center || !center.registrationCode) {
            throw new Error('Center registration code not configured');
        }

        const yearShort = new Date().getFullYear() % 100;
        const prefix = center.tempNumberPrefix || 'T';

        // Format: 01-25-T0001T (CC-YY-T####T)
        const tempNumber = `${center.registrationCode}-${String(yearShort).padStart(2, '0')}-${prefix}${String(localSequence).padStart(4, '0')}${prefix}`;

        return tempNumber;
    }

    /**
     * Reserve sequence block for desktop offline use
     * Returns a block of sequence numbers that desktop can use locally
     */
    async reserveSequenceBlock(centerId: string, deviceId: string, blockSize: number = 100): Promise<{ start: number; end: number }> {
        const yearShort = new Date().getFullYear() % 100;

        return this.prisma.$transaction(async (tx) => {
            // Get or create national sequence record
            let seqRecord = await tx.nationalRegistrationSequence.findUnique({
                where: { year: yearShort }
            });

            if (!seqRecord) {
                seqRecord = await tx.nationalRegistrationSequence.create({
                    data: { year: yearShort, lastSequence: 0 }
                });
            }

            const blockStart = seqRecord.lastSequence + 1;
            const blockEnd = blockStart + blockSize - 1;

            // Create block record
            await tx.desktopSequenceBlock.create({
                data: {
                    centerId,
                    deviceId,
                    year: yearShort,
                    blockStart,
                    blockEnd,
                    currentSequence: 0,
                    isActive: true
                }
            });

            // Update national sequence
            await tx.nationalRegistrationSequence.update({
                where: { id: seqRecord.id },
                data: { lastSequence: blockEnd }
            });

            this.logger.log(`Reserved sequence block ${blockStart}-${blockEnd} for device: ${deviceId}`);
            return { start: blockStart, end: blockEnd };
        });
    }

    /**
     * Convert temporary number to final national number during sync
     */
    async convertTemporaryToFinal(tempNumber: string, centerId: string): Promise<{ finalNumber: string; mapping: any }> {
        // Generate new final number
        const finalNumber = await this.generateNationalRegistrationNumber(centerId);

        // Create mapping record
        const mapping = {
            tempNumber,
            finalNumber,
            centerId,
            convertedAt: new Date().toISOString()
        };

        this.logger.log(`Converted temporary number ${tempNumber} to final ${finalNumber}`);
        return { finalNumber, mapping };
    }

    /**
     * Validate national registration number format (NEW)
     * Format: CC-YY-NNNNN where CC is 2 digits, YY is 2 digits, NNNNN is 5 digits
     */
    validateNationalFormat(recordNumber: string): boolean {
        const regex = /^\d{2}-\d{2}-\d{5}$/;
        return regex.test(recordNumber);
    }

    /**
     * Validate temporary number format
     * Format: CC-YY-T####T
     */
    validateTemporaryFormat(tempNumber: string): boolean {
        const regex = /^\d{2}-\d{2}-T\d{4}T$/;
        return regex.test(tempNumber);
    }

    /**
     * Parse national registration number
     */
    parseNationalNumber(recordNumber: string) {
        const parts = recordNumber.split('-');
        if (parts.length !== 3) return null;

        return {
            centerCode: parts[0],
            year: parseInt(parts[1]),
            sequence: parseInt(parts[2])
        };
    }

    /**
     * Get current national sequence for a year
     */
    async getCurrentNationalSequence(year?: number): Promise<number> {
        const yearShort = year ? year % 100 : new Date().getFullYear() % 100;

        const seqRecord = await this.prisma.nationalRegistrationSequence.findUnique({
            where: { year: yearShort }
        });

        return seqRecord?.lastSequence || 0;
    }

    // ========== LEGACY METHODS (for backward compatibility) ==========

    /**
     * Generate INAMSOS Medical Record Number (LEGACY FORMAT)
     * @deprecated Use generateNationalRegistrationNumber instead
     */
    async generateInamsosNumber(centerId: string): Promise<string> {
        const center = await this.prisma.center.findUnique({
            where: { id: centerId },
            select: { mrPrefix: true }
        });

        if (!center || !center.mrPrefix) {
            throw new Error('Center MR prefix not configured');
        }

        const year = new Date().getFullYear();

        const sequence = await this.prisma.$transaction(async (tx) => {
            let seqRecord = await tx.medicalRecordSequence.findUnique({
                where: { centerId_year: { centerId, year } }
            });

            if (!seqRecord) {
                seqRecord = await tx.medicalRecordSequence.create({
                    data: { centerId, year, lastSequence: 1 }
                });
                return 1;
            } else {
                const updated = await tx.medicalRecordSequence.update({
                    where: { id: seqRecord.id },
                    data: { lastSequence: { increment: 1 } }
                });
                return updated.lastSequence;
            }
        });

        const sequenceBase36 = sequence.toString(36).toUpperCase().padStart(5, '0');
        const mrNumber = `${center.mrPrefix}-${year}-${sequenceBase36}`;

        return mrNumber;
    }

    /**
     * Validate MR number format (LEGACY)
     * @deprecated Use validateNationalFormat instead
     */
    validateFormat(mrNumber: string): boolean {
        const regex = /^[A-Z]{3}-\d{4}-[A-Z0-9]{5}$/;
        return regex.test(mrNumber);
    }

    /**
     * Parse MR number (LEGACY)
     * @deprecated Use parseNationalNumber instead
     */
    parseNumber(mrNumber: string) {
        const parts = mrNumber.split('-');
        if (parts.length !== 3) return null;

        return {
            centerPrefix: parts[0],
            year: parseInt(parts[1]),
            sequence: parseInt(parts[2], 36)
        };
    }
}
