export interface User {
  id: number;
  email: string;
  organization_id: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  organization_name: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}
