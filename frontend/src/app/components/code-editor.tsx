'use client';

import type React from 'react';
import { useState } from 'react';
import { Textarea } from './ui/textarea';

export function CodeEditor() {
  const [code, setCode] = useState('');

  return (
    <div className="flex w-full h-full bg-[#1a1a1a]">
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-full bg-transparent border-none resize-none outline-none"
        placeholder="Write your code here..."
      />
    </div>
  );
}
