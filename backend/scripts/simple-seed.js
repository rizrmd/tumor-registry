const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Create Admin Role
  console.log('Creating roles...');
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
      code: 'ADMIN',
      description: 'Full system access',
      level: 100,
    },
  });

  const doctorRole = await prisma.role.upsert({
    where: { name: 'DOCTOR' },
    update: {},
    create: {
      name: 'DOCTOR',
      code: 'DOCTOR',
      description: 'Medical professional access',
      level: 50,
    },
  });

  console.log('  ✓ Roles created');

  // Create a test center FIRST
  console.log('\nCreating centers...');
  const center = await prisma.center.upsert({
    where: { name: 'RSUPN Cipto Mangunkusumo' },
    update: {},
    create: {
      name: 'RSUPN Cipto Mangunkusumo',
      type: 'HOSPITAL',
      address: 'Jl. Diponegoro No.71',
      province: 'DKI Jakarta',
      city: 'Jakarta Pusat',
      postalCode: '10430',
      phoneNumber: '+62-21-3903333',
      email: 'info@rscm.co.id',
      isActive: true,
    },
  });

  console.log('  ✓ Center created');

  // Create admin user
  console.log('\nCreating admin user...');
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@inamsos.id' },
    update: {},
    create: {
      email: 'admin@inamsos.id',
      passwordHash: hashedPassword,
      name: 'Admin User',
      firstName: 'Admin',
      lastName: 'User',
      isActive: true,
      isEmailVerified: true,
      role: {
        connect: { id: adminRole.id },
      },
      center: {
        connect: { id: center.id },
      },
    },
  });

  console.log('  ✓ Admin user created (email: admin@inamsos.id, password: admin123)');

  // Create sample patients
  console.log('\nCreating sample patients...');
  const patient1 = await prisma.patient.create({
    data: {
      medicalRecordNumber: 'MRN-2025-001',
      nationalId: '1234567890123456',
      firstName: 'Budi',
      lastName: 'Santoso',
      dateOfBirth: new Date('1980-05-15'),
      gender: 'MALE',
      bloodType: 'A',
      phoneNumber: '+62-812-3456-7890',
      email: 'budi.santoso@email.com',
      address: {
        street: 'Jl. Merdeka No. 10',
        village: 'Gambir',
        district: 'Gambir',
        city: 'Jakarta Pusat',
        province: 'DKI Jakarta',
        postalCode: '10110',
        country: 'Indonesia',
      },
      center: {
        connect: { id: center.id },
      },
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      medicalRecordNumber: 'MRN-2025-002',
      nationalId: '1234567890123457',
      firstName: 'Siti',
      lastName: 'Wijaya',
      dateOfBirth: new Date('1985-08-22'),
      gender: 'FEMALE',
      bloodType: 'O',
      phoneNumber: '+62-813-4567-8901',
      email: 'siti.wijaya@email.com',
      address: {
        street: 'Jl. Sudirman No. 25',
        village: 'Senayan',
        district: 'Tanah Abang',
        city: 'Jakarta Pusat',
        province: 'DKI Jakarta',
        postalCode: '10270',
        country: 'Indonesia',
      },
      center: {
        connect: { id: center.id },
      },
    },
  });

  console.log('  ✓ Sample patients created');

  console.log('\n✅ Seed completed successfully!\n');
  console.log('Summary:');
  console.log('  - 2 roles');
  console.log('  - 1 admin user (admin@inamsos.id / admin123)');
  console.log('  - 1 center');
  console.log('  - 2 patients');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
