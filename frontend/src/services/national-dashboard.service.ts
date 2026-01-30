import apiClient from './api.config';

export interface AggregateFilters {
    province?: string;
    regency?: string;
    cancerStage?: string;
    pathologyType?: string;
    gender?: 'male' | 'female';
    ageMin?: number;
    ageMax?: number;
    startDate?: string;
    endDate?: string;
}

export interface AggregatedResult {
    totalMatches: number;
    filters: AggregateFilters;
    breakdown: {
        byGender: Record<string, number>;
        byPathology: Record<string, number>;
        byStage: Record<string, number>;
        byProvince: Record<string, number>;
        byRegency: Record<string, number>;
    };
}

export interface NationalStatistics {
    totalPatients: number;
    totalCenters: number;
    byGender: Record<string, number>;
    byTreatmentStatus: Record<string, number>;
    byAgeGroup: Record<string, number>;
    byProvince: Record<string, number>;
}

class NationalDashboardService {
    /**
     * Get aggregated national statistics
     */
    async getStatistics(): Promise<NationalStatistics> {
        const response = await apiClient.get('/national-dashboard/statistics');
        return response.data;
    }

    async searchAggregated(filters: AggregateFilters): Promise<AggregatedResult> {
        const response = await apiClient.post('/national-dashboard/search-aggregated', filters);
        return response.data;
    }

    async downloadExport(filters: AggregateFilters) {
        const response = await apiClient.post('/national-dashboard/export', filters, {
            responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `analytics_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}

export const nationalDashboardService = new NationalDashboardService();
export default nationalDashboardService;
