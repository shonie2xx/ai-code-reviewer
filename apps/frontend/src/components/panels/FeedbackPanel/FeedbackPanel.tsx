'use client';

import { Textarea } from '@/components/ui/textarea';
import { useReviewStore } from '@/store/reviewStore';
import { useEffect, useState } from 'react';

export default function FeedbackPanel() {
  const { review } = useReviewStore();
  const [liveReview, setLiveReview] = useState('');

  useEffect(() => {
    setLiveReview(review);
  }, [review]);

  return (
    <div className="h-full flex flex-col p-6 bg-[#1a1a1a]">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-lg font-semibold text-white">AI Feedback</h2>
      </div>

      {!review ? (
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            <div className="text-center py-8 text-gray-400">
              <p className="text-sm">
                Submit your code to receive AI-powered feedback and recommendations.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            <div className="text-gray-300">
              <Textarea
                value={liveReview}
                readOnly
                className="h-full w-full bg-[#222222] border border-gray-700 text-sm text-gray-300 p-4 whitespace-pre-wrap"
                placeholder="AI feedback will appear here..."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
