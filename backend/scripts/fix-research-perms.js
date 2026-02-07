const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const perms = [
        { code: 'RESEARCH_REQUESTS_REVIEW', name: 'Review Research Requests', resource: 'research-requests', action: 'review' },
        { code: 'RESEARCH_REQUESTS_APPROVE', name: 'Approve Research Requests', resource: 'research-requests', action: 'approve' }
    ];

    for (const p of perms) {
        await prisma.permission.upsert({
            where: { code: p.code },
            update: {},
            create: p
        });
    }
    console.log('Permissions created/verified');

    // Assign to NATIONAL_ADMIN and ADMIN roles
    const roles = await prisma.role.findMany({
        where: { code: { in: ['NATIONAL_ADMIN', 'ADMIN', 'SYSTEM_ADMIN'] } }
    });

    for (const role of roles) {
        for (const p of perms) {
            const permission = await prisma.permission.findUnique({ where: { code: p.code } });
            await prisma.rolePermission.upsert({
                where: {
                    roleId_permissionId: {
                        roleId: role.id,
                        permissionId: permission.id
                    }
                },
                update: {},
                create: {
                    roleId: role.id,
                    permissionId: permission.id
                }
            });
        }
    }
    console.log('Permissions assigned to roles');
}

main().catch(console.error).finally(() => prisma.$disconnect());
