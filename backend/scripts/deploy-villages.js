const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting villages deployment...');

  // Read migration SQL
  const migrationPath = path.join(__dirname, '..', 'prisma/migrations/20260314000000_add_villages_table/migration.sql');
  const migrationSql = fs.readFileSync(migrationPath, 'utf8');

  // Read villages data SQL
  const dataPath = path.join(__dirname, '..', 'prisma/migrations/20260314000000_add_villages_table/villages_data.sql');
  const dataSql = fs.readFileSync(dataPath, 'utf8');

  console.log('Creating villages table...');
  await prisma.$executeRawUnsafe(migrationSql);
  console.log('Table created successfully.');

  console.log('Importing villages data (this may take a few minutes)...');
  await prisma.$executeRawUnsafe(dataSql);
  console.log('Data imported successfully.');

  // Verify count
  const result = await prisma.$queryRawUnsafe(
    'SELECT COUNT(*)::int AS total FROM "system"."villages"'
  );
  console.log(`\n=== Deployment Complete ===`);
  console.log(`Total villages in database: ${result[0].total}`);
}

main()
  .catch((e) => {
    console.error('Deployment failed:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
