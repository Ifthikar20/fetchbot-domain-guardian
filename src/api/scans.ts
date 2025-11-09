import { apiClient } from './client';
import type { Scan, CreateScanData } from '@/types/scan';

export const scansApi = {
  getAll: async () => {
    const response = await apiClient.get<Scan[]>('/scans');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<Scan>(`/scans/${id}`);
    return response.data;
  },

  create: async (data: CreateScanData) => {
    const response = await apiClient.post<Scan>('/scans', data);
    return response.data;
  },

  pause: async (id: string) => {
    const response = await apiClient.post<Scan>(`/scans/${id}/pause`);
    return response.data;
  },

  resume: async (id: string) => {
    const response = await apiClient.post<Scan>(`/scans/${id}/resume`);
    return response.data;
  },

  cancel: async (id: string) => {
    const response = await apiClient.post<Scan>(`/scans/${id}/cancel`);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/scans/${id}`);
  },
};
