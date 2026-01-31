// Subscription and Payment types

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: 'free' | 'premium';
  status: 'active' | 'canceled' | 'expired' | 'trial';
  started_at: string;
  expires_at: string | null;
  auto_renew: boolean;
  created_at: string;
}

export interface PaymentInitRequest {
  plan_id: string;
  return_url: string;
}

export interface PaymentInitResponse {
  merchant_uid: string;
  amount: number;
  plan_name: string;
}

export interface PaymentCompleteRequest {
  merchant_uid: string;
  imp_uid: string;
}

export interface PaymentCompleteResponse {
  success: boolean;
  message: string;
  subscription: Subscription | null;
}
