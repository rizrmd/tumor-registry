import { PrismaClient } from '@prisma/client';

const localPrisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres@127.0.0.1:54321/postgres?schema=system"
        }
    }
});

async function checkPatients() {
    console.log('=== Checking Patient Data with Filters ===\n');

    try {
        // Count all patients
        const totalPatients = await localPrisma.patient.count();
        console.log(`Total patients (no filter): ${totalPatients}`);

        // Count active patients
        const activePatients = await localPrisma.patient.count({
            where: { isActive: true }
        });
        console.log(`Active patients: ${activePatients}`);

        // Get first 5 active patients with their centerId
        const patients = await localPrisma.patient.findMany({
            where: { isActive: true },
            take: 5,
            select: {
                id: true,
                anonymousId: true,
                nik: true,
                isActive: true,
                centerId: true,
                createdById: true,
            }
        });

        console.log('\nFirst 5 active patients:');
        patients.forEach(p => {
            console.log(`  ${p.anonymousId}`);
            console.log(`    Center ID: ${p.centerId}`);
            console.log(`    Created By: ${p.createdById || 'None'}`);
        });

    } catch (error: any) {
        console.error('Error:', error.message);
    } finally {
        await localPrisma.$disconnect();
    }
}

checkPatients();
