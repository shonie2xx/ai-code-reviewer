'use client';

import { Button } from '@/components/ui/button';

// import { Button } from '@/components/ui/button';
// import { Play, Trash2 } from 'lucide-react';

export function Header() {
  const handleRunReview = () => {
    console.log('Running code review...');
  };

  const handleClear = () => {
    console.log('Clearing code input...');
  };

  return (
    <header className="bg-[#0a0a0a] border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Code Review Assistant</h1>
          <p className="text-sm text-gray-400">Paste your code and get AI-powered feedback</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleRunReview}
            className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700"
          >
            Run Review
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 hover:text-white"
          >
            Clear
          </Button>
        </div>
      </div>
    </header>
  );
}
