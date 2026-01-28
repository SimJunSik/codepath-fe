// CodePath Frontend - Admin Problems Page
'use client';

import { useEffect, useMemo, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {
  deleteAdminProblem,
  getAdminProblem,
  getAdminProblems,
  importAdminProblems,
  updateAdminProblem,
} from '@/lib/api/admin';

interface AdminProblemListItem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  category: string;
  is_active: boolean;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

interface AdminProblemDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  category: string;
  starter_code: string;
  solution_code?: string | null;
  test_cases: any[];
  constraints?: string[] | null;
  hints?: string[] | null;
  time_complexity?: string | null;
  space_complexity?: string | null;
  is_active: boolean;
  is_premium: boolean;
}

const toJsonString = (value: unknown) => JSON.stringify(value ?? null, null, 2);

export default function AdminProblemsPage() {
  const [problems, setProblems] = useState<AdminProblemListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<AdminProblemDetail | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [importJson, setImportJson] = useState('');
  const [importResult, setImportResult] = useState<string | null>(null);

  const [editForm, setEditForm] = useState({
    title: '',
    slug: '',
    description: '',
    difficulty: '',
    category: '',
    starter_code: '',
    solution_code: '',
    test_cases: '[]',
    constraints: '[]',
    hints: '[]',
    time_complexity: '',
    space_complexity: '',
    is_active: true,
    is_premium: false,
  });

  const refreshList = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAdminProblems({ page: 1, pageSize: 100 });
      setProblems(response.problems || []);
    } catch (err: any) {
      setError(err.message || '문제 목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshList();
  }, []);

  const handleEditSelect = async (problemId: string) => {
    setEditError(null);
    try {
      const detail = await getAdminProblem(problemId);
      setSelectedProblem(detail);
      setEditForm({
        title: detail.title,
        slug: detail.slug,
        description: detail.description,
        difficulty: detail.difficulty,
        category: detail.category,
        starter_code: detail.starter_code,
        solution_code: detail.solution_code || '',
        test_cases: toJsonString(detail.test_cases),
        constraints: toJsonString(detail.constraints || []),
        hints: toJsonString(detail.hints || []),
        time_complexity: detail.time_complexity || '',
        space_complexity: detail.space_complexity || '',
        is_active: detail.is_active,
        is_premium: detail.is_premium,
      });
    } catch (err: any) {
      setEditError(err.message || '문제 상세를 불러오지 못했습니다.');
    }
  };

  const parseJson = (value: string, fieldName: string) => {
    try {
      return JSON.parse(value);
    } catch {
      throw new Error(`${fieldName} JSON 형식이 올바르지 않습니다.`);
    }
  };

  const handleSave = async () => {
    if (!selectedProblem) {
      return;
    }
    setEditError(null);
    setIsSaving(true);
    try {
      const payload = {
        title: editForm.title,
        slug: editForm.slug,
        description: editForm.description,
        difficulty: editForm.difficulty,
        category: editForm.category,
        starter_code: editForm.starter_code,
        solution_code: editForm.solution_code || null,
        test_cases: parseJson(editForm.test_cases, 'test_cases'),
        constraints: parseJson(editForm.constraints, 'constraints'),
        hints: parseJson(editForm.hints, 'hints'),
        time_complexity: editForm.time_complexity || null,
        space_complexity: editForm.space_complexity || null,
        is_active: editForm.is_active,
        is_premium: editForm.is_premium,
      };
      const updated = await updateAdminProblem(selectedProblem.id, payload);
      setSelectedProblem(updated);
      await refreshList();
    } catch (err: any) {
      setEditError(err.message || '문제 수정에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (problemId: string) => {
    if (!confirm('정말 이 문제를 비활성화할까요?')) {
      return;
    }
    try {
      await deleteAdminProblem(problemId);
      await refreshList();
    } catch (err: any) {
      setError(err.message || '문제 삭제에 실패했습니다.');
    }
  };

  const handleImport = async () => {
    setImportResult(null);
    try {
      const parsed = JSON.parse(importJson);
      const problemsPayload = Array.isArray(parsed) ? parsed : parsed.problems;
      if (!Array.isArray(problemsPayload)) {
        throw new Error('배열 형태의 problems JSON이 필요합니다.');
      }
      const result = await importAdminProblems({ problems: problemsPayload });
      setImportResult(`생성 ${result.created}개, 업데이트 ${result.updated}개`);
      await refreshList();
    } catch (err: any) {
      setImportResult(err.message || 'JSON import에 실패했습니다.');
    }
  };

  const selectedSummary = useMemo(() => {
    if (!selectedProblem) {
      return null;
    }
    return `${selectedProblem.title} (${selectedProblem.slug})`;
  }, [selectedProblem]);

  return (
    <div className="max-w-6xl space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">문제 관리</h1>

      <Card variant="elevated" padding="md">
        <h2 className="text-lg font-semibold text-text-primary mb-3">JSON Import</h2>
        <textarea
          className="w-full min-h-[160px] rounded border border-border bg-bg-base p-3 text-sm text-text-primary"
          placeholder='[{"title":"...", "slug":"...", ...}]'
          value={importJson}
          onChange={(e) => setImportJson(e.target.value)}
        />
        <div className="flex items-center gap-3 mt-3">
          <Button size="sm" variant="primary" onClick={handleImport}>
            JSON Import 실행
          </Button>
          {importResult && <span className="text-sm text-text-secondary">{importResult}</span>}
        </div>
      </Card>

      {loading && <div className="text-text-secondary">로딩 중...</div>}
      {error && <div className="text-error">{error}</div>}

      {!loading && !error && (
        <Card variant="elevated" padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-bg-hover">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">제목</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">슬러그</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">난이도</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">카테고리</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">활성</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">액션</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {problems.map((problem) => (
                  <tr key={problem.id} className="hover:bg-bg-hover transition-colors">
                    <td className="px-6 py-3 text-sm text-text-primary">{problem.title}</td>
                    <td className="px-6 py-3 text-sm text-text-secondary">{problem.slug}</td>
                    <td className="px-6 py-3 text-sm text-text-secondary">{problem.difficulty}</td>
                    <td className="px-6 py-3 text-sm text-text-secondary">{problem.category}</td>
                    <td className="px-6 py-3 text-sm text-text-secondary">
                      {problem.is_active ? 'Y' : 'N'}
                    </td>
                    <td className="px-6 py-3 text-sm text-text-secondary">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditSelect(problem.id)}>
                          편집
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(problem.id)}>
                          삭제
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Card variant="elevated" padding="lg">
        <h2 className="text-lg font-semibold text-text-primary mb-3">
          문제 편집 {selectedSummary ? `- ${selectedSummary}` : ''}
        </h2>
        {editError && <div className="text-error mb-3">{editError}</div>}
        {!selectedProblem && (
          <div className="text-text-secondary">편집할 문제를 선택하세요.</div>
        )}
        {selectedProblem && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                label="제목"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
              <Input
                type="text"
                label="슬러그"
                value={editForm.slug}
                onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
              />
              <Input
                type="text"
                label="난이도"
                value={editForm.difficulty}
                onChange={(e) => setEditForm({ ...editForm, difficulty: e.target.value })}
              />
              <Input
                type="text"
                label="카테고리"
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
              />
            </div>

            <label className="block text-sm text-text-secondary">설명</label>
            <textarea
              className="w-full min-h-[120px] rounded border border-border bg-bg-base p-3 text-sm text-text-primary"
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            />

            <label className="block text-sm text-text-secondary">Starter Code</label>
            <textarea
              className="w-full min-h-[120px] rounded border border-border bg-bg-base p-3 text-sm text-text-primary font-mono"
              value={editForm.starter_code}
              onChange={(e) => setEditForm({ ...editForm, starter_code: e.target.value })}
            />

            <label className="block text-sm text-text-secondary">Solution Code</label>
            <textarea
              className="w-full min-h-[120px] rounded border border-border bg-bg-base p-3 text-sm text-text-primary font-mono"
              value={editForm.solution_code}
              onChange={(e) => setEditForm({ ...editForm, solution_code: e.target.value })}
            />

            <label className="block text-sm text-text-secondary">test_cases (JSON)</label>
            <textarea
              className="w-full min-h-[120px] rounded border border-border bg-bg-base p-3 text-sm text-text-primary font-mono"
              value={editForm.test_cases}
              onChange={(e) => setEditForm({ ...editForm, test_cases: e.target.value })}
            />

            <label className="block text-sm text-text-secondary">constraints (JSON)</label>
            <textarea
              className="w-full min-h-[80px] rounded border border-border bg-bg-base p-3 text-sm text-text-primary font-mono"
              value={editForm.constraints}
              onChange={(e) => setEditForm({ ...editForm, constraints: e.target.value })}
            />

            <label className="block text-sm text-text-secondary">hints (JSON)</label>
            <textarea
              className="w-full min-h-[80px] rounded border border-border bg-bg-base p-3 text-sm text-text-primary font-mono"
              value={editForm.hints}
              onChange={(e) => setEditForm({ ...editForm, hints: e.target.value })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                label="Time Complexity"
                value={editForm.time_complexity}
                onChange={(e) => setEditForm({ ...editForm, time_complexity: e.target.value })}
              />
              <Input
                type="text"
                label="Space Complexity"
                value={editForm.space_complexity}
                onChange={(e) => setEditForm({ ...editForm, space_complexity: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-text-secondary">
                <input
                  type="checkbox"
                  checked={editForm.is_active}
                  onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                />
                활성
              </label>
              <label className="flex items-center gap-2 text-sm text-text-secondary">
                <input
                  type="checkbox"
                  checked={editForm.is_premium}
                  onChange={(e) => setEditForm({ ...editForm, is_premium: e.target.checked })}
                />
                프리미엄
              </label>
            </div>

            <Button size="sm" variant="primary" onClick={handleSave} loading={isSaving}>
              저장
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
