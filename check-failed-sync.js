
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
        const failedItems = await prisma.offlineDataQueue.findMany({
            where: {
                errorMessage: {
                    contains: 'Remote'
                }
            },
            select: {
                id: true,
                entityType: true,
                operation: true,
                errorMessage: true,
                status: true
            }
        });
        console.log('FAILED_ITEMS:' + JSON.stringify(failedItems));
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
