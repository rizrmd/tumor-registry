import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres@127.0.0.1:54321/postgres?schema=system"
        }
    }
});

async function main() {
    console.log('🔍 Checking Patient Data Completeness...\n');

    const patients = await prisma.patient.findMany({
        take: 70
    });

    console.log(`Total patients: ${patients.length}\n`);

    let emptyInamsosMR = 0;
    let emptyHospitalMR = 0;
    let emptyPathology = 0;
    let emptyEnneking = 0;

    console.log('Data Completeness Check:');
    console.log('='.repeat(80));

    for (const p of patients) {
        const issues = [];

        if (!p.inamsosRecordNumber) {
            emptyInamsosMR++;
            issues.push('INAMSOS MR Number kosong');
        }
        if (!p.hospitalRecordNumber) {
            emptyHospitalMR++;
            issues.push('Hospital MR Number kosong');
        }
        if (!p.pathologyType) {
            emptyPathology++;
            issues.push('Pathology Type kosong');
        }
        if (!p.ennekingStage) {
            emptyEnneking++;
            issues.push('Enneking Stage kosong');
        }

        if (issues.length > 0) {
            console.log(`\n⚠️  ${p.name} (ID: ${p.id.substring(0, 8)}...)`);
            issues.forEach(issue => console.log(`   - ${issue}`));
        }
    }

    console.log('\n' + '='.repeat(80));
    console.log('Summary:');
    console.log('='.repeat(80));
    console.log(`  Patients with empty INAMSOS MR Number: ${emptyInamsosMR}`);
    console.log(`  Patients with empty Hospital MR Number: ${emptyHospitalMR}`);
    console.log(`  Patients with empty Pathology Type: ${emptyPathology}`);
    console.log(`  Patients with empty Enneking Stage: ${emptyEnneking}`);

    if (emptyInamsosMR === 0 && emptyHospitalMR === 0 && emptyPathology === 0 && emptyEnneking === 0) {
        console.log('\n✅ All patient data is complete!');
    } else {
        console.log('\n⚠️  Some patient data is incomplete');
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
