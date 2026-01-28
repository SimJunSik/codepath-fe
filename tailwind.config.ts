import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background Colors (다크 모드 기본)
        bg: {
          base: '#0A0A0A',       // 최상위 배경
          DEFAULT: '#111111',     // 페이지 기본 배경
          elevated: '#1A1A1A',    // 카드, 패널
          hover: '#242424',       // 호버 상태
          active: '#2A2A2A',      // 활성 상태
        },
        // Border Colors
        border: {
          DEFAULT: '#2A2A2A',     // 기본 테두리
          subtle: '#1F1F1F',      // 미묘한 구분선
          emphasis: '#3A3A3A',    // 강조 테두리
          focus: '#FAFAFA',       // 포커스 테두리
        },
        // Text Colors
        text: {
          primary: '#FAFAFA',     // 주요 텍스트
          secondary: '#A0A0A0',   // 보조 텍스트
          tertiary: '#6A6A6A',    // 부가 정보
          disabled: '#4A4A4A',    // 비활성
          inverse: '#0A0A0A',     // 라이트 배경용
        },
        // Accent Colors
        accent: {
          DEFAULT: '#FAFAFA',     // 메인 액센트
          hover: '#E5E5E5',       // 호버
          active: '#D4D4D4',      // 활성
        },
        // Semantic Colors
        success: {
          DEFAULT: '#22C55E',     // 초록
          hover: '#16A34A',
          bg: 'rgba(34, 197, 94, 0.1)',
        },
        error: {
          DEFAULT: '#EF4444',     // 빨강
          hover: '#DC2626',
          bg: 'rgba(239, 68, 68, 0.1)',
        },
        warning: {
          DEFAULT: '#F59E0B',     // 주황
          hover: '#D97706',
          bg: 'rgba(245, 158, 11, 0.1)',
        },
        info: {
          DEFAULT: '#3B82F6',     // 파랑
          hover: '#2563EB',
          bg: 'rgba(59, 130, 246, 0.1)',
        },
        // Difficulty Colors
        difficulty: {
          easy: '#22C55E',        // 초록
          medium: '#F59E0B',      // 주황
          hard: '#EF4444',        // 빨강
        },
        // Code Syntax Highlighting
        syntax: {
          keyword: '#C792EA',     // 보라
          string: '#C3E88D',      // 연두
          number: '#F78C6C',      // 주황
          function: '#82AAFF',    // 파랑
          comment: '#676E95',     // 회색
          variable: '#EEFFFF',    // 하얀색
          operator: '#89DDFF',    // 청록
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Noto Sans KR',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Cascadia Code',
          'Consolas',
          'monospace',
        ],
      },
      fontSize: {
        // Display (랜딩 전용)
        'display-lg': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-md': ['36px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        // Heading
        'h1': ['28px', { lineHeight: '1.3', fontWeight: '600' }],
        'h2': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'h3': ['16px', { lineHeight: '1.5', fontWeight: '600' }],
        // Body
        'body': ['15px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['13px', { lineHeight: '1.5', fontWeight: '400' }],
        // UI Elements
        'label': ['14px', { lineHeight: '1.4', fontWeight: '500' }],
        'caption': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
        'mono': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.3)',
        'elevation-2': '0 4px 8px rgba(0, 0, 0, 0.4)',
        'elevation-3': '0 8px 16px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-in-out',
        'slide-up': 'slide-up 0.2s ease-out',
        'slide-down': 'slide-down 0.2s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
