import { apiClient } from './client';
import type { AgentGraphResponse, AgentsResponse } from '@/types/agent';

export const agentsApi = {
  // Get agent graph for visualization
  getGraph: async (jobId: string) => {
    const response = await apiClient.get<AgentGraphResponse>(`/scan/${jobId}/agent-graph`);
    return response.data;
  },

  // Get agent status and info
  getAgents: async (jobId: string) => {
    const response = await apiClient.get<AgentsResponse>(`/scan/${jobId}/agents`);
    return response.data;
  },
};
