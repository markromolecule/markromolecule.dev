import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DiscussionHeader() {
  return (
    <div className={cn(
      // Layout
      'text-center mb-12',
      // Animation
      'animate-in fade-in slide-in-from-bottom-4 duration-700'
    )}>
      <div className={cn(
        // Layout
        'flex items-center justify-center gap-2 mb-4'
      )}>
        <Sparkles className={cn(
          // Sizing and color
          'h-8 w-8',
          'text-blue-600 dark:text-blue-400'
        )} />
        <h2 className={cn(
          // Typography
          'text-3xl sm:text-4xl font-bold',
          // Colors
          'text-gray-900 dark:text-white'
        )}>
          Discussion Space
        </h2>
        <Sparkles className={cn(
          // Sizing and color
          'h-8 w-8',
          'text-blue-600 dark:text-blue-400'
        )} />
      </div>
      
      <p className={cn(
        // Typography
        'text-lg',
        // Colors
        'text-gray-600 dark:text-gray-300',
        // Spacing
        'max-w-2xl mx-auto'
      )}>
        Join the conversation! Share your thoughts, ask questions, or just say hello.
      </p>
    </div>
  );
}