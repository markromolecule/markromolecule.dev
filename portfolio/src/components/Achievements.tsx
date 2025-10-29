import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAchievementsStore } from '@/stores/achievements/use-achievements-store';

export function Achievements() {
  const achievements = useAchievementsStore(state => state.achievements);
  const showAll = useAchievementsStore(state => state.showAll);
  const setShowAll = useAchievementsStore(state => state.setShowAll);
  
  return (
    <section id="achievements" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Achievements
            </h2>
                {/* Horizontal Thunder/Zigzag Line */}
                <div className="flex justify-center">
                  <svg 
                    width="96" 
                    height="8" 
                    viewBox="0 0 96 8" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto"
                  >
                    <defs>
                      <linearGradient id="thunderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M0 4 L8 1 L16 6 L24 2 L32 7 L40 3 L48 5 L56 1 L64 6 L72 2 L80 5 L88 3 L96 4" 
                      stroke="url(#thunderGradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Key milestones and accomplishments in my development journey
            </p>
          </div>
        </div>
        
        <div className="space-y-8">
          {achievements.map((achievement, index) => {
            // Show first 2 achievements normally, fade the 3rd one, hide the rest
            const isFaded = !showAll && index === 2; // Fade the 3rd achievement (index 2)
            const isHidden = !showAll && index > 2; // Hide achievements beyond the 3rd one
            const isRevealed = showAll && index > 2; // Achievements that are being revealed
            const revealDelay = isRevealed ? (index - 2) * 150 : 0; // Staggered delay for revealed achievements
            
            // Don't render hidden achievements
            if (isHidden) return null;
            
            return (
              <div 
                key={achievement.id} 
                className={cn(
                  'relative transition-all duration-700 ease-in-out',
                  // Partial visibility for 3rd achievement when not showing all
                  isFaded && 'opacity-60 blur-[1px] scale-98 pointer-events-none overflow-hidden',
                  isFaded && 'max-h-[120px]', // Limit height to show only half
                  // Animation for revealed achievements - slide up and fade in with staggered delay
                  isRevealed && 'opacity-0 translate-y-8 blur-sm',
                  // Normal state for first 2 achievements and when showing all
                  !isFaded && !isRevealed && 'opacity-100 translate-y-0 blur-0'
                )}
                style={{
                  transitionDelay: `${revealDelay}ms`
                }}
              >
                {/* Timeline line */}
                {index < achievements.length - 1 && (
                  <div className="absolute left-4 top-12 w-0.5 h-16 bg-gradient-to-b from-blue-500 to-cyan-500"></div>
                )}
                
                <div className="flex items-start space-x-6">
                  {/* Year badge */}
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {achievement.year.slice(-2)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-white dark:bg-black rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-800">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {achievement.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {achievement.description}
                        </p>
                        <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          {achievement.year}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* View All Button - Only show if there are more than 2 achievements */}
        {achievements.length > 2 && (
          <div className={cn(
            // Layout and positioning
            'flex justify-center',
            // Spacing
            'mt-8 mb-8'
          )}>
            <button
              onClick={() => setShowAll(!showAll)}
              className={cn(
                // Layout and sizing
                'flex items-center gap-2 px-0 py-2',
                // Typography
                'text-sm font-medium',
                // Colors - simple text styling
                'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
                // Transitions
                'transition-all duration-200',
                // Hover effects
                'hover:bg-transparent group'
              )}
            >
              <span>
                {showAll 
                  ? 'Show Less' 
                  : `View All Achievements (${achievements.length - 2} more)`
                }
              </span>
              {showAll ? (
                <ChevronUp className={cn(
                  // Layout and sizing
                  'h-4 w-4',
                  // Colors
                  'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200',
                  // Transitions
                  'transition-all duration-200 group-hover:-translate-y-0.5'
                )} />
              ) : (
                <ChevronDown className={cn(
                  // Layout and sizing
                  'h-4 w-4',
                  // Colors
                  'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200',
                  // Transitions
                  'transition-all duration-200 group-hover:translate-y-0.5'
                )} />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
