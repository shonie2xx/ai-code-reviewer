'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Language } from '@/store/reviewStore';
import { useState } from 'react';

interface ReviewHistoryItem {
  id: string;
  title: string;
  language: Language;
  timestamp: string;
}

const dummyHistory: ReviewHistoryItem[] = [
  {
    id: '1',
    title: 'React Component Optimization',
    language: 'javascript',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    title: 'Python Data Processing',
    language: 'python',
    timestamp: '1 day ago',
  },
  {
    id: '4',
    title: 'TypeScript Interface Design',
    language: 'typescript',
    timestamp: '3 days ago',
  },
];

export default function History() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (item: ReviewHistoryItem) => {
    setSelectedItem(item.id);
  };

  const handleNewReview = () => {
    setSelectedItem(null);
  };

  const getLanguageColor = (language: Language) => {
    const colors: Record<Language, string> = {
      javascript: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
      typescript: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
      python: 'bg-green-500/10 text-green-400 border border-green-500/20',
    };
    return colors[language] || 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
  };

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a]">
      <div className="p-6 border-b border-gray-800 ">
        <Button
          className="w-full bg-gray-800 hover:cursor-pointer hover:bg-gray-700 text-white border-gray-700 hover:border-gray-600 transition-all duration-200"
          variant="outline"
          onClick={() => handleNewReview()}
        >
          Start new review
        </Button>
      </div>

      <div className="flex-1 bg-[#1a1a1a]">
        <div className="p-4 space-y-2">
          {dummyHistory.map((item) => {
            return (
              <Card
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-lg mb-2  ${
                  selectedItem === item.id
                    ? 'border-blue-500 shadow-lg bg-[#2a2a2a] shadow-blue-500/20'
                    : 'border-gray-700 hover:border-gray-600 bg-[#222222] hover:bg-[#282828]'
                }`}
              >
                <CardHeader className="p-0">
                  <div className="flex items-center">
                    <CardTitle className="font-medium text-white text-sm line-clamp-1 p-0 m-0">
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex p-0">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getLanguageColor(
                      item.language
                    )}`}
                  >
                    {item.language}
                  </span>
                </CardContent>
                <CardFooter className="flex p-0 text-xs text-gray-400">{item.timestamp}</CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
