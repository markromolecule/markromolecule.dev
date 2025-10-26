// ----------------------------
// Configuration Constants
// ----------------------------

/**
 * Number of months to look back for contribution data
 */
export const CONTRIBUTION_LOOKBACK_MONTHS = 1;

/**
 * Maximum number of events to fetch from GitHub API
 */
export const MAX_GITHUB_EVENTS = 100;

/**
 * Minimum contributions required for a day to count
 * Only count days with at least 2 contributions
 */
export const MIN_CONTRIBUTIONS_THRESHOLD = 1;

/**
 * GitHub event types that count as contributions
 * Only count actual code pushes
 */
export const RELEVANT_EVENT_TYPES = ['PushEvent'];

/**
 * Contribution level thresholds for visual intensity
 * Used for heatmap-style visualization like GitHub
 */
export const CONTRIBUTION_LEVELS = {
  LEVEL_0: 0,     // No contributions
  LEVEL_1: 3,     // 1-3 contributions show level 1
  LEVEL_2: 6,     // 4-6 contributions show level 2
  LEVEL_3: 10,    // 7-10 contributions show level 3
  LEVEL_4: 11,    // 11+ contributions show level 4
} as const;