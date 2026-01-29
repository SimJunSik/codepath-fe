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
                단순한 문법이 아닌, 면접에서 자주 묻는 Python의 핵심 개념들을
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
                  <h3 className="text-h4 text-text-primary mb-3">면접 대비</h3>
                  <p className="text-body-sm">
                    실제 기술 면접에서 자주 출제되는 Python 관련 질문들을 다룹니다.
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
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-accent">•</span>
                  <span><strong className="text-text-primary">GIL (Global Interpreter Lock)</strong> - Python 멀티스레딩의 한계와 우회 방법</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">•</span>
                  <span><strong className="text-text-primary">CPython Internals</strong> - 레퍼런스 카운팅, 가비지 컬렉션, 메모리 관리</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">•</span>
                  <span><strong className="text-text-primary">Mutable vs Immutable</strong> - list, tuple, set, dict의 차이와 동작 원리</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">•</span>
                  <span><strong className="text-text-primary">Shallow vs Deep Copy</strong> - 얕은 복사와 깊은 복사의 차이</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">•</span>
                  <span><strong className="text-text-primary">Generator & Iterator</strong> - yield, lazy evaluation, 메모리 효율</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">•</span>
                  <span><strong className="text-text-primary">Decorator & Closure</strong> - 함수형 프로그래밍과 메타프로그래밍</span>
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
                <div className="space-y-4">
                  <div>
                    <p className="text-body-sm text-text-tertiary mb-1">일반 문의</p>
                    <a href="mailto:contact@codepath.cloud" className="text-accent hover:text-accent-hover transition-colors">
                      contact@codepath.cloud
                    </a>
                  </div>
                  <div>
                    <p className="text-body-sm text-text-tertiary mb-1">기술 지원</p>
                    <a href="mailto:support@codepath.cloud" className="text-accent hover:text-accent-hover transition-colors">
                      support@codepath.cloud
                    </a>
                  </div>
                  <div>
                    <p className="text-body-sm text-text-tertiary mb-1">개인정보 관련</p>
                    <a href="mailto:privacy@codepath.cloud" className="text-accent hover:text-accent-hover transition-colors">
                      privacy@codepath.cloud
                    </a>
                  </div>
                </div>
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
