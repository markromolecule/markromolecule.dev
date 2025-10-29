import { type BaseEntity } from '../shared/store-types';

// Define the achievement type
export type Achievement = {
  id: string;
  year: string;
  title: string;
  description: string;
} & BaseEntity; // Extend BaseEntity for common fields

// Define the achievement type
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

export type AchievementsStore  = AchievementsStoreState & AchievementsStoreActions;