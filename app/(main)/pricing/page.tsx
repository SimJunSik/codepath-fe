// CodePath Frontend - Pricing Page

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { getSubscriptionPlans, getMySubscription, initPayment } from '@/lib/api/subscriptions';
import { useAuthStore } from '@/lib/store/authStore';
import type { SubscriptionPlan, Subscription } from '@/types';

declare global {
  interface Window {
    IMP?: any;
  }
}

export default function PricingPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const plansData = await getSubscriptionPlans();
        setPlans(plansData);

        if (isAuthenticated) {
          const subscription = await getMySubscription();
          setCurrentSubscription(subscription);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  const handleSubscribe = async (planId: string) => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/pricing');
      return;
    }

    if (planId === 'free') {
      return;
    }

    setPaymentLoading(true);

    try {
      const paymentData = await initPayment({
        plan_id: planId,
        return_url: window.location.origin + '/pricing/complete',
      });

      const IMP = window.IMP;
      if (!IMP) {
        alert('결제 모듈 로딩 중 오류가 발생했습니다.');
        setPaymentLoading(false);
        return;
      }

      IMP.init('imp00000000'); // TODO: 실제 가맹점 코드로 변경

      IMP.request_pay(
        {
          pg: 'html5_inicis',
          pay_method: 'card',
          merchant_uid: paymentData.merchant_uid,
          name: paymentData.plan_name,
          amount: paymentData.amount,
        },
        (response: any) => {
          if (response.success) {
            router.push(`/pricing/complete?merchant_uid=${paymentData.merchant_uid}&imp_uid=${response.imp_uid}`);
          } else {
            alert(`결제 실패: ${response.error_msg}`);
          }
          setPaymentLoading(false);
        }
      );
    } catch (error: any) {
      alert(error.message || '결제 초기화에 실패했습니다.');
      setPaymentLoading(false);
    }
  };

  const isPlanActive = (planId: string) => {
    return currentSubscription?.plan === planId && currentSubscription?.status === 'active';
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            간단한 가격 정책
          </h1>
          <p className="text-xl text-text-secondary">
            Python 학습을 시작하세요
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-text-secondary">로딩 중...</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => {
              const isActive = isPlanActive(plan.id);
              const isFree = plan.id === 'free';

              return (
                <Card
                  key={plan.id}
                  variant="elevated"
                  padding="lg"
                  className={`relative ${!isFree ? 'border-2 border-accent' : ''}`}
                >
                  {!isFree && (
                    <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 text-sm font-bold rounded-bl-lg rounded-tr-lg">
                      추천
                    </div>
                  )}

                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-text-primary mb-2">
                      {plan.name}
                    </h2>
                    <div className="flex items-baseline mb-2">
                      <span className="text-4xl font-bold text-accent">
                        {plan.price.toLocaleString()}원
                      </span>
                      {!isFree && <span className="text-text-secondary ml-2">/월</span>}
                    </div>
                    <p className="text-text-secondary">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-accent mr-2 mt-1">✓</span>
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={isFree ? 'outline' : 'primary'}
                    size="lg"
                    className="w-full"
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={isActive || paymentLoading}
                    loading={paymentLoading && !isFree}
                  >
                    {isActive ? '현재 플랜' : isFree ? '무료로 시작' : '구독하기'}
                  </Button>
                </Card>
              );
            })}
          </div>
        )}

        {isAuthenticated && currentSubscription && (
          <div className="mt-12 text-center">
            <Card variant="elevated" padding="md" className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-sm text-text-secondary">현재 구독</div>
                  <div className="text-lg font-semibold text-text-primary">
                    {currentSubscription.plan === 'premium' ? '프리미엄' : '무료'}
                  </div>
                  {currentSubscription.expires_at && (
                    <div className="text-sm text-text-secondary mt-1">
                      만료일: {new Date(currentSubscription.expires_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
