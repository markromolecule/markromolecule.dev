export type GetGitHubContributionsDataArgs = {
  username: string;
};

export type GitHubContribution = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GetGitHubContributionsDataResponse = {
  contributions: GitHubContribution[];
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
};

type GitHubEvent = {
  actor?: { login?: string };
  created_at: string;
  type: string;
};

function isGitHubEvent(event: unknown): event is GitHubEvent {
  return (
    typeof event === 'object' &&
    event !== null &&
    'created_at' in event &&
    'type' in event &&
    typeof (event as GitHubEvent).created_at === 'string' &&
    typeof (event as GitHubEvent).type === 'string'
  );
}

export async function getGitHubContributionsData(
  { username }: GetGitHubContributionsDataArgs
): Promise<GetGitHubContributionsDataResponse> {

  const response = await fetch(
    `https://api.github.com/users/${username}/events/public?per_page=100`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Username ko: '${username}' not found`);
    } 
    throw new Error(`API error shit ${response.status}`);
  }

  const events = await response.json();
  return processGitHubEvents(events, username);
}

function processGitHubEvents(
  events: unknown[],
  username: string
): GetGitHubContributionsDataResponse {
  // Show only the last 2 months instead of full year
  const endDate = new Date();
  const startDate = new Date();
  
  startDate.setMonth(endDate.getMonth() - 2);
  const contributionMap = new Map<string, number>();
  
  events.forEach(event => {
    if (isGitHubEvent(event) && event.actor?.login === username) {
      const eventDate = new Date(event.created_at);
      const dateStr = eventDate.toISOString().split('T')[0];
      
      if (eventDate >= startDate && eventDate <= endDate) {
        // Only count actual code pushes
        const relevantEvents = ['PushEvent']; 
        if (relevantEvents.includes(event.type)) {
          contributionMap.set(dateStr, (contributionMap.get(dateStr) || 0) + 1);
        }
      }
    }
  });
  
  const contributions: GitHubContribution[] = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const rawCount = contributionMap.get(dateStr) || 0;
    // Only count days with at least 2 contributions
    const count = rawCount >= 2 ? rawCount : 0;
    contributions.push({
      date: dateStr,
      count,
      level: getContributionLevel(count),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return {
    contributions,
    totalContributions: contributions.reduce((sum, day) => sum + day.count, 0),
    currentStreak: calculateCurrentStreak(contributions),
    longestStreak: calculateLongestStreak(contributions),
  };
}

function getContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  // 1-3 contributions show level 1
  if (count <= 3) return 1;
  // 4-6 contributions show level 2  
  if (count <= 6) return 2; 
  // 7-10 contributions show level 3 
  if (count <= 10) return 3; 
  // 7-10 contributions show level 3
  return 4;  // 11+ contributions show level 4
}

function calculateCurrentStreak(contributions: GitHubContribution[]): number {
  let streak = 0;
  const today = new Date().toISOString().split('T')[0];
  const todayIndex = contributions.findIndex(c => c.date === today);
  
  for (let i = todayIndex >= 0 ? todayIndex : contributions.length - 1; i >= 0; i--) {
    if (contributions[i].count > 0) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

function calculateLongestStreak(contributions: GitHubContribution[]): number {
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
