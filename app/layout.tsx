// CodePath Frontend - Root Layout

import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '@/lib/providers/QueryProvider';

export const metadata: Metadata = {
  title: 'CodePath - 코딩 문제 풀이 플랫폼',
  description: '개발자를 위한 알고리즘 문제 풀이 플랫폼. 코드를 작성하고 실력을 향상시키세요.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">
        <QueryProvider>
          <a href="#main-content" className="sr-only-focusable">
            본문으로 바로가기
          </a>
          <div id="root">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
