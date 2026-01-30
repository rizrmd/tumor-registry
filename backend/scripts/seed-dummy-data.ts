import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 21 Designated Musculoskeletal Tumor Centers in Indonesia
const centers = [
  { name: 'RSUD Dr. Zainoel Abidin', code: 'ACEH001', province: 'Aceh', regency: 'Banda Aceh' },
  { name: 'RSUP H Adam Malik', code: 'SUMUT001', province: 'Sumatera Utara', regency: 'Medan' },
  { name: 'RSUP Dr. M. Djamil', code: 'SUMBAR001', province: 'Sumatera Barat', regency: 'Padang' },
  { name: 'RSUP Dr. Mohammad Hoesin', code: 'SUMSEL001', province: 'Sumatera Selatan', regency: 'Palembang' },
  { name: 'RSUD Arifin Achmad', code: 'RIAU001', province: 'Riau', regency: 'Pekanbaru' },
  { name: 'RSUPN Dr. Cipto Mangunkusumo', code: 'DKI001', province: 'DKI Jakarta', regency: 'Jakarta Pusat' },
  { name: 'RSUP Fatmawati', code: 'DKI002', province: 'DKI Jakarta', regency: 'Jakarta Selatan' },
  { name: 'RSUP Kanker Dharmais', code: 'DKI003', province: 'DKI Jakarta', regency: 'Jakarta Barat' },
  { name: 'RSUP Persahabatan', code: 'DKI004', province: 'DKI Jakarta', regency: 'Jakarta Timur' },
  { name: 'RS Universitas Indonesia', code: 'JABAR001', province: 'Jawa Barat', regency: 'Depok' },
  { name: 'RSUD Provinsi Banten', code: 'BANTEN001', province: 'Banten', regency: 'Serang' },
  { name: 'RSUP Dr. Hasan Sadikin', code: 'JABAR002', province: 'Jawa Barat', regency: 'Bandung' },
  { name: 'RSUP Dr. Sardjito', code: 'DIY001', province: 'DI Yogyakarta', regency: 'Yogyakarta' },
  { name: 'RSOP Prof. Dr. Soeharso', code: 'JATENG001', province: 'Jawa Tengah', regency: 'Surakarta' },
  { name: 'RSUD Dr. Moewardhi', code: 'JATENG002', province: 'Jawa Tengah', regency: 'Surakarta' },
  { name: 'RSUD Dr. Soetomo', code: 'JATIM001', province: 'Jawa Timur', regency: 'Surabaya' },
  { name: 'RS Universitas Airlangga', code: 'JATIM002', province: 'Jawa Timur', regency: 'Surabaya' },
  { name: 'RSUD Dr. Syaiful Anwar', code: 'JATIM003', province: 'Jawa Timur', regency: 'Malang' },
  { name: 'RSUD Ulin', code: 'KALSEL001', province: 'Kalimantan Selatan', regency: 'Banjarmasin' },
  { name: 'RSUP Prof. Dr. I.G.N.G. Ngoerah', code: 'BALI001', province: 'Bali', regency: 'Denpasar' },
  { name: 'RSUP Dr. Wahidin Sudirohusodo', code: 'SULSEL001', province: 'Sulawesi Selatan', regency: 'Makassar' },
];

async function seedCenters() {
  console.log('🏥 Seeding 21 musculoskeletal tumor centers...');

  for (const center of centers) {
    await prisma.center.upsert({
      where: { code: center.code },
      create: center,
      update: center,
    });
  }

  console.log('✅ 21 centers seeded successfully');
}

