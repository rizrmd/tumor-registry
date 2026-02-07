import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class MedicalRecordService {
    constructor(private prisma: PrismaService) { }

    /**
     * Generate INAMSOS Medical Record Number
     * Thread-safe dengan database transaction
     */
    /**
     * Generate INAMSOS Medical Record Number
     * Thread-safe dengan database transaction
     * Uses Base36 encoding for sequence to support >60M records/year
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

        // Atomic increment dengan transaction
        const sequence = await this.prisma.$transaction(async (tx) => {
            let seqRecord = await tx.medicalRecordSequence.findUnique({
                where: {
                    centerId_year: { centerId, year }
                }
            });

            if (!seqRecord) {
                // First patient this year for this center
                seqRecord = await tx.medicalRecordSequence.create({
                    data: { centerId, year, lastSequence: 1 }
                });
                return 1;
            } else {
                // Increment sequence
                const updated = await tx.medicalRecordSequence.update({
                    where: { id: seqRecord.id },
                    data: { lastSequence: { increment: 1 } }
                });
                return updated.lastSequence;
            }
        });

        // Format: SBY-2025-003D7 (Base36 encoding, 5 chars padded)
        const sequenceBase36 = sequence.toString(36).toUpperCase().padStart(5, '0');
        const mrNumber = `${center.mrPrefix}-${year}-${sequenceBase36}`;

        return mrNumber;
    }

    /**
     * Validate MR number format
     */
    /**
     * Validate MR number format
     * Format: PPP-YYYY-SSSSS where S is alphanumeric (Base36)
     */
    validateFormat(mrNumber: string): boolean {
        // Updated regex to accept alphanumeric sequence (Base36)
        const regex = /^[A-Z]{3}-\d{4}-[A-Z0-9]{5}$/;
        return regex.test(mrNumber);
    }

    /**
     * Parse MR number
     */
    parseNumber(mrNumber: string) {
        const parts = mrNumber.split('-');
        if (parts.length !== 3) return null;

        return {
            centerPrefix: parts[0],
            year: parseInt(parts[1]),
            sequence: parseInt(parts[2], 36) // Decode Base36
        };
    }
}
