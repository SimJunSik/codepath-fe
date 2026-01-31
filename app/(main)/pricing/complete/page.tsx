// CodePath Frontend - Payment Complete Page

'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { completePayment } from '@/lib/api/subscriptions';

function PaymentCompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const merchant_uid = searchParams.get('merchant_uid');
    const imp_uid = searchParams.get('imp_uid');

    if (!merchant_uid || !imp_uid) {
      setStatus('error');
      setMessage('잘못된 결제 정보입니다.');
      return;
    }

    const verifyPayment = async () => {
      try {
        const result = await completePayment({
          merchant_uid,
          imp_uid,
        });

        if (result.success) {
          setStatus('success');
          setMessage('결제가 완료되었습니다!');
        } else {
          setStatus('error');
          setMessage(result.message || '결제 검증에 실패했습니다.');
        }
      } catch (error: any) {
        setStatus('error');
        setMessage(error.message || '결제 검증 중 오류가 발생했습니다.');
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-12">
        <Card variant="elevated" padding="lg">
          {status === 'loading' && (
            <div className="text-center py-12">
              <div className="text-2xl font-bold text-text-primary mb-4">
                결제 확인 중...
              </div>
              <div className="text-text-secondary">
                잠시만 기다려주세요
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">✅</div>
              <h1 className="text-3xl font-bold text-text-primary mb-4">
                결제 완료!
              </h1>
              <p className="text-lg text-text-secondary mb-8">
                {message}
              </p>
              <p className="text-text-secondary mb-8">
                이제 모든 프리미엄 기능을 사용하실 수 있습니다.
              </p>
              <div className="space-x-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => router.push('/problems')}
                >
                  문제 풀러가기
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => router.push('/pricing')}
                >
                  구독 정보 보기
                </Button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">❌</div>
              <h1 className="text-3xl font-bold text-text-primary mb-4">
                결제 실패
              </h1>
              <p className="text-lg text-error mb-8">
                {message}
              </p>
              <p className="text-text-secondary mb-8">
                문제가 계속되면 고객센터로 문의해주세요.
              </p>
              <div className="space-x-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => router.push('/pricing')}
                >
                  다시 시도
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => router.push('/problems')}
                >
                  홈으로
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </MainLayout>
  );
}

export default function PaymentCompletePage() {
  return (
    <Suspense fallback={
      <MainLayout>
        <div className="text-center py-12">로딩 중...</div>
      </MainLayout>
    }>
      <PaymentCompleteContent />
    </Suspense>
  );
}
