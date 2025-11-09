import { apiClient } from './client';
import type { Finding, FindingFilters } from '@/types/finding';

export const findingsApi = {
  getAll: async (filters?: FindingFilters) => {
    const response = await apiClient.get<Finding[]>('/findings', { params: filters });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<Finding>(`/findings/${id}`);
    return response.data;
  },

  getByScanId: async (scanId: string) => {
    const response = await apiClient.get<Finding[]>(`/scans/${scanId}/findings`);
    return response.data;
  },

  updateStatus: async (id: string, status: string) => {
    const response = await apiClient.patch<Finding>(`/findings/${id}`, { status });
    return response.data;
  },
};
