import { MessageCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DiscussionCards() {
  return (
    <div className={cn(
      // Layout
      'grid grid-cols-1 md:grid-cols-2 gap-6 mb-12',
      // Isolation
      'relative z-0'
    )}>
      {/* Community Discussions Card */}
      <div className={cn(
        // Layout and spacing
        'p-6 rounded-lg',
        // Borders and shadows
        'border border-gray-200 dark:border-gray-800',
        'shadow-sm hover:shadow-md',
        // Background
        'bg-white dark:bg-gray-900',
        // Transitions
        'transition-all duration-200',
        // Isolation
        'relative z-0'
      )}>
        <div className="flex items-center gap-3 mb-2">
          <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h3 className={cn(
            // Typography
            'text-xl font-semibold',
            // Colors
            'text-gray-900 dark:text-white'
          )}>
            Community Discussions
          </h3>
        </div>
        <p className={cn(
          // Typography
          'text-sm',
          // Colors
          'text-gray-600 dark:text-gray-400'
        )}>
          Powered by GitHub Discussions, your feedback is stored safely and publicly.
        </p>
      </div>

      {/* React & Engage Card */}
      <div className={cn(
        // Layout and spacing
        'p-6 rounded-lg',
        // Borders and shadows
        'border border-gray-200 dark:border-gray-800',
        'shadow-sm hover:shadow-md',
        // Background
        'bg-white dark:bg-gray-900',
        // Transitions
        'transition-all duration-200',
        // Isolation
        'relative z-0'
      )}>
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          <h3 className={cn(
            // Typography
            'text-xl font-semibold',
            // Colors
            'text-gray-900 dark:text-white'
          )}>
            React & Engage
          </h3>
        </div>
        <p className={cn(
          // Typography
          'text-sm',
          // Colors
          'text-gray-600 dark:text-gray-400'
        )}>
          Leave reactions, comments, or start a discussion about my work!
        </p>
      </div>
    </div>
  );
}