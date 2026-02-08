import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const failedItems = await prisma.offlineDataQueue.count({
        where: { status: 'FAILED' },
    });

    console.log(`Found ${failedItems} failed items.`);

    if (failedItems > 0) {
        const reset = await prisma.offlineDataQueue.updateMany({
            where: { status: 'FAILED' },
            data: {
                status: 'PENDING',
                attemptCount: 0,
                errorMessage: null,
                errorDetails: null
            }
        });

        console.log(`Reset ${reset.count} items from FAILED to PENDING with 0 attempts.`);
    } else {
        console.log('No failed items to reset.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
