'use client';

import type React from 'react';
import { useState } from 'react';

export function CodeEditor() {
  const [code, setCode] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here or upload a file...

Example:
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));"
          className="w-full h-full p-4 font-mono text-sm border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{ minHeight: '400px' }}
        />

        {code && (
          <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded border text-xs text-gray-500">
            {code.split('\n').length} lines, {code.length} characters
          </div>
        )}
      </div>
    </div>
  );
}
