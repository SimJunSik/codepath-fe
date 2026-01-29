// CodePath Frontend - API Client
// TRD 및 API 계약서 기준

import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import type { ApiError, ApiResponse } from '@/types';

// API v1 사용 (Backend와 합의)
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://api.codepath.cloud/api/v1'
    : 'http://localhost:8000/api/v1');

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (토큰 자동 추가)
apiClient.interceptors.request.use(
  (config) => {
    // localStorage에서 토큰 가져오기 (서버 사이드에서는 실행 안 됨)
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (에러 처리)
apiClient.interceptors.response.use(
  (response) => {
    return response.data; // ApiResponse<T> 반환
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const requestUrl = typeof originalRequest?.url === 'string' ? originalRequest.url : '';
    const isAuthLogin =
      requestUrl.includes('/auth/login') || requestUrl.includes('/auth/signup');

    // 401 Unauthorized - 토큰 갱신 시도
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthLogin) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          // 리프레시 토큰이 없으면 로그아웃 처리
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('auth-storage'); // authStore 상태도 제거
          return Promise.reject(error);
        }

        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const { accessToken } = response.data.data;
        localStorage.setItem('accessToken', accessToken);

        // 원래 요청 재시도
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 - 로그아웃 처리
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('auth-storage'); // authStore 상태도 제거
        return Promise.reject(refreshError);
      }
    }

    // 에러 메시지 추출
    const responseData = error.response?.data as
      | { error?: { message?: string } | string; message?: string; detail?: string }
      | undefined;
    const errorMessage =
      responseData?.error && typeof responseData.error !== 'string'
        ? responseData.error.message
        : responseData?.message || responseData?.detail || '알 수 없는 오류가 발생했습니다.';

    return Promise.reject(new Error(errorMessage));
  }
);

// Generic API 함수
const isApiResponse = <T>(value: unknown): value is ApiResponse<T> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'success' in (value as Record<string, unknown>) &&
    'data' in (value as Record<string, unknown>)
  );
};

export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.get<ApiResponse<T> | T>(url, config);
  if (isApiResponse<T>(response)) {
    return response.data;
  }
  return response as T;
}

export async function apiPost<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.post<ApiResponse<T> | T>(url, data, config);
  if (isApiResponse<T>(response)) {
    return response.data;
  }
  return response as T;
}

export async function apiPut<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.put<ApiResponse<T> | T>(url, data, config);
  if (isApiResponse<T>(response)) {
    return response.data;
  }
  return response as T;
}

export async function apiPatch<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.patch<ApiResponse<T> | T>(url, data, config);
  if (isApiResponse<T>(response)) {
    return response.data;
  }
  return response as T;
}

export async function apiDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.delete<ApiResponse<T> | T>(url, config);
  if (isApiResponse<T>(response)) {
    return response.data;
  }
  return response as T;
}

// Query Keys (React Query)
export const queryKeys = {
  // Auth
  currentUser: ['user', 'current'] as const,

  // Problems
  problems: ['problems'] as const,
  problem: (id: string) => ['problems', id] as const,
  problemSubmissions: (id: string) => ['problems', id, 'submissions'] as const,

  // Projects
  projects: ['projects'] as const,
  project: (id: string) => ['projects', id] as const,
  projectProgress: (id: string) => ['projects', id, 'progress'] as const,

  // Dashboard
  dashboard: ['dashboard'] as const,
  activity: ['activity'] as const,

  // Portfolio
  portfolio: (username: string) => ['portfolio', username] as const,
} as const;
