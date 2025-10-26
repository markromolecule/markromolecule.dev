import { type GitHubContribution, type GitHubEvent } from '../types/github-contributions-types';
import { CONTRIBUTION_LEVELS } from '../constants/github-contributions-constants';

// ----------------------------
// Type Guard
// ----------------------------

/**
 * Checks if an unknown value is a valid GitHubEvent object.
 * Prevents runtime errors when parsing API responses.
 */
export function isGitHubEvent(event: unknown): event is GitHubEvent {
  return (
    typeof event === 'object' &&
    event !== null &&
    'created_at' in event &&
    'type' in event &&
    typeof (event as GitHubEvent).created_at === 'string' &&
    typeof (event as GitHubEvent).type === 'string'
  );
}

// ----------------------------
// Utility Functions
// ----------------------------

/**
 * Converts a contribution count into a level (used for visual intensity, like in GitHub heatmaps)
 */
export function getContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  // 1-3 contributions show level 1
  if (count <= CONTRIBUTION_LEVELS.LEVEL_1) return 1;
  // 4-6 contributions show level 2  
  if (count <= CONTRIBUTION_LEVELS.LEVEL_2) return 2; 
  // 7-10 contributions show level 3 
  if (count <= CONTRIBUTION_LEVELS.LEVEL_3) return 3; 
  // 11+ contributions show level 4
  return 4;
}

/**
 * Calculates the user's current contribution streak (ending today).
 */
export function calculateCurrentStreak(contributions: GitHubContribution[]): number {
  let streak = 0;
  const today = new Date().toISOString().split('T')[0];
  const todayIndex = contributions.findIndex(c => c.date === today);
  
  // Iterate backward from today until a day with zero contributions is found
  for (let i = todayIndex >= 0 ? todayIndex : contributions.length - 1; i >= 0; i--) {
    if (contributions[i].count > 0) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

/**
 * Determines the longest consecutive streak of contribution days.
 */
export function calculateLongestStreak(contributions: GitHubContribution[]): number {
  let maxStreak = 0;
  let currentStreak = 0;
  
  contributions.forEach(contribution => {
    if (contribution.count > 0) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  });
  
  return maxStreak;
}