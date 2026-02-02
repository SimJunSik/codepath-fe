// CodePath Frontend - Problem Detail Page (Python Deep Dive Quiz)

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import MainLayout from '@/components/layouts/MainLayout';
import { getProblem, runCode, submitCode } from '@/lib/api/problems';
import { getMySubscription } from '@/lib/api/subscriptions';
import { useEditorStore } from '@/lib/store/editorStore';

// Monaco Editor는 SSR 비활성화 필요
const CodeEditor = dynamic(
  () => import('@/components/features/problem/CodeEditor'),
  { ssr: false }
);

interface Quiz {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  category: string;
  starter_code: string;
  test_cases: any[];
  constraints?: string[];
  hints?: string[];
  is_premium?: boolean;
}

interface CodeTestResult {
  test_id: number;
  passed: boolean;
  input?: Record<string, any> | null;
  expected?: any;
  actual?: any;
  error?: string | null;
  execution_time?: number | null;
}

interface CodeRunResult {
  status: string;
  passed_tests: number;
  total_tests: number;
  test_results: CodeTestResult[];
  error_message?: string | null;
  execution_time?: number | null;
}

interface CodeSubmitResult {
  submission_id: string;
  status: string;
  passed_tests: number;
  total_tests: number;
  test_results?: CodeTestResult[] | null;
  error_message?: string | null;
  execution_time?: number | null;
  memory_used?: number | null;
  submitted_at?: string;
  explanation_score?: number | null;
  explanation_feedback?: string | null;
  explanation_passed?: boolean | null;
}

