import apiClient from './api.config';

export enum ResearchRequestStatus {
    DRAFT = 'draft',
    SUBMITTED = 'submitted',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    EXPIRED = 'expired',
}

export interface ResearchRequest {
    id: string;
    title: string;
    description: string;
    status: ResearchRequestStatus;
    requesterId: string;
    requesterName: string; // Aggregate from requester relation
    requesterEmail: string;
    submittedAt: string;
    approvedAt?: string;
    approvedBy?: string;
    rejectionReason?: string;
    patientCount?: number;
    filters: any; // DataFiltersDto
    justification: string;
    irbNumber?: string;
}

export interface ApproveResearchRequestDto {
    approved: boolean; // true = approve, false = reject
    rejectionReason?: string;
    approvalNotes?: string;
}

class ResearchApprovalsService {
    /**
     * Get pending research requests for admin review
     */
    async getPendingRequests(): Promise<ResearchRequest[]> {
        const response = await apiClient.get<ResearchRequest[]>('/research-requests/pending');
        return response.data;
    }

    /**
     * Get request details
     */
    async getRequestDetails(id: string): Promise<ResearchRequest> {
        const response = await apiClient.get<ResearchRequest>(`/research-requests/${id}`);
        return response.data;
    }

    /**
     * Approve a research request
     */
    async approveRequest(id: string, notes?: string): Promise<ResearchRequest> {
        const response = await apiClient.post<ResearchRequest>(`/research-requests/${id}/approve`, {
            approved: true,
            approvalNotes: notes,
        });
        return response.data;
    }

    /**
     * Reject a research request
     */
    async rejectRequest(id: string, reason: string): Promise<ResearchRequest> {
        const response = await apiClient.post<ResearchRequest>(`/research-requests/${id}/approve`, {
            approved: false,
            rejectionReason: reason,
        });
        return response.data;
    }
}

export default new ResearchApprovalsService();
