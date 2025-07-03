import { create } from 'zustand';

interface UserState {
  userId: string;

  setUserId: (userId: string) => void;
  getUserId: () => string;
}

export const useUserStore = create<UserState>()((set, get) => ({
  userId: localStorage.getItem('userId') || '',

  setUserId: (userId: string) => {
    localStorage.setItem('userId', userId);
    set({ userId });
  },

  getUserId: () => {
    return get().userId;
  },
}));
