'use client';

import type React from 'react';

import { Editor } from '@monaco-editor/react';
import { CODE_SNIPPETS, getCodeLength } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CharDisplay, LanguageSelector } from './CodeEditorComponents';
import { Language, useReviewStore } from '@/store/reviewStore';
import { reviewCode } from '@/lib/api';

export default function CodeEditor() {
  const code = useReviewStore((state) => state.code);
  const language = useReviewStore((state) => state.language);
  const isReviewing = useReviewStore((state) => state.isReviewing);
  const setCode = useReviewStore((state) => state.setCode);
  const setLanguage = useReviewStore((state) => state.setLanguage);

  const onLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCode(CODE_SNIPPETS[lang]);
  };

  const effectiveCodeLength = getCodeLength(code, language).length;
  const hasValidCode = effectiveCodeLength >= 30 && effectiveCodeLength <= 500;

  const handleClear = () => {
    if (isReviewing) {
      alert('Cannot clear code while reviewing. Please wait for the review to finish.');
      return;
    }
    setCode('');
  };

  const handleReview = async () => {
    useReviewStore.getState().setIsReviewing(true);
    const code = useReviewStore.getState().code;
    const language = useReviewStore.getState().language;
    try {
      // const data = await reviewCode(code, language);
      useReviewStore.getState().setReview('AI feedback');
      // useReviewStore.getState().addToHistory({
      //   id: data.result.timestamp,
      //   code,
      //   review: data.result,
      //   language,
      //   timestamp: new Date().toISOString(),
      // });
    } finally {
      useReviewStore.getState().setIsReviewing(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex items-center justify-between mb-4">
        <LanguageSelector onValueChange={onLanguageChange} defaultValue={language} />
        <div className="flex items-center gap-4">
          <CharDisplay count={effectiveCodeLength} />
          <div className="flex gap-2">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700"
              disabled={!hasValidCode}
              onClick={handleReview}
            >
              {isReviewing ? 'Reviewing...' : 'Run Review'}
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 hover:text-white"
              disabled={effectiveCodeLength === 0}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <Editor
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value ?? '')}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            readOnly: isReviewing,
          }}
        />
      </div>
    </div>
  );
}
