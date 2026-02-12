import { PrismaClient } from '@prisma/client';

async function testConnection() {
  console.log('Testing database connections...');

  // Test local DB
  const localPrisma = new PrismaClient();
  try {
    await localPrisma.$connect();
    console.log('✓ Local database connected successfully');
    const patientCount = await localPrisma.patient.count();
    const centerCount = await localPrisma.center.count();
    const userCount = await localPrisma.user.count();
    console.log('  - Local patients:', patientCount);
    console.log('  - Local centers:', centerCount);
    console.log('  - Local users:', userCount);
    await localPrisma.$disconnect();
  } catch (error: any) {
    console.error('✗ Local DB error:', error.message);
    await localPrisma.$disconnect();
    return;
  }

  // Test remote DB
  const remoteUrl = 'postgres://postgres:hltsXdfWOOGNkd32xsMbzp6bgBXPzPCiob6UEH0XL3qSt9OuqvEyhN0o3gZNSjuY@107.155.75.50:5389/tmr-reg?sslmode=disable';
  const remotePrisma = new PrismaClient({ datasources: { db: { url: remoteUrl } } });
  try {
    await remotePrisma.$connect();
    console.log('✓ Remote database connected successfully');
    const remotePatientCount = await remotePrisma.patient.count();
    const remoteCenterCount = await remotePrisma.center.count();
    const remoteUserCount = await remotePrisma.user.count();
    console.log('  - Remote patients:', remotePatientCount);
    console.log('  - Remote centers:', remoteCenterCount);
    console.log('  - Remote users:', remoteUserCount);
    await remotePrisma.$disconnect();
  } catch (error: any) {
    console.error('✗ Remote DB error:', error.message);
    await remotePrisma.$disconnect();
  }
}

testConnection().catch(console.error);
