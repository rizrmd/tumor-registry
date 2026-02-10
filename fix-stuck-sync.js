// Fix stuck sync items in offline queue
const { PrismaClient } = require('./backend/node_modules/@prisma/client');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: 'postgresql://postgres@127.0.0.1:54321/postgres?schema=system'
        }
    }
});

async function fixStuckItems() {
    try {
        console.log('Running Deep Clean on Sync Queue...');

        // 1. Delete 'national-dashboard' items (Invalid Entity)
        // These are creating the ghost pending items
        const invalidItems = await prisma.offlineDataQueue.deleteMany({
            where: {
                entityType: 'national-dashboard'
            }
        });
        console.log(`Deleted ${invalidItems.count} items with type 'national-dashboard'.`);

        // 2. Mark stuck items (> 10 attempts) as FAILED
        // The user reported items with ~94 attempts. We need to stop them.
        const stuckItems = await prisma.offlineDataQueue.updateMany({
            where: {
                status: 'PENDING',
                attemptCount: {
                    gt: 10
                }
            },
            data: {
                status: 'FAILED',
                errorMessage: 'Automatically marked FAILED due to excessive attempts (>10)'
            }
        });
        console.log(`Marked ${stuckItems.count} items (>10 attempts) as FAILED.`);

        // 3. Reset stuck PROCESSING items (older than 1 hour)
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const stuckProcessing = await prisma.offlineDataQueue.updateMany({
            where: {
                status: 'PROCESSING',
                updatedAt: {
                    lt: oneHourAgo
                }
            },
            data: {
                status: 'PENDING',
                attemptCount: { increment: 1 },
                errorMessage: 'Reset from stuck PROCESSING state'
            }
        });
        console.log(`Reset ${stuckProcessing.count} stuck PROCESSING items.`);

        console.log('\nDeep Clean Complete!');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

fixStuckItems();
