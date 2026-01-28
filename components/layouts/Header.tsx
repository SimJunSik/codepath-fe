// CodePath Frontend - Header Component

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import Button from '@/components/ui/Button';

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, user, clearAuth, isLoading, hasHydrated } = useAuthStore();
  const canRenderAuth = hasHydrated && !isLoading;

  const handleLogout = () => {
    clearAuth();
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-bg-elevated/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-accent">CodePath</div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {canRenderAuth && isAuthenticated ? (
            <>
              <Link
                href="/problems"
                className="text-sm font-medium text-text-secondary hover:text-accent transition-colors"
              >
                퀴즈
              </Link>
            </>
          ) : canRenderAuth ? (
            <>
              <Link
                href="/problems"
                className="text-sm font-medium text-text-secondary hover:text-accent transition-colors"
              >
                퀴즈
              </Link>
            </>
          ) : null}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-text-secondary">{user?.displayName}</span>
                <Button size="sm" variant="outline" onClick={handleLogout}>
                  로그아웃
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button size="sm" variant="ghost">
                  로그인
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" variant="primary">
                  회원가입
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
