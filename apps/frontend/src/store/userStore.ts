import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userId: string;
  isLoading: boolean;

  setUserId: (userId: string) => void;
  getUserId: () => string;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      userId: '',
      isLoading: true,

      setUserId: (userId: string) => set({ userId }),
      getUserId: () => get().userId,
    }),
    {
      name: 'user-storage',
    }
  )
);
