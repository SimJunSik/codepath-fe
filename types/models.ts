// CodePath Frontend - Domain Models
// API 계약서 기준 타입 정의

// ========================================
// User Models
// ========================================

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  profileImage?: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  bio?: string;
  skills: string[];
  experience: ExperienceLevel;
  goals: LearningGoal[];
  socialLinks?: SocialLinks;
  stats: UserStats;
}

export interface UserStats {
  problemsSolved: number;
  projectsCompleted: number;
  streakDays: number;
  totalPoints: number;
  rank: number;
}

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface LearningGoal {
  id: string;
  title: string;
  targetDate?: string;
  progress: number;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  portfolio?: string;
  twitter?: string;
}

// ========================================
// Problem Models
// ========================================

export type SolveStatus = 'solved' | 'attempted' | 'not_attempted';

export interface Problem {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string[];
  tags: string[];
  starterCode: Record<string, string>;
  testCases: TestCase[];
  constraints: string[];
  examples: Example[];
  acceptanceRate: number;
  totalSubmissions: number;
  successfulSubmissions: number;
  isSolved?: boolean;
  solveStatus?: SolveStatus;
  createdAt: string;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Submission {
  id: string;
  problemId: string;
  userId: string;
  code: string;
  language: string;
  status: SubmissionStatus;
  executionTime?: number;
  memory?: number;
  testResults: TestResult[];
  submittedAt: string;
}

export type SubmissionStatus =
  | 'accepted'
  | 'wrong_answer'
  | 'runtime_error'
  | 'time_limit_exceeded'
  | 'pending';

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  errorMessage?: string;
}

// ========================================
// Project Models
// ========================================

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  category: string;
  tags: string[];
  requirements: Requirement[];
  learningObjectives: string[];
  resources: Resource[];
  milestones: Milestone[];
  enrolledCount: number;
  completionRate: number;
  createdAt: string;
}

export interface Requirement {
  id: string;
  title: string;
  description: string;
  priority: 'must' | 'should' | 'could';
}

export interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'documentation' | 'github';
  url: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  order: number;
  estimatedHours: number;
}

export interface ProjectProgress {
  projectId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  currentStep: number;
  completedSteps: number[];
  startedAt?: string;
  completedAt?: string;
}

export interface ProjectSubmission {
  id: string;
  projectId: string;
  userId: string;
  repositoryUrl: string;
  liveUrl?: string;
  description: string;
  screenshots: string[];
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  feedback?: Feedback[];
  submittedAt?: string;
  reviewedAt?: string;
}

export interface Feedback {
  id: string;
  reviewerId: string;
  comment: string;
  rating: number;
  createdAt: string;
}

// ========================================
// Dashboard Models
// ========================================

export interface DashboardData {
  user: {
    id: string;
    displayName: string;
    profileImage?: string;
  };
  stats: {
    problemsSolved: number;
    projectsCompleted: number;
    currentStreak: number;
    totalPoints: number;
  };
  recentActivity: Activity[];
  recommendedProblems: Problem[];
  ongoingProjects: {
    projectId: string;
    title: string;
    progress: number;
  }[];
}

export interface Activity {
  id: string;
  type: 'problem_solved' | 'project_completed' | 'streak_achieved' | 'level_up';
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface ProgressOverview {
  problemsThisWeek: number;
  problemsThisMonth: number;
  currentStreak: number;
  longestStreak: number;
  skillProgress: SkillProgress[];
}

export interface SkillProgress {
  skill: string;
  level: number;
  experience: number;
  nextLevelExperience: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
  total?: number;
}
