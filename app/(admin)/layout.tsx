// CodePath Frontend - Admin Layout
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuthStore } from '@/lib/store/authStore';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated || isLoading) {
      return;
    }
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (user?.role !== 'admin') {
      router.push('/problems');
    }
  }, [hasHydrated, isLoading, isAuthenticated, user, router]);

  if (!hasHydrated || isLoading) {
    return (
      <MainLayout>
        <div className="text-text-secondary">로딩 중...</div>
      </MainLayout>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return <MainLayout>{children}</MainLayout>;
}
