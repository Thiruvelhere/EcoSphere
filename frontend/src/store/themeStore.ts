import { create } from 'zustand';

interface ThemeState {
  mode: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'dark',
  toggleTheme: () => set((state) => ({ mode: state.mode === 'dark' ? 'light' : 'dark' })),
  setTheme: (theme) => set({ mode: theme }),
}));
