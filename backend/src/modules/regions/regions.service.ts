import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Province, Regency, District, Village } from './entities/region.entity';

@Injectable()
export class RegionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllProvinces(): Promise<Province[]> {
    const rows = await this.prisma.$queryRawUnsafe<Array<{ code: string; name: string }>>(
      'SELECT "code", "name" FROM "system"."provinces" ORDER BY "code" ASC',
    );

    return rows.map((row) => ({
      id: row.code,
      code: row.code,
      name: row.name,
    }));
  }

  async findProvinceById(id: string): Promise<Province | null> {
    const rows = await this.prisma.$queryRawUnsafe<Array<{ code: string; name: string }>>(
      'SELECT "code", "name" FROM "system"."provinces" WHERE "code" = $1 LIMIT 1',
      id,
    );

    if (!rows.length) return null;

    return {
      id: rows[0].code,
      code: rows[0].code,
      name: rows[0].name,
    };
  }

  async findRegenciesByProvinceId(provinceId: string): Promise<Regency[]> {
    const rows = await this.prisma.$queryRawUnsafe<Array<{ code: string; provinceCode: string; name: string }>>(
      'SELECT "code", "provinceCode", "name" FROM "system"."regencies" WHERE "provinceCode" = $1 ORDER BY "code" ASC',
      provinceId,
    );

    return rows.map((row) => {
      const suffix = Number(row.code.slice(2));
      const type: Regency['type'] = suffix >= 71 ? 'KOTA' : 'KABUPATEN';
      return {
        id: row.code,
        code: row.code,
        name: row.name,
        provinceId: row.provinceCode,
        type,
      };
    });
  }

  async findDistrictsByRegencyId(regencyId: string): Promise<District[]> {
    const rows = await this.prisma.$queryRawUnsafe<Array<{ code: string; regencyCode: string; name: string }>>(
      'SELECT "code", "regencyCode", "name" FROM "system"."districts" WHERE "regencyCode" = $1 ORDER BY "code" ASC',
      regencyId,
    );

    return rows.map((row) => ({
      id: row.code,
      code: row.code,
      name: row.name,
      regencyId: row.regencyCode,
    }));
  }

  async findVillagesByDistrictId(districtId: string): Promise<Village[]> {
    const rows = await this.prisma.$queryRawUnsafe<
      Array<{ code: string; districtCode: string; name: string; type: string }>
    >(
      'SELECT "code", "districtCode", "name", "type" FROM "system"."villages" WHERE "districtCode" = $1 ORDER BY "code" ASC',
      districtId,
    );

    return rows.map((row) => ({
      id: row.code,
      code: row.code,
      name: row.name,
      districtId: row.districtCode,
      type: row.type as 'KELURAHAN' | 'DESA',
    }));
  }
}
