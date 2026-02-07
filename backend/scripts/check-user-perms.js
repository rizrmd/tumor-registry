const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.findFirst({
        where: { email: 'admin@inamsos.go.id' },
        include: {
            userRoles: {
                include: {
                    role: {
                        include: {
                            permissions: {
                                include: {
                                    permission: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    if (!user) {
        console.log('User not found');
        return;
    }

    console.log('User:', user.email);
    const permissions = user.userRoles.flatMap(ur =>
        ur.role.permissions.map(rp => rp.permission.code)
    );
    console.log('Permissions:', permissions);
}

main().catch(console.error).finally(() => prisma.$disconnect());
