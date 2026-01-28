// CodePath Frontend - Problems List Page

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layouts/MainLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { getProblems } from '@/lib/api/problems';

interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  category: string;
  total_submissions: number;
  successful_submissions: number;
  success_rate: number;
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

const difficultyLabels: Record<string, string> = {
  beginner: '입문',
  easy: '쉬움',
  medium: '보통',
  hard: '어려움',
  expert: '전문가',
};

const categoryLabels: Record<string, string> = {
  gil: 'GIL',
  cpython: 'CPython',
  memory: '메모리',
  data_structure: '자료구조',
  copy: '복사',
  generator: 'Generator',
  decorator: 'Decorator',
  closure: 'Closure',
  concurrency: '동시성',
  oop: 'OOP',
};

export default function ProblemsPage() {
  const [filter, setFilter] = useState('all');
  const [problems, setProblems] = useState<Problem[]>(MOCK_PROBLEMS);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProblems = async () => {
      // 토큰 확인
      const token = localStorage.getItem('accessToken');
      setIsAuthenticated(!!token);

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getProblems({ pageSize: 100 });
        if (response && response.problems) {
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
  }, []);

  const filteredProblems = filter === 'all'
    ? problems
    : problems.filter(p => p.difficulty === filter);

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

        {/* Filters */}
        <Card variant="elevated" padding="md" className="mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={filter === 'all' ? 'primary' : 'outline'}
                onClick={() => setFilter('all')}
              >
                전체
              </Button>
              <Button
                size="sm"
                variant={filter === 'easy' ? 'primary' : 'outline'}
                onClick={() => setFilter('easy')}
              >
                쉬움
              </Button>
              <Button
                size="sm"
                variant={filter === 'medium' ? 'primary' : 'outline'}
                onClick={() => setFilter('medium')}
              >
                보통
              </Button>
              <Button
                size="sm"
                variant={filter === 'hard' ? 'primary' : 'outline'}
                onClick={() => setFilter('hard')}
              >
                어려움
              </Button>
            </div>
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
                  {filteredProblems.map((problem) => (
                    <tr
                      key={problem.id}
                      className="hover:bg-bg-hover transition-colors"
                    >
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
                  ))}
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
