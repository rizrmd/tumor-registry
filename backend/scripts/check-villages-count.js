const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.$queryRawUnsafe(
      'SELECT COUNT(*)::int AS c FROM "system"."villages"'
    );
    console.log(result[0].c);
  } catch (e) {
    // Table doesn't exist or other error
    console.log('0');
  } finally {
    await prisma.$disconnect();
  }
}

main();
