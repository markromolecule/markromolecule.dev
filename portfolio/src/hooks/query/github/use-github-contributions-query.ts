import { useQuery } from '@tanstack/react-query';
import { getGitHubContributionsData, type GetGitHubContributionsDataArgs } from '@/data/github/get-github-contributions';

export type UseGitHubContributionsQueryArgs = GetGitHubContributionsDataArgs;

export function useGitHubContributionsQuery(args: UseGitHubContributionsQueryArgs) {
  return useQuery({
    queryKey: ['/github-contributions', args.username],
    queryFn: () => getGitHubContributionsData(args),
    // 1 hour
    staleTime: 1000 * 60 * 60, 
    // 24 hours
    gcTime: 1000 * 60 * 60 * 24, 
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
