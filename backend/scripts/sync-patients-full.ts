import { PrismaClient } from '@prisma/client';

const localPrisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres@127.0.0.1:54321/postgres?schema=system"
        }
    }
});

const remotePrisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgres://postgres:hltsXdfWOOGNkd32xsMbzp6bgBXPzPCiob6UEH0XL3qSt9OuqvEyhN0o3gZNSjuY@107.155.75.50:5389/tmr-reg?sslmode=disable"
        }
    }
});

async function main() {
    console.log('🔄 Starting full sync from remote database...\n');

    try {
        // Test remote connection
        console.log('📡 Testing remote database connection...');
        await remotePrisma.$connect();
        console.log('  ✅ Connected to remote database\n');

        // Get remote patients
        console.log('👤 Syncing patients with full data...');
        const remotePatients = await remotePrisma.patient.findMany({
            take: 500
        });
        console.log(`  Found ${remotePatients.length} patients on remote\n`);

        let syncedCount = 0;
        let emptyMRCount = 0;

        for (const rp of remotePatients) {
            try {
                // Check if MR Number is empty
                if (!rp.inamsosRecordNumber && !rp.hospitalRecordNumber) {
                    emptyMRCount++;
                    console.log(`  ⚠️  Pasien ${rp.name} (${rp.id}) - MR Number kosong`);
                }

                await localPrisma.patient.upsert({
                    where: { id: rp.id },
                    create: {
                        id: rp.id,
                        anonymousId: rp.anonymousId,
                        inamsosRecordNumber: rp.inamsosRecordNumber,
                        hospitalRecordNumber: rp.hospitalRecordNumber,
                        nik: rp.nik,
                        name: rp.name,
                        dateOfBirth: rp.dateOfBirth,
                        gender: rp.gender,
                        centerId: rp.centerId,
                        pathologyType: rp.pathologyType,
                        ennekingStage: rp.ennekingStage,
                        province: rp.province,
                        regency: rp.regency,
                        isActive: rp.isActive ?? true,
                        createdAt: rp.createdAt,
                        updatedAt: rp.updatedAt,
                        createdById: rp.createdById,
                    },
                    update: {
                        anonymousId: rp.anonymousId,
                        inamsosRecordNumber: rp.inamsosRecordNumber,
                        hospitalRecordNumber: rp.hospitalRecordNumber,
                        name: rp.name,
                        dateOfBirth: rp.dateOfBirth,
                        gender: rp.gender,
                        centerId: rp.centerId,
                        pathologyType: rp.pathologyType,
                        ennekingStage: rp.ennekingStage,
                        province: rp.province,
                        regency: rp.regency,
                        isActive: rp.isActive ?? true,
                        updatedAt: rp.updatedAt,
                    }
                });
                syncedCount++;
            } catch (e: any) {
                console.log(`    ❌ Error syncing ${rp.name}: ${e.message}`);
            }
        }

        console.log(`\n    ✅ Synced ${syncedCount} patients`);
        console.log(`    ⚠️  Patients with empty MR Number: ${emptyMRCount}`);

        // Get local counts
        const localCounts = {
            patients: await localPrisma.patient.count(),
            medicalRecords: await localPrisma.medicalRecord.count(),
        };

        console.log(`\n📁 Local database now has:`);
        console.log(`  Patients: ${localCounts.patients}`);
        console.log(`  Medical Records: ${localCounts.medicalRecords}`);

        console.log('\n' + '='.repeat(60));
        console.log('✅ SYNC COMPLETED');
        console.log('='.repeat(60));

    } catch (error: any) {
        console.error('\n❌ Sync failed:', error.message);
        throw error;
    } finally {
        await localPrisma.$disconnect();
        await remotePrisma.$disconnect();
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
