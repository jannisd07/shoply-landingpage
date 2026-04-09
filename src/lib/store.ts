import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'avo-theme',
    }
  )
);

interface LoadingState {
  isLoading: boolean;
  progress: number;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: true,
  progress: 0,
  setLoading: (isLoading) => set({ isLoading }),
  setProgress: (progress) => set({ progress }),
}));

interface NavigationState {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activeSection: 'hero',
  setActiveSection: (activeSection) => set({ activeSection }),
}));
