import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { 
  getGitHubContributionsData, 
  type GetGitHubContributionsDataArgs,
  type GetGitHubContributionsDataResponse 
} from '@/data/github/get-github-contributions';

// ----------------------------
// Query Hook Types
// ----------------------------

/**
 * Arguments for the GitHub contributions query hook
 * Extends the data function args with optional query options
 */
export type UseGitHubContributionsQueryArgs = Omit<
  UseQueryOptions<GetGitHubContributionsDataResponse, Error>,
  'queryKey' | 'queryFn'
> & {
  payload: GetGitHubContributionsDataArgs;
};

// ----------------------------
// Query Hook
// ----------------------------

/**
 * Custom hook for fetching GitHub contributions data with optimized caching
 * Provides loading states, error handling, and automatic refetching
 */
export function useGitHubContributionsQuery({ 
  // Payload containing the username
  payload, 
  ...args 
}: UseGitHubContributionsQueryArgs) {
  return useQuery({
    ...args,
    queryKey: ['/github-contributions', payload.username],
    queryFn: () => getGitHubContributionsData(payload),
    // Cache for 1 hour - GitHub data doesn't change frequently
    staleTime: 1000 * 60 * 60, 
    // Keep in memory for 24 hours
    gcTime: 1000 * 60 * 60 * 24, 
    // Retry failed requests up to 3 times
    retry: 3,
    // Exponential backoff with max 30 second delay
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// ----------------------------
// Convenience Hook (Backward Compatibility)
// ----------------------------

/**
 * Simplified version of the query hook for basic usage
 * Maintains backward compatibility with existing code
 */
export function useGitHubContributionsQuerySimple(args: GetGitHubContributionsDataArgs) {
  return useGitHubContributionsQuery({ payload: args });
}