import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { type UiStore } from './types';
import { DEFAULT_UI_STORE_STATE } from './constants';

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
