// CodePath Frontend - Problems List Page

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layouts/MainLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { getProblems } from '@/lib/api/problems';
import { useAuthStore } from '@/lib/store/authStore';
import type { SolveStatus } from '@/types';

interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  category: string;
  total_submissions: number;
  successful_submissions: number;
  success_rate: number;
  solve_status?: SolveStatus | null;
}

// Fallback mock data (비로그인 또는 API 실패 시)
const MOCK_PROBLEMS: Problem[] = [
  {
    id: '1',
    title: 'GIL이란 무엇인가?',
    slug: 'what-is-gil',
    difficulty: 'medium',
    category: 'gil',
    total_submissions: 0,
    successful_submissions: 0,
    success_rate: 72,
  },
  {
    id: '2',
    title: 'Shallow Copy vs Deep Copy',
    slug: 'shallow-vs-deep-copy',
    difficulty: 'easy',
    category: 'copy',
    total_submissions: 0,
    successful_submissions: 0,
    success_rate: 85,
  },
  {
    id: '3',
    title: 'tuple이 list보다 빠른 이유',
    slug: 'tuple-vs-list-performance',
    difficulty: 'medium',
    category: 'data_structure',
    total_submissions: 0,
    successful_submissions: 0,
    success_rate: 68,
  },
  {
    id: '4',
    title: 'Python 메모리 관리',
    slug: 'python-memory-management',
    difficulty: 'hard',
    category: 'memory',
    total_submissions: 0,
    successful_submissions: 0,
    success_rate: 45,
  },
  {
    id: '5',
    title: 'Generator vs List Comprehension',
    slug: 'generator-vs-list-comprehension',
    difficulty: 'easy',
    category: 'generator',
    total_submissions: 0,
    successful_submissions: 0,
    success_rate: 78,
  },
  {
    id: '6',
    title: 'Decorator 동작 원리',
    slug: 'decorator-how-it-works',
    difficulty: 'medium',
    category: 'decorator',
    total_submissions: 0,
    successful_submissions: 0,
    success_rate: 62,
  },
];

const difficultyColors: Record<string, string> = {
  beginner: 'bg-info-bg text-info border border-info/30',
  easy: 'bg-success-bg text-success border border-success/30',
  medium: 'bg-warning-bg text-warning border border-warning/30',
  hard: 'bg-error-bg text-error border border-error/30',
  expert: 'bg-error-bg text-error border border-error/30',
};

const difficultyOrder = ['beginner', 'easy', 'medium', 'hard', 'expert'] as const;

const difficultyLabels: Record<string, string> = {
  beginner: '입문',
  easy: '쉬움',
  medium: '보통',
  hard: '어려움',
  expert: '전문가',
};

const categoryLabels: Record<string, string> = {
  basics: '기초',
  gil: 'GIL',
  cpython: 'CPython',
  memory: '메모리',
  data_structure: '자료구조',
  copy: '복사',
  collections: '컬렉션',
  generator: 'Generator',
  decorator: 'Decorator',
  closure: 'Closure',
  function: '함수',
  control_flow: '제어 흐름',
  concurrency: '동시성',
  oop: 'OOP',
  string: '문자열',
  builtin: '내장 함수',
  exception: '예외 처리',
  io: '입출력',
  module: '모듈',
  unpacking: '언패킹',
  syntax: '문법',
  truthiness: 'Truthiness',
  best_practice: '모범 사례',
};

const solveStatusConfig: Record<string, { label: string; icon: string; color: string }> = {
  solved: { label: '완료', icon: '✓', color: 'text-success' },
  attempted: { label: '시도 중', icon: '○', color: 'text-warning' },
  not_attempted: { label: '미시도', icon: '-', color: 'text-text-tertiary' },
};

