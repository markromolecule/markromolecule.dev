import { useGitHubContributionsQuery } from '@/hooks/query/github/use-github-contributions-query';
import { Github, Calendar, TrendingUp, Zap } from 'lucide-react';

interface GitHubActivityProps {
  username: string;
  className?: string;
}

export function GitHubActivity({ username, className }: GitHubActivityProps) {
  const { data, isLoading, error } = useGitHubContributionsQuery({ payload: { username } });

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-red-500 dark:text-red-400">
          Unable to load GitHub activity: {error.message}
        </p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <section className={`space-y-6 ${className}`}>
      <div className="flex items-center space-x-2">
        <Github className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          GitHub Activity
        </h3>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Contributions
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.totalContributions}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Zap className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Current Streak
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.currentStreak} days
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Longest Streak
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.longestStreak} days
          </p>
        </div>
      </div>

      {/* Activity Calendar */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        {/* Day Headers */}
        <div className="grid grid-cols-7 mb-3" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={`day-${index}`} className="text-xs font-medium text-gray-500 dark:text-gray-400 text-center">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 mb-3" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px' }}>
          {data.contributions.map((contribution, index) => (
            <div
              key={index}
              className={`
                h-3 w-full rounded-sm cursor-pointer
                ${contribution.level === 0 ? 'bg-gray-100 dark:bg-gray-700' : ''}
                ${contribution.level === 1 ? 'bg-green-200 dark:bg-green-800' : ''}
                ${contribution.level === 2 ? 'bg-green-300 dark:bg-green-700' : ''}
                ${contribution.level === 3 ? 'bg-green-400 dark:bg-green-600' : ''}
                ${contribution.level === 4 ? 'bg-green-500 dark:bg-green-500' : ''}
              `}
              title={`${contribution.date}: ${contribution.count} contributions`}
            />
          ))}
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-7 text-xs text-gray-500 dark:text-gray-400" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          <div className="text-left">Less</div>
          <div></div>
          <div></div>
          <div className="flex justify-center space-x-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`
                  h-3 w-4 rounded-sm
                  ${level === 0 ? 'bg-gray-100 dark:bg-gray-700' : ''}
                  ${level === 1 ? 'bg-green-200 dark:bg-green-800' : ''}
                  ${level === 2 ? 'bg-green-300 dark:bg-green-700' : ''}
                  ${level === 3 ? 'bg-green-400 dark:bg-green-600' : ''}
                  ${level === 4 ? 'bg-green-500 dark:bg-green-500' : ''}
                `}
              />
            ))}
          </div>
          <div></div>
          <div></div>
          <div className="text-right">More</div>
        </div>
      </div>
    </section>
  );
}