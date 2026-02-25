import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { CreatePathologyTypeDto, UpdatePathologyTypeDto } from './dto/pathology-type.dto';

@Injectable()
export class PathologyTypesService {
  private readonly logger = new Logger(PathologyTypesService.name);

  private readonly fallbackPathologyTypes = [
    {
      id: 'fallback-bone-tumor',
      code: 'bone_tumor',
      name: 'Bone Tumor',
      nameIndo: 'Tumor Tulang',
      description: 'Primary bone tumor',
      sortOrder: 1,
      isActive: true,
    },
    {
      id: 'fallback-soft-tissue-tumor',
      code: 'soft_tissue_tumor',
      name: 'Soft Tissue Tumor',
      nameIndo: 'Tumor Jaringan Lunak',
      description: 'Soft tissue tumor',
      sortOrder: 2,
      isActive: true,
    },
    {
      id: 'fallback-metastatic-bone-disease',
      code: 'metastatic_bone_disease',
      name: 'Metastatic Bone Disease',
      nameIndo: 'Metastasis Tulang',
      description: 'Secondary/metastatic bone disease',
      sortOrder: 3,
      isActive: true,
    },
  ];

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.pathologyType.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      });
    } catch (error: any) {
      const message = String(error?.message || '');
      if (message.includes('system.pathology_types') && message.includes('does not exist')) {
        this.logger.warn('Table system.pathology_types not found, serving fallback pathology types');
        return this.fallbackPathologyTypes;
      }
      throw error;
    }
  }

  async findOne(id: string) {
    const pathologyType = await this.prisma.pathologyType.findUnique({
      where: { id },
    });

    if (!pathologyType) {
      throw new NotFoundException(`Pathology type with ID ${id} not found`);
    }

    return pathologyType;
  }

  async findByCode(code: string) {
    const pathologyType = await this.prisma.pathologyType.findUnique({
      where: { code },
    });

    if (!pathologyType) {
      throw new NotFoundException(`Pathology type with code ${code} not found`);
    }

    return pathologyType;
  }

  async create(createDto: CreatePathologyTypeDto) {
    return this.prisma.pathologyType.create({
      data: {
        ...createDto,
        sortOrder: createDto.sortOrder ?? 0,
      },
    });
  }

  async update(id: string, updateDto: UpdatePathologyTypeDto) {
    await this.findOne(id); // Ensure exists

    return this.prisma.pathologyType.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Ensure exists

    return this.prisma.pathologyType.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
