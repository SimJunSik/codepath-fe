// CodePath Frontend - Signup Page

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { signup, sendVerificationCode, verifyCode } from '@/lib/api/auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

const CODE_LENGTH = 6;
const RESEND_COOLDOWN = 300; // 5 minutes

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

  // Email verification state
  const [emailVerified, setEmailVerified] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSendCode = async () => {
    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: '유효한 이메일을 입력하세요' });
      return;
    }

    setSendingCode(true);
    setErrors({ ...errors, email: '', verification: '' });

    try {
      await sendVerificationCode(formData.email);
      setShowCodeInput(true);
      setCountdown(RESEND_COOLDOWN);
      setVerificationCode(Array(CODE_LENGTH).fill(''));
      setTimeout(() => codeInputRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      setErrors({ ...errors, email: err.message || '인증 코드 발송에 실패했습니다.' });
    } finally {
      setSendingCode(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newCode = [...verificationCode];
    newCode[index] = digit;
    setVerificationCode(newCode);
    setErrors({ ...errors, verification: '' });

    if (digit && index < CODE_LENGTH - 1) {
      codeInputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits filled
    if (digit && index === CODE_LENGTH - 1) {
      const fullCode = newCode.join('');
      if (fullCode.length === CODE_LENGTH) {
        handleVerifyCode(fullCode);
      }
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH);

    if (pastedData.length > 0) {
      const newCode = [...verificationCode];
      for (let i = 0; i < pastedData.length; i++) {
        newCode[i] = pastedData[i];
      }
      setVerificationCode(newCode);

      if (pastedData.length === CODE_LENGTH) {
        handleVerifyCode(pastedData);
      } else {
        codeInputRefs.current[Math.min(pastedData.length, CODE_LENGTH - 1)]?.focus();
      }
    }
  };

  const handleVerifyCode = async (code: string) => {
    setVerifyingCode(true);
    setErrors({ ...errors, verification: '' });

    try {
      const result = await verifyCode(formData.email, code);
      if (result.verified) {
        setEmailVerified(true);
        setShowCodeInput(false);
      }
    } catch (err: any) {
      setErrors({ ...errors, verification: err.message || '인증 코드가 올바르지 않습니다.' });
      setVerificationCode(Array(CODE_LENGTH).fill(''));
      codeInputRefs.current[0]?.focus();
    } finally {
      setVerifyingCode(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!emailVerified) {
      newErrors.email = '이메일 인증을 완료해 주세요';
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

  const canSubmit = emailVerified && agreedToTerms && !loading;

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
            {/* Email with verification */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">
                이메일 <span className="text-error">*</span>
              </label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (emailVerified) {
                        setEmailVerified(false);
                        setShowCodeInput(false);
                      }
                    }}
                    disabled={emailVerified}
                    className={`
                      w-full h-11 px-4 text-base border rounded-md
                      bg-bg-elevated text-text-primary placeholder:text-text-tertiary
                      transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-offset-0
                      disabled:bg-bg-active disabled:text-text-secondary disabled:cursor-not-allowed
                      ${errors.email ? 'border-error focus:ring-error' : 'border-border focus:border-accent focus:ring-accent/20'}
                      ${emailVerified ? 'border-success bg-success/5' : ''}
                    `}
                  />
                </div>
                {!emailVerified ? (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleSendCode}
                    loading={sendingCode}
                    disabled={!validateEmail(formData.email) || sendingCode}
                    className="whitespace-nowrap"
                  >
                    {showCodeInput && countdown > 0 ? '재발송' : '인증하기'}
                  </Button>
                ) : (
                  <div className="flex items-center px-3 text-success font-medium text-sm">
                    인증완료
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="text-sm text-error">{errors.email}</p>
              )}
            </div>

            {/* Verification code input */}
            {showCodeInput && !emailVerified && (
              <div className="space-y-3 p-4 bg-bg-base rounded-lg border border-border">
                <p className="text-sm text-text-secondary text-center">
                  <span className="text-accent font-medium">{formData.email}</span>
                  <br />으로 발송된 6자리 코드를 입력하세요
                </p>
                <div className="flex justify-center gap-2">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { codeInputRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(index, e)}
                      onPaste={handleCodePaste}
                      disabled={verifyingCode}
                      className={`
                        w-10 h-12 text-center text-xl font-bold
                        border-2 rounded-lg bg-bg-elevated text-text-primary
                        transition-all duration-200
                        focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
                        disabled:opacity-50
                        ${errors.verification ? 'border-error' : 'border-border'}
                      `}
                    />
                  ))}
                </div>
                {countdown > 0 && (
                  <p className="text-xs text-text-tertiary text-center">
                    남은 시간: {formatTime(countdown)}
                  </p>
                )}
                {errors.verification && (
                  <p className="text-sm text-error text-center">{errors.verification}</p>
                )}
                {verifyingCode && (
                  <p className="text-sm text-accent text-center">확인 중...</p>
                )}
              </div>
            )}

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
              type="password"
              label="비밀번호"
              placeholder="8자 이상 입력하세요"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              helperText="영문 대/소문자, 숫자 포함 8자 이상"
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
                <Link href="/terms" className="text-accent hover:underline">
                  이용약관
                </Link>{' '}
                및{' '}
                <Link href="/privacy" className="text-accent hover:underline">
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
              disabled={!canSubmit}
            >
              가입하기
            </Button>

            {!emailVerified && (
              <p className="text-xs text-text-tertiary text-center">
                이메일 인증을 완료해야 가입할 수 있습니다
              </p>
            )}
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
