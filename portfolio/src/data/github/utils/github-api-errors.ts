// ----------------------------
// Error Handling Utilities
// ----------------------------

/**
 * Creates standardized error messages for GitHub API failures
 */
export function createGitHubApiError(status: number, username: string): Error {
  if (status === 404) {
    return new Error(`GitHub user '${username}' not found`);
  }
  return new Error(`GitHub API error: ${status}`);
}

/**
 * Handles GitHub API response errors with proper error messages
 */
export function handleGitHubApiResponse(response: Response, username: string): void {
  if (!response.ok) {
    throw createGitHubApiError(response.status, username);
  }
}