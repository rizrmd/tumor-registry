import { PrismaService } from '../../../database/prisma.service';
import { CreateMstsScoreDto, UpdateMstsScoreDto } from './dto/msts-score.dto';
export declare class MstsScoresService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private calculateTotalScore;
    create(createDto: CreateMstsScoreDto): Promise<{
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
    }>;
    findAll(patientId?: string): Promise<({
        patient: {
            name: string;
            id: string;
            hospitalRecordNumber: string;
        };
    } & {
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
    })[]>;
    findOne(id: string): Promise<{
        patient: {
            name: string;
            id: string;
            hospitalRecordNumber: string;
        };
    } & {
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
    }>;
    findByPatient(patientId: string): Promise<{
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
    }[]>;
    update(id: string, updateDto: UpdateMstsScoreDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
    getPatientScoreHistory(patientId: string): Promise<{
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
}
