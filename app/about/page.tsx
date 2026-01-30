// CodePath - About Page

import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layouts/Header';

export const metadata: Metadata = {
  title: '서비스 소개',
  description: 'CodePath - Python 심화 학습 플랫폼 소개',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-h1 text-text-primary mb-8">서비스 소개</h1>

          <div className="prose prose-invert max-w-none space-y-12 text-text-secondary">
            {/* About Section */}
            <section>
              <h2 className="text-h2 text-text-primary mb-6">CodePath란?</h2>
              <p className="text-body text-lg leading-relaxed">
                CodePath는 Python 개발자를 위한 심화 학습 플랫폼입니다.
                단순한 문법이 아닌, Python의 핵심 개념들을
                퀴즈 형식으로 학습할 수 있습니다.
              </p>
            </section>

            {/* What We Offer */}
            <section>
              <h2 className="text-h2 text-text-primary mb-6">제공 서비스</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-bg-elevated border border-border rounded-lg">
                  <h3 className="text-h4 text-text-primary mb-3">Python Deep Dive 퀴즈</h3>
                  <p className="text-body-sm">
                    GIL, 메모리 관리, CPython 내부 동작 등 심화 개념을 퀴즈로 학습합니다.
                  </p>
                </div>
                <div className="p-6 bg-bg-elevated border border-border rounded-lg">
                  <h3 className="text-h4 text-text-primary mb-3">실전 문제</h3>
                  <p className="text-body-sm">
                    실무에서 마주치는 Python 관련 질문들을 다룹니다.
                  </p>
                </div>
                <div className="p-6 bg-bg-elevated border border-border rounded-lg">
                  <h3 className="text-h4 text-text-primary mb-3">개념 설명</h3>
                  <p className="text-body-sm">
                    각 퀴즈마다 상세한 해설을 제공하여 깊이 있는 이해를 돕습니다.
                  </p>
                </div>
                <div className="p-6 bg-bg-elevated border border-border rounded-lg">
                  <h3 className="text-h4 text-text-primary mb-3">학습 진도 관리</h3>
                  <p className="text-body-sm">
                    풀었던 문제와 학습 현황을 체계적으로 관리할 수 있습니다.
                  </p>
                </div>
              </div>
            </section>

            {/* Topics */}
            <section>
              <h2 className="text-h2 text-text-primary mb-6">학습 주제</h2>
              <p className="text-body mb-4">
                Python의 다양한 심화 주제들을 다룹니다.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-accent">•</span>
                  <span><strong className="text-text-primary">GIL, CPython Internals</strong> - 메모리 관리, 가비지 컬렉션</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">•</span>
                  <span><strong className="text-text-primary">자료구조</strong> - list, dict, set, tuple의 동작 원리</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">•</span>
                  <span><strong className="text-text-primary">함수형 프로그래밍</strong> - decorator, closure, generator</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">•</span>
                  <span><strong className="text-text-primary">동시성</strong> - asyncio, threading, multiprocessing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">•</span>
                  <span className="text-text-tertiary">그 외 다양한 Python 심화 주제들...</span>
                </li>
              </ul>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-h2 text-text-primary mb-6">문의하기</h2>
              <p className="text-body mb-6">
                서비스 이용 중 문의사항이 있으시면 아래 이메일로 연락해 주세요.
              </p>
              <div className="p-6 bg-bg-elevated border border-border rounded-lg">
                <a href="mailto:wnstlr24.alarmcon@gmail.com" className="text-accent hover:text-accent-hover transition-colors text-lg">
                  wnstlr24.alarmcon@gmail.com
                </a>
              </div>
            </section>
          </div>

          <div className="mt-12">
            <Link href="/" className="text-accent hover:text-accent-hover transition-colors">
              ← 홈으로 돌아가기
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
