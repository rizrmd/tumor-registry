const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function check() {
    try {
        const user = await prisma.user.findFirst({
            where: { email: 'national.admin@inamsos.go.id' },
            select: { email: true, centerId: true, center: { select: { name: true } } }
        });
        console.log('USER_INFO_START');
        console.log(JSON.stringify(user));
        console.log('USER_INFO_END');
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
check();
