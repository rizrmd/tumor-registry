import { PathologyTypesService } from './pathology-types.service';
import { PathologyTypeDto, CreatePathologyTypeDto, UpdatePathologyTypeDto } from './dto/pathology-type.dto';
export declare class PathologyTypesController {
    private readonly pathologyTypesService;
    constructor(pathologyTypesService: PathologyTypesService);
    findAll(): Promise<PathologyTypeDto[]>;
    findOne(id: string): Promise<PathologyTypeDto>;
    findByCode(code: string): Promise<PathologyTypeDto>;
    create(createDto: CreatePathologyTypeDto): Promise<PathologyTypeDto>;
    update(id: string, updateDto: UpdatePathologyTypeDto): Promise<PathologyTypeDto>;
    remove(id: string): Promise<PathologyTypeDto>;
}
