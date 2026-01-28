# CodePath Frontend MVP

CodePath 개발자 학습 플랫폼의 Frontend 애플리케이션입니다.

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.3+
- **Styling**: Tailwind CSS 3.4+
- **State Management**:
  - Client State: Zustand 4.5+
  - Server State: TanStack Query (React Query) 5.0+
- **Code Editor**: Monaco Editor (@monaco-editor/react)
- **HTTP Client**: Axios

## 프로젝트 구조

```
frontend/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 인증 페이지 (로그인, 회원가입)
│   ├── (main)/            # 메인 페이지 (대시보드, 문제, 프로젝트)
│   ├── layout.tsx         # Root Layout
│   ├── page.tsx           # Landing Page
│   └── globals.css        # Global Styles
├── components/            # React Components
│   ├── ui/               # 기본 UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── layouts/          # Layout 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── MainLayout.tsx
│   └── features/         # Feature별 컴포넌트
│       └── problem/
│           └── CodeEditor.tsx
├── lib/                   # 라이브러리 및 유틸리티
│   ├── api/              # API Client
│   │   ├── client.ts
│   │   ├── auth.ts
│   │   ├── problems.ts
│   │   └── users.ts
│   └── store/            # Zustand Stores
│       ├── authStore.ts
│       ├── editorStore.ts
│       └── uiStore.ts
└── types/                 # TypeScript 타입 정의
    ├── models.ts
    ├── api.ts
    └── index.ts
```

## 구현 완료 기능

### 1. 공통 컴포넌트
- ✅ Button (Primary, Secondary, Outline, Ghost, Danger)
- ✅ Input (Label, Error, Helper Text)
- ✅ Card (Default, Bordered, Elevated)

### 2. Layout
- ✅ Header (Navigation, Auth State)
- ✅ Sidebar (Collapsible Navigation)
- ✅ MainLayout (Header + Sidebar)

### 3. 페이지
- ✅ Landing Page (Hero, Features, CTA)
- ✅ Login Page
- ✅ Signup Page
- ✅ Dashboard Page (Stats, Recent Activity, Recommended Problems)
- ✅ Problems List Page (Filters, Search, Pagination)
- ✅ Problem Detail Page (Split View, Monaco Editor)

### 4. API 연동
- ✅ API Client 설정 (Axios Interceptors)
- ✅ Auth API (Login, Signup, Logout)
- ✅ Problems API (List, Detail, Submit)
- ✅ Users API (Profile, Stats, Activity)

### 5. 상태 관리
- ✅ Auth Store (User, Token Management)
- ✅ Editor Store (Code, Language, Theme)
- ✅ UI Store (Sidebar, Modals, Toast)

## 디자인 시스템

### 컬러 팔레트
- **Primary**: `#2E5C8A` (브랜드 메인 컬러)
- **Secondary**: `#8B5CF6` (액센트 컬러)
- **Success**: `#10B981`
- **Warning**: `#F59E0B`
- **Error**: `#EF4444`
- **Info**: `#3B82F6`

### 타이포그래피
- **Font Family**: Pretendard, Inter (sans-serif)
- **Code Font**: Fira Code, Monaco (monospace)

## 환경 설정

### 필수 환경 변수

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## 실행 방법

### 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속

### 빌드

```bash
npm run build
npm run start
```

## 주요 화면

### 1. 랜딩 페이지 (/)
- Hero Section with CTA
- Features 소개 (AI 멘토, 실전 프로젝트, 맞춤형 로드맵)
- 사용 방법 (4단계)

### 2. 로그인/회원가입 (/login, /signup)
- 이메일/비밀번호 인증
- Form Validation
- Error Handling

### 3. 대시보드 (/dashboard)
- 학습 통계 (해결한 문제, 완료한 프로젝트, 연속 학습일)
- 현재 학습 중인 내용
- 최근 활동
- 추천 문제

### 4. 문제 목록 (/problems)
- 문제 필터링 (난이도, 카테고리)
- 검색 기능
- 페이지네이션
- 해결 상태 표시

### 5. 문제 풀이 (/problems/[id])
- Split View (문제 설명 / 코드 에디터)
- Monaco Editor 통합
- 코드 실행 및 제출
- 실시간 테스트 결과

## API 연동

Backend API와 통신을 위한 설정이 완료되어 있습니다.

- **Base URL**: `/api/v1` (환경 변수로 설정)
- **인증**: Bearer Token (JWT)
- **자동 토큰 갱신**: Axios Interceptor

## 다음 단계

### 추가 구현 필요 항목
- [ ] 온보딩 페이지 (목표 설정 플로우)
- [ ] 프로젝트 상세 페이지
- [ ] 포트폴리오 페이지
- [ ] React Query Provider 설정
- [ ] Error Boundary 구현
- [ ] Loading States 개선
- [ ] Toast Notification System
- [ ] 반응형 디자인 개선 (Mobile)

## 참고 문서

- [TRD](/docs/trd/frontend-trd.md)
- [API 계약서](/docs/api/api-contract.md)
- [디자인 시스템](/docs/design/ux-ui-design-system.md)

## 라이선스

Copyright © 2026 CodePath. All rights reserved.
