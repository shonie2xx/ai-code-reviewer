'use client';

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
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Code Review Assistant</h1>
          <p className="text-sm text-gray-600">Paste your code and get AI-powered feedback</p>
        </div>

        <div className="flex items-center gap-3">
          {/* <Button
            onClick={handleClear}
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>

          <Button
            onClick={handleRunReview}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Play className="h-4 w-4" />
            Run Review
          </Button> */}
        </div>
      </div>
    </header>
  );
}
