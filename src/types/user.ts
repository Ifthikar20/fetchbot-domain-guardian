export interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  organization_id: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  full_name: string;
  organization_id: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user_id: string;
  username: string;
  organization_id: string;
}
