// CodePath Frontend - Projects API

import { apiGet, apiPost } from './client';
import type { Project, ProjectProgress, ProjectFilters } from '@/types';

export const getProjects = (filters?: ProjectFilters) =>
  apiGet<Project[]>('/projects', { params: filters });

export const getProject = (id: string) => apiGet<Project>(`/projects/${id}`);

export const startProject = (id: string) => apiPost(`/projects/${id}/start`);

export const getProjectProgress = (id: string) =>
  apiGet<ProjectProgress>(`/projects/${id}/progress`);

export const completeStep = (projectId: string, stepNumber: number) =>
  apiPost(`/projects/${projectId}/steps/${stepNumber}/complete`);
