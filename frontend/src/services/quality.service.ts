import axios from 'axios';

// Helper function to get API base URL based on environment
function getApiBaseUrl(): string {
  if (typeof window === 'undefined') return '';

  const hostname = window.location.hostname;
  const productionDomains = [
    'inamsos.com',
    'www.inamsos.com',
    'inamsos.medxamion.com',
    'www.inamsos.medxamion.com',
  ];

  // Use relative URL for production domains
  if (productionDomains.some(domain => hostname === domain || hostname.endsWith('.' + domain))) {
    return '/api/v1';
  }

  // Use env var or default localhost for development
  return process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001/api/v1';
}

const API_URL = getApiBaseUrl();

export interface QualityScore {
  score: number;
  completeness: number;
  requiredCompleteness: number;
  medicalCompleteness: number;
  imageCount: number;
  recommendations: QualityRecommendation[];
  lastUpdated: Date;
  category: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface QualityRecommendation {
  type: string;
  priority: 'high' | 'medium' | 'low';
  message: string;
  field?: string;
}

export interface QualityTrend {
  date: Date;
  score: number;
  completeness: number;
  imageCount: number;
  recommendations: number;
}

export interface CenterQualitySummary {
  centerId: string;
  totalPatients: number;
  averageScore: number;
  qualityDistribution: {
    high: number;
    medium: number;
    low: number;
    percentages: {
      high: number;
      medium: number;
      low: number;
    };
  };
  topRecommendations: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
  lastUpdated: Date;
}

export interface NationalQualityOverview {
  totalPatients: number;
  averageScore: number;
  qualityDistribution: {
    high: number;
    medium: number;
    low: number;
    percentages: {
      high: number;
      medium: number;
      low: number;
    };
  };
  trends: Array<{
    week: number;
    averageScore: number;
    patientCount: number;
    minScore: number;
    maxScore: number;
  }>;
  lastUpdated: Date;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface StaffPerformance {
  staffId: string;
  staffName: string;
  staffEmail: string;
  entriesCount: number;
  avgQualityScore: number;
  completionRate: number;
  rank: number;
}

export interface MissingDataHeatmap {
  field: string;
  missingCount: number;
  missingPercentage: number;
  priority: 'high' | 'medium' | 'low';
}

class QualityService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  async getPatientQualityScore(patientId: string): Promise<QualityScore> {
    const response = await axios.get(
      `${API_URL}/quality/patient/${patientId}/score`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async getPatientQualityTrends(patientId: string, days: number = 30): Promise<QualityTrend[]> {
    const response = await axios.get(
      `${API_URL}/quality/patient/${patientId}/trends?days=${days}`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async validatePatientData(patientId: string): Promise<ValidationResult> {
    const response = await axios.get(
      `${API_URL}/quality/patient/${patientId}/validate`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async getCenterQualitySummary(centerId: string): Promise<CenterQualitySummary> {
    const response = await axios.get(
      `${API_URL}/quality/center/${centerId}/summary`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async getNationalQualityOverview(): Promise<NationalQualityOverview> {
    const response = await axios.get(
      `${API_URL}/quality/national/overview`,
      this.getAuthHeaders()
    );
    return response.data;
  }

  async getStaffPerformanceLeaderboard(centerId?: string): Promise<StaffPerformance[]> {
    const url = centerId
      ? `${API_URL}/quality/staff-performance?centerId=${centerId}`
      : `${API_URL}/quality/staff-performance`;

    const response = await axios.get(url, this.getAuthHeaders());
    return response.data;
  }

  async getMissingDataHeatmap(centerId?: string): Promise<MissingDataHeatmap[]> {
    const url = centerId
      ? `${API_URL}/quality/missing-data-heatmap?centerId=${centerId}`
      : `${API_URL}/quality/missing-data-heatmap`;

    const response = await axios.get(url, this.getAuthHeaders());
    return response.data;
  }
}

export const qualityService = new QualityService();
