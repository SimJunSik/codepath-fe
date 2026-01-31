// CodePath Frontend - API Types
// API 계약서 기준 Request/Response 타입

import type {
  User,
  Problem,
  Submission,
  TestResult,
  Project,
  ProjectProgress,
  DashboardData,
} from './models';

// ========================================
// Common API Response
// ========================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  timestamp: string;
}

// Backend actual response for problem list
export interface ProblemListResponse {
  problems: Problem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  timestamp: string;
}

// ========================================
// Auth API
// ========================================

export interface SignupRequest {
  email: string;
  password: string;
  username: string;
  displayName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface SendVerificationCodeRequest {
  email: string;
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface VerifyCodeResponse {
  message: string;
  verified: boolean;
}

export interface OAuthProvider {
  provider: 'google' | 'github' | 'kakao';
  redirectUrl: string;
}

// ========================================
// Problem API
// ========================================

import type { SolveStatus } from './models';

export interface ProblemFilters {
  page?: number;
  pageSize?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
  tags?: string[];
  search?: string;
  sortBy?: 'newest' | 'difficulty' | 'acceptance';
  solveStatus?: SolveStatus;
}

export interface CodeRunRequest {
  code: string;
  language: 'python' | 'javascript' | 'typescript' | 'java' | 'cpp' | 'go';
}

export interface CodeRunResponse {
  success: boolean;
  output?: string;
  error?: string;
  executionTime: number;
}

export interface CodeSubmitRequest {
  code: string;
  language: 'python' | 'javascript' | 'typescript' | 'java' | 'cpp' | 'go';
}

export interface SubmissionResponse {
  submissionId: string;
  status: 'accepted' | 'wrong_answer' | 'runtime_error' | 'time_limit_exceeded' | 'pending';
  testResults: TestResult[];
  executionTime?: number;
  memory?: number;
}

// ========================================
// Project API
// ========================================

export interface ProjectFilters {
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

// ========================================
// User API
// ========================================

export interface UpdateProfileRequest {
  displayName?: string;
  bio?: string;
  skills?: string[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
    twitter?: string;
  };
}

// ========================================
// Onboarding API
// ========================================

export interface OnboardingData {
  experience: 'beginner' | 'job_seeker' | 'career_change';
  targetRole: 'frontend' | 'backend' | 'fullstack' | 'mobile';
  weeklyHours: '5-10' | '10-20' | '20+';
  techStack: string[];
}
