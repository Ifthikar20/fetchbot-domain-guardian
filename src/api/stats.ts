import { apiClient } from './client';
import type { DashboardStats } from '@/types/stats';

export const statsApi = {
  // Get dashboard statistics
  getDashboardStats: async (organizationId: number) => {
    const response = await apiClient.get<DashboardStats>('/stats', {
      params: { organization_id: organizationId }
    });
    return response.data;
  },
};
