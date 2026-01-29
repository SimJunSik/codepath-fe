// CodePath Frontend - Root Layout

import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '@/lib/providers/QueryProvider';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const siteName = 'CodePath';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - 코딩 문제 풀이 플랫폼`,
    template: `%s | ${siteName}`,
  },
  description:
    '개발자를 위한 알고리즘 문제 풀이 플랫폼. 코드를 작성하고 실력을 향상시키세요.',
  keywords: [
    'Python',
    '알고리즘',
    '코딩 테스트',
    '문제 풀이',
    '개발자 학습',
    'CodePath',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    title: `${siteName} - 코딩 문제 풀이 플랫폼`,
    description:
      '개발자를 위한 알고리즘 문제 풀이 플랫폼. 코드를 작성하고 실력을 향상시키세요.',
    siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - 코딩 문제 풀이 플랫폼`,
    description:
      '개발자를 위한 알고리즘 문제 풀이 플랫폼. 코드를 작성하고 실력을 향상시키세요.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2305386123114991"
          crossOrigin="anonymous"
        />
      </head>
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
