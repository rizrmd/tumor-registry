import { PrismaClient } from '@prisma/client';

const remotePrisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgres://postgres:hltsXdfWOOGNkd32xsMbzp6bgBXPzPCiob6UEH0XL3qSt9OuqvEyhN0o3gZNSjuY@107.155.75.50:5389/tmr-reg?sslmode=disable"
        }
    }
});

async function main() {
    try {
        // Get column information from follow_up_visits table
        const result = await remotePrisma.$queryRaw`
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_schema = 'medical'
            AND table_name = 'follow_up_visits'
            ORDER BY ordinal_position;
        `;

        console.log('Columns in remote medical.follow_up_visits:');
        console.log('='.repeat(50));
        for (const row of result as any[]) {
            console.log(`  - ${row.column_name}: ${row.data_type}`);
        }
    } catch (error: any) {
        console.error('Error:', error.message);
    } finally {
        await remotePrisma.$disconnect();
    }
}

main();
