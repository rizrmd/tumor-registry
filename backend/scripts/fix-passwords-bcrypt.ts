import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres@127.0.0.1:54321/postgres?schema=system"
        }
    }
});

async function main() {
    console.log('🔐 Fixing passwords with bcryptjs (compatible with auth service)...\n');

    // Common passwords based on role
    const passwords: Record<string, string> = {
        'national.admin@inamsos.go.id': 'admin123',
        'center.admin@inamsos.go.id': 'admin123',
        'researcher@inamsos.go.id': 'research123',
        'medical.officer@inamsos.go.id': 'medical123',
        'head@inamsos.go.id': 'head123',
        'staff@inamsos.go.id': 'staff123',
        'observer@inamsos.go.id': 'observer123',
        'admin@inamsos.go.id': 'admin123',
    };

    for (const [email, password] of Object.entries(passwords)) {
        try {
            // Use bcryptjs with 12 rounds (same as auth service)
            const hash = await bcrypt.hash(password, 12);

            await prisma.user.update({
                where: { email },
                data: { passwordHash: hash }
            });

            console.log(`✅ ${email} / ${password}`);
        } catch (e: any) {
            console.log(`❌ ${email}: ${e.message}`);
        }
    }

    console.log('\n✅ All passwords fixed with bcryptjs!');

    // Verify one password
    console.log('\n🔍 Verifying password for admin@inamsos.go.id...');
    const user = await prisma.user.findUnique({
        where: { email: 'admin@inamsos.go.id' }
    });

    if (user) {
        const isValid = await bcrypt.compare('admin123', user.passwordHash);
        console.log(`Password verification: ${isValid ? '✅ VALID' : '❌ INVALID'}`);
    }

    console.log('\n📋 Login credentials:');
    console.log('  national.admin@inamsos.go.id / admin123');
    console.log('  center.admin@inamsos.go.id / admin123');
    console.log('  researcher@inamsos.go.id / research123');
    console.log('  medical.officer@inamsos.go.id / medical123');
    console.log('  head@inamsos.go.id / head123');
    console.log('  staff@inamsos.go.id / staff123');
    console.log('  observer@inamsos.go.id / observer123');
    console.log('  admin@inamsos.go.id / admin123');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
