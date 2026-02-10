import { TreatmentsService } from './treatments.service';
import { TreatmentManagementDto, CreateTreatmentDto, UpdateTreatmentDto } from './dto/treatment.dto';
export declare class TreatmentsController {
    private readonly service;
    constructor(service: TreatmentsService);
    create(createDto: CreateTreatmentDto): Promise<TreatmentManagementDto>;
    findAll(patientId?: string, treatmentType?: string, status?: string): Promise<TreatmentManagementDto[]>;
    findByPatient(patientId: string): Promise<TreatmentManagementDto[]>;
    getPatientSummary(patientId: string): Promise<{
        patientId: string;
        totalTreatments: number;
        byType: {
            surgery: number;
            chemotherapy: number;
            radiotherapy: number;
            targetedTherapy: number;
            immunotherapy: number;
        };
        byStatus: {
            planned: number;
            ongoing: number;
            completed: number;
            discontinued: number;
        };
        surgeryDetails: {
            id: string;
            surgeryType: string;
            surgicalMargin: string;
            reconstructionMethod: string;
            status: string;
        }[];
        activeChemotherapy: {
            status: string;
            huvosGrade: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            notes: string | null;
            startDate: Date | null;
            endDate: Date | null;
            surgeryType: string | null;
            surgicalMargin: string | null;
            reconstructionMethod: string | null;
            radiotherapyDose: number | null;
            complications: string | null;
            performedBy: string | null;
            treatmentType: string;
            marginDistance: number | null;
            amputationLevel: string | null;
            chemotherapyProtocol: string | null;
            numberOfCycles: number | null;
            cyclesCompleted: number | null;
            numberOfFractions: number | null;
            fractionsCompleted: number | null;
            response: string | null;
            adverseEvents: string | null;
        };
    }>;
    findOne(id: string): Promise<TreatmentManagementDto>;
    update(id: string, updateDto: UpdateTreatmentDto): Promise<TreatmentManagementDto>;
    remove(id: string): Promise<TreatmentManagementDto>;
}
