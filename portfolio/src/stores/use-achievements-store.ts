import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// Define the achievement type
export type Achievement = {
  id: string;
  year: string;
  title: string;
  description: string;
};

// Define the state type
export type AchievementsStoreState = {
  achievements: Achievement[];
  showAll: boolean;
};

// Define the actions type
export type AchievementsStoreActions = {
  addAchievement: (achievement: Omit<Achievement, 'id'>) => void;
  updateAchievement: (id: string, achievement: Partial<Omit<Achievement, 'id'>>) => void;
  deleteAchievement: (id: string) => void;
  setShowAll: (showAll: boolean) => void;
  resetAchievements: () => void;
};

// Default state constant
export const DEFAULT_ACHIEVEMENTS_STORE_STATE: AchievementsStoreState = {
  achievements: [
    {
      id: '1',
      year: '2025',
      title: '🔥 Create & Conquer Hackathon',
      description: 'Secured 1st place in a competitive hackathon at FEU Manila focused on developing innovative virtual assistant solutions.',
    },
    {
      id: '2',
      year: '2024',
      title: '📌 Dean\'s List Recognition',
      description: 'Achieved Dean\'s List status for outstanding academic performance in Information Technology.',
    },
    {
      id: '3',
      year: '2020',
      title: '👋 Hello, everyone!',
      description: 'My first line of code',
    },
  ],
  showAll: false,
};

// Combined store type
export type AchievementsStore = AchievementsStoreState & AchievementsStoreActions;

// Create and export the store hook
export const useAchievementsStore = create(
  immer<AchievementsStore>(set => ({
    ...DEFAULT_ACHIEVEMENTS_STORE_STATE,

    /* Actions */
    addAchievement: (achievement) => {
      set(state => {
        const newAchievement: Achievement = {
          ...achievement,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        };
        state.achievements.unshift(newAchievement);
      });
    },

    updateAchievement: (id, updates) => {
      set(state => {
        const index = state.achievements.findIndex(achievement => achievement.id === id);
        if (index !== -1) {
          Object.assign(state.achievements[index], updates);
        }
      });
    },

    deleteAchievement: (id) => {
      set(state => {
        state.achievements = state.achievements.filter(achievement => achievement.id !== id);
      });
    },

    setShowAll: (showAll) => {
      set(state => {
        state.showAll = showAll;
      });
    },

    resetAchievements: () => {
      set(state => {
        state.achievements = [...DEFAULT_ACHIEVEMENTS_STORE_STATE.achievements];
        state.showAll = DEFAULT_ACHIEVEMENTS_STORE_STATE.showAll;
      });
    },
  }))
);
