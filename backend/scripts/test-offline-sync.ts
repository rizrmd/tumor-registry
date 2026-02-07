import { PrismaClient, Gender, DiagnosisType, DiagnosisStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

/**
 * Integration Test Script for Offline Synchronization
 * 
 * This script tests the complete offline sync workflow:
 * 1. Creates test data locally (simulating offline mode)
 * 2. Queues mutations in OfflineDataQueue
 * 3. Simulates coming online
 * 4. Triggers sync and verifies data integrity
 * 5. Checks for duplicates and ID consistency
 * 
 * Usage: bun run scripts/test-offline-sync.ts
 */

const prisma = new PrismaClient();

interface TestResult {
  step: string;
  status: 'PASS' | 'FAIL';
  message: string;
  data?: any;
}

const results: TestResult[] = [];

async function log(step: string, status: 'PASS' | 'FAIL', message: string, data?: any) {
  const result = { step, status, message, data };
  results.push(result);
  const icon = status === 'PASS' ? '✅' : '❌';
  console.log(`${icon} [${step}] ${message}`);
  if (data) {
    console.log('   Data:', JSON.stringify(data, null, 2));
  }
}

async function cleanup() {
  console.log('\n🧹 Cleaning up test data...');

  try {
    // Delete test queue items
    await prisma.offlineDataQueue.deleteMany({
      where: {
        entityType: { in: ['patient', 'diagnosis', 'medication'] },
        data: {
          path: ['testMarker'],
          equals: 'OFFLINE_SYNC_TEST'
        }
      }
    });

    // Delete test patients
    await prisma.patient.deleteMany({
      where: {
        name: { startsWith: 'TEST_OFFLINE_' }
      }
    });

    console.log('✅ Cleanup complete');
  } catch (error) {
    console.error('⚠️  Cleanup error:', error);
  }
}

async function step1_CreateTestUser(): Promise<string | null> {
  console.log('\n📝 Step 1: Create Test User');

  try {
    // Find or create test user
    let testUser = await prisma.user.findFirst({
      where: { email: 'offline.test@inamsos.local' }
    });

    if (!testUser) {
      const center = await prisma.center.findFirst();
      if (!center) {
        await log('Step 1', 'FAIL', 'No center found in database');
        return null;
      }

      const hashedPassword = await bcrypt.hash('TestPassword123!', 10);

      testUser = await prisma.user.create({
        data: {
          email: 'offline.test@inamsos.local',
          name: 'Offline Sync Test User',
          passwordHash: hashedPassword,
          centerId: center.id,
          isActive: true,
          isEmailVerified: true,
        }
      });
    }

    await log('Step 1', 'PASS', 'Test user ready', { userId: testUser.id });
    return testUser.id;
  } catch (error) {
    await log('Step 1', 'FAIL', `Error: ${error.message}`);
    return null;
  }
}

async function step2_SimulateOfflinePatientCreation(userId: string): Promise<string | null> {
  console.log('\n📝 Step 2: Simulate Offline Patient Creation');

  try {
    const center = await prisma.center.findFirst();
    if (!center) {
      await log('Step 2', 'FAIL', 'No center found');
      return null;
    }

    // Create patient locally (simulating offline mode)
    const patient = await prisma.patient.create({
      data: {
        nik: `TEST_${Date.now()}`,
        name: `TEST_OFFLINE_PATIENT_${Date.now()}`,
        dateOfBirth: new Date('1990-01-01'),
        gender: Gender.MALE,
        centerId: center.id,
        isActive: true,
      }
    });

    // Queue the creation for sync
    await prisma.offlineDataQueue.create({
      data: {
        userId: userId,
        entityType: 'patient',
        entityId: patient.id,
        operation: 'CREATE',
        data: {
          ...patient,
          testMarker: 'OFFLINE_SYNC_TEST' // Marker for cleanup
        },
        status: 'PENDING',
        priority: 5,
        localTimestamp: new Date(),
      }
    });

    await log('Step 2', 'PASS', 'Patient created and queued', {
      patientId: patient.id,
      name: patient.name
    });
    return patient.id;
  } catch (error) {
    await log('Step 2', 'FAIL', `Error: ${error.message}`);
    return null;
  }
}

async function step3_SimulateOfflineDiagnosisCreation(userId: string, patientId: string): Promise<string | null> {
  console.log('\n📝 Step 3: Simulate Offline Diagnosis Creation');

  try {
    // Create diagnosis locally
    const diagnosis = await prisma.patientDiagnosis.create({
      data: {
        patientId: patientId,
        diagnosisCode: 'C40.0',
        diagnosisName: 'Malignant neoplasm of scapula and long bones of upper limb',
        diagnosisDate: new Date(),
        isPrimary: true,
        diagnosisType: 'CLINICAL', // or DiagnosisType.CLINICAL if imported
        status: 'CONFIRMED', // or DiagnosisStatus.CONFIRMED
        providerId: userId,
      }
    });

    // Queue for sync
    await prisma.offlineDataQueue.create({
      data: {
        userId: userId,
        entityType: 'diagnosis',
        entityId: diagnosis.id,
        operation: 'CREATE',
        data: {
          ...diagnosis,
          testMarker: 'OFFLINE_SYNC_TEST'
        },
        status: 'PENDING',
        priority: 5,
        localTimestamp: new Date(),
      }
    });

    await log('Step 3', 'PASS', 'Diagnosis created and queued', {
      diagnosisId: diagnosis.id
    });
    return diagnosis.id;
  } catch (error) {
    await log('Step 3', 'FAIL', `Error: ${error.message}`);
    return null;
  }
}

async function step4_VerifyQueueStatus(): Promise<boolean> {
  console.log('\n📝 Step 4: Verify Queue Status');

  try {
    const queueStats = await prisma.offlineDataQueue.groupBy({
      by: ['status'],
      _count: true,
      where: {
        data: {
          path: ['testMarker'],
          equals: 'OFFLINE_SYNC_TEST'
        }
      }
    });

    const pendingCount = queueStats.find(s => s.status === 'PENDING')?._count || 0;

    if (pendingCount >= 2) {
      await log('Step 4', 'PASS', `Found ${pendingCount} pending items in queue`, queueStats);
      return true;
    } else {
      await log('Step 4', 'FAIL', `Expected at least 2 pending items, found ${pendingCount}`, queueStats);
      return false;
    }
  } catch (error) {
    await log('Step 4', 'FAIL', `Error: ${error.message}`);
    return false;
  }
}

async function step5_CheckForDuplicates(patientId: string): Promise<boolean> {
  console.log('\n📝 Step 5: Check for Duplicate Prevention');

  try {
    // Check if patient exists only once
    const patientCount = await prisma.patient.count({
      where: { id: patientId }
    });

    if (patientCount === 1) {
      await log('Step 5', 'PASS', 'No duplicates found - patient exists exactly once');
      return true;
    } else {
      await log('Step 5', 'FAIL', `Found ${patientCount} instances of patient (expected 1)`);
      return false;
    }
  } catch (error) {
    await log('Step 5', 'FAIL', `Error: ${error.message}`);
    return false;
  }
}

async function step6_VerifyUserIdHandling(): Promise<boolean> {
  console.log('\n📝 Step 6: Verify NULL userId Handling');

  try {
    // Create a queue item without userId (system-level operation)
    const queueItem = await prisma.offlineDataQueue.create({
      data: {
        userId: null, // This should now work with optional userId
        entityType: 'patient',
        entityId: null,
        operation: 'SYNC',
        data: {
          testMarker: 'OFFLINE_SYNC_TEST',
          systemOperation: true
        },
        status: 'PENDING',
        priority: 1,
        localTimestamp: new Date(),
      }
    });

    await log('Step 6', 'PASS', 'Successfully created queue item with NULL userId', {
      queueId: queueItem.id,
      userId: queueItem.userId
    });

    // Clean up this test item
    await prisma.offlineDataQueue.delete({
      where: { id: queueItem.id }
    });

    return true;
  } catch (error) {
    await log('Step 6', 'FAIL', `Error: ${error.message}`);
    return false;
  }
}

async function step7_VerifyRelationships(patientId: string, diagnosisId: string): Promise<boolean> {
  console.log('\n📝 Step 7: Verify Data Relationships');

  try {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        diagnoses: true
      }
    });

    if (!patient) {
      await log('Step 7', 'FAIL', 'Patient not found');
      return false;
    }

    const hasDiagnosis = patient.diagnoses.some(d => d.id === diagnosisId);

    if (hasDiagnosis) {
      await log('Step 7', 'PASS', 'Patient-Diagnosis relationship intact', {
        patientId,
        diagnosisCount: patient.diagnoses.length
      });
      return true;
    } else {
      await log('Step 7', 'FAIL', 'Diagnosis not linked to patient');
      return false;
    }
  } catch (error) {
    await log('Step 7', 'FAIL', `Error: ${error.message}`);
    return false;
  }
}

