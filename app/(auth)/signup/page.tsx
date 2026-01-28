// CodePath Frontend - Signup Page

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { signup } from '@/lib/api/auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function SignupPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    displayName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = '유효한 이메일을 입력하세요';
    }

    if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = '비밀번호에 대문자를 포함해주세요';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = '비밀번호에 소문자를 포함해주세요';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = '비밀번호에 숫자를 포함해주세요';
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }

    if (formData.username.length < 4) {
      newErrors.username = '사용자명은 4자 이상이어야 합니다';
    } else if (!/^[A-Za-z0-9_]+$/.test(formData.username)) {
      newErrors.username = '영문, 숫자, 밑줄만 사용 가능합니다';
    }

    if (!formData.displayName.trim()) {
      newErrors.displayName = '이름을 입력하세요';
    }

    if (!agreedToTerms) {
      newErrors.terms = '이용약관에 동의해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await signup({
        email: formData.email,
        password: formData.password,
        username: formData.username,
        displayName: formData.displayName,
      });
      setAuth(response.user, response.accessToken);

      // localStorage에 refreshToken 저장
      if (typeof window !== 'undefined') {
        localStorage.setItem('refreshToken', response.refreshToken);
      }

      router.push('/problems');
    } catch (err: any) {
      setErrors({ general: err.message || '회원가입에 실패했습니다.' });
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
          <h2 className="text-2xl font-bold text-text-primary mb-2">회원가입</h2>
          <p className="text-text-secondary">코딩 실력을 한 단계 올려보세요</p>
        </div>

        <Card variant="elevated" padding="lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="text"
              label="이름"
              placeholder="홍길동"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              error={errors.displayName}
              required
            />

            <Input
              type="text"
              label="사용자명"
              placeholder="codepath_user"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              error={errors.username}
              helperText="4-20자의 영문, 숫자, 밑줄만 사용 가능합니다"
              required
            />

            <Input
              type="email"
              label="이메일"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              required
            />

            <Input
              type="password"
              label="비밀번호"
              placeholder="8자 이상 입력하세요"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              helperText="영문, 숫자, 특수문자 포함 8자 이상"
              required
            />

            <Input
              type="password"
              label="비밀번호 재확인"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
              required
            />

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-border bg-bg-base text-accent accent-accent focus:ring-accent focus:ring-offset-0"
              />
              <label htmlFor="terms" className="text-sm text-text-secondary">
                <Link href="#" className="text-accent hover:underline">
                  이용약관
                </Link>{' '}
                및{' '}
                <Link href="#" className="text-accent hover:underline">
                  개인정보처리방침
                </Link>
                에 동의합니다
              </label>
            </div>

            {errors.terms && (
              <p className="text-sm text-error">{errors.terms}</p>
            )}

            {errors.general && (
              <div className="p-3 bg-error-bg border border-error rounded-lg text-sm text-error">
                {errors.general}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
            >
              가입하기
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-text-secondary">
            이미 계정이 있나요?{' '}
            <Link href="/login" className="text-accent font-medium hover:text-accent-hover">
              로그인
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
