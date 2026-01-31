// CodePath Frontend - Admin Home
'use client';

import Link from 'next/link';
import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/lib/store/authStore';

export default function AdminHomePage() {
  const [migrationLoading, setMigrationLoading] = useState(false);
  const [migrationResult, setMigrationResult] = useState<any>(null);
  const accessToken = useAuthStore((state) => state.accessToken);

  const handleMigration = async () => {
    setMigrationLoading(true);
    setMigrationResult(null);

    try {
      const response = await fetch('/api/v1/admin/migrations/enum-values', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const result = await response.json();
      setMigrationResult(result);
    } catch (error: any) {
      setMigrationResult({
        success: false,
        message: error.message || 'Migration 실행 중 오류가 발생했습니다.',
      });
    } finally {
      setMigrationLoading(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold text-text-primary mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="elevated" padding="md">
          <h2 className="text-lg font-semibold text-text-primary mb-2">사용자 관리</h2>
          <p className="text-text-secondary mb-4">가입된 사용자 목록을 조회합니다.</p>
          <Link href="/admin/users" className="text-accent hover:underline">
            사용자 목록 보기
          </Link>
        </Card>
        <Card variant="elevated" padding="md">
          <h2 className="text-lg font-semibold text-text-primary mb-2">문제 관리</h2>
          <p className="text-text-secondary mb-4">문제 조회/수정/삭제 및 JSON import를 지원합니다.</p>
          <Link href="/admin/problems" className="text-accent hover:underline">
            문제 관리로 이동
          </Link>
        </Card>
        <Card variant="elevated" padding="md">
          <h2 className="text-lg font-semibold text-text-primary mb-2">시스템 설정</h2>
          <p className="text-text-secondary mb-4">데이터베이스 Enum 값을 추가합니다.</p>
          <Button
            onClick={handleMigration}
            variant="primary"
            size="sm"
            loading={migrationLoading}
          >
            Enum Migration 실행
          </Button>
          {migrationResult && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              migrationResult.success
                ? 'bg-success-bg border border-success text-success'
                : 'bg-error-bg border border-error text-error'
            }`}>
              <p className="font-semibold mb-1">{migrationResult.message}</p>
              {migrationResult.details && (
                <div className="mt-2 text-xs space-y-1">
                  <p>추가됨: {migrationResult.details.added_categories?.length || 0}개</p>
                  <p>이미 존재: {migrationResult.details.existing_categories?.length || 0}개</p>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
