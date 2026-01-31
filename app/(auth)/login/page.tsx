// CodePath Frontend - Login Page

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { login } from '@/lib/api/auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  const redirectPath = searchParams.get('redirect');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(formData);
      setAuth(response.user, response.accessToken);

      // localStorage에 refreshToken 저장
      if (typeof window !== 'undefined') {
        localStorage.setItem('refreshToken', response.refreshToken);
      }

      // redirect 파라미터가 있으면 해당 경로로, 없으면 기본 경로로 이동
      if (redirectPath) {
        router.push(redirectPath);
      } else if (response.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/problems');
      }
    } catch (err: any) {
      setError(err.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-accent mb-2">CodePath</h1>
          </Link>
          <h2 className="text-2xl font-bold text-text-primary mb-2">로그인</h2>
          <p className="text-text-secondary">학습을 계속하세요</p>
        </div>

        <Card variant="elevated" padding="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="이메일"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            {error && (
              <div className="p-3 bg-error-bg border border-error rounded-lg text-sm text-error">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
            >
              로그인
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-text-secondary">
            계정이 없으신가요?{' '}
            <Link href="/signup" className="text-accent font-medium hover:text-accent-hover">
              회원가입
            </Link>
          </div>
        </Card>

        <p className="mt-6 text-center text-sm text-text-tertiary">
          로그인 시{' '}
          <Link href="#" className="text-accent hover:underline">
            이용약관
          </Link>{' '}
          및{' '}
          <Link href="#" className="text-accent hover:underline">
            개인정보처리방침
          </Link>
          에 동의하게 됩니다
        </p>
      </div>
    </div>
  );
}
