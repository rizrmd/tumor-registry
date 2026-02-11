
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres@127.0.0.1:54321/postgres?schema=system"
        }
    }
});

async function main() {
    try {
        // Delete failed items related to national-dashboard or national-statistics-cache
        // to clear the "FAILED" status in the UI
        const deleted = await prisma.offlineDataQueue.deleteMany({
            where: {
                status: 'FAILED',
                OR: [
                    { entityType: 'national-dashboard' },
                    { entityType: 'national-statistics-cache' },
                    { errorMessage: { contains: 'Remote' } }
                ]
            }
        });
        console.log(`Successfully cleared ${deleted.count} failed sync items.`);
    } catch (e) {
        console.error('Error clearing failed items:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