// Mock 퀴즈 데이터 (Python Deep Dive)
const MOCK_QUIZZES: Record<string, Quiz> = {
  'what-is-gil': {
    id: '1',
    title: 'GIL이란 무엇인가?',
    slug: 'what-is-gil',
    description: `## Global Interpreter Lock (GIL)

다음 코드의 실행 결과를 예측하세요.

\`\`\`python
import threading
import time

counter = 0

def increment():
    global counter
    for _ in range(1000000):
        counter += 1

threads = []
for _ in range(2):
    t = threading.Thread(target=increment)
    threads.append(t)
    t.start()

for t in threads:
    t.join()

print(counter)
\`\`\`

### 질문
1. \`counter\`의 최종 값은 항상 2000000인가?
2. 그 이유는 무엇인가?`,
    difficulty: 'medium',
    category: 'gil',
    starter_code: `def answer():
    """
    GIL에 대해 설명하고, 위 코드의 결과를 예측하세요.

    Returns:
        dict: {
            "expected_value": int or str,  # 예상 결과값
            "reason": str,  # 이유 설명
            "is_thread_safe": bool  # counter += 1이 thread-safe한지
        }
    """
    return {
        "expected_value": None,
        "reason": "",
        "is_thread_safe": None
    }`,
    test_cases: [{ input: {}, expected_output: { is_thread_safe: false } }],
    constraints: ['GIL의 동작 원리를 이해해야 합니다'],
    hints: ['GIL은 bytecode 단위로 lock을 관리합니다', 'counter += 1은 여러 bytecode로 분리됩니다'],
  },
  'shallow-vs-deep-copy': {
    id: '2',
    title: 'Shallow Copy vs Deep Copy',
    slug: 'shallow-vs-deep-copy',
    description: `## 얕은 복사와 깊은 복사

다음 코드의 실행 결과를 예측하세요.

\`\`\`python
import copy

a = [[1, 2], [3, 4]]
b = a.copy()          # 또는 list(a), a[:]
c = copy.deepcopy(a)

a[0][0] = 999
a.append([5, 6])

print(f"a = {a}")
print(f"b = {b}")
print(f"c = {c}")
\`\`\`

### 질문
각 변수의 최종 값은?`,
    difficulty: 'easy',
    category: 'copy',
    starter_code: `def answer():
    """
    얕은 복사와 깊은 복사의 차이를 설명하세요.

    Returns:
        dict: {
            "a": list,  # a의 최종 값
            "b": list,  # b의 최종 값
            "c": list,  # c의 최종 값
            "explanation": str  # 차이점 설명
        }
    """
    return {
        "a": None,
        "b": None,
        "c": None,
        "explanation": ""
    }`,
    test_cases: [
      {
        input: {},
        expected_output: {
          a: [[999, 2], [3, 4], [5, 6]],
          b: [[999, 2], [3, 4]],
          c: [[1, 2], [3, 4]],
        },
      },
    ],
    constraints: ['copy 모듈의 동작을 이해해야 합니다'],
    hints: ['shallow copy는 1단계만 복사합니다', '내부 리스트는 같은 객체를 참조합니다'],
  },
  'tuple-vs-list-performance': {
    id: '3',
    title: 'tuple이 list보다 빠른 이유',
    slug: 'tuple-vs-list-performance',
    description: `## tuple vs list 성능 차이

다음 중 더 빠른 것은 무엇이고, 그 이유는?

\`\`\`python
# Case 1: list 생성
%timeit [1, 2, 3, 4, 5]

# Case 2: tuple 생성
%timeit (1, 2, 3, 4, 5)
\`\`\`

### 질문
1. 어떤 것이 더 빠른가?
2. 그 이유는 무엇인가?
3. 메모리 사용량은 어떻게 다른가?`,
    difficulty: 'medium',
    category: 'data_structure',
    starter_code: `def answer():
    """
    tuple과 list의 성능 차이를 설명하세요.

    Returns:
        dict: {
            "faster": str,  # "tuple" 또는 "list"
            "reasons": list[str],  # 이유들
            "memory_difference": str  # 메모리 차이 설명
        }
    """
    return {
        "faster": None,
        "reasons": [],
        "memory_difference": ""
    }`,
    test_cases: [{ input: {}, expected_output: { faster: 'tuple' } }],
    constraints: ['CPython 내부 구현을 이해하면 도움됩니다'],
    hints: ['immutable 객체는 최적화가 가능합니다', 'dis 모듈로 bytecode를 확인해보세요'],
  },
  'python-memory-management': {
    id: '4',
    title: 'Python 메모리 관리',
    slug: 'python-memory-management',
    description: `## Reference Counting과 Garbage Collection

다음 코드에서 메모리 누수가 발생하는 이유는?

\`\`\`python
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

# 순환 참조 생성
a = Node(1)
b = Node(2)
a.next = b
b.next = a  # 순환 참조!

# 참조 제거
del a
del b

# 이 시점에서 Node 객체들은 메모리에서 해제되었을까?
\`\`\`

### 질문
1. del 후에 객체들이 즉시 해제되는가?
2. Python은 이 문제를 어떻게 해결하는가?`,
    difficulty: 'hard',
    category: 'memory',
    starter_code: `def answer():
    """
    Python의 메모리 관리 방식을 설명하세요.

    Returns:
        dict: {
            "immediately_freed": bool,  # del 후 즉시 해제되는지
            "reason": str,  # 이유
            "solution": str,  # Python의 해결 방법
            "gc_trigger": str  # GC가 실행되는 조건
        }
    """
    return {
        "immediately_freed": None,
        "reason": "",
        "solution": "",
        "gc_trigger": ""
    }`,
    test_cases: [{ input: {}, expected_output: { immediately_freed: false } }],
    constraints: ['Reference counting과 GC의 차이를 이해해야 합니다'],
    hints: ['Reference counting만으로는 순환 참조를 해결할 수 없습니다', 'gc 모듈을 살펴보세요'],
  },
  'generator-vs-list-comprehension': {
    id: '5',
    title: 'Generator vs List Comprehension',
    slug: 'generator-vs-list-comprehension',
    description: `## Generator의 메모리 효율성

다음 두 코드의 메모리 사용량 차이는?

\`\`\`python
import sys

# List comprehension
nums_list = [x * 2 for x in range(1000000)]
print(sys.getsizeof(nums_list))

# Generator expression
nums_gen = (x * 2 for x in range(1000000))
print(sys.getsizeof(nums_gen))
\`\`\`

### 질문
1. 각각의 메모리 사용량은 대략 얼마인가?
2. Generator는 어떻게 메모리를 절약하는가?
3. Generator의 단점은 무엇인가?`,
    difficulty: 'easy',
    category: 'generator',
    starter_code: `def answer():
    """
    Generator와 List의 차이를 설명하세요.

    Returns:
        dict: {
            "list_memory": str,  # list의 대략적인 메모리
            "generator_memory": str,  # generator의 대략적인 메모리
            "how_generator_saves": str,  # 절약 방법
            "generator_drawbacks": list[str]  # 단점들
        }
    """
    return {
        "list_memory": None,
        "generator_memory": None,
        "how_generator_saves": "",
        "generator_drawbacks": []
    }`,
    test_cases: [{ input: {}, expected_output: { generator_memory: '약 120바이트 (고정)' } }],
    constraints: ['Lazy evaluation 개념을 이해해야 합니다'],
    hints: ['Generator는 iterator protocol을 구현합니다', 'yield 키워드의 동작을 생각해보세요'],
  },
  'decorator-how-it-works': {
    id: '6',
    title: 'Decorator 동작 원리',
    slug: 'decorator-how-it-works',
    description: `## Decorator의 내부 동작

다음 코드의 출력 순서를 예측하세요.

\`\`\`python
def decorator_a(func):
    print("A: decorator_a 생성")
    def wrapper(*args, **kwargs):
        print("A: wrapper 시작")
        result = func(*args, **kwargs)
        print("A: wrapper 끝")
        return result
    return wrapper

def decorator_b(func):
    print("B: decorator_b 생성")
    def wrapper(*args, **kwargs):
        print("B: wrapper 시작")
        result = func(*args, **kwargs)
        print("B: wrapper 끝")
        return result
    return wrapper

@decorator_a
@decorator_b
def greet(name):
    print(f"Hello, {name}!")

print("--- 함수 정의 완료 ---")
greet("Python")
\`\`\`

### 질문
출력 순서는?`,
    difficulty: 'medium',
    category: 'decorator',
    starter_code: `def answer():
    """
    Decorator의 실행 순서를 설명하세요.

    Returns:
        dict: {
            "output_order": list[str],  # 출력 순서
            "decoration_order": str,  # 데코레이터 적용 순서 설명
            "execution_order": str  # 실행 순서 설명
        }
    """
    return {
        "output_order": [],
        "decoration_order": "",
        "execution_order": ""
    }`,
    test_cases: [{ input: {}, expected_output: { decoration_order: '아래에서 위로 적용' } }],
    constraints: ['Decorator가 함수를 감싸는 방식을 이해해야 합니다'],
    hints: ['@decorator는 syntactic sugar입니다', 'func = decorator(func)와 동일합니다'],
  },
};

