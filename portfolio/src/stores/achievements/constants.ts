// TODO: Define constants related to achievements here
import { type AchievementsStoreState } from './types';
// Default state constant
export const INITIAL_ACHIEVEMENTS_STORE_STATE = [
  {
    id: "1",
    year: "2025",
    title: "🔥 Create & Conquer Hackathon",
    description:
      "Secured 1st place in a competitive hackathon at FEU Manila focused on developing innovative virtual assistant solutions.",
  },
  {
    id: "2",
    year: "2024",
    title: "📌 Dean's List Recognition",
    description:
      "Achieved Dean's List status for outstanding academic performance in Information Technology.",
  },
  {
    id: "3",
    year: "2020",
    title: "👋 Hello, everyone!",
    description: "My first line of code",
  },
];

export const DEFAULT_ACHIEVEMENTS_STORE_STATE: AchievementsStoreState = {
    achievements: INITIAL_ACHIEVEMENTS_STORE_STATE,
    showAll: false,
};