import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres@127.0.0.1:54321/postgres?schema=system"
        }
    }
});

async function main() {
    try {
        // Get column information from follow_up_visits table
        const result = await prisma.$queryRaw`
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_schema = 'medical'
            AND table_name = 'follow_up_visits'
            ORDER BY ordinal_position;
        `;

        console.log('Columns in medical.follow_up_visits:');
        console.log('='.repeat(50));
        for (const row of result as any[]) {
            console.log(`  - ${row.column_name}: ${row.data_type}`);
        }
    } catch (error: any) {
        console.error('Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
