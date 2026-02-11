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

        // Step 1: Clear local data (keep roles and permissions)
        console.log('🧹 Clearing local data...');
        await localPrisma.patient.deleteMany({});
        await localPrisma.userRole.deleteMany({});
        await localPrisma.user.deleteMany({});
        await localPrisma.center.deleteMany({});
        console.log('  ✅ Local data cleared\n');

        // Step 2: Sync Centers first (required for users)
        console.log('🏥 Syncing centers...');
        const remoteCenters = await remotePrisma.center.findMany();
        console.log(`  Found ${remoteCenters.length} centers on remote`);

        for (const rc of remoteCenters) {
            try {
                await localPrisma.center.create({
                    data: {
                        id: rc.id,
                        code: rc.code,
                        name: rc.name,
                        province: rc.province,
                        regency: rc.regency,
                        address: rc.address,
                        phone: rc.phone,
                        email: rc.email,
                        isActive: rc.isActive,
                        prefix: rc.prefix,
                        createdAt: rc.createdAt,
                        updatedAt: rc.updatedAt,
                    }
                });
                console.log(`    ✅ ${rc.name}`);
            } catch (e: any) {
                console.log(`    ❌ ${rc.name}: ${e.message}`);
            }
        }

        // Step 3: Sync Users
        console.log('\n👥 Syncing users...');
        const remoteUsers = await remotePrisma.user.findMany({
            include: {
                userRoles: {
                    include: { role: true }
                }
            }
        });
        console.log(`  Found ${remoteUsers.length} users on remote`);

        for (const ru of remoteUsers) {
            try {
                const user = await localPrisma.user.create({
                    data: {
                        id: ru.id,
                        email: ru.email,
                        name: ru.name,
                        passwordHash: ru.passwordHash,
                        centerId: ru.centerId,
                        isActive: ru.isActive,
                        isEmailVerified: ru.isEmailVerified,
                        lastLoginAt: ru.lastLoginAt,
                        createdAt: ru.createdAt,
                        updatedAt: ru.updatedAt,
                    }
                });

                // Sync user roles
                for (const ur of ru.userRoles) {
                    await localPrisma.userRole.create({
                        data: {
                            userId: user.id,
                            roleId: ur.roleId
                        }
                    });
                }

                console.log(`    ✅ ${ru.email}`);
            } catch (e: any) {
                console.log(`    ❌ ${ru.email}: ${e.message}`);
            }
        }

        // Step 4: Sync Patients
        console.log('\n👤 Syncing patients...');
        const remotePatients = await remotePrisma.patient.findMany({
            take: 500 // Sync up to 500 patients
        });
        console.log(`  Found ${remotePatients.length} patients on remote`);

        let syncedCount = 0;
        for (const rp of remotePatients) {
            try {
                await localPrisma.patient.create({
                    data: {
                        id: rp.id,
                        anonymousId: rp.anonymousId,
                        nik: rp.nik,
                        name: rp.name,
                        dateOfBirth: rp.dateOfBirth,
                        gender: rp.gender,
                        centerId: rp.centerId,
                        pathologyType: rp.pathologyType,
                        ennekingStage: rp.ennekingStage,
                        province: rp.province,
                        regency: rp.regency,
                        isActive: rp.isActive,
                        createdAt: rp.createdAt,
                        updatedAt: rp.updatedAt,
                        createdById: rp.createdById,
                    }
                });
                syncedCount++;
            } catch (e: any) {
                // Skip errors
            }
        }
        console.log(`    ✅ Synced ${syncedCount} patients`);

        // Summary
        console.log('\n' + '='.repeat(50));
        console.log('✅ SYNC COMPLETED');
        console.log('='.repeat(50));
        console.log(`\n📊 Summary:`);
        console.log(`  Centers: ${remoteCenters.length}`);
        console.log(`  Users: ${remoteUsers.length}`);
        console.log(`  Patients: ${syncedCount} / ${remotePatients.length}`);

        // Get local counts
        const localCounts = {
            centers: await localPrisma.center.count(),
            users: await localPrisma.user.count(),
            patients: await localPrisma.patient.count(),
        };
        console.log(`\n📁 Local database now has:`);
        console.log(`  Centers: ${localCounts.centers}`);
        console.log(`  Users: ${localCounts.users}`);
        console.log(`  Patients: ${localCounts.patients}`);

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
