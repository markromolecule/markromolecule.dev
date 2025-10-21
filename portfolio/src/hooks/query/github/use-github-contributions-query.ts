import { useQuery } from '@tanstack/react-query';
import { getGitHubContributionsData, type GetGitHubContributionsDataArgs } from '@/data/github/get-github-contributions';

export type UseGitHubContributionsQueryArgs = GetGitHubContributionsDataArgs;

export function useGitHubContributionsQuery(args: UseGitHubContributionsQueryArgs) {
  return useQuery({
    queryKey: ['/github-contributions', args.username, args.year],
    queryFn: () => getGitHubContributionsData(args),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
