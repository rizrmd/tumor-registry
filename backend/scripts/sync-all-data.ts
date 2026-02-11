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

async function main() {
    console.log('🔄 Starting comprehensive data sync...\n');

    try {
        await remotePrisma.$connect();
        console.log('✅ Connected to remote database\n');

        // 1. Sync Research Requests
        console.log('📋 Syncing Research Requests...');
        const researchRequests = await remotePrisma.researchRequest.findMany({ take: 100 });
        console.log(`  Found ${researchRequests.length} research requests on remote`);

        let researchSynced = 0;
        for (const rr of researchRequests) {
            try {
                await localPrisma.researchRequest.upsert({
                    where: { id: rr.id },
                    create: { ...rr },
                    update: { ...rr }
                });
                researchSynced++;
            } catch (e: any) {
                console.log(`    ❌ Error: ${e.message}`);
            }
        }
        console.log(`    ✅ Synced ${researchSynced} research requests\n`);

        // 2. Sync Follow-up Visits
        console.log('📋 Syncing Follow-up Visits...');
        const followUpVisits = await remotePrisma.followUpVisit.findMany({ take: 200 });
        console.log(`  Found ${followUpVisits.length} follow-up visits on remote`);

        let followUpSynced = 0;
        for (const fu of followUpVisits) {
            try {
                await localPrisma.followUpVisit.upsert({
                    where: { id: fu.id },
                    create: { ...fu },
                    update: { ...fu }
                });
                followUpSynced++;
            } catch (e: any) {
                console.log(`    ❌ Error: ${e.message}`);
            }
        }
        console.log(`    ✅ Synced ${followUpSynced} follow-up visits\n`);

        // 3. Sync Reports
        console.log('📋 Syncing Reports...');
        const generatedReports = await remotePrisma.generatedReport.findMany({ take: 50 });
        console.log(`  Found ${generatedReports.length} generated reports on remote`);

        const reportTemplates = await remotePrisma.reportTemplate.findMany({ take: 20 });
        console.log(`  Found ${reportTemplates.length} report templates on remote`);

        let reportSynced = 0;
        for (const gr of generatedReports) {
            try {
                await localPrisma.generatedReport.upsert({
                    where: { id: gr.id },
                    create: { ...gr },
                    update: { ...gr }
                });
                reportSynced++;
            } catch (e: any) {
                // Skip errors
            }
        }

        for (const rt of reportTemplates) {
            try {
                await localPrisma.reportTemplate.upsert({
                    where: { id: rt.id },
                    create: { ...rt },
                    update: { ...rt }
                });
                reportSynced++;
            } catch (e: any) {
                // Skip errors
            }
        }
        console.log(`    ✅ Synced ${reportSynced} reports/templates\n`);

        // 4. Sync Medical Records
        console.log('📋 Syncing Medical Records...');
        const medicalRecords = await remotePrisma.medicalRecord.findMany({ take: 100 });
        console.log(`  Found ${medicalRecords.length} medical records on remote`);

        let mrSynced = 0;
        for (const mr of medicalRecords) {
            try {
                await localPrisma.medicalRecord.upsert({
                    where: { id: mr.id },
                    create: { ...mr },
                    update: { ...mr }
                });
                mrSynced++;
            } catch (e: any) {
                // Skip errors
            }
        }
        console.log(`    ✅ Synced ${mrSynced} medical records\n`);

        // Summary
        console.log('='.repeat(60));
        console.log('✅ COMPREHENSIVE SYNC COMPLETED');
        console.log('='.repeat(60));
        console.log(`\n📊 Summary:`);
        console.log(`  Research Requests: ${researchSynced}`);
        console.log(`  Follow-up Visits: ${followUpSynced}`);
        console.log(`  Reports/Templates: ${reportSynced}`);
        console.log(`  Medical Records: ${mrSynced}`);

    } catch (error: any) {
        console.error('\n❌ Sync failed:', error.message);
        throw error;
    } finally {
        await localPrisma.$disconnect();
        await remotePrisma.$disconnect();
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
