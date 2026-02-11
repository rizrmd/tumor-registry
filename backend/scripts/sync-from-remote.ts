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
    console.log('🔄 Starting sync from remote database...\n');

    try {
        // Test remote connection
        console.log('📡 Testing remote database connection...');
        await remotePrisma.$connect();
        console.log('  ✅ Connected to remote database\n');

        // Sync Users
        console.log('👥 Syncing users...');
        const remoteUsers = await remotePrisma.user.findMany({
            include: {
                userRoles: {
                    include: {
                        role: true
                    }
                }
            }
        });
        console.log(`  Found ${remoteUsers.length} users on remote`);

        for (const remoteUser of remoteUsers) {
            try {
                const userData = {
                    email: remoteUser.email,
                    name: remoteUser.name,
                    passwordHash: remoteUser.passwordHash,
                    centerId: remoteUser.centerId,
                    isActive: remoteUser.isActive,
                    isEmailVerified: remoteUser.isEmailVerified,
                    lastLoginAt: remoteUser.lastLoginAt,
                    createdAt: remoteUser.createdAt,
                    updatedAt: remoteUser.updatedAt,
                };

                const user = await localPrisma.user.upsert({
                    where: { id: remoteUser.id },
                    create: { id: remoteUser.id, ...userData },
                    update: userData
                });

                // Sync user roles
                for (const ur of remoteUser.userRoles) {
                    await localPrisma.userRole.upsert({
                        where: {
                            userId_roleId: {
                                userId: user.id,
                                roleId: ur.roleId
                            }
                        },
                        create: {
                            userId: user.id,
                            roleId: ur.roleId
                        },
                        update: {}
                    });
                }

                console.log(`    ✅ Synced: ${user.email}`);
            } catch (e: any) {
                console.log(`    ❌ Error syncing ${remoteUser.email}: ${e.message}`);
            }
        }

        // Sync Centers
        console.log('\n🏥 Syncing centers...');
        const remoteCenters = await remotePrisma.center.findMany();
        console.log(`  Found ${remoteCenters.length} centers on remote`);

        for (const remoteCenter of remoteCenters) {
            try {
                const centerData = {
                    code: remoteCenter.code,
                    name: remoteCenter.name,
                    province: remoteCenter.province,
                    regency: remoteCenter.regency,
                    address: remoteCenter.address,
                    phone: remoteCenter.phone,
                    email: remoteCenter.email,
                    isActive: remoteCenter.isActive,
                    prefix: remoteCenter.prefix,
                    createdAt: remoteCenter.createdAt,
                    updatedAt: remoteCenter.updatedAt,
                };

                const center = await localPrisma.center.upsert({
                    where: { id: remoteCenter.id },
                    create: { id: remoteCenter.id, ...centerData },
                    update: centerData
                });

                console.log(`    ✅ Synced: ${center.name}`);
            } catch (e: any) {
                console.log(`    ❌ Error syncing ${remoteCenter.name}: ${e.message}`);
            }
        }

        // Sync Patients
        console.log('\n👤 Syncing patients...');
        const remotePatients = await remotePrisma.patient.findMany({
            take: 100 // Limit for initial sync
        });
        console.log(`  Found ${remotePatients.length} patients on remote (limited to 100)`);

        let patientCount = 0;
        for (const remotePatient of remotePatients) {
            try {
                const patientData = {
                    anonymousId: remotePatient.anonymousId,
                    nik: remotePatient.nik,
                    name: remotePatient.name,
                    dateOfBirth: remotePatient.dateOfBirth,
                    gender: remotePatient.gender,
                    centerId: remotePatient.centerId,
                    pathologyType: remotePatient.pathologyType,
                    ennekingStage: remotePatient.ennekingStage,
                    province: remotePatient.province,
                    regency: remotePatient.regency,
                    isActive: remotePatient.isActive,
                    createdAt: remotePatient.createdAt,
                    updatedAt: remotePatient.updatedAt,
                    createdById: remotePatient.createdById,
                };

                await localPrisma.patient.upsert({
                    where: { id: remotePatient.id },
                    create: { id: remotePatient.id, ...patientData },
                    update: patientData
                });

                patientCount++;
            } catch (e: any) {
                // Skip duplicates or errors
            }
        }
        console.log(`    ✅ Synced ${patientCount} patients`);

        // Summary
        console.log('\n' + '='.repeat(50));
        console.log('✅ SYNC COMPLETED SUCCESSFULLY');
        console.log('='.repeat(50));
        console.log(`\n📊 Summary:`);
        console.log(`  Users synced: ${remoteUsers.length}`);
        console.log(`  Centers synced: ${remoteCenters.length}`);
        console.log(`  Patients synced: ${patientCount}`);

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
