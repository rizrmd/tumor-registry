import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const patient = await prisma.patient.findFirst({
        select: { id: true, province: true, regency: true }
    });
    console.log('Patient Data:', patient);
}
main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
