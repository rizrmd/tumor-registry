const fs = require('fs');
const path = require('path');

const ROOT = '/tmp/kelurahan_desa';
const OUTPUT = '/tmp/villages_insert.sql';

/**
 * Determine village type based on name patterns
 */
function determineType(villageName) {
  const upperName = villageName.toUpperCase();

  if (upperName.startsWith('KELURAHAN') ||
      upperName.startsWith('KLURAHAN') ||
      upperName.includes('KEL.')) {
    return 'KELURAHAN';
  }

  if (upperName.startsWith('DESA') ||
      upperName.startsWith('DSA')) {
    return 'DESA';
  }

  if (upperName.startsWith('KAMPUNG') ||
      upperName.startsWith('KP.') ||
      upperName.startsWith('GAMPONG')) {
    return 'DESA';
  }

  return 'DESA';
}

async function main() {
  console.log('Generating SQL dump for villages...');

  const files = await fs.promises.readdir(ROOT);
  const villageFiles = files.filter(f => f.endsWith('.json'));

  console.log(`Found ${villageFiles.length} village files to process`);

  // Write header
  const writeStream = fs.createWriteStream(OUTPUT);
  writeStream.write('-- Indonesian Villages Data (84,210 records)\n');
  writeStream.write('-- Source: hanifabd/wilayah-indonesia-area (2024-04-19)\n');
  writeStream.write('-- Generated: ' + new Date().toISOString() + '\n\n');
  writeStream.write('BEGIN;\n\n');

  let totalVillages = 0;
  const batchSize = 500;
  let batch = [];

  for (const file of villageFiles) {
    const filePath = path.join(ROOT, file);
    const content = await fs.promises.readFile(filePath, 'utf8');
    const villageMap = JSON.parse(content);

    const match = file.match(/^keldesa-(\d+)-(\d+)-(\d+)\.json$/);
    if (!match) {
      console.warn(`Skipping file with unexpected format: ${file}`);
      continue;
    }

    const [, provCode, regShort, distShort] = match;
    const paddedProv = provCode.padStart(2, '0').slice(0, 2);
    const paddedReg = regShort.padStart(2, '0').slice(0, 2);
    const paddedDist = distShort.padStart(3, '0').slice(0, 3);
    const districtCode = `${paddedProv}${paddedReg}${paddedDist}`;

    for (const [villageShortCode, villageName] of Object.entries(villageMap)) {
      const paddedVillage = villageShortCode.padStart(3, '0').slice(0, 3);
      const villageCode = `${districtCode}${paddedVillage}`;
      const type = determineType(villageName);
      const safeName = villageName.replace(/'/g, "''");

      batch.push(`('${villageCode}', '${districtCode}', '${safeName}', '${type}')`);
      totalVillages++;

      if (batch.length >= batchSize) {
        writeStream.write(`INSERT INTO "system"."villages" ("code", "districtCode", "name", "type") VALUES\n`);
        writeStream.write(batch.join(',\n'));
        writeStream.write(';\n\n');
        batch = [];
      }
    }
  }

  // Write remaining batch
  if (batch.length > 0) {
    writeStream.write(`INSERT INTO "system"."villages" ("code", "districtCode", "name", "type") VALUES\n`);
    writeStream.write(batch.join(',\n'));
    writeStream.write(';\n\n');
  }

  writeStream.write('COMMIT;\n');
  writeStream.end();

  console.log(`\n=== SQL Dump Generated ===`);
  console.log(`Output: ${OUTPUT}`);
  console.log(`Total villages: ${totalVillages}`);

  // Get file size
  const stats = await fs.promises.stat(OUTPUT);
  console.log(`File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
}

main()
  .catch((e) => {
    console.error('Generation failed:', e);
    process.exit(1);
  });
