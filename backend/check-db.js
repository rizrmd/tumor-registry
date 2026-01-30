const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Checking database tables and data...\n');

  // Get all tables
  const result = await prisma.$queryRaw`
    SELECT table_schema, table_name
    FROM information_schema.tables
    WHERE table_schema IN ('medical', 'audit', 'system')
    ORDER BY table_schema, table_name
  `;

  console.log('Tables in database:');
  result.forEach(row => {
    console.log(`  ${row.table_schema}.${row.table_name}`);
  });

  console.log('\nData counts:');
  const tables = [
    { model: 'user', name: 'Users' },
    { model: 'patient', name: 'Patients' },
    { model: 'visit', name: 'Visits' },
    { model: 'tumorStaging', name: 'Tumor Staging Records' },
    { model: 'pathology', name: 'Pathology Records' },
    { model: 'treatment', name: 'Treatments' },
    { model: 'center', name: 'Centers' },
  ];

  for (const table of tables) {
    try {
      const count = await prisma[table.model].count();
      console.log(`  ${table.name}: ${count}`);
    } catch (e) {
      console.log(`  ${table.name}: N/A`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
