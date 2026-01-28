// CodePath Frontend - Admin Home
import Link from 'next/link';
import Card from '@/components/ui/Card';

export default function AdminHomePage() {
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
      </div>
    </div>
  );
}
