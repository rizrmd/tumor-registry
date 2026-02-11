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
    console.log('👥 Syncing users with correct role mapping...\n');

    try {
        // Get all roles from local
        const localRoles = await localPrisma.role.findMany();
        const roleMap = new Map(localRoles.map(r => [r.name, r.id]));
        console.log('📋 Local roles:', Array.from(roleMap.keys()));

        // Get users from remote with roles
        const remoteUsers = await remotePrisma.user.findMany({
            include: {
                userRoles: {
                    include: { role: true }
                },
                center: true
            }
        });

        console.log(`\n👥 Found ${remoteUsers.length} users on remote\n`);

        for (const ru of remoteUsers) {
            try {
                // Create or update user
                const user = await localPrisma.user.upsert({
                    where: { email: ru.email },
                    create: {
                        id: ru.id,
                        email: ru.email,
                        name: ru.name,
                        passwordHash: ru.passwordHash,
                        centerId: ru.centerId,
                        isActive: ru.isActive ?? true,
                        isEmailVerified: ru.isEmailVerified ?? true,
                        lastLoginAt: ru.lastLoginAt,
                        createdAt: ru.createdAt,
                        updatedAt: ru.updatedAt,
                    },
                    update: {
                        name: ru.name,
                        passwordHash: ru.passwordHash,
                        centerId: ru.centerId,
                        isActive: ru.isActive ?? true,
                        updatedAt: ru.updatedAt,
                    }
                });

                // Get remote role name
                const remoteRole = ru.userRoles[0]?.role;
                if (!remoteRole) {
                    console.log(`  ⚠️ ${ru.email} - No role assigned`);
                    continue;
                }

                // Map to local role
                const localRoleId = roleMap.get(remoteRole.name);
                if (!localRoleId) {
                    console.log(`  ❌ ${ru.email} - Role "${remoteRole.name}" not found locally`);
                    continue;
                }

                // Assign role
                await localPrisma.userRole.upsert({
                    where: {
                        userId_roleId: {
                            userId: user.id,
                            roleId: localRoleId
                        }
                    },
                    create: {
                        userId: user.id,
                        roleId: localRoleId
                    },
                    update: {}
                });

                console.log(`  ✅ ${ru.email} - ${remoteRole.name} (${ru.center?.name || 'No center'})`);
            } catch (e: any) {
                console.log(`  ❌ ${ru.email} - ${e.message}`);
            }
        }

        // Summary
        const localUsers = await localPrisma.user.findMany({
            include: {
                userRoles: { include: { role: true } },
                center: true
            }
        });

        console.log('\n' + '='.repeat(60));
        console.log('✅ USER SYNC COMPLETED');
        console.log('='.repeat(60));
        console.log(`\n📊 Total users in local database: ${localUsers.length}\n`);

        for (const u of localUsers) {
            const role = u.userRoles[0]?.role?.name || 'No role';
            const center = u.center?.name || 'No center';
            console.log(`  ${u.email}`);
            console.log(`    Role: ${role}`);
            console.log(`    Center: ${center}`);
            console.log(`    Status: ${u.isActive ? 'Active' : 'Inactive'}`);
            console.log('');
        }

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
