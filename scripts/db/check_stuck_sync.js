const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkStuck() {
    try {
        const processing = await prisma.offlineDataQueue.findMany({
            where: { status: 'PROCESSING' },
            select: { id: true, entityType: true, operation: true, createdAt: true, status: true }
        });
        console.log('STUCK_RECORDS_START');
        console.log(JSON.stringify(processing));
        console.log('STUCK_RECORDS_END');

        // Auto-reset stuck items older than 30 minutes
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
        const result = await prisma.offlineDataQueue.updateMany({
            where: {
                status: 'PROCESSING',
                updatedAt: { lt: thirtyMinutesAgo }
            },
            data: {
                status: 'PENDING',
                retryCount: { increment: 1 }
            }
        });
        console.log('RESET_RESULT:', result.count);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
checkStuck();
