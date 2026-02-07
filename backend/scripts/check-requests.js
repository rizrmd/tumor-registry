const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const stats = await prisma.researchRequest.groupBy({
        by: ['status'],
        _count: true,
    });
    console.log('Research Request Statuses:', stats);

    const pending = await prisma.researchRequest.findMany({
        where: {
            status: { in: ['SUBMITTED', 'PENDING_REVIEW', 'UNDER_REVIEW'] },
        },
        select: { id: true, requestNumber: true, status: true }
    });
    console.log('Pending Requests:', pending);
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(() => prisma.$disconnect());
