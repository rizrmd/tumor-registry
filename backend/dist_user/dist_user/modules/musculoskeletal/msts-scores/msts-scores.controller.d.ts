import { MstsScoresService } from './msts-scores.service';
import { MstsScoreDto, CreateMstsScoreDto, UpdateMstsScoreDto } from './dto/msts-score.dto';
export declare class MstsScoresController {
    private readonly service;
    constructor(service: MstsScoresService);
    create(createDto: CreateMstsScoreDto): Promise<MstsScoreDto>;
    findAll(patientId?: string): Promise<MstsScoreDto[]>;
    findByPatient(patientId: string): Promise<MstsScoreDto[]>;
    getPatientHistory(patientId: string): Promise<{
        patientId: string;
        totalScores: number;
        scores: {
            id: string;
            assessmentDate: Date;
            totalScore: number;
            assessedBy: string;
        }[];
        latestScore: {
            function: number;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            notes: string | null;
            totalScore: number;
            assessmentDate: Date;
            assessedBy: string;
            followUpVisitId: string | null;
            pain: number;
            emotionalAcceptance: number;
            supports: number;
            walking: number;
            gait: number;
        };
        averageScore: number;
    }>;
    findOne(id: string): Promise<MstsScoreDto>;
    update(id: string, updateDto: UpdateMstsScoreDto): Promise<MstsScoreDto>;
    remove(id: string): Promise<MstsScoreDto>;
}
