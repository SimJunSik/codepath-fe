// CodePath Frontend - Users API
// API 계약서 기준

import { apiGet, apiPatch } from './client';
import type {
  UserProfile,
  DashboardData,
  UserStats,
  Activity,
  UpdateProfileRequest,
} from '@/types';

// 프로필 수정
export const updateProfile = (data: UpdateProfileRequest) =>
  apiPatch<UserProfile>('/users/me', data);

// 사용자 통계
export const getUserStats = () => apiGet<UserStats>('/users/me/stats');

// 활동 내역
export const getActivity = (limit?: number) =>
  apiGet<Activity[]>('/users/me/activity', { params: { limit } });

// 대시보드 (별도 엔드포인트)
export const getDashboard = () => apiGet<DashboardData>('/dashboard');

// 공개 포트폴리오 조회
export const getPublicPortfolio = (username: string) =>
  apiGet<UserProfile>(`/portfolios/${username}`);