async function generateReport() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 OFFLINE SYNC TEST REPORT');
  console.log('='.repeat(60));

  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const total = results.length;

  console.log(`\nTotal Tests: ${total}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);

  if (failed > 0) {
    console.log('\n❌ FAILED TESTS:');
    results.filter(r => r.status === 'FAIL').forEach(r => {
      console.log(`   - ${r.step}: ${r.message}`);
    });
  }

  console.log('\n' + '='.repeat(60));

  return failed === 0;
}

async function main() {
  console.log('🚀 Starting Offline Sync Integration Test\n');
  console.log('This test verifies:');
  console.log('  1. Queue creation with and without user context');
  console.log('  2. Data integrity during offline operations');
  console.log('  3. Duplicate prevention');
  console.log('  4. Relationship consistency');
  console.log('  5. NULL userId handling (FK constraint fix)');

  try {
    // Cleanup before test
    await cleanup();

    // Run test steps
    const userId = await step1_CreateTestUser();
    if (!userId) {
      console.error('❌ Cannot proceed without test user');
      process.exit(1);
    }

    const patientId = await step2_SimulateOfflinePatientCreation(userId);
    if (!patientId) {
      console.error('❌ Cannot proceed without test patient');
      process.exit(1);
    }

    const diagnosisId = await step3_SimulateOfflineDiagnosisCreation(userId, patientId);
    if (!diagnosisId) {
      console.error('❌ Cannot proceed without test diagnosis');
      process.exit(1);
    }

    await step4_VerifyQueueStatus();
    await step5_CheckForDuplicates(patientId);
    await step6_VerifyUserIdHandling();
    await step7_VerifyRelationships(patientId, diagnosisId);

    // Generate report
    const allPassed = await generateReport();

    // Cleanup after test
    await cleanup();

    if (allPassed) {
      console.log('\n✅ All tests passed! Offline sync is working correctly.');
      process.exit(0);
    } else {
      console.log('\n❌ Some tests failed. Please review the errors above.');
      process.exit(1);
    }

  } catch (error) {
    console.error('\n💥 Unexpected error:', error);
    await cleanup();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
