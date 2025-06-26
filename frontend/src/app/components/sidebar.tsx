'use client';

import { useState } from 'react';
// import { Clock, FileCode, Star } from 'lucide-react';

interface ReviewHistoryItem {
  id: string;
  title: string;
  language: string;
  timestamp: string;
  rating: number;
}

const dummyHistory: ReviewHistoryItem[] = [
  {
    id: '1',
    title: 'React Component Optimization',
    language: 'JavaScript',
    timestamp: '2 hours ago',
    rating: 4,
  },
  {
    id: '2',
    title: 'Python Data Processing',
    language: 'Python',
    timestamp: '1 day ago',
    rating: 5,
  },
  {
    id: '3',
    title: 'SQL Query Performance',
    language: 'SQL',
    timestamp: '2 days ago',
    rating: 3,
  },
  {
    id: '4',
    title: 'TypeScript Interface Design',
    language: 'TypeScript',
    timestamp: '3 days ago',
    rating: 4,
  },
  {
    id: '5',
    title: 'CSS Grid Layout',
    language: 'CSS',
    timestamp: '1 week ago',
    rating: 5,
  },
  {
    id: '6',
    title: 'Node.js API Endpoint',
    language: 'JavaScript',
    timestamp: '1 week ago',
    rating: 4,
  },
  {
    id: '7',
    title: 'Java Spring Controller',
    language: 'Java',
    timestamp: '2 weeks ago',
    rating: 3,
  },
];

export function Sidebar() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (item: ReviewHistoryItem) => {
    setSelectedItem(item.id);
    console.log('Selected review:', item.title);
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: 'bg-yellow-100 text-yellow-800',
      TypeScript: 'bg-blue-100 text-blue-800',
      Python: 'bg-green-100 text-green-800',
      Java: 'bg-red-100 text-red-800',
      SQL: 'bg-purple-100 text-purple-800',
      CSS: 'bg-pink-100 text-pink-800',
    };
    return colors[language] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Review History</h2>
        <p className="text-sm text-gray-600">Previous code reviews</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {dummyHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedItem === item.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {/* <FileCode className="h-4 w-4 text-gray-500" /> */}
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{item.title}</h3>
                </div>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getLanguageColor(
                    item.language
                  )}`}
                >
                  {item.language}
                </span>
                <div className="flex items-center gap-1">{item.rating}</div>
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-500">
                {/* <Clock className="h-3 w-3" /> */}
                {item.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
