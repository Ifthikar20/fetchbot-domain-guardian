import { apiClient } from './client';
import type { Scan, CreateScanRequest, ScanListResponse, AgentGraph } from '@/types/scan';

export const scansApi = {
  // Get all scans for organization
  getAll: async (organizationId: number, limit = 20, offset = 0) => {
    const response = await apiClient.get<ScanListResponse>('/scans', {
      params: { organization_id: organizationId, limit, offset }
    });
    return response.data;
  },

  // Get scan by job ID
  getById: async (jobId: string) => {
    const response = await apiClient.get<Scan>(`/scan/${jobId}`);
    return response.data;
  },

  // Create new scan
  create: async (data: CreateScanRequest) => {
    const response = await apiClient.post<Scan>('/scan', data);
    return response.data;
  },

  // Delete scan
  delete: async (jobId: string) => {
    const response = await apiClient.delete<{ message: string }>(`/scan/${jobId}`);
    return response.data;
  },

  // Get agent hierarchy graph for a scan
  getAgentGraph: async (jobId: string) => {
    const response = await apiClient.get<AgentGraph>(`/scan/${jobId}/agent-graph`);
    return response.data;
  },
};
