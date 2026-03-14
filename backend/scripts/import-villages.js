const fs = require('fs/promises');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Path to extracted IndoArea data
const ROOT = '/tmp/kelurahan_desa';

/**
 * Determine village type based on name patterns
 * Kelurahan: typically urban areas (found in kota/kabupaten with high development)
 * Desa: typically rural areas
 *
 * For simplicity, we'll use common naming patterns:
 * - KELURAHAN: if name starts with "KELURAHAN" or contains urban indicators
 * - DESA: if name starts with "DESA" or is in rural areas
 * - Default to DESA for most cases (safer assumption for Indonesia)
 */
function determineType(villageName) {
  const upperName = villageName.toUpperCase();

  // Explicit kelurahan indicators
  if (upperName.startsWith('KELURAHAN') ||
      upperName.startsWith('KLURAHAN') ||
      upperName.includes('KEL.')) {
    return 'KELURAHAN';
  }

  // Explicit desa indicators
  if (upperName.startsWith('DESA') ||
      upperName.startsWith('DSA')) {
    return 'DESA';
  }

  // Some regions use village prefixes that indicate type
  if (upperName.startsWith('KAMPUNG') ||
      upperName.startsWith('KP.') ||
      upperName.startsWith('GAMPONG')) {
    return 'DESA'; // Rural settlement types
  }

  // Default to DESA for most cases (more common in Indonesia)
  return 'DESA';
}

async function main() {
  console.log('Starting villages import from IndoArea 2024-04-19...');
  console.log(`Reading from: ${ROOT}`);

  // Get all village files
  const files = await fs.readdir(ROOT);
  const villageFiles = files.filter(f => f.endsWith('.json'));

  console.log(`Found ${villageFiles.length} village files to process`);

  let totalVillages = 0;
  let processedFiles = 0;
  const batchSize = 1000;
  let batch = [];

  // Process each file
  for (const file of villageFiles) {
    const filePath = path.join(ROOT, file);
    const content = await fs.readFile(filePath, 'utf8');
    const villageMap = JSON.parse(content);

    // Parse filename to get district code
    // Format: keldesa-{provinceCode}-{regencyShortCode}-{districtShortCode}.json
    // Example: keldesa-11-01-010.json -> district code: 1101010
    const match = file.match(/^keldesa-(\d+)-(\d+)-(\d+)\.json$/);
    if (!match) {
      console.warn(`Skipping file with unexpected format: ${file}`);
      continue;
    }

    const [, provCode, regShort, distShort] = match;
    // Construct full district code: province(2) + regency(2) + district(3) = 7 digits
    // Pad components to ensure correct length
    const paddedProv = provCode.padStart(2, '0').slice(0, 2);
    const paddedReg = regShort.padStart(2, '0').slice(0, 2);
    const paddedDist = distShort.padStart(3, '0').slice(0, 3);
    const districtCode = `${paddedProv}${paddedReg}${paddedDist}`;

    // Process each village in the file
    for (const [villageShortCode, villageName] of Object.entries(villageMap)) {
      // Construct full village code: districtCode(7) + villageCode(3) = 10 digits
      const paddedVillage = villageShortCode.padStart(3, '0').slice(0, 3);
      const villageCode = `${districtCode}${paddedVillage}`;

      const type = determineType(villageName);

      batch.push({
        code: villageCode,
        districtCode: districtCode,
        name: villageName.toUpperCase(),
        type: type,
      });

      totalVillages++;

      // Insert batch when it reaches the batch size
      if (batch.length >= batchSize) {
        await insertBatch(batch);
        batch = [];
      }
    }

    processedFiles++;
    if (processedFiles % 1000 === 0) {
      console.log(`Processed ${processedFiles}/${villageFiles.length} files (${totalVillages} villages so far)`);
    }
  }

  // Insert remaining batch
  if (batch.length > 0) {
    await insertBatch(batch);
  }

  // Get final count
  const countResult = await prisma.$queryRawUnsafe(
    'SELECT COUNT(*)::int AS c FROM "system"."villages"'
  );

  console.log('\n=== Import Complete ===');
  console.log({
    filesProcessed: processedFiles,
    totalVillagesInserted: totalVillages,
    storedInDatabase: countResult[0].c,
  });
}

async function insertBatch(batch) {
  if (batch.length === 0) return;

  // Build VALUES clause for bulk insert - only 4 columns (createdAt/updatedAt have defaults)
  const values = batch.map((v, i) => {
    const offset = i * 4;
    return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4})`;
  }).join(',');

  const flatValues = batch.flatMap(v => [v.code, v.districtCode, v.name, v.type]);

  await prisma.$executeRawUnsafe(
    `INSERT INTO "system"."villages" ("code", "districtCode", "name", "type")
     VALUES ${values}
     ON CONFLICT ("code") DO UPDATE SET
       "districtCode" = EXCLUDED."districtCode",
       "name" = EXCLUDED."name",
       "type" = EXCLUDED."type",
       "updatedAt" = CURRENT_TIMESTAMP`,
    ...flatValues
  );
}

main()
  .catch((e) => {
    console.error('Import failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
