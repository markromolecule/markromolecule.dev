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

// Default state constant
export const DEFAULT_UI_STORE_STATE: UiStoreState = {
  isDarkMode: false,
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
      });
    },
    setDarkMode: (isDark: boolean) => {
      set((state) => {
        state.isDarkMode = isDark;
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
      });
    },
  }))
);
