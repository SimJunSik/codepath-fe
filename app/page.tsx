// CodePath Frontend - Landing Page (Minimal Design)

import Link from 'next/link';
import Header from '@/components/layouts/Header';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main id="main-content" className="pt-32">
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            {/* 코드 블록 스타일 제목 */}
            <div className="mb-8 font-mono text-body-sm text-text-tertiary">
              <span className="text-syntax-comment"># Python Deep Dive</span>
            </div>

            <h1 className="text-display-lg mb-6 text-text-primary">
              Python을 제대로
              <br />
              이해하기
            </h1>

            <p className="text-xl text-text-secondary mb-12 max-w-2xl">
              GIL, CPython 내부 동작, 메모리 관리까지.
              <br />
              면접에서 자주 나오는 Python 핵심 개념을 퀴즈로 학습합니다.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/problems"
                className="px-6 py-3 bg-accent text-text-inverse rounded-lg text-label font-medium hover:bg-accent-hover transition-colors active:scale-98"
              >
                퀴즈 풀기
              </Link>
            </div>

            {/* 코드 예시 */}
            <div className="mt-16 bg-bg-elevated border border-border rounded-lg p-6 font-mono text-mono overflow-x-auto">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border-subtle">
                <div className="w-3 h-3 rounded-full bg-error"></div>
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="ml-2 text-text-tertiary text-caption">deep_copy.py</span>
              </div>
              <pre className="text-text-secondary leading-relaxed">
                <code>
                  <span className="text-syntax-keyword">import</span> <span className="text-syntax-variable">copy</span>
                  {'\n\n'}<span className="text-syntax-variable">a</span> = [[<span className="text-syntax-number">1</span>, <span className="text-syntax-number">2</span>], [<span className="text-syntax-number">3</span>, <span className="text-syntax-number">4</span>]]
                  {'\n'}<span className="text-syntax-variable">b</span> = <span className="text-syntax-variable">a</span>.<span className="text-syntax-function">copy</span>()        <span className="text-syntax-comment"># shallow copy</span>
                  {'\n'}<span className="text-syntax-variable">c</span> = <span className="text-syntax-variable">copy</span>.<span className="text-syntax-function">deepcopy</span>(<span className="text-syntax-variable">a</span>)  <span className="text-syntax-comment"># deep copy</span>
                  {'\n\n'}<span className="text-syntax-variable">a</span>[<span className="text-syntax-number">0</span>][<span className="text-syntax-number">0</span>] = <span className="text-syntax-number">999</span>
                  {'\n'}<span className="text-syntax-function">print</span>(<span className="text-syntax-variable">b</span>[<span className="text-syntax-number">0</span>][<span className="text-syntax-number">0</span>])  <span className="text-syntax-comment"># ?</span>
                  {'\n'}<span className="text-syntax-function">print</span>(<span className="text-syntax-variable">c</span>[<span className="text-syntax-number">0</span>][<span className="text-syntax-number">0</span>])  <span className="text-syntax-comment"># ?</span>
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="container mx-auto px-6 py-20 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 mb-4 text-text-primary">Topics</h2>
            <p className="text-body text-text-secondary mb-8">
              Python 면접에서 자주 나오는 핵심 주제들을 다룹니다
            </p>

            {/* Python Internals */}
            <div className="mb-8">
              <h3 className="text-label text-text-tertiary mb-4 font-mono"># Python Internals</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'GIL (Global Interpreter Lock)', desc: 'Python 멀티스레딩의 한계와 우회 방법' },
                  { title: 'CPython Internals', desc: '레퍼런스 카운팅, 가비지 컬렉션의 동작 원리' },
                  { title: 'Memory Management', desc: '객체 생성, 메모리 할당과 해제' },
                ].map((topic, i) => (
                  <div
                    key={i}
                    className="p-4 bg-bg-elevated border border-border rounded-lg hover:border-border-emphasis transition-colors"
                  >
                    <h4 className="text-label text-text-primary mb-1">{topic.title}</h4>
                    <p className="text-body-sm text-text-tertiary">{topic.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Structures */}
            <div className="mb-8">
              <h3 className="text-label text-text-tertiary mb-4 font-mono"># Data Structures</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Mutable vs Immutable', desc: 'list, tuple, set, dict의 차이와 동작 원리' },
                  { title: 'Shallow vs Deep Copy', desc: '얕은 복사와 깊은 복사의 차이점' },
                  { title: 'Collections Module', desc: 'defaultdict, Counter, deque 등 고급 자료구조' },
                ].map((topic, i) => (
                  <div
                    key={i}
                    className="p-4 bg-bg-elevated border border-border rounded-lg hover:border-border-emphasis transition-colors"
                  >
                    <h4 className="text-label text-text-primary mb-1">{topic.title}</h4>
                    <p className="text-body-sm text-text-tertiary">{topic.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Functions & Control Flow */}
            <div className="mb-8">
              <h3 className="text-label text-text-tertiary mb-4 font-mono"># Functions & Control Flow</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Generator & Iterator', desc: 'yield, lazy evaluation, 메모리 효율' },
                  { title: 'Decorator & Closure', desc: '함수형 프로그래밍과 메타프로그래밍' },
                  { title: 'Function Arguments', desc: '*args, **kwargs, 기본값과 스코프' },
                  { title: 'Exception Handling', desc: 'try/except/finally, 예외 체이닝' },
                ].map((topic, i) => (
                  <div
                    key={i}
                    className="p-4 bg-bg-elevated border border-border rounded-lg hover:border-border-emphasis transition-colors"
                  >
                    <h4 className="text-label text-text-primary mb-1">{topic.title}</h4>
                    <p className="text-body-sm text-text-tertiary">{topic.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* OOP & Concurrency */}
            <div>
              <h3 className="text-label text-text-tertiary mb-4 font-mono"># OOP & Concurrency</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Object-Oriented Python', desc: 'MRO, 다중 상속, 메타클래스' },
                  { title: 'Concurrency', desc: 'threading, multiprocessing, asyncio' },
                ].map((topic, i) => (
                  <div
                    key={i}
                    className="p-4 bg-bg-elevated border border-border rounded-lg hover:border-border-emphasis transition-colors"
                  >
                    <h4 className="text-label text-text-primary mb-1">{topic.title}</h4>
                    <p className="text-body-sm text-text-tertiary">{topic.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-text-tertiary text-caption">
              © 2026 CodePath
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-text-tertiary hover:text-text-secondary transition-colors text-caption">
                이용약관
              </a>
              <a href="#" className="text-text-tertiary hover:text-text-secondary transition-colors text-caption">
                개인정보처리방침
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
