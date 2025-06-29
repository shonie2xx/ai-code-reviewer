'use client';

export default function Header() {
  return (
    <header className="bg-[#1a1a1a] border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Code Review Assistant</h1>
          <p className="text-sm text-gray-400">Paste your code and get AI-powered feedback</p>
        </div>
      </div>
    </header>
  );
}
