import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { type AchievementsStore, type Achievement } from './types';
import { DEFAULT_ACHIEVEMENTS_STORE_STATE } from './constants';
import { generateUniqueId, updateItemById, deleteItemById } from '../shared/store-utils';

export const useAchievementsStore = create(
  immer<AchievementsStore>(set => ({
    ...DEFAULT_ACHIEVEMENTS_STORE_STATE,

    /* Actions */
    addAchievement: (achievement) => {
      set(state => {
        const newAchievement: Achievement = {
          ...achievement,
          id: generateUniqueId('achievement'),
        };
        state.achievements.unshift(newAchievement);
      });
    },

    updateAchievement: (id, updates) => {
      set(state => {
        state.achievements = updateItemById(state.achievements, id, updates);
      });
    },

    deleteAchievement: (id) => {
      set(state => {
        state.achievements = deleteItemById(state.achievements, id);
      });
    },

    setShowAll: (showAll) => {
      set(state => {
        state.showAll = showAll;
      });
    },

    resetAchievements: () => {
      set(state => {
        Object.assign(state, DEFAULT_ACHIEVEMENTS_STORE_STATE);
      });
    },
  }))
);