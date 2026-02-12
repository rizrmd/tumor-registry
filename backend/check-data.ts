import { PrismaClient } from '@prisma/client';

const localPrisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres@127.0.0.1:54321/postgres?schema=system"
        }
    }
});

async function checkData() {
    console.log('=== Checking Local Database Data ===\n');

    try {
        const patients = await localPrisma.patient.findMany({
            select: {
                id: true,
                nik: true,
                name: true,
                anonymousId: true,
                isActive: true,
                createdAt: true,
            }
        });

        console.log(`Total Patients: ${patients.length}\n`);

        if (patients.length > 0) {
            console.log('First 5 patients:');
            patients.slice(0, 5).forEach((p, i) => {
                console.log(`  ${i+1}. ${p.name} (${p.nik || p.anonymousId})`);
            });
        }

        const users = await localPrisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                isActive: true,
                updatedAt: true,
            }
        });

        console.log(`\nTotal Users: ${users.length}\n`);

        users.forEach(u => {
            console.log(`  ${u.email} - ${u.name}`);
            console.log(`    Updated: ${u.updatedAt.toISOString()}`);
        });

        const centers = await localPrisma.center.findMany({
            select: {
                id: true,
                name: true,
                code: true,
                isActive: true,
            }
        });

        console.log(`\nTotal Centers: ${centers.length}\n`);

        centers.forEach(c => {
            console.log(`  ${c.name} (${c.code})`);
        });

    } catch (error: any) {
        console.error('Error:', error.message);
    } finally {
        await localPrisma.$disconnect();
    }
}

checkData();
