const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const BASE = 'http://www.emsifa.com/api-wilayah-indonesia/api';

async function getJson(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Failed ${res.status} ${url}`);
  return res.json();
}

async function main() {
  console.log('Fetching provinces...');
  const provinces = await getJson(`${BASE}/provinces.json`);

  await prisma.$executeRawUnsafe('TRUNCATE TABLE "system"."districts", "system"."regencies", "system"."provinces" RESTART IDENTITY CASCADE');

  for (const p of provinces) {
    await prisma.$executeRawUnsafe(
      'INSERT INTO "system"."provinces" ("code","name") VALUES ($1,$2) ON CONFLICT ("code") DO UPDATE SET "name"=EXCLUDED."name", "updatedAt"=CURRENT_TIMESTAMP',
      p.id,
      p.name,
    );
  }

  let regencyCount = 0;
  let districtCount = 0;

  for (const p of provinces) {
    const regencies = await getJson(`${BASE}/regencies/${p.id}.json`);
    regencyCount += regencies.length;

    for (const r of regencies) {
      await prisma.$executeRawUnsafe(
        'INSERT INTO "system"."regencies" ("code","provinceCode","name") VALUES ($1,$2,$3) ON CONFLICT ("code") DO UPDATE SET "provinceCode"=EXCLUDED."provinceCode", "name"=EXCLUDED."name", "updatedAt"=CURRENT_TIMESTAMP',
        r.id,
        p.id,
        r.name,
      );

      const districts = await getJson(`${BASE}/districts/${r.id}.json`);
      districtCount += districts.length;

      for (const d of districts) {
        await prisma.$executeRawUnsafe(
          'INSERT INTO "system"."districts" ("code","regencyCode","provinceCode","name") VALUES ($1,$2,$3,$4) ON CONFLICT ("code") DO UPDATE SET "regencyCode"=EXCLUDED."regencyCode", "provinceCode"=EXCLUDED."provinceCode", "name"=EXCLUDED."name", "updatedAt"=CURRENT_TIMESTAMP',
          d.id,
          r.id,
          p.id,
          d.name,
        );
      }
    }

    console.log(`Processed province ${p.id} (${p.name})`);
  }

  const provincesCount = await prisma.$queryRawUnsafe('SELECT COUNT(*)::int AS c FROM "system"."provinces"');
  const regenciesCount = await prisma.$queryRawUnsafe('SELECT COUNT(*)::int AS c FROM "system"."regencies"');
  const districtsCount = await prisma.$queryRawUnsafe('SELECT COUNT(*)::int AS c FROM "system"."districts"');

  console.log({
    fetched: { provinces: provinces.length, regencies: regencyCount, districts: districtCount },
    stored: {
      provinces: provincesCount[0].c,
      regencies: regenciesCount[0].c,
      districts: districtsCount[0].c,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
