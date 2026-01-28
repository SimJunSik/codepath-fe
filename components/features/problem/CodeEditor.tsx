// CodePath Frontend - Code Editor Component
// Monaco Editor 사용

'use client';

import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useEditorStore } from '@/lib/store/editorStore';
import Button from '@/components/ui/Button';

interface CodeEditorProps {
  initialCode?: string;
  onRun?: (code: string) => void | Promise<void>;
  onSubmit?: (code: string) => void | Promise<void>;
}

export default function CodeEditor({
  initialCode = '',
  onRun,
  onSubmit,
}: CodeEditorProps) {
  const { code, language, theme, fontSize, setCode, setLanguage, setFontSize, resetEditor } =
    useEditorStore();
  const [isRunning, setIsRunning] = useState(false);
  const lastInitialCode = useRef<string | undefined>(undefined);
  const hasResetRef = useRef(false);

  useEffect(() => {
    if (language !== 'python') {
      setLanguage('python');
    }
  }, [language, setLanguage]);

  useEffect(() => {
    if (hasResetRef.current) {
      return;
    }

    if (typeof window !== 'undefined') {
      localStorage.removeItem('editor-storage');
    }

    resetEditor();
    if (initialCode) {
      setCode(initialCode);
    }

    hasResetRef.current = true;
  }, [initialCode, resetEditor, setCode]);

  useEffect(() => {
    if (!initialCode) {
      return;
    }

    const shouldSync =
      !code ||
      code.trim().length === 0 ||
      (lastInitialCode.current && code === lastInitialCode.current);

    if (shouldSync) {
      setCode(initialCode);
    }

    lastInitialCode.current = initialCode;
  }, [code, initialCode, setCode]);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const handleRun = async () => {
    setIsRunning(true);
    try {
      await onRun?.(code);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = () => {
    onSubmit?.(code);
  };

  const handleReset = () => {
    setCode(initialCode);
  };

  return (
    <div className="h-full flex flex-col bg-bg-base">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-bg-elevated border-b border-border">
        <div className="flex items-center gap-3">
          <select
            value="python"
            onChange={() => setLanguage('python')}
            className="px-3 py-1.5 text-sm bg-bg-hover text-text-primary border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent"
            disabled
          >
            <option value="python">Python</option>
          </select>

          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="px-3 py-1.5 text-sm bg-bg-hover text-text-primary border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value={12}>12px</option>
            <option value={14}>14px</option>
            <option value={16}>16px</option>
            <option value={18}>18px</option>
          </select>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded transition-colors"
        >
          초기화
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language="python"
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          value={code || initialCode}
          onChange={handleEditorChange}
          options={{
            fontSize,
            fontFamily: "'Fira Code', 'Monaco', 'Courier New', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            lineNumbers: 'on',
            renderLineHighlight: 'all',
          }}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 px-4 py-3 bg-bg-elevated border-t border-border">
        <Button
          size="sm"
          variant="secondary"
          onClick={handleRun}
          loading={isRunning}
          disabled={!code}
        >
          실행하기 (⌘ + Enter)
        </Button>
        <Button
          size="sm"
          variant="primary"
          onClick={handleSubmit}
          disabled={!code}
        >
          제출하기
        </Button>
        <div className="ml-auto text-xs text-text-tertiary">
          {code.length} characters
        </div>
      </div>
    </div>
  );
}