async function seedDummyPatients() {
  console.log('\n👥 Seeding 5 dummy patients...');

  // Get IDs for relations
  const centerCipto = await prisma.center.findUnique({ where: { code: 'DKI001' } });
  const centerSoetomo = await prisma.center.findUnique({ where: { code: 'JATIM001' } });
  const centerSardjito = await prisma.center.findUnique({ where: { code: 'DIY001' } });
  const centerDharmais = await prisma.center.findUnique({ where: { code: 'DKI003' } });
  const centerHasan = await prisma.center.findUnique({ where: { code: 'JABAR002' } });

  const boneTumor1 = await prisma.whoBoneTumorClassification.findFirst({ where: { diagnosis: { contains: 'Osteosarcoma' } } });
  const boneTumor2 = await prisma.whoBoneTumorClassification.findFirst({ where: { diagnosis: { contains: 'Chondrosarcoma' } } });
  const softTissueTumor1 = await prisma.whoSoftTissueTumorClassification.findFirst({ where: { diagnosis: { contains: 'Liposarcoma' } } });
  const softTissueTumor2 = await prisma.whoSoftTissueTumorClassification.findFirst({ where: { diagnosis: { contains: 'Synovial sarcoma' } } });

  const boneLocationFemur = await prisma.boneLocation.findFirst({ where: { boneName: 'Femur' } });
  const boneLocationHumerus = await prisma.boneLocation.findFirst({ where: { boneName: 'Humerus' } });
  const softTissueLocationThigh = await prisma.softTissueLocation.findFirst({ where: { specificLocation: { contains: 'Thigh' } } });
  const softTissueLocationForearm = await prisma.softTissueLocation.findFirst({ where: { specificLocation: { contains: 'Forearm' } } });

  // Patient 1: Bone Tumor - Osteosarcoma (Male, Young, High-grade, Stage IIB)
  const patient1 = await prisma.patient.create({
    data: {
      medicalRecordNumber: 'MR-2025-00001',
      nik: '3173051990050001',
      name: 'Ahmad Rizki Prasetyo',
      dateOfBirth: new Date('2005-03-15'),
      placeOfBirth: 'Jakarta',
      gender: 'MALE',
      bloodType: 'O_POSITIVE',
      religion: 'Islam',
      maritalStatus: 'SINGLE',
      occupation: 'Pelajar',
      education: 'SMA',
      phoneNumber: '+628123456701',
      email: 'ahmad.rizki@example.com',
      address: 'Jl. Sudirman No. 45, RT 05/RW 03',
      province: 'DKI Jakarta',
      regency: 'Jakarta Selatan',
      district: 'Kebayoran Baru',
      village: 'Senayan',
      postalCode: '12190',
      emergencyContact: {
        name: 'Siti Aminah (Ibu)',
        relationship: 'Parent',
        phone: '+628987654301',
        address: 'Sama dengan pasien'
      },
      centerId: centerCipto!.id,
      pathologyType: 'bone_tumor',

      // Section 3: Clinical Data
      chiefComplaint: 'Nyeri dan benjolan di paha kanan sejak 6 bulan yang lalu',
      onsetDate: new Date('2024-06-01'),
      symptomDuration: 6,
      presentingSymptoms: JSON.stringify({
        pain: true,
        swelling: true,
        mass: true,
        pathologicalFracture: false,
        functionalImpairment: true,
        nightPain: true,
        weightLoss: true
      }),
      tumorSizeAtPresentation: 12.5,
      familyHistoryCancer: 'Tidak ada riwayat keluarga dengan kanker',
      karnofskysScore: 70,

      // Section 4: Diagnostics
      biopsyDate: new Date('2024-12-10'),
      biopsyType: 'Core needle',
      biopsyResult: 'High-grade osteosarcoma, osteoblastic variant',
      imagingStudies: JSON.stringify({
        xray: true,
        ct: true,
        mri: true,
        boneScan: true,
        petCt: true
      }),

      // Section 5: Diagnosis
      whoBoneTumorId: boneTumor1?.id,
      boneLocationId: boneLocationFemur?.id,
      laterality: 'Right',
      histopathologyGrade: 'High-grade (G2)',
      mitosisCount: 15,
      necrosisPercentage: 20.0,

      // Section 6: Staging
      ennekingStage: 'IIB',
      ajccStage: 'IIB',
      tumorSizeT1: 12.5,
      tumorSizeT2: 8.0,
      tumorSizeT3: 6.5,
      mirrelScore: 7,
      metastasisPresent: false,

      // Section 7: CPC
      cpcDate: new Date('2024-12-15'),
      cpcRecommendation: 'Neo-adjuvant chemotherapy followed by limb salvage surgery',

      // Section 8: Treatment
      intendedTreatment: 'Curative',
    },
  });

  console.log(`✅ Patient 1 created: ${patient1.name} (${patient1.medicalRecordNumber})`);

  // Patient 2: Bone Tumor - Chondrosarcoma (Female, Middle-aged, Low-grade, Stage IA)
  const patient2 = await prisma.patient.create({
    data: {
      medicalRecordNumber: 'MR-2025-00002',
      nik: '3578022198212002',
      name: 'Siti Nurhaliza',
      dateOfBirth: new Date('1982-12-21'),
      placeOfBirth: 'Surabaya',
      gender: 'FEMALE',
      bloodType: 'A_POSITIVE',
      religion: 'Islam',
      maritalStatus: 'MARRIED',
      occupation: 'Guru',
      education: 'S1',
      phoneNumber: '+628123456702',
      email: 'siti.nurhaliza@example.com',
      address: 'Jl. Raya Darmo No. 123',
      province: 'Jawa Timur',
      regency: 'Surabaya',
      district: 'Wonokromo',
      village: 'Wonokromo',
      postalCode: '60243',
      emergencyContact: {
        name: 'Budi Santoso (Suami)',
        relationship: 'Spouse',
        phone: '+628987654302',
        address: 'Sama dengan pasien'
      },
      centerId: centerSoetomo!.id,
      pathologyType: 'bone_tumor',

      chiefComplaint: 'Benjolan di lengan atas kiri yang membesar perlahan',
      onsetDate: new Date('2023-01-01'),
      symptomDuration: 24,
      presentingSymptoms: JSON.stringify({
        pain: false,
        swelling: true,
        mass: true,
        pathologicalFracture: false,
        functionalImpairment: false,
        nightPain: false,
        weightLoss: false
      }),
      tumorSizeAtPresentation: 6.0,
      karnofskysScore: 90,

      biopsyDate: new Date('2024-11-20'),
      biopsyType: 'Excisional',
      biopsyResult: 'Low-grade chondrosarcoma, grade I',
      imagingStudies: JSON.stringify({
        xray: true,
        ct: false,
        mri: true,
        boneScan: false,
        petCt: false
      }),

      whoBoneTumorId: boneTumor2?.id,
      boneLocationId: boneLocationHumerus?.id,
      laterality: 'Left',
      histopathologyGrade: 'Low-grade (G1)',
      mitosisCount: 2,
      necrosisPercentage: 0.0,

      ennekingStage: 'IA',
      ajccStage: 'IA',
      tumorSizeT1: 6.0,
      tumorSizeT2: 4.5,
      tumorSizeT3: 3.0,
      mirrelScore: 4,
      metastasisPresent: false,

      cpcDate: new Date('2024-12-01'),
      cpcRecommendation: 'Wide surgical resection with limb salvage',
      intendedTreatment: 'Curative',
    },
  });

  console.log(`✅ Patient 2 created: ${patient2.name} (${patient2.medicalRecordNumber})`);

  // Patient 3: Soft Tissue Tumor - Liposarcoma (Male, Elderly, Stage III with metastasis)
  const patient3 = await prisma.patient.create({
    data: {
      medicalRecordNumber: 'MR-2025-00003',
      nik: '3404031965080003',
      name: 'Joko Widodo Sutrisno',
      dateOfBirth: new Date('1965-08-03'),
      placeOfBirth: 'Yogyakarta',
      gender: 'MALE',
      bloodType: 'B_POSITIVE',
      religion: 'Islam',
      maritalStatus: 'MARRIED',
      occupation: 'Pensiunan PNS',
      education: 'S1',
      phoneNumber: '+628123456703',
      email: 'joko.sutrisno@example.com',
      address: 'Jl. Malioboro No. 88',
      province: 'DI Yogyakarta',
      regency: 'Yogyakarta',
      district: 'Gondokusuman',
      village: 'Terban',
      postalCode: '55223',
      emergencyContact: {
        name: 'Ratna Sari (Istri)',
        relationship: 'Spouse',
        phone: '+628987654303',
        address: 'Sama dengan pasien'
      },
      centerId: centerSardjito!.id,
      pathologyType: 'soft_tissue_tumor',

      chiefComplaint: 'Benjolan besar di paha yang cepat membesar',
      onsetDate: new Date('2024-07-01'),
      symptomDuration: 5,
      presentingSymptoms: JSON.stringify({
        pain: true,
        swelling: true,
        mass: true,
        pathologicalFracture: false,
        functionalImpairment: true,
        nightPain: true,
        weightLoss: true
      }),
      tumorSizeAtPresentation: 18.0,
      familyHistoryCancer: 'Ayah meninggal karena kanker paru',
      karnofskysScore: 60,

      biopsyDate: new Date('2024-11-25'),
      biopsyType: 'Core needle',
      biopsyResult: 'Dedifferentiated liposarcoma, high-grade',
      imagingStudies: JSON.stringify({
        xray: true,
        ct: true,
        mri: true,
        boneScan: false,
        petCt: true
      }),

      whoSoftTissueTumorId: softTissueTumor1?.id,
      softTissueLocationId: softTissueLocationThigh?.id,
      laterality: 'Right',
      histopathologyGrade: 'High-grade (G3)',
      mitosisCount: 25,
      necrosisPercentage: 35.0,

      ennekingStage: 'III',
      ajccStage: 'IVA',
      tumorSizeT1: 18.0,
      tumorSizeT2: 12.0,
      tumorSizeT3: 10.0,
      metastasisPresent: true,
      metastasisSites: 'Lung metastasis (3 nodules, largest 2.5 cm)',

      cpcDate: new Date('2024-12-05'),
      cpcRecommendation: 'Palliative chemotherapy, surgery if response achieved',
      intendedTreatment: 'Palliative',
    },
  });

  console.log(`✅ Patient 3 created: ${patient3.name} (${patient3.medicalRecordNumber})`);

  // Patient 4: Soft Tissue Tumor - Synovial Sarcoma (Female, Young adult, Stage IIB)
  const patient4 = await prisma.patient.create({
    data: {
      medicalRecordNumber: 'MR-2025-00004',
      nik: '3173062000100004',
      name: 'Dewi Lestari Putri',
      dateOfBirth: new Date('2000-10-06'),
      placeOfBirth: 'Jakarta',
      gender: 'FEMALE',
      bloodType: 'AB_POSITIVE',
      religion: 'Kristen',
      maritalStatus: 'SINGLE',
      occupation: 'Mahasiswa',
      education: 'S1',
      phoneNumber: '+628123456704',
      email: 'dewi.lestari@example.com',
      address: 'Jl. Gatot Subroto No. 200',
      province: 'DKI Jakarta',
      regency: 'Jakarta Selatan',
      district: 'Setia Budi',
      village: 'Kuningan Timur',
      postalCode: '12950',
      emergencyContact: {
        name: 'Hendra Lestari (Ayah)',
        relationship: 'Parent',
        phone: '+628987654304',
        address: 'Sama dengan pasien'
      },
      centerId: centerDharmais!.id,
      pathologyType: 'soft_tissue_tumor',

      chiefComplaint: 'Benjolan di lengan bawah kanan yang nyeri',
      onsetDate: new Date('2024-08-01'),
      symptomDuration: 4,
      presentingSymptoms: JSON.stringify({
        pain: true,
        swelling: true,
        mass: true,
        pathologicalFracture: false,
        functionalImpairment: true,
        nightPain: false,
        weightLoss: false
      }),
      tumorSizeAtPresentation: 5.5,
      karnofskysScore: 80,

      biopsyDate: new Date('2024-12-01'),
      biopsyType: 'Core needle',
      biopsyResult: 'Synovial sarcoma, biphasic type',
      imagingStudies: JSON.stringify({
        xray: true,
        ct: true,
        mri: true,
        boneScan: false,
        petCt: true
      }),

      whoSoftTissueTumorId: softTissueTumor2?.id,
      softTissueLocationId: softTissueLocationForearm?.id,
      laterality: 'Right',
      histopathologyGrade: 'High-grade (G2)',
      mitosisCount: 12,
      necrosisPercentage: 15.0,

      ennekingStage: 'IIB',
      ajccStage: 'IIB',
      tumorSizeT1: 5.5,
      tumorSizeT2: 4.0,
      tumorSizeT3: 3.5,
      metastasisPresent: false,

      cpcDate: new Date('2024-12-08'),
      cpcRecommendation: 'Neo-adjuvant chemotherapy + limb salvage surgery + adjuvant radiotherapy',
      intendedTreatment: 'Curative',
    },
  });

  console.log(`✅ Patient 4 created: ${patient4.name} (${patient4.medicalRecordNumber})`);

  // Patient 5: Bone Tumor - Osteosarcoma (Male, Teenager, Stage IIA - favorable prognosis)
  const patient5 = await prisma.patient.create({
    data: {
      medicalRecordNumber: 'MR-2025-00005',
      nik: '3204052008050005',
      name: 'Raffi Ahmad Maulana',
      dateOfBirth: new Date('2008-05-20'),
      placeOfBirth: 'Bandung',
      gender: 'MALE',
      bloodType: 'O_NEGATIVE',
      religion: 'Islam',
      maritalStatus: 'SINGLE',
      occupation: 'Pelajar',
      education: 'SMP',
      phoneNumber: '+628123456705',
      email: 'raffi.maulana@example.com',
      address: 'Jl. Dago No. 75',
      province: 'Jawa Barat',
      regency: 'Bandung',
      district: 'Coblong',
      village: 'Dago',
      postalCode: '40135',
      emergencyContact: {
        name: 'Ahmad Maulana (Ayah)',
        relationship: 'Parent',
        phone: '+628987654305',
        address: 'Sama dengan pasien'
      },
      centerId: centerHasan!.id,
      pathologyType: 'bone_tumor',

      chiefComplaint: 'Nyeri dan pembengkakan di lutut kiri',
      onsetDate: new Date('2024-09-01'),
      symptomDuration: 3,
      presentingSymptoms: JSON.stringify({
        pain: true,
        swelling: true,
        mass: true,
        pathologicalFracture: false,
        functionalImpairment: true,
        nightPain: true,
        weightLoss: false
      }),
      tumorSizeAtPresentation: 7.5,
      karnofskysScore: 80,

      biopsyDate: new Date('2024-11-28'),
      biopsyType: 'Core needle',
      biopsyResult: 'Conventional osteosarcoma, good chemotherapy response',
      imagingStudies: JSON.stringify({
        xray: true,
        ct: true,
        mri: true,
        boneScan: true,
        petCt: false
      }),

      whoBoneTumorId: boneTumor1?.id,
      boneLocationId: boneLocationFemur?.id,
      laterality: 'Left',
      histopathologyGrade: 'High-grade (G2)',
      mitosisCount: 10,
      necrosisPercentage: 10.0,

      ennekingStage: 'IIA',
      ajccStage: 'IIA',
      tumorSizeT1: 7.5,
      tumorSizeT2: 5.0,
      tumorSizeT3: 4.5,
      mirrelScore: 5,
      metastasisPresent: false,

      cpcDate: new Date('2024-12-10'),
      cpcRecommendation: 'Neo-adjuvant chemotherapy + limb salvage surgery',
      intendedTreatment: 'Curative',
    },
  });

  console.log(`✅ Patient 5 created: ${patient5.name} (${patient5.medicalRecordNumber})`);

  console.log('\n✨ All 5 dummy patients created successfully!');

  return [patient1, patient2, patient3, patient4, patient5];
}

async function main() {
  try {
    await seedCenters();
    const patients = await seedDummyPatients();

    console.log('\n📊 Summary:');
    console.log('- 21 Centers seeded');
    console.log('- 5 Patients created:');
    patients.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.name} (${p.pathologyType}, ${p.ennekingStage || 'N/A'})`);
    });

    console.log('\n✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
