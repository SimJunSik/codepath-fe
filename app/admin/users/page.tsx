// CodePath Frontend - Admin Users Page
'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { getAdminUsers } from '@/lib/api/admin';

interface AdminUser {
  id: string;
  email: string;
  username: string;
  full_name?: string | null;
  role: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAdminUsers({ page: 1, pageSize: 100 });
        setUsers(response.users || []);
      } catch (err: any) {
        setError(err.message || '사용자 목록을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold text-text-primary mb-6">사용자 목록</h1>

      {loading && <div className="text-text-secondary">로딩 중...</div>}
      {error && <div className="text-error mb-4">{error}</div>}

      {!loading && !error && (
        <Card variant="elevated" padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-bg-hover">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">이메일</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">사용자명</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">이름</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">권한</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">활성</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">가입일</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-bg-hover transition-colors">
                    <td className="px-6 py-3 text-sm text-text-primary">{user.email}</td>
                    <td className="px-6 py-3 text-sm text-text-secondary">{user.username}</td>
                    <td className="px-6 py-3 text-sm text-text-secondary">{user.full_name || '-'}</td>
                    <td className="px-6 py-3 text-sm text-text-secondary">{user.role}</td>
                    <td className="px-6 py-3 text-sm text-text-secondary">
                      {user.is_active ? 'Y' : 'N'}
                    </td>
                    <td className="px-6 py-3 text-sm text-text-secondary">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
