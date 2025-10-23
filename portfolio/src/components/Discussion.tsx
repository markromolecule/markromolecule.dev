import { useState } from 'react';
import { cn } from '@/lib/utils';
import { DiscussionHeader } from './discussion/DiscussionHeader';
import { DiscussionCards } from './discussion/DiscussionCard';
import { GiscusComment } from './discussion/GiscusComment';

export function Discussion() {
  const [showAllComments, setShowAllComments] = useState(false);

  const handleToggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <section id="interactive" className={cn(
      // Layout and spacing
      'py-20 px-4 sm:px-6 lg:px-8',
      // Background
      'bg-gradient-to-b from-white to-gray-50',
      'dark:from-black dark:to-gray-900'
    )}>
      <div className="max-w-4xl mx-auto">
        <DiscussionHeader />
        <DiscussionCards />
        <GiscusComment 
          showAllComments={showAllComments}
          onToggleComments={handleToggleComments}
        />

        {/* Call to Action */}
        <div className={cn(
          // Layout
          'text-center mt-8',
          // Animation
          'animate-in fade-in duration-700 delay-300'
        )}>
          <p className={cn(
            // Typography
            'text-sm',
            // Colors
            'text-gray-500 dark:text-gray-400'
          )}>
            💡 New to GitHub? 
            <a 
              href="https://github.com/signup" 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                // Typography and spacing
                'ml-1 font-medium underline',
                // Colors
                'text-blue-600 dark:text-blue-400',
                // Hover states
                'hover:text-blue-700 dark:hover:text-blue-300'
              )}
            >
              Sign up here
            </a>
            {' '}to join the conversation!
          </p>
        </div>
      </div>
    </section>
  );
}