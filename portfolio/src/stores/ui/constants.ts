import { type UiStoreState } from './types'

// Default state constant
const getInitialDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) {
    return JSON.parse(saved);
  }
  
  // Check system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const DEFAULT_UI_STORE_STATE: UiStoreState = {
  isDarkMode: getInitialDarkMode(),
  isMobileMenuOpen: false,
  isScrolled: false,
};