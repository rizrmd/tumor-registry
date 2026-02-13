const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function reset() {
    try {
        const email = 'national.admin@inamsos.go.id';
        const password = 'admin123';
        const saltRounds = 12;
        const hash = await bcrypt.hash(password, saltRounds);

        const user = await prisma.user.update({
            where: { email },
            data: {
                passwordHash: hash,
                isActive: true,
                isLocked: false,
                lockedUntil: null,
                isEmailVerified: true
            }
        });

        console.log('RESET_SUCCESS');
        console.log('User password has been reset for:', user.email);
    } catch (e) {
        console.error('RESET_FAILED', e);
    } finally {
        await prisma.$disconnect();
    }
}
reset();
