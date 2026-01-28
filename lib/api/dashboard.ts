// CodePath Frontend - Dashboard API

import { apiGet } from './client';
import type { DashboardData } from '@/types';

export const getDashboard = () => apiGet<DashboardData>('/dashboard');
