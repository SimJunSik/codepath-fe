// Subscription and Payment API

import { apiGet, apiPost } from './client';
import type {
  SubscriptionPlan,
  Subscription,
  PaymentInitRequest,
  PaymentInitResponse,
  PaymentCompleteRequest,
  PaymentCompleteResponse,
} from '@/types';

// Get available subscription plans
export const getSubscriptionPlans = () =>
  apiGet<SubscriptionPlan[]>('/subscriptions/plans');

// Get current user's subscription
export const getMySubscription = () =>
  apiGet<Subscription>('/subscriptions/me');

// Initialize payment
export const initPayment = (data: PaymentInitRequest) =>
  apiPost<PaymentInitResponse>('/subscriptions/payment/init', data);

// Complete payment
export const completePayment = (data: PaymentCompleteRequest) =>
  apiPost<PaymentCompleteResponse>('/subscriptions/payment/complete', data);

// Cancel subscription
export const cancelSubscription = (reason?: string) =>
  apiPost<Subscription>('/subscriptions/cancel', { reason });
