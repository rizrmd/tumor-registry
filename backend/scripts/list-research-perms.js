const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const permissions = await prisma.permission.findMany({
        where: {
            code: {
                contains: 'RESEARCH'
            }
        }
    });
    console.log('Research permissions:', permissions.map(p => p.code));
}

main().catch(console.error).finally(() => prisma.$disconnect());
