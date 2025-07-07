import { CODE_SNIPPETS } from '@/utils/utils';
import { create } from 'zustand';

export type Language = 'typescript' | 'javascript' | 'python';
export type Specialty = 'Security Specialist';

import { devtools } from 'zustand/middleware';
import { useUserStore } from './userStore';
import { trpc } from '@/utils/trpcClient';
import { ReviewHistoryItem } from '@/components/panels/HistoryPanel/History';

interface ReviewState {
  review: string;
  isReviewing: boolean;

  code: string;
  language: Language;
  specialty: Specialty;
  history: ReviewHistoryItem[];

  abortController: AbortController | null;

  // Actions
  setCode: (code: string) => void;
  setLanguage: (language: Language) => void;
  setSpecialty: (specialty: Specialty) => void;
  setReview: (review: string) => void;
  appendReview: (chunk: string) => void;
  clearReview: () => void;
  setIsReviewing: (isReviewing: boolean) => void;
  streamFeedback: (apiUrl?: string) => Promise<void>;
  fetchReviewHistory: () => Promise<void>;
  loadHistoryItem: (itemId: string) => void;
}

export const useReviewStore = create<ReviewState>()(
  devtools(
    (set, get) => ({
      review: '',
      isReviewing: false,
      code: CODE_SNIPPETS.typescript, // Default code snippet
      language: 'typescript',
      specialty: 'Security Specialist',
      history: [],

      setCode: (code) => set({ code }),
      setLanguage: (language) => set({ language }),
      setSpecialty: (specialty) => set({ specialty }),
      setReview: (review) => set({ review }),
      appendReview: (chunk) => set((state) => ({ review: state.review + chunk })),
      clearReview: () =>
        set({
          review: '',
          code: CODE_SNIPPETS.typescript,
          language: 'typescript',
          specialty: 'Security Specialist',
        }),
      setIsReviewing: (isReviewing) => set({ isReviewing }),

      streamFeedback: async () => {
        const { code, language, specialty } = get();
        const userId = useUserStore.getState().getUserId();

        if (!code.trim()) {
          alert('Please enter enough code to review.');
          return;
        }

        set({
          isReviewing: true,
          review: '',
        });

        try {
          console.log('Starting feedback stream with:', { code, language });
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getLiveFeedback`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
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
          get().fetchReviewHistory();
        }
      },

      fetchReviewHistory: async () => {
        const userId = useUserStore.getState().getUserId();
        if (!userId) {
          alert('User ID is not available');
          return;
        }

        try {
          const response = await trpc.getSubmissions.query({ userId });

          // TODO could reuse same function as in streamFeedback
          const normalizedResponse = response.map((item) => {
            const lines = item.feedback.split('\n');
            let normalizedFeedback = '';
            for (const line of lines) {
              if (line.startsWith('0:')) {
                try {
                  const jsonStr = line.substring(2);
                  const data = JSON.parse(jsonStr);
                  normalizedFeedback += data;
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (e) {
                  if (line.trim()) {
                    normalizedFeedback += line;
                  }
                }
              }
            }

            return {
              ...item,
              feedback: normalizedFeedback.trim(),
            };
          });

          set({ history: normalizedResponse });
        } catch (error) {
          console.error('Error fetching review history:', error);
        }
      },

      loadHistoryItem: (itemId: string) => {
        const historyItem = get().history.find((item) => item.id === itemId);
        if (historyItem) {
          set({
            review: historyItem.feedback,
            code: historyItem.code,
            language: historyItem.language as Language,
            specialty: historyItem.specialty as Specialty,
          });
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
