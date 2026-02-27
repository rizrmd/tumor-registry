const fs = require('fs/promises');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const ROOT = '/tmp/indoarea_20240419_v2';

async function readJson(file) {
  const txt = await fs.readFile(file, 'utf8');
  return JSON.parse(txt);
}

async function main() {
  const provincesMap = await readJson(path.join(ROOT, 'provinsi/provinsi.json'));
  const provinces = Object.entries(provincesMap).map(([code, name]) => ({ code, name }));

  await prisma.$executeRawUnsafe('TRUNCATE TABLE "system"."districts", "system"."regencies", "system"."provinces" RESTART IDENTITY CASCADE');

  for (const p of provinces) {
    await prisma.$executeRawUnsafe(
      'INSERT INTO "system"."provinces" ("code","name") VALUES ($1,$2) ON CONFLICT ("code") DO UPDATE SET "name"=EXCLUDED."name", "updatedAt"=CURRENT_TIMESTAMP',
      p.code,
      p.name,
    );

    const regFile = path.join(ROOT, `kabupaten_kota/kab-${p.code}.json`);
    const regMap = await readJson(regFile);
    for (const [regShort, regName] of Object.entries(regMap)) {
      const regCode = `${p.code}${regShort}`;
      await prisma.$executeRawUnsafe(
        'INSERT INTO "system"."regencies" ("code","provinceCode","name") VALUES ($1,$2,$3) ON CONFLICT ("code") DO UPDATE SET "provinceCode"=EXCLUDED."provinceCode", "name"=EXCLUDED."name", "updatedAt"=CURRENT_TIMESTAMP',
        regCode,
        p.code,
        regName,
      );

      const distFile = path.join(ROOT, `kecamatan/kec-${p.code}-${regShort}.json`);
      const distMap = await readJson(distFile);
      for (const [distShort, distName] of Object.entries(distMap)) {
        const distCode = `${p.code}${regShort}${distShort}`;
        await prisma.$executeRawUnsafe(
          'INSERT INTO "system"."districts" ("code","regencyCode","provinceCode","name") VALUES ($1,$2,$3,$4) ON CONFLICT ("code") DO UPDATE SET "regencyCode"=EXCLUDED."regencyCode", "provinceCode"=EXCLUDED."provinceCode", "name"=EXCLUDED."name", "updatedAt"=CURRENT_TIMESTAMP',
          distCode,
          regCode,
          p.code,
          distName,
        );
      }
    }

    console.log(`Processed province ${p.code} (${p.name})`);
  }

  const [pCount, rCount, dCount] = await Promise.all([
    prisma.$queryRawUnsafe('SELECT COUNT(*)::int AS c FROM "system"."provinces"'),
    prisma.$queryRawUnsafe('SELECT COUNT(*)::int AS c FROM "system"."regencies"'),
    prisma.$queryRawUnsafe('SELECT COUNT(*)::int AS c FROM "system"."districts"'),
  ]);

  console.log({
    stored: {
      provinces: pCount[0].c,
      regencies: rCount[0].c,
      districts: dCount[0].c,
    },
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
