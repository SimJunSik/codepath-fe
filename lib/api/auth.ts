// CodePath Frontend - Auth API
// API 계약서 기준

import { apiPost, apiGet } from './client';
import type { LoginRequest, SignupRequest, AuthResponse, User } from '@/types';

interface BackendUserResponse {
  id: string;
  email: string;
  username: string;
  full_name?: string | null;
  is_active: boolean;
  is_verified: boolean;
  role: string;
  created_at: string;
}

interface BackendTokenResponse {
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
}

const mapUser = (user: BackendUserResponse): User => ({
  id: user.id,
  email: user.email,
  username: user.username,
  displayName: user.full_name || user.username,
  profileImage: undefined,
  role: user.role === 'admin' ? 'admin' : 'student',
  createdAt: user.created_at,
  updatedAt: user.created_at,
});

const normalizeTokens = (response: BackendTokenResponse) => ({
  accessToken: response.access_token || response.accessToken || '',
  refreshToken: response.refresh_token || response.refreshToken || '',
  expiresIn: response.expiresIn || 0,
});

export const signup = async (data: SignupRequest): Promise<AuthResponse> => {
  await apiPost<BackendUserResponse>('/auth/signup', {
    email: data.email,
    username: data.username,
    password: data.password,
    full_name: data.displayName,
  });
  return login({ email: data.email, password: data.password });
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const tokenResponse = await apiPost<BackendTokenResponse>('/auth/login', data);
  const { accessToken, refreshToken, expiresIn } = normalizeTokens(tokenResponse);

  if (typeof window !== 'undefined' && accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }

  const userResponse = await apiGet<BackendUserResponse>('/auth/me');
  const user = mapUser(userResponse);

  return {
    user,
    accessToken,
    refreshToken,
    expiresIn,
  };
};

export const logout = () => apiPost('/auth/logout');

export const getCurrentUser = async () => {
  const userResponse = await apiGet<BackendUserResponse>('/auth/me');
  return mapUser(userResponse);
};

export const refreshToken = async (refreshToken: string) => {
  const tokenResponse = await apiPost<BackendTokenResponse>('/auth/refresh', {
    refresh_token: refreshToken,
  });
  const { accessToken, refreshToken: nextRefreshToken, expiresIn } =
    normalizeTokens(tokenResponse);

  if (typeof window !== 'undefined' && accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }

  const userResponse = await apiGet<BackendUserResponse>('/auth/me');
  const user = mapUser(userResponse);

  return {
    user,
    accessToken,
    refreshToken: nextRefreshToken,
    expiresIn,
  };
};

export const getOAuthUrl = (provider: 'google' | 'github' | 'kakao') =>
  apiGet<{ url: string }>(`/auth/oauth/${provider}`);

export const handleOAuthCallback = (provider: string, code: string) =>
  apiPost<AuthResponse>(`/auth/oauth/${provider}/callback`, { code });
