import { CODE_SNIPPETS } from '@/utils/utils';
import { create } from 'zustand';

export type Language = 'typescript' | 'javascript' | 'python';

interface HistoryItem {
  id: string;
  code: string;
  review: string;
  language: Language;
  timestamp: string;
}

interface ReviewState {
  code: string;
  language: Language;
  isReviewing: boolean;
  review: string;
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
  review: '',
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
