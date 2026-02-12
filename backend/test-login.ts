import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const localPrisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres@127.0.0.1:54321/postgres?schema=system"
        }
    }
});

async function testLogin() {
    console.log('=== Testing User Login Credentials ===\n');

    try {
        // Get all users
        const users = await localPrisma.user.findMany({
            include: {
                center: true,
                userRoles: {
                    include: {
                        role: true
                    }
                }
            }
        });

        console.log(`Found ${users.length} users:\n`);

        for (const user of users) {
            console.log(`User: ${user.email}`);
            console.log(`  Name: ${user.name}`);
            console.log(`  Active: ${user.isActive}`);
            console.log(`  Email Verified: ${user.isEmailVerified}`);
            console.log(`  MFA Enabled: ${user.mfaEnabled}`);
            console.log(`  Center: ${user.center?.name || 'None'}`);
            console.log(`  Roles: ${user.userRoles.map(ur => ur.role.code).join(', ') || 'None'}`);
            console.log(`  Has Password: ${!!user.passwordHash}`);
            console.log(`  Created: ${user.createdAt.toISOString()}`);
            console.log(`  Updated: ${user.updatedAt.toISOString()}`);
            console.log('');
        }

        // Test password verification for each user
        console.log('\n=== Testing Password Verification ===\n');

        const testPasswords = [
            'admin123',
            'password',
            'admin',
            '123456',
            'Admin@123'
        ];

        for (const user of users) {
            for (const pwd of testPasswords) {
                try {
                    const isValid = await bcrypt.compare(pwd, user.passwordHash);
                    if (isValid) {
                        console.log(`✓ ${user.email} - Valid password: "${pwd}"`);
                    }
                } catch (e) {
                    // ignore
                }
            }
        }

    } catch (error: any) {
        console.error('Error:', error.message);
    } finally {
        await localPrisma.$disconnect();
    }
}

testLogin();