export default function ProblemsPage() {
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [solveStatusFilter, setSolveStatusFilter] = useState<SolveStatus | 'all'>('all');
  const [problems, setProblems] = useState<Problem[]>(MOCK_PROBLEMS);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        // 비로그인이어도 퀴즈 목록은 보여줌
        // solve_status 필터는 로그인 시에만 적용
        const response = await getProblems({
          pageSize: 100,
          solveStatus: isAuthenticated && solveStatusFilter !== 'all' ? solveStatusFilter : undefined,
        });
        if (response && Array.isArray(response.problems)) {
          setProblems(response.problems.map((p: any) => ({
            ...p,
            id: p.id.toString(),
          })));
        }
      } catch (error) {
        console.error('Failed to fetch problems:', error);
        // API 실패 시 mock 데이터 유지
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [solveStatusFilter, isAuthenticated]);

  const filteredProblems = difficultyFilter === 'all'
    ? problems
    : problems.filter(p => p.difficulty === difficultyFilter);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Python Deep Dive</h1>
          <p className="text-text-secondary">
            Python 핵심 개념을 퀴즈로 학습하세요
          </p>
          {!isAuthenticated && (
            <p className="text-text-tertiary text-sm mt-2">
              <Link href="/login" className="text-accent hover:underline">로그인</Link>하면 진행 상황이 저장됩니다
            </p>
          )}
        </div>

        {/* 진행 상황 통계 */}
        {isAuthenticated && problems.length > 0 && !loading && (
          <Card variant="elevated" padding="lg" className="mb-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">학습 진행 상황</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-text-primary mb-1">
                  {problems.length}
                </div>
                <div className="text-sm text-text-secondary">전체 문제</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-1">
                  {problems.filter((p) => p.solve_status === 'solved').length}
                </div>
                <div className="text-sm text-text-secondary">해결</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-1">
                  {problems.filter((p) => p.solve_status === 'attempted').length}
                </div>
                <div className="text-sm text-text-secondary">시도</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-text-tertiary mb-1">
                  {problems.filter((p) => p.solve_status === 'not_attempted').length}
                </div>
                <div className="text-sm text-text-secondary">미시도</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
                <span>진행률</span>
                <span>
                  {Math.round(
                    (problems.filter((p) => p.solve_status === 'solved').length /
                      problems.length) *
                      100
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-bg-tertiary rounded-full h-2">
                <div
                  className="bg-success rounded-full h-2 transition-all duration-300"
                  style={{
                    width: `${
                      (problems.filter((p) => p.solve_status === 'solved').length /
                        problems.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </Card>
        )}

        {/* Filters */}
        <Card variant="elevated" padding="md" className="mb-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* 난이도 필터 */}
            <div className="flex gap-2">
              <span className="text-sm text-text-secondary self-center mr-2">난이도:</span>
              <Button
                size="sm"
                variant={difficultyFilter === 'all' ? 'primary' : 'outline'}
                onClick={() => setDifficultyFilter('all')}
              >
                전체
              </Button>
              {difficultyOrder.map((difficulty) => (
                <Button
                  key={difficulty}
                  size="sm"
                  variant={difficultyFilter === difficulty ? 'primary' : 'outline'}
                  onClick={() => setDifficultyFilter(difficulty)}
                >
                  {difficultyLabels[difficulty]}
                </Button>
              ))}
            </div>

            {/* 풀이 상태 필터 - 로그인 시에만 표시 */}
            {isAuthenticated && (
              <div className="flex gap-2 ml-4 border-l border-border pl-4">
                <span className="text-sm text-text-secondary self-center mr-2">풀이 상태:</span>
                <Button
                  size="sm"
                  variant={solveStatusFilter === 'all' ? 'primary' : 'outline'}
                  onClick={() => setSolveStatusFilter('all')}
                >
                  전체
                </Button>
                <Button
                  size="sm"
                  variant={solveStatusFilter === 'solved' ? 'primary' : 'outline'}
                  onClick={() => setSolveStatusFilter('solved')}
                >
                  ✓ 완료
                </Button>
                <Button
                  size="sm"
                  variant={solveStatusFilter === 'attempted' ? 'primary' : 'outline'}
                  onClick={() => setSolveStatusFilter('attempted')}
                >
                  ○ 시도 중
                </Button>
                <Button
                  size="sm"
                  variant={solveStatusFilter === 'not_attempted' ? 'primary' : 'outline'}
                  onClick={() => setSolveStatusFilter('not_attempted')}
                >
                  - 미시도
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Problems List */}
        {loading ? (
          <Card variant="elevated" padding="lg">
            <div className="text-center text-text-secondary">로딩 중...</div>
          </Card>
        ) : (
          <Card variant="elevated" padding="none">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-bg-hover">
                    {isAuthenticated && (
                      <th className="px-4 py-4 text-center text-sm font-semibold text-text-secondary w-16">
                        상태
                      </th>
                    )}
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                      제목
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                      난이도
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                      카테고리
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                      정답률
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredProblems.map((problem) => {
                    const status = problem.solve_status;
                    const statusConfig = status ? solveStatusConfig[status] : null;

                    return (
                      <tr
                        key={problem.id}
                        className="hover:bg-bg-hover transition-colors"
                      >
                        {isAuthenticated && (
                          <td className="px-4 py-4 text-center">
                            {statusConfig && (
                              <span
                                className={`text-lg font-bold ${statusConfig.color}`}
                                title={statusConfig.label}
                              >
                                {statusConfig.icon}
                              </span>
                            )}
                          </td>
                        )}
                        <td className="px-6 py-4">
                          <Link
                            href={`/problems/${problem.id}`}
                            className="text-accent hover:text-accent-hover font-medium"
                          >
                            {problem.title}
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              difficultyColors[problem.difficulty] || difficultyColors.medium
                            }`}
                          >
                            {difficultyLabels[problem.difficulty] || problem.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-text-secondary">
                          {categoryLabels[problem.category] || problem.category}
                        </td>
                        <td className="px-6 py-4 text-sm text-text-secondary">
                          {problem.success_rate.toFixed(0)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {filteredProblems.length === 0 && !loading && (
          <Card variant="elevated" padding="lg" className="mt-4">
            <div className="text-center text-text-secondary">
              해당 난이도의 퀴즈가 없습니다
            </div>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
