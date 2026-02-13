const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function check() {
    try {
        const patients = await prisma.patient.count();
        const visits = await prisma.followUpVisit.count();
        console.log('STATS_START');
        console.log(JSON.stringify({ patients, visits }));
        console.log('STATS_END');
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
check();
