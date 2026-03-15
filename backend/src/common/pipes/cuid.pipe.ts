import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

/**
 * CUID (Collision-resistant Unique Identifier) Validation Pipe
 *
 * CUIDs are used in Prisma ORM as default IDs.
 * Format: c + 24 alphanumeric characters (lowercase)
 * Example: cmjq18u1n00ikcf5cn2ovp0so
 */
@Injectable()
export class ParseCuidPipe implements PipeTransform<string, string> {
  // CUID regex pattern: starts with 'c' followed by 24 lowercase alphanumeric characters
  private readonly CUID_REGEX = /^c[a-z0-9]{24}$/;

  transform(value: string): string {
    if (!value || typeof value !== 'string') {
      throw new BadRequestException('Invalid CUID format: value must be a non-empty string');
    }

    if (!this.CUID_REGEX.test(value)) {
      throw new BadRequestException(
        `Invalid CUID format: "${value}". CUID must start with 'c' followed by 24 lowercase alphanumeric characters.`
      );
    }

    return value;
  }
}

/**
 * Optional CUID pipe that allows empty or undefined values
 */
@Injectable()
export class ParseOptionalCuidPipe implements PipeTransform<string | undefined, string | undefined> {
  private readonly CUID_REGEX = /^c[a-z0-9]{24}$/;

  transform(value: string | undefined): string | undefined {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    if (!this.CUID_REGEX.test(value)) {
      throw new BadRequestException(
        `Invalid CUID format: "${value}". CUID must start with 'c' followed by 24 lowercase alphanumeric characters.`
      );
    }

    return value;
  }
}
