#!/usr/bin/env bun
/**
 * Village Migration Script
 *
 * This script executes the villages_data.sql migration to populate
 * the villages table with 84,210 Indonesian village records.
 *
 * Usage: bun run scripts/migrate-villages.ts
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting villages migration...');

  const sqlPath = path.join(__dirname, '../prisma/migrations/20260314000000_add_villages_table/villages_data.sql');

  console.log(`📄 Reading SQL file: ${sqlPath}`);

  if (!fs.existsSync(sqlPath)) {
    console.error(`❌ SQL file not found: ${sqlPath}`);
    process.exit(1);
  }

  const sqlContent = fs.readFileSync(sqlPath, 'utf-8');
  console.log(`📊 SQL file size: ${(sqlContent.length / 1024).toFixed(2)} KB`);

  // Check if migration already ran
  const countResult = await prisma.$queryRawUnsafe<{ count: string }[]>(
    'SELECT COUNT(*) FROM "system"."villages"',
  );

  const currentCount = parseInt(countResult[0]?.count || '0', 10);
  console.log(`📋 Current villages count: ${currentCount}`);

  if (currentCount >= 84000) {
    console.log('✅ Villages table already populated. Skipping migration.');
    return;
  }

  console.log('⏳ Executing villages migration (this may take a few minutes)...');

  // Extract just the INSERT statement (skip BEGIN transaction wrapper for Prisma compatibility)
  // The file has: BEGIN; INSERT INTO...; (implicit end)
  const insertMatch = sqlContent.match(/INSERT INTO[\s\S]*?(?:;|$)/);

  if (!insertMatch) {
    console.error('❌ Could not parse INSERT statement from SQL file');
    process.exit(1);
  }

  const insertStatement = insertMatch[0].replace(/;$/, ''); // Remove trailing semicolon

  try {
    // Execute the INSERT using raw query
    // Note: Prisma's $queryRawUnsafe can handle large INSERT statements
    await prisma.$executeRawUnsafe(insertStatement);

    console.log('✅ Villages migration completed successfully!');

    // Verify the count
    const verifyResult = await prisma.$queryRawUnsafe<{ count: string }[]>(
      'SELECT COUNT(*) FROM "system"."villages"',
    );

    const newCount = parseInt(verifyResult[0]?.count || '0', 10);
    console.log(`📊 Total villages in database: ${newCount}`);

    // Show sample data
    const samples = await prisma.$queryRawUnsafe<Array<{ code: string; name: string; districtCode: string }>>(
      'SELECT "code", "name", "districtCode" FROM "system"."villages" ORDER BY "code" ASC LIMIT 5',
    );

    console.log('\n📍 Sample villages:');
    samples.forEach((v) => {
      console.log(`   - ${v.name} (${v.code}), District: ${v.districtCode}`);
    });

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
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
