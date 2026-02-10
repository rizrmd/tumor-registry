const { PrismaClient } = require('@prisma/client');

// Load environment from .env
require('dotenv').config();

const prisma = new PrismaClient();

async function validateApp() {
    console.log('='.repeat(60));
    console.log('INAMSOS APPLICATION VALIDATION');
    console.log('='.repeat(60));

    try {
        // 1. Database Connection Test
        console.log('\n[1/5] Testing Database Connection...');
        await prisma.$connect();
        console.log('✓ Database Connected Successfully');

        // 2. User Table Check (Login capability)
        console.log('\n[2/5] Checking User Data (Login)...');
        const userCount = await prisma.user.count();
        const sampleUser = await prisma.user.findFirst({
            select: { email: true, name: true, role: true }
        });
        console.log(`✓ Found ${userCount} users in database`);
        if (sampleUser) {
            console.log(`  Sample User: ${sampleUser.email} (${sampleUser.role})`);
        }

        // 3. Patient Data Check
        console.log('\n[3/5] Checking Patient Data...');
        const patientCount = await prisma.patient.count();
        console.log(`✓ Found ${patientCount} patients in database`);

        // 4. Center Configuration (Sync Setup)
        console.log('\n[4/5] Checking Sync Configuration...');
        const center = await prisma.center.findFirst({
            select: {
                name: true,
                remoteDbUrl: true,
                remoteDbApiKey: true
            }
        });
        if (center) {
            console.log(`✓ Center: ${center.name}`);
            console.log(`  Remote URL: ${center.remoteDbUrl || 'NOT CONFIGURED'}`);
            console.log(`  API Key: ${center.remoteDbApiKey ? 'SET' : 'NOT SET'}`);
            if (center.remoteDbUrl) {
                console.log('  ⚠ Sync configured (will attempt connection to remote server)');
            } else {
                console.log('  ⚠ Sync NOT configured (offline-only mode)');
            }
        }

        // 5. Offline Queue Check
        console.log('\n[5/5] Checking Offline Queue...');
        const queueCount = await prisma.offlineQueue.count();
        console.log(`✓ Found ${queueCount} items in offline queue`);
        if (queueCount > 0) {
            console.log('  ⚠ Pending sync items exist');
        }

        console.log('\n' + '='.repeat(60));
        console.log('VALIDATION SUMMARY');
        console.log('='.repeat(60));
        console.log('✓ Database: CONNECTED');
        console.log(`✓ Login: READY (${userCount} users)`);
        console.log(`✓ Data: ${patientCount} patients`);
        console.log(`✓ Sync: ${center?.remoteDbUrl ? 'CONFIGURED' : 'OFFLINE MODE'}`);
        console.log('='.repeat(60));

    } catch (error) {
        console.error('\n✗ VALIDATION FAILED:');
        console.error(error.message);
        console.error('\nDetails:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

validateApp();
