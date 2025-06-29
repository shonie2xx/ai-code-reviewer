import { CODE_SNIPPETS } from '@/lib/utils';
import { create } from 'zustand';

export type Language = 'typescript' | 'javascript' | 'python';

interface HistoryItem {
  code: string;
  review: string;
  language: Language;
  timestamp: string;
}

interface ReviewState {
  code: string;
  language: Language;
  isReviewing: boolean;
  review: string | null;
  history: HistoryItem[];
  setCode: (code: string) => void;
  setLanguage: (language: Language) => void;
  setIsReviewing: (isReviewing: boolean) => void;
  setReview: (review: string) => void;
  addToHistory: (historyItem: HistoryItem) => void;
}

export const useReviewStore = create<ReviewState>((set) => ({
  code: CODE_SNIPPETS.typescript,
  language: 'typescript',
  isReviewing: false,
  review: null,
  history: [],
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  setIsReviewing: (isReviewing) => set({ isReviewing }),
  setReview: (review) => set({ review }),
  addToHistory: (historyItem) =>
    set((state) => ({
      history: [...state.history, historyItem],
    })),
}));
