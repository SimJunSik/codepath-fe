// CodePath Frontend - Main Layout
// 인증 필요한 페이지용 레이아웃 (Header + Sidebar)

'use client';

import Header from './Header';
import Sidebar from './Sidebar';
import { useUIStore } from '@/lib/store/uiStore';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-bg-base">
      <Header />
      <Sidebar />
      <main
        className={`
          pt-16 transition-all duration-300
          ${sidebarOpen ? 'ml-64' : 'ml-20'}
        `}
      >
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
