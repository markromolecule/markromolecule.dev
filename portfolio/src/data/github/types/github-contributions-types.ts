// ----------------------------
// Type Definitions
// ----------------------------

/**
 * Arguments expected by the getGitHubContributionsData function
 */
export type GetGitHubContributionsDataArgs = {
  username: string;
};

/**
 * Represents a single day's GitHub contribution data
 */
export type GitHubContribution = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

/**
 * The final processed response returned by getGitHubContributionsData
 */
export type GetGitHubContributionsDataResponse = {
  contributions: GitHubContribution[];
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
};

/**
 * Raw GitHub event data structure from the API
 */
export type GitHubEvent = {
  actor?: { login?: string };
  created_at: string;
  type: string;
};