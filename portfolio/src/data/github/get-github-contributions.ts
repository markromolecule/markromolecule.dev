import { type GetGitHubContributionsDataArgs, type GetGitHubContributionsDataResponse } from './types/github-contributions-types';
import { processGitHubEvents } from './process-github-events';
import { handleGitHubApiResponse } from './utils/github-api-errors';
import { MAX_GITHUB_EVENTS } from './constants/github-contributions-constants';

// ----------------------------
// Main Function
// ----------------------------

/**
 * Fetches recent public GitHub events for a user and processes them
 * into a structured contributions dataset.
 */
export async function getGitHubContributionsData(
  { username }: GetGitHubContributionsDataArgs
): Promise<GetGitHubContributionsDataResponse> {

  // Fetch the last 100 public GitHub events for the given user
  const response = await fetch(
    `https://api.github.com/users/${username}/events/public?per_page=${MAX_GITHUB_EVENTS}`
  );

  // Handle API response errors with proper error messages
  handleGitHubApiResponse(response, username);

  const events = await response.json();
  return processGitHubEvents(events, username);
}

// Re-export types for convenience
export type { 
  GetGitHubContributionsDataArgs, 
  GetGitHubContributionsDataResponse,
  GitHubContribution 
} from './types/github-contributions-types';