import { apiClient } from './client';
import type { User, LoginCredentials, RegisterData } from '@/types/user';

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post<{ token: string; user: User }>('/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegisterData) => {
    const response = await apiClient.post<{ token: string; user: User }>('/auth/register', data);
    return response.data;
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
  },

  getCurrentUser: async () => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },
};
