import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedPathologyTypes() {
  console.log('🌱 Seeding Pathology Types...');

  const pathologyTypes = [
    {
      name: 'Tumor Tulang',
      code: 'BONE',
      description: 'Tumor primer yang berasal dari jaringan tulang',
      sortOrder: 1,
    },
    {
      name: 'Tumor Jaringan Lunak',
      code: 'SOFT_TISSUE',
      description: 'Tumor primer yang berasal dari jaringan lunak (otot, lemak, pembuluh darah, dll)',
      sortOrder: 2,
    },
    {
      name: 'Penyakit Tulang Metastatik',
      code: 'METASTATIC',
      description: 'Tumor sekunder yang menyebar ke tulang dari organ lain',
      sortOrder: 3,
    },
  ];

  for (const pathologyType of pathologyTypes) {
    await prisma.pathologyType.upsert({
      where: { code: pathologyType.code },
      update: pathologyType,
      create: pathologyType,
    });
  }

  console.log('✅ Pathology Types seeded successfully');
}
