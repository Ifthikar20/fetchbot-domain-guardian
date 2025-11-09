import { apiClient } from './client';
import type { GenerateReportRequest, GenerateReportResponse, ReportFormat } from '@/types/report';

export const reportsApi = {
  // Generate report
  generate: async (jobId: string, format: ReportFormat) => {
    const response = await apiClient.post<GenerateReportResponse>(
      `/scan/${jobId}/report`,
      { format }
    );
    return response.data;
  },

  // Download report
  download: async (reportUrl: string) => {
    const response = await apiClient.get(reportUrl, {
      responseType: 'blob'
    });
    return response.data;
  },
};
