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
        console.log('Checking for stuck PENDING items...');

        // Find items with attempt_count > max_attempts
        const stuckItems = await prisma.offlineDataQueue.findMany({
            where: {
                status: 'PENDING',
                attemptCount: {
                    gt: prisma.offlineDataQueue.fields.maxAttempts
                }
            }
        });

        console.log(`Found ${stuckItems.length} stuck items`);

        if (stuckItems.length > 0) {
            // Update them to FAILED status
            const result = await prisma.offlineDataQueue.updateMany({
                where: {
                    status: 'PENDING',
                    attemptCount: {
                        gt: 3
                    }
                },
                data: {
                    status: 'FAILED'
                }
            });

            console.log(`Updated ${result.count} items to FAILED status`);
        }

        // Also check for items with very high attempt counts (>100)
        const veryStuckItems = await prisma.offlineDataQueue.findMany({
            where: {
                attemptCount: {
                    gt: 100
                }
            },
            select: {
                id: true,
                entityType: true,
                operation: true,
                status: true,
                attemptCount: true,
                maxAttempts: true
            }
        });

        console.log('\nItems with >100 attempts:');
        veryStuckItems.forEach(item => {
            console.log(`- ${item.entityType} (${item.operation}): ${item.status}, ${item.attemptCount}/${item.maxAttempts} attempts`);
        });

        if (veryStuckItems.length > 0) {
            const deleteResult = await prisma.offlineDataQueue.deleteMany({
                where: {
                    attemptCount: {
                        gt: 100
                    }
                }
            });
            console.log(`\nDeleted ${deleteResult.count} extremely stuck items`);
        }

        console.log('\nDone!');

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

fixStuckItems();
