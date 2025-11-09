import { apiClient } from './client';
import type { AgentGraph, AgentExecution } from '@/types/agent';

export const agentsApi = {
  getGraph: async (scanId: string) => {
    const response = await apiClient.get<AgentGraph>(`/scans/${scanId}/agent-graph`);
    return response.data;
  },

  getExecutions: async (scanId: string) => {
    const response = await apiClient.get<AgentExecution[]>(`/scans/${scanId}/executions`);
    return response.data;
  },
};
