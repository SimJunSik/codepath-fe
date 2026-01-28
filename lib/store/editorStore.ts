// CodePath Frontend - Editor Store
// 코드 에디터 상태 관리

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EditorState {
  code: string;
  language: string;
  theme: 'vs-dark' | 'light';
  fontSize: number;
  tabSize: number;
}

interface EditorActions {
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  setTheme: (theme: EditorState['theme']) => void;
  setFontSize: (size: number) => void;
  setTabSize: (size: number) => void;
  resetEditor: () => void;
}

export const useEditorStore = create<EditorState & EditorActions>()(
  persist(
    (set) => ({
      code: '',
      language: 'javascript',
      theme: 'vs-dark',
      fontSize: 14,
      tabSize: 2,

      setCode: (code) => set({ code }),
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      setTabSize: (tabSize) => set({ tabSize }),
      resetEditor: () =>
        set({
          code: '',
          language: 'javascript',
        }),
    }),
    {
      name: 'editor-storage',
    }
  )
);
