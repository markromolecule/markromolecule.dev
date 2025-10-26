import { type GitHubContribution, type GetGitHubContributionsDataResponse } from './types/github-contributions-types';
import { 
  isGitHubEvent, 
  getContributionLevel, 
  calculateCurrentStreak, 
  calculateLongestStreak 
} from './utils/github-contributions-utils';
import { 
  CONTRIBUTION_LOOKBACK_MONTHS, 
  MIN_CONTRIBUTIONS_THRESHOLD, 
  RELEVANT_EVENT_TYPES 
} from './constants/github-contributions-constants';

// ----------------------------
// Event Processing
// ----------------------------

/**
 * Filters and aggregates GitHub events into daily contribution data.
 * Only includes the last 2 months and counts "PushEvent" types as contributions.
 */
export function processGitHubEvents(
  events: unknown[],
  username: string
): GetGitHubContributionsDataResponse {
  // Show only the last 2 months instead of full year
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(endDate.getMonth() - CONTRIBUTION_LOOKBACK_MONTHS);
  
  // Map to store contribution counts per date
  const contributionMap = new Map<string, number>();
  
  // Loop through events and collect push events by date
  events.forEach(event => {
    if (isGitHubEvent(event) && event.actor?.login === username) {
      const eventDate = new Date(event.created_at);
      const dateStr = eventDate.toISOString().split('T')[0];
      
      // Filter only events within date range
      if (eventDate >= startDate && eventDate <= endDate) {
        // Only count actual code pushes
        if (RELEVANT_EVENT_TYPES.includes(event.type)) {
          contributionMap.set(dateStr, (contributionMap.get(dateStr) || 0) + 1);
        }
      }
    }
  });
  
  // Generate an array of contributions between startDate and endDate
  const contributions: GitHubContribution[] = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const rawCount = contributionMap.get(dateStr) || 0;
    
    // Only count days with at least 2 contributions
    const count = rawCount >= MIN_CONTRIBUTIONS_THRESHOLD ? rawCount : 0;
    contributions.push({
      date: dateStr,
      count,
      level: getContributionLevel(count),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // Return the complete processed result
  return {
    contributions,
    totalContributions: contributions.reduce((sum, day) => sum + day.count, 0),
    currentStreak: calculateCurrentStreak(contributions),
    longestStreak: calculateLongestStreak(contributions),
  };
}