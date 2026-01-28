// CodePath Frontend - Admin API
import { apiGet, apiPost, apiPut, apiDelete } from './client';

export const getAdminUsers = (params?: {
  page?: number;
  pageSize?: number;
  role?: string;
}) => {
  const query = params
    ? { page: params.page, page_size: params.pageSize, role: params.role }
    : undefined;
  return apiGet<{ users: any[]; total: number; page: number; page_size: number; total_pages: number }>(
    '/admin/users',
    { params: query }
  );
};

export const getAdminProblems = (params?: {
  page?: number;
  pageSize?: number;
  difficulty?: string;
  category?: string;
  isActive?: boolean;
}) => {
  const query = params
    ? {
        page: params.page,
        page_size: params.pageSize,
        difficulty: params.difficulty,
        category: params.category,
        is_active: params.isActive,
      }
    : undefined;
  return apiGet<{ problems: any[]; total: number; page: number; page_size: number; total_pages: number }>(
    '/admin/problems',
    { params: query }
  );
};

export const getAdminProblem = (problemId: string) =>
  apiGet<any>(`/admin/problems/${problemId}`);

export const updateAdminProblem = (problemId: string, data: Record<string, any>) =>
  apiPut<any>(`/admin/problems/${problemId}`, data);

export const deleteAdminProblem = (problemId: string) =>
  apiDelete<{ success: boolean }>(`/admin/problems/${problemId}`);

export const importAdminProblems = (payload: { problems: any[] }) =>
  apiPost<{ created: number; updated: number }>(`/admin/problems/import`, payload);
