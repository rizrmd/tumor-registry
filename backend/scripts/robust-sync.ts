import { PrismaClient } from '@prisma/client';

const localPrisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres@127.0.0.1:54321/postgres?schema=system"
        }
    }
});

const remotePrisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgres://postgres:hltsXdfWOOGNkd32xsMbzp6bgBXPzPCiob6UEH0XL3qSt9OuqvEyhN0o3gZNSjuY@107.155.75.50:5389/tmr-reg?sslmode=disable"
        }
    }
});

/**
 * Robustly syncs a table by fetching all data via raw query 
 * and only inserting columns that exist in both databases.
 */
async function syncTable(tableName: string, schemaName: string, modelName: string, uniqueField: string = 'id') {
    console.log(`📋 Syncing table ${schemaName}.${tableName} (using ${uniqueField} for matching)...`);

    try {
        // 1. Get remote data
        const remoteData: any[] = await remotePrisma.$queryRawUnsafe(`SELECT * FROM "${schemaName}"."${tableName}"`);
        console.log(`  Found ${remoteData.length} rows on remote.`);

        if (remoteData.length === 0) return;

        // 2. Get local columns to filter remote data
        const localColumns: any[] = await localPrisma.$queryRaw`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_schema = ${schemaName} 
            AND table_name = ${tableName}
        `;
        const localColumnNames = new Set(localColumns.map(c => c.column_name));

        let synced = 0;
        let errors = 0;

        for (const row of remoteData) {
            // Filter row to only include columns that exist locally
            const filteredRow: any = {};
            for (const [key, value] of Object.entries(row)) {
                if (localColumnNames.has(key)) {
                    filteredRow[key] = value;
                }
            }

            try {
                const whereClause: any = {};
                whereClause[uniqueField] = filteredRow[uniqueField];

                await (localPrisma as any)[modelName].upsert({
                    where: whereClause,
                    create: filteredRow,
                    update: filteredRow
                });
                synced++;
            } catch (e: any) {
                // If ID is different but unique field matches, we might need a better way.
                // But for now let's just log and try to continue.
                errors++;
                if (errors < 3) console.log(`    ❌ Error syncing row ${filteredRow[uniqueField]}: ${e.message}`);

                // Special case: if unique constraint failed, try to delete and recreate? 
                // No, that's risky. Let's just try to find by ID and delete if unique field mismatch.
                if (e.message.includes('Unique constraint failed')) {
                    // Try to find the local record with same unique field but different ID
                    const existing = await (localPrisma as any)[modelName].findUnique({
                        where: whereClause
                    });
                    if (existing && existing.id !== filteredRow.id) {
                        try {
                            // If we can't update due to ID mismatch, we delete local and re-sync
                            // (Only for centers/roles where IDs might have diverged from seed)
                            await (localPrisma as any)[modelName].delete({ where: whereClause });
                            await (localPrisma as any)[modelName].create({ data: filteredRow });
                            synced++;
                            errors--; // "Resolved"
                        } catch (e2) { }
                    }
                }
            }
        }

        console.log(`  ✅ Synced ${synced} rows (${errors} errors).\n`);
    } catch (error: any) {
        console.error(`  ❌ Failed to sync ${tableName}:`, error.message);
    }
}

async function main() {
    console.log('🔄 Starting ROBUST comprehensive data sync...\n');

    try {
        await remotePrisma.$connect();
        console.log('✅ Connected to remote database\n');

        // Order matters for foreign keys
        // Use 'code' or 'name' as unique field where appropriate
        await syncTable('centers', 'system', 'center', 'code');
        await syncTable('roles', 'system', 'role', 'code');
        await syncTable('permissions', 'system', 'permission', 'code');

        // Sync role permissions - this one is tricky because it has a compound unique or just ID
        // Let's just sync by id first
        await syncTable('role_permissions', 'system', 'rolePermission', 'id');

        // Users by email
        await syncTable('users', 'system', 'user', 'email');
        await syncTable('user_roles', 'system', 'userRole', 'id');

        // Patients by nik
        await syncTable('patients', 'medical', 'patient', 'nik');

        // Others by id
        await syncTable('medical_records', 'medical', 'medicalRecord', 'id');
        await syncTable('patient_diagnoses', 'medical', 'patientDiagnosis', 'id');
        await syncTable('follow_up_visits', 'medical', 'followUpVisit', 'id');
        await syncTable('research_requests', 'medical', 'researchRequest', 'id');

        console.log('='.repeat(60));
        console.log('✅ ROBUST SYNC COMPLETED');
        console.log('='.repeat(60));

    } catch (error: any) {
        console.error('\n❌ Global sync failure:', error.message);
    } finally {
        await localPrisma.$disconnect();
        await remotePrisma.$disconnect();
    }
}

main().catch(console.error);
