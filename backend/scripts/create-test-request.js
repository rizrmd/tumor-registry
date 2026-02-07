const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const admin = await prisma.user.findFirst({ where: { email: 'admin@inamsos.go.id' } });
    if (!admin) {
        console.log('Admin user not found');
        return;
    }

    const request = await prisma.researchRequest.create({
        data: {
            requestNumber: `RR-2026-003`,
            title: 'Analisis Karakteristik Klinis Osteosarcoma di Indonesia',
            description: 'Penelitian retrospektif mengenai pasien osteosarcoma',
            researchAbstract: 'Penelitian retrospektif mengenai pasien osteosarcoma',
            researcherInstitution: 'Universitas Indonesia',
            status: 'SUBMITTED',
            priority: 'MEDIUM',
            createdBy: admin.id,
            principalInvestigatorId: admin.id,
            submittedAt: new Date(),
            dataSensitivityScore: 45,
            isAutoApprovalEligible: true,
            requestedDataFields: {},
            dataFilters: {},
            studyType: 'OBSERVATIONAL',
            objectives: 'Analyze characteristics',
            methodology: 'Retrospective study',
            inclusionCriteria: 'All osteosarcoma patients',
            exclusionCriteria: 'None',
            sampleSize: 100,
            duration: 12,
            dataRequested: 'Demographics, Clinical Data',
            agreementSigned: true,
            agreementDate: new Date()
        }
    });
    console.log('Test Research Request created:', request.requestNumber);
}

main().catch(console.error).finally(() => prisma.$disconnect());
