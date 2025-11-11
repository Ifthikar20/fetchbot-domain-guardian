import { apiClient } from './client';
import type { User, LoginCredentials, RegisterData, AuthResponse } from '@/types/user';

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    const { access_token, user_id, username, organization_id } = response.data;

    // Store token in localStorage
    localStorage.setItem('auth_token', access_token);

    // Create user object
    const user: User = {
      id: user_id,
      username: username,
      email: '',  // Not provided by backend on login
      full_name: username,
      organization_id: organization_id
    };

    localStorage.setItem('user', JSON.stringify(user));

    return { token: access_token, user };
  },

  register: async (data: RegisterData) => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    const { access_token, user_id, username, organization_id } = response.data;

    // Store token in localStorage
    localStorage.setItem('auth_token', access_token);

    // Create user object from registration data
    const user: User = {
      id: user_id,
      username: username,
      email: data.email,
      full_name: data.full_name,
      organization_id: organization_id
    };

    localStorage.setItem('user', JSON.stringify(user));

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
