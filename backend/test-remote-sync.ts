import { PrismaClient } from '@prisma/client';

async function testRemoteConnection() {
  const remoteUrl = 'postgres://postgres:hltsXdfWOOGNkd32xsMbzp6bgBXPzPCiob6UEH0XL3qSt9OuqvEyhN0o3gZNSjuY@107.155.75.50:5389/tmr-reg?sslmode=disable';
  console.log('Testing remote database connection...');
  console.log('Server: 107.155.75.50:5389');

  const prisma = new PrismaClient({ datasources: { db: { url: remoteUrl } } });

  try {
    await prisma.$connect();
    console.log('✓ Remote database connected successfully!');

    const patientCount = await prisma.patient.count();
    const centerCount = await prisma.center.count();
    const userCount = await prisma.user.count();
    const followupCount = await prisma.followUpVisit.count();

    console.log('\n--- Remote Database Statistics ---');
    console.log('Patients:', patientCount);
    console.log('Centers:', centerCount);
    console.log('Users:', userCount);
    console.log('Follow-up Visits:', followupCount);

    await prisma.$disconnect();
    console.log('\n✓ Connection test completed successfully!');
  } catch (error: any) {
    console.error('✗ Connection failed:', error.message);
    await prisma.$disconnect();
  }
}

testRemoteConnection();
