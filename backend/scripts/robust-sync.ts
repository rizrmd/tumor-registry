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
async function syncTable(tableName: string, schemaName: string, modelName: string) {
    console.log(`📋 Syncing table ${schemaName}.${tableName}...`);
    
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
                // Use the model name to upsert
                // We assume 'id' is the primary key
                await (localPrisma as any)[modelName].upsert({
                    where: { id: filteredRow.id },
                    create: filteredRow,
                    update: filteredRow
                });
                synced++;
            } catch (e: any) {
                errors++;
                if (errors < 5) console.log(`    ❌ Error syncing row ${filteredRow.id}: ${e.message}`);
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
        // 1. Centers
        await syncTable('centers', 'system', 'center');
        
        // 2. Roles & Permissions (usually static but good to have)
        await syncTable('roles', 'system', 'role');
        await syncTable('permissions', 'system', 'permission');
        await syncTable('role_permissions', 'system', 'rolePermission');

        // 3. Users & UserRoles
        await syncTable('users', 'system', 'user');
        await syncTable('user_roles', 'system', 'userRole');

        // 4. Patients (The big ones)
        await syncTable('patients', 'medical', 'patient');

        // 5. Medical records & related
        await syncTable('medical_records', 'medical', 'medicalRecord');
        await syncTable('patient_diagnoses', 'medical', 'patientDiagnosis');
        await syncTable('follow_up_visits', 'medical', 'followUpVisit');
        
        // 6. Other research data
        await syncTable('research_requests', 'medical', 'researchRequest');

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
