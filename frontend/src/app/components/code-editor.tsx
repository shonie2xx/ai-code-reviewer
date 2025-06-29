'use client';

import type React from 'react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Editor } from '@monaco-editor/react';
import { CODE_SNIPPETS, Language } from './utils';
import { Button } from '@/components/ui/button';

function LanguageSelector(props: React.ComponentProps<typeof Select>) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent className="bg-black">
        <SelectGroup>
          {Object.keys(CODE_SNIPPETS).map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function CharCounter({ code }: { code: string }) {
  return (
    <div>
      {code.length < 30 ? (
        <div className=" bg-red-100 border-red-500 text-red-700 px-2 py-1 rounded border text-xs">
          Min 30 characters required
        </div>
      ) : code.length > 500 ? (
        <div className="bg-red-100 border-red-500 text-red-700 px-2 py-1 rounded border text-xs">
          {code.length} characters (max 500)
        </div>
      ) : (
        <div className="bg-green-100 border-green-500 text-green-700 px-2 py-1 rounded border text-xs">
          {code.length} characters
        </div>
      )}
    </div>
  );
}

export function CodeEditor() {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<Language>('typescript');

  const onLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCode(CODE_SNIPPETS[lang]);
  };

  return (
    <div className="flex flex-col w-full h-full p-6 gap-4">
      <div className="flex items-center justify-between mb-4">
        <LanguageSelector onValueChange={onLanguageChange} defaultValue={language} />
        <CharCounter code={code} />
      </div>
      <Editor
        height={'100%'}
        width={'100%'}
        defaultLanguage="typescript"
        language={language}
        theme="vs-dark"
        defaultValue={CODE_SNIPPETS[language]}
        value={code}
        onChange={(value) => {
          setCode(value ?? '');
        }}
      />
      <div className="absolute top-5 right-5 flex gap-2">
        <Button
          onClick={() => {}}
          className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700"
          disabled={code.length < 30 || code.length > 500}
        >
          Run Review
        </Button>
        <Button
          onClick={() => setCode('')}
          variant="outline"
          className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 hover:text-white"
          disabled={code.length === 0}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
