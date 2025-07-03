import { CODE_SNIPPETS } from '@/utils/utils';
import { create } from 'zustand';

export type Language = 'typescript' | 'javascript' | 'python';
export type Specialty = 'Security Specialist';

import { devtools } from 'zustand/middleware';

interface ReviewState {
  review: string;
  isReviewing: boolean;

  code: string;
  language: Language;
  specialty: Specialty;

  abortController: AbortController | null;

  // Actions
  setCode: (code: string) => void;
  setLanguage: (language: Language) => void;
  setSpecialty: (specialty: Specialty) => void;
  setReview: (review: string) => void;
  appendReview: (chunk: string) => void;
  clearReview: () => void;
  setIsReviewing: (isReviewing: boolean) => void;
  startStreaming: () => void;
  streamFeedback: (apiUrl?: string) => Promise<void>;
}

export const useReviewStore = create<ReviewState>()(
  devtools(
    (set, get) => ({
      review: '',
      isReviewing: false,
      code: CODE_SNIPPETS.typescript, // Default code snippet
      language: 'typescript',
      specialty: 'Security Specialist',

      setCode: (code) => set({ code }),
      setLanguage: (language) => set({ language }),
      setSpecialty: (specialty) => set({ specialty }),
      setReview: (review) => set({ review }),
      appendReview: (chunk) => set((state) => ({ review: state.review + chunk })),
      clearReview: () => set({ review: '' }),
      setIsReviewing: (isReviewing) => set({ isReviewing }),

      startStreaming: () => {
        set({ isReviewing: true });
      },

      streamFeedback: async (apiUrl = 'http://localhost:3001/getLiveFeedback') => {
        const { code, language, specialty } = get();

        if (!code.trim()) {
          alert('Please enter enough code to review.');
          return;
        }

        set({
          isReviewing: true,
          review: '',
        });

        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: 'b3b8c9e2-1a2b-4c3d-9e4f-5a6b7c8d9e0f',
              code,
              language,
              specialty,
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          if (!response.body) {
            throw new Error('No response body available');
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          while (true) {
            const { value, done } = await reader.read();

            if (done) break;

            const chunk = decoder.decode(value, { stream: true });

            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('0:')) {
                try {
                  const jsonStr = line.substring(2);
                  const data = JSON.parse(jsonStr);
                  get().appendReview(data);
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (e) {
                  // If parsing fails, treat as raw text
                  if (line.trim()) {
                    get().appendReview(line);
                  }
                }
              }
            }
          }
        } catch (error) {
          if (error instanceof Error && error.name === 'AbortError') {
            console.log('Stream aborted by user');
            alert('Streaming aborted.');
          } else {
            console.error('Streaming error:', error);
            set({ review: 'Error occurred while streaming response. Please try again.' });
          }
        } finally {
          set({ isReviewing: false, abortController: null });
        }
      },
    }),
    {
      name: 'review-store',
    }
  )
);

export const useStreamingActions = () => {
  const streamFeedback = useReviewStore((state) => state.streamFeedback);
  const clearReview = useReviewStore((state) => state.clearReview);
  const isReviewing = useReviewStore((state) => state.isReviewing);

  return {
    streamFeedback,
    clearReview,
    isReviewing,
  };
};
