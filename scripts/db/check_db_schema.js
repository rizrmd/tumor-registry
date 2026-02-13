const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const res = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'follow_up_visits' AND table_schema = 'medical';
    `;
        console.log('COLUMNS_START');
        console.log(JSON.stringify(res));
        console.log('COLUMNS_END');
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
check();
