import { User } from '@/types/AuthTypes';
import { create } from 'zustand';

type AuthStore = {
  user: User | null;

  actions: {
    signIn: (user: User) => void;
    signOut: () => void;
  };
};

const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  actions: {
    signIn: (user: User) => set(() => ({ user: user })),
    signOut: () => set(() => ({ user: null })),
  },
}));

export const useAuthAction = () => useAuthStore((state) => state.actions);
