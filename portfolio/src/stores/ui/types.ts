
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

// Combined store type
export type UiStore = UiStoreState & UiStoreActions;
