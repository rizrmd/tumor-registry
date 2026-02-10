import { TumorSyndromesService } from './tumor-syndromes.service';
import { TumorSyndromeDto, CreateTumorSyndromeDto } from './dto/tumor-syndrome.dto';
export declare class TumorSyndromesController {
    private readonly service;
    constructor(service: TumorSyndromesService);
    findAll(): Promise<TumorSyndromeDto[]>;
    findOne(id: string): Promise<TumorSyndromeDto>;
    create(dto: CreateTumorSyndromeDto): Promise<TumorSyndromeDto>;
}