void MOCK_QUIZZES;

const difficultyColors: Record<string, string> = {
  beginner: 'bg-info-bg text-info border border-info/30',
  easy: 'bg-success-bg text-success border border-success/30',
  medium: 'bg-warning-bg text-warning border border-warning/30',
  hard: 'bg-error-bg text-error border border-error/30',
  expert: 'bg-error-bg text-error border border-error/30',
};

const difficultyLabels: Record<string, string> = {
  beginner: '입문',
  easy: '쉬움',
  medium: '보통',
  hard: '어려움',
  expert: '전문가',
};

const categoryLabels: Record<string, string> = {
  gil: 'GIL',
  cpython: 'CPython',
  memory: '메모리',
  data_structure: '자료구조',
  copy: '복사',
  generator: 'Generator',
  decorator: 'Decorator',
  closure: 'Closure',
  concurrency: '동시성',
  oop: 'OOP',
};

export default function QuizDetailPage() {
  const params = useParams();
  const router = useRouter();
  const language = useEditorStore((state) => state.language);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [runResult, setRunResult] = useState<CodeRunResult | null>(null);
  const [submitResult, setSubmitResult] = useState<CodeSubmitResult | null>(null);
  const [executionError, setExecutionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rateLimitCountdown, setRateLimitCountdown] = useState<number | null>(null);
  const [requiresSubscription, setRequiresSubscription] = useState(false);

  const isUuid = (value: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value
    );

  const formatValue = (value: unknown) => {
    if (value === null || value === undefined) {
      return '-';
    }
    if (typeof value === 'string') {
      return value;
    }
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      const problemId = params.id as string;
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

      if (!token) {
        // replace를 사용해 뒤로가기 시 무한 리다이렉트 방지
        router.replace('/login');
        return;
      }

      if (!isUuid(problemId)) {
        setExecutionError('잘못된 문제 ID입니다.');
        setLoading(false);
        return;
      }

      try {
        const apiQuiz = await getProblem(problemId);
        if (apiQuiz) {
          setQuiz(apiQuiz as unknown as Quiz);
        }
      } catch (error: any) {
        console.error('Failed to fetch problem from API:', error);
        // 403 에러 = 프리미엄 구독 필요
        if (error.status === 403 || error.message?.includes('프리미엄')) {
          setRequiresSubscription(true);
        } else {
          setExecutionError('문제 정보를 불러오지 못했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [params.id, router]);

  const handleRun = async (code: string) => {
    if (!quiz) {
      return;
    }

    setExecutionError(null);
    setRunResult(null);
    setSubmitResult(null);

    // 코드 길이 검증 (악의적인 긴 코드 방지)
    if (code.length > 5000) {
      setExecutionError('코드 길이가 너무 깁니다. 5,000자 이하로 작성해주세요.');
      return;
    }

    if (code.length === 0) {
      setExecutionError('코드를 입력해주세요.');
      return;
    }

    if (!isUuid(quiz.id)) {
      setExecutionError('실행은 실제 문제 데이터에서만 가능합니다. 로그인 후 다시 시도해주세요.');
      return;
    }

    try {
      const result = await runCode(quiz.id, {
        code,
        language: language === 'python' ? 'python' : 'python',
      });
      setRunResult(result as unknown as CodeRunResult);
    } catch (err: any) {
      setExecutionError(err.message || '코드 실행에 실패했습니다.');
    }
  };

  const handleSubmit = async (code: string) => {
    if (!quiz) {
      return;
    }

    // Rate limit 카운트다운 중이면 제출 막기
    if (rateLimitCountdown !== null && rateLimitCountdown > 0) {
      return;
    }

    setExecutionError(null);
    setSubmitResult(null);

    // 코드 길이 검증 (악의적인 긴 코드 방지, LLM API 비용 보호)
    if (code.length > 5000) {
      setExecutionError('코드 길이가 너무 깁니다. 5,000자 이하로 작성해주세요.');
      return;
    }

    if (code.length === 0) {
      setExecutionError('코드를 입력해주세요.');
      return;
    }

    if (!isUuid(quiz.id)) {
      setExecutionError('제출은 실제 문제 데이터에서만 가능합니다. 로그인 후 다시 시도해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitCode(quiz.id, {
        code,
        language: language === 'python' ? 'python' : 'python',
      });
      setSubmitResult(result as unknown as CodeSubmitResult);
    } catch (err: any) {
      // Rate limit 에러 처리
      if (err.retryAfter) {
        setRateLimitCountdown(err.retryAfter);
        setExecutionError(`${err.message}`);
      } else {
        setExecutionError(err.message || '제출에 실패했습니다.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rate limit 카운트다운 처리
  useEffect(() => {
    if (rateLimitCountdown === null || rateLimitCountdown <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setRateLimitCountdown((prev) => {
        if (prev === null || prev <= 1) {
          setExecutionError(null);
          return null;
        }
        setExecutionError(`LLM 요청은 10초에 한 번만 가능합니다. ${prev - 1}초 후에 다시 시도해주세요.`);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [rateLimitCountdown]);

  const showNextHint = () => {
    if (quiz?.hints && currentHintIndex < quiz.hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
          <div className="text-text-secondary">로딩 중...</div>
        </div>
      </MainLayout>
    );
  }

  if (requiresSubscription) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
          <div className="text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">프리미엄 문제입니다</h2>
            <p className="text-text-secondary mb-6">
              이 문제는 프리미엄 구독자만 접근할 수 있습니다.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/pricing">
                <Button variant="primary">구독하기</Button>
              </Link>
              <Link href="/problems">
                <Button variant="outline">퀴즈 목록으로</Button>
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!quiz) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
          <div className="text-text-secondary mb-4">퀴즈를 찾을 수 없습니다</div>
          <Link href="/problems">
            <Button variant="outline">퀴즈 목록으로</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  // Markdown 간단 파싱 (코드 블록 처리)
  const renderDescription = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const match = part.match(/```(\w+)?\n?([\s\S]*?)```/);
        if (match) {
          const lang = match[1] || '';
          const code = match[2].trim();
          return (
            <pre
              key={index}
              className="bg-bg-base border border-border rounded-lg p-4 my-4 overflow-x-auto"
            >
              <code className="text-sm font-mono text-text-primary">{code}</code>
            </pre>
          );
        }
      }

      // 일반 텍스트 파싱
      return (
        <div key={index} className="whitespace-pre-line">
          {part.split('\n').map((line, i) => {
            if (line.startsWith('## ')) {
              return <h2 key={i} className="text-xl font-bold text-text-primary mt-6 mb-3">{line.slice(3)}</h2>;
            }
            if (line.startsWith('### ')) {
              return <h3 key={i} className="text-lg font-semibold text-text-primary mt-4 mb-2">{line.slice(4)}</h3>;
            }
            if (line.match(/^\d+\. /)) {
              return <p key={i} className="text-text-secondary ml-4 my-1">{line}</p>;
            }
            if (line.includes('`') && !line.startsWith('```')) {
              const parts = line.split(/(`[^`]+`)/g);
              return (
                <p key={i} className="text-text-secondary my-1">
                  {parts.map((p, j) =>
                    p.startsWith('`') ? (
                      <code key={j} className="bg-bg-hover px-1.5 py-0.5 rounded text-accent font-mono text-sm">
                        {p.slice(1, -1)}
                      </code>
                    ) : p
                  )}
                </p>
              );
            }
            if (line.trim()) {
              return <p key={i} className="text-text-secondary my-1">{line}</p>;
            }
            return null;
          })}
        </div>
      );
    });
  };

  return (
    <div className="h-screen flex flex-col pt-16 bg-bg-base">
      {/* Header */}
      <div className="h-14 bg-bg-elevated border-b border-border flex items-center px-6">
        <div className="flex items-center gap-4 flex-1">
          <Link href="/problems" className="text-text-tertiary hover:text-text-primary transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-text-primary">{quiz.title}</h1>
          {quiz.is_premium && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-warning-bg text-warning border border-warning/30">
              PRO
            </span>
          )}
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${difficultyColors[quiz.difficulty]}`}>
            {difficultyLabels[quiz.difficulty]}
          </span>
          <span className="px-2 py-1 text-xs bg-bg-hover text-text-secondary rounded">
            {categoryLabels[quiz.category] || quiz.category}
          </span>
        </div>
      </div>

      {/* Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Quiz Description */}
        <div className="w-1/2 overflow-y-auto bg-bg-base border-r border-border">
          <div className="p-6">
            {/* Description */}
            <div className="prose prose-invert max-w-none">
              {renderDescription(quiz.description)}
            </div>

            {/* Constraints */}
            {quiz.constraints && quiz.constraints.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-text-primary mb-3">참고사항</h3>
                <ul className="space-y-2">
                  {quiz.constraints.map((constraint, i) => (
                    <li key={i} className="flex gap-2 text-sm text-text-secondary">
                      <span className="text-text-tertiary">•</span>
                      <span>{constraint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hints */}
            {quiz.hints && quiz.hints.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-text-primary">힌트</h3>
                  {!showHints && (
                    <Button size="sm" variant="ghost" onClick={() => setShowHints(true)}>
                      힌트 보기 ({quiz.hints.length}개)
                    </Button>
                  )}
                </div>

                {showHints && (
                  <div className="space-y-3">
                    {quiz.hints.slice(0, currentHintIndex + 1).map((hint, i) => (
                      <Card key={i} variant="bordered" padding="sm">
                        <div className="flex gap-2">
                          <span className="text-warning font-medium text-sm">💡</span>
                          <span className="text-sm text-text-secondary">{hint}</span>
                        </div>
                      </Card>
                    ))}
                    {currentHintIndex < quiz.hints.length - 1 && (
                      <Button size="sm" variant="ghost" onClick={showNextHint}>
                        다음 힌트 보기
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col">
          <div className="flex-1 min-h-0">
            <CodeEditor
              initialCode={quiz.starter_code}
              onRun={handleRun}
              onSubmit={handleSubmit}
              submitDisabled={isSubmitting || (rateLimitCountdown !== null && rateLimitCountdown > 0)}
              submitLabel={rateLimitCountdown ? `${rateLimitCountdown}초 후 제출 가능` : '제출하기'}
            />
          </div>

          {(executionError || runResult || submitResult) && (
            <div className="border-t border-border bg-bg-elevated px-4 py-4 space-y-4">
              {executionError && (
                <Card variant="bordered" padding="sm">
                  <p className="text-base text-error">{executionError}</p>
                </Card>
              )}

              {runResult && (
                <Card variant="bordered" padding="sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-text-primary">실행 결과</h3>
                    <span className="text-sm text-text-secondary">
                      {runResult.passed_tests}/{runResult.total_tests} 통과
                    </span>
                  </div>
                  {runResult.error_message && (
                    <p className="mt-2 text-sm text-error">{runResult.error_message}</p>
                  )}
                  <div className="mt-3 space-y-2">
                    {runResult.test_results.map((result, index) => (
                      <div
                        key={`${result.test_id}-${index}`}
                        className="rounded-md border border-border bg-bg-base px-3 py-2 text-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-text-primary">테스트 #{result.test_id + 1}</span>
                          <span
                            className={
                              result.passed ? 'text-success font-medium' : 'text-error font-medium'
                            }
                          >
                            {result.passed ? '통과' : '실패'}
                          </span>
                        </div>
                        <div className="mt-1 text-text-tertiary">
                          입력: {formatValue(result.input)}
                        </div>
                        <div className="text-text-tertiary">
                          기대값: {formatValue(result.expected)}
                        </div>
                        <div className="text-text-tertiary">
                          실제값: {formatValue(result.actual)}
                        </div>
                        {result.error && (
                          <div className="text-error mt-1">오류: {result.error}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {submitResult && (
                <Card variant="bordered" padding="sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-text-primary">제출 결과</h3>
                    <span className="text-sm text-text-secondary">
                      {submitResult.passed_tests}/{submitResult.total_tests} 통과
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-text-secondary">
                    상태: {submitResult.status}
                  </div>
                  {submitResult.explanation_score !== undefined &&
                    submitResult.explanation_score !== null && (
                      <div className="mt-2 text-sm text-text-secondary">
                        설명 점수: {submitResult.explanation_score}점 (
                        {submitResult.explanation_passed ? '통과' : '실패'})
                      </div>
                    )}
                  {submitResult.explanation_feedback && (
                    <div className="mt-2 rounded-md border border-border bg-bg-base px-3 py-2 text-sm text-text-secondary">
                      {submitResult.explanation_feedback}
                    </div>
                  )}
                  {submitResult.error_message && (
                    <p className="mt-2 text-sm text-error">{submitResult.error_message}</p>
                  )}
                  {submitResult.test_results && submitResult.test_results.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {submitResult.test_results.map((result, index) => (
                        <div
                          key={`${result.test_id}-${index}`}
                          className="rounded-md border border-border bg-bg-base px-3 py-2 text-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-text-primary">테스트 #{result.test_id + 1}</span>
                            <span
                              className={
                                result.passed
                                  ? 'text-success font-medium'
                                  : 'text-error font-medium'
                              }
                            >
                              {result.passed ? '통과' : '실패'}
                            </span>
                          </div>
                          <div className="mt-1 text-text-tertiary">
                            입력: {formatValue(result.input)}
                          </div>
                          <div className="text-text-tertiary">
                            기대값: {formatValue(result.expected)}
                          </div>
                          <div className="text-text-tertiary">
                            실제값: {formatValue(result.actual)}
                          </div>
                          {result.error && (
                            <div className="text-error mt-1">오류: {result.error}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              )}

              {isSubmitting && (
                <div className="text-sm text-text-tertiary">채점 중입니다...</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
