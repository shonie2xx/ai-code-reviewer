'use client';

import type React from 'react';

import { Editor } from '@monaco-editor/react';
import { CODE_SNIPPETS, getCodeLength, SPECIALISTS } from '@/utils/utils';
import { Button } from '@/components/ui/button';
import { CharDisplay, DropDown } from './CodeEditorComponents';
import { Language, Specialty, useReviewStore } from '@/store/reviewStore';

export default function CodeEditor() {
  const {
    code,
    language,
    specialty,
    isReviewing,
    setCode,
    setLanguage,
    setSpecialty,
    clearReview,
    streamFeedback,
  } = useReviewStore();

  const effectiveCodeLength = getCodeLength(code, language).length;
  const hasValidCode = effectiveCodeLength >= 30 && effectiveCodeLength <= 500;

  const handleChangeLanguage = (lang: Language) => {
    setLanguage(lang);
    setCode(CODE_SNIPPETS[lang]);
  };

  const handleChangeSpecialty = (specialty: Specialty) => {
    setSpecialty(specialty);
  };

  const handleClear = () => {
    clearReview();
    setCode(CODE_SNIPPETS[language]);
  };

  const handleGetFeedback = async () => {
    await streamFeedback();
  };

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex items-end justify-between mb-4">
        <DropDown
          nativeProps={{
            onValueChange: handleChangeLanguage,
            value: language,
          }}
          items={Object.keys(CODE_SNIPPETS)}
          title="Language"
        />
        <DropDown
          nativeProps={{
            onValueChange: handleChangeSpecialty,
            value: specialty,
          }}
          items={SPECIALISTS}
          title="Specialty"
        />
        <div className="flex items-center gap-4">
          <CharDisplay count={effectiveCodeLength} />
          <div className="flex gap-2">
            <Button
              className={`${
                isReviewing ? 'bg-red-600' : 'bg-blue-600'
              } hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700`}
              disabled={!hasValidCode || isReviewing}
              onClick={handleGetFeedback}
            >
              {isReviewing ? 'Stop' : 'Start'}
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
          onChange={(value) => setCode(value || '')}
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
