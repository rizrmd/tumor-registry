import { PrismaClient } from '@prisma/client';

export const musculoskeletalCenters = [
  { code: 'ACEH001', name: 'RSUD Dr. Zainoel Abidin', province: 'Aceh', regency: 'Kota Banda Aceh', mrPrefix: 'RZA' },
  { code: 'SUMUT001', name: 'RSUP H Adam Malik', province: 'Sumatera Utara', regency: 'Kota Medan', mrPrefix: 'HAM' },
  { code: 'SUMBAR001', name: 'RSUP Dr. M. Djamil', province: 'Sumatera Barat', regency: 'Kota Padang', mrPrefix: 'RMD' },
  { code: 'SUMSEL001', name: 'RSUP Dr. Mohammad Hoesin', province: 'Sumatera Selatan', regency: 'Kota Palembang', mrPrefix: 'RMH' },
  { code: 'RIAU001', name: 'RSUD Arifin Achmad', province: 'Riau', regency: 'Kota Pekanbaru', mrPrefix: 'RAA' },
  { code: 'DKI001', name: 'RSUPN Dr. Cipto Mangunkusumo', province: 'DKI Jakarta', regency: 'Jakarta Pusat', mrPrefix: 'RSC' },
  { code: 'DKI002', name: 'RSUP Fatmawati', province: 'DKI Jakarta', regency: 'Jakarta Selatan', mrPrefix: 'RSF' },
  { code: 'DKI003', name: 'RSUP Kanker Dharmais', province: 'DKI Jakarta', regency: 'Jakarta Barat', mrPrefix: 'RKD' },
  { code: 'DKI004', name: 'RSUP Persahabatan', province: 'DKI Jakarta', regency: 'Jakarta Timur', mrPrefix: 'RSP' },
  { code: 'JABAR001', name: 'RS Universitas Indonesia', province: 'Jawa Barat', regency: 'Kota Depok', mrPrefix: 'RUI' },
  { code: 'BANTEN001', name: 'RSUD Provinsi Banten', province: 'Banten', regency: 'Kota Serang', mrPrefix: 'RPB' },
  { code: 'JABAR002', name: 'RSUP Dr. Hasan Sadikin', province: 'Jawa Barat', regency: 'Kota Bandung', mrPrefix: 'RHS' },
  { code: 'DIY001', name: 'RSUP Dr. Sardjito', province: 'DI Yogyakarta', regency: 'Kota Yogyakarta', mrPrefix: 'SAR' },
  { code: 'JATENG001', name: 'RSOP Prof. Dr. Soeharso', province: 'Jawa Tengah', regency: 'Kota Surakarta', mrPrefix: 'RSO' },
  { code: 'JATENG002', name: 'RSUD Dr. Moewardhi', province: 'Jawa Tengah', regency: 'Kota Surakarta', mrPrefix: 'RDM' },
  { code: 'JATIM001', name: 'RSUD Dr. Soetomo', province: 'Jawa Timur', regency: 'Kota Surabaya', mrPrefix: 'RDS' },
  { code: 'JATIM002', name: 'RS Universitas Airlangga', province: 'Jawa Timur', regency: 'Kota Surabaya', mrPrefix: 'RUA' },
  { code: 'JATIM003', name: 'RSUD Dr. Syaiful Anwar', province: 'Jawa Timur', regency: 'Kota Malang', mrPrefix: 'RSA' },
  { code: 'KALSEL001', name: 'RSUD Ulin', province: 'Kalimantan Selatan', regency: 'Kota Banjarmasin', mrPrefix: 'RSU' },
  { code: 'BALI001', name: 'RSUP Prof. Dr. I.G.N.G. Ngoerah', province: 'Bali', regency: 'Kota Denpasar', mrPrefix: 'RSN' },
  { code: 'SULSEL001', name: 'RSUP Dr. Wahidin Sudirohusodo', province: 'Sulawesi Selatan', regency: 'Kota Makassar', mrPrefix: 'RWS' },
];

export async function seedMusculoskeletalCenters(prisma: PrismaClient) {
  try {
    console.log('🏥 Seeding 21 musculoskeletal tumor centers...');

    for (const center of musculoskeletalCenters) {
      const existingCenter = await prisma.center.findUnique({
        where: { code: center.code },
      });

      if (!existingCenter) {
        await prisma.center.create({
          data: {
            code: center.code,
            name: center.name,
            province: center.province,
            regency: center.regency,
            mrPrefix: center.mrPrefix,
          },
        });
        console.log(`  ✅ ${center.code} - ${center.name}`);
      } else {
        // Update mrPrefix for existing centers
        if (center.mrPrefix) {
          await prisma.center.update({
            where: { id: existingCenter.id },
            data: { mrPrefix: center.mrPrefix },
          });
          console.log(`  🔄 ${center.code} - Updated prefix: ${center.mrPrefix}`);
        } else {
          console.log(`  ⏩ ${center.code} - ${center.name} (exists)`);
        }
      }
    }

    console.log('✅ All 21 musculoskeletal tumor centers seeded!');
  } catch (error) {
    console.error('❌ Error seeding centers:', error);
    throw error;
  }
}
