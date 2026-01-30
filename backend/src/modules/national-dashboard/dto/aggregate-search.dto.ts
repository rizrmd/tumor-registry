import { IsOptional, IsString, IsNumber, IsDateString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class AggregateSearchDto {
    @IsOptional()
    @IsString()
    province?: string;

    @IsOptional()
    @IsString()
    regency?: string;

    @IsOptional()
    @IsString()
    cancerStage?: string;

    @IsOptional()
    @IsString()
    pathologyType?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    ageMin?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(150)
    ageMax?: number;

    @IsOptional()
    @IsString()
    gender?: 'male' | 'female';

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;
}
