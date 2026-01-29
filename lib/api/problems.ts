// CodePath Frontend - Problems API
// API 계약서 기준

import { apiGet, apiPost } from './client';
import type {
  Problem,
  Submission,
  ProblemListResponse,
  ProblemFilters,
  CodeRunRequest,
  CodeRunResponse,
  CodeSubmitRequest,
  SubmissionResponse,
} from '@/types';

export const getProblems = (filters?: ProblemFilters) => {
  const params = filters
    ? {
        page: filters.page,
        page_size: filters.pageSize,
        difficulty: filters.difficulty,
        category: filters.category,
      }
    : undefined;
  return apiGet<ProblemListResponse>('/problems', { params });
};

export const getProblem = (problemId: string) => apiGet<Problem>(`/problems/${problemId}`);

// 코드 실행 (테스트용)
export const runCode = (problemId: string, data: CodeRunRequest) =>
  apiPost<CodeRunResponse>(`/problems/${problemId}/run`, data);

// 코드 제출 (채점용)
export const submitCode = (problemId: string, data: CodeSubmitRequest) =>
  apiPost<SubmissionResponse>(`/problems/${problemId}/submit`, data);

export const getSubmissions = (problemId: string) =>
  apiGet<Submission[]>(`/problems/${problemId}/submissions`);

export const getSubmission = (submissionId: string) =>
  apiGet<Submission>(`/submissions/${submissionId}`);
