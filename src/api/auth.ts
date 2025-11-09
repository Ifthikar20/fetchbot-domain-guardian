import { apiClient } from './client';
import type { User, LoginCredentials, RegisterData, AuthResponse } from '@/types/user';

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    const { access_token, user } = response.data;

    // Store token in localStorage
    localStorage.setItem('auth_token', access_token);

    return { token: access_token, user };
  },

  register: async (data: RegisterData) => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    const { access_token, user } = response.data;

    // Store token in localStorage
    localStorage.setItem('auth_token', access_token);

    return { token: access_token, user };
  },

  logout: async () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr) as User;
    }
    throw new Error('No user found');
  },
};
