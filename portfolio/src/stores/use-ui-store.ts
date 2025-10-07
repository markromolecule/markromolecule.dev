import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// Define the state type
export type UiStoreState = {
  isDarkMode: boolean;
  isMobileMenuOpen: boolean;
  isScrolled: boolean;
};

// Define the actions type
export type UiStoreActions = {
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
  setScrolled: (isScrolled: boolean) => void;
  reset: () => void;
};

// Initialize dark mode from localStorage or system preference
const getInitialDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) {
    return JSON.parse(saved);
  }
  
  // Check system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Default state constant
export const DEFAULT_UI_STORE_STATE: UiStoreState = {
  isDarkMode: getInitialDarkMode(),
  isMobileMenuOpen: false,
  isScrolled: false,
};

// Combined store type
export type UiStore = UiStoreState & UiStoreActions;

// Create and export the store hook
export const useUiStore = create(
  immer<UiStore>((set) => ({
    ...DEFAULT_UI_STORE_STATE,

    /* Actions */
    toggleDarkMode: () => {
      set((state) => {
        state.isDarkMode = !state.isDarkMode;
        localStorage.setItem('darkMode', JSON.stringify(state.isDarkMode));
      });
    },
    setDarkMode: (isDark: boolean) => {
      set((state) => {
        state.isDarkMode = isDark;
        localStorage.setItem('darkMode', JSON.stringify(isDark));
      });
    },
    toggleMobileMenu: () => {
      set((state) => {
        state.isMobileMenuOpen = !state.isMobileMenuOpen;
      });
    },
    setMobileMenuOpen: (isOpen: boolean) => {
      set((state) => {
        state.isMobileMenuOpen = isOpen;
      });
    },
    setScrolled: (isScrolled: boolean) => {
      set((state) => {
        state.isScrolled = isScrolled;
      });
    },
    reset: () => {
      set((state) => {
        Object.assign(state, DEFAULT_UI_STORE_STATE);
        localStorage.removeItem('darkMode');
      });
    },
  }))
);
