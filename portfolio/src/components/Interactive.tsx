import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Sparkles, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useUiStore } from '@/stores/use-ui-store';

export function Interactive() {
  const commentsRef = useRef<HTMLDivElement>(null);
  const [showAllComments, setShowAllComments] = useState(false);
  const { isDarkMode } = useUiStore();

  useEffect(() => {
    if (commentsRef.current && !commentsRef.current.querySelector('.giscus')) {
      const script = document.createElement('script');
      script.src = 'https://giscus.app/client.js';
      script.setAttribute('data-repo', 'markromolecule/portfolio');
      script.setAttribute('data-repo-id', 'R_kgDOP-Bd6Q');
      script.setAttribute('data-category', 'General');
      script.setAttribute('data-category-id', 'DIC_kwDOP-Bd6c4CwnS5');
      script.setAttribute('data-mapping', 'pathname');
      script.setAttribute('data-strict', '0');
      script.setAttribute('data-reactions-enabled', '1');
      script.setAttribute('data-emit-metadata', '0');
      script.setAttribute('data-input-position', 'top');
      script.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
      script.setAttribute('data-lang', 'en');
      script.setAttribute('data-loading', 'lazy');
      script.crossOrigin = 'anonymous';
      script.async = true;

      commentsRef.current.appendChild(script);
    }
  }, [isDarkMode]);

  // Sync Giscus theme with dark mode toggle
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (iframe) {
      iframe.contentWindow?.postMessage(
        {
          giscus: {
            setConfig: {
              theme: isDarkMode ? 'dark' : 'light',
            },
          },
        },
        'https://giscus.app'
      );
    }
  }, [isDarkMode]);

  // Add CSS to limit visible comments to 3
  useEffect(() => {
    if (!showAllComments) {
      const style = document.createElement('style');
      style.id = 'giscus-limit-style';
      style.innerHTML = `
        .giscus .giscus-comment:nth-child(n+4) {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      const existingStyle = document.getElementById('giscus-limit-style');
      if (existingStyle) {
        existingStyle.remove();
      }
    }

    return () => {
      const existingStyle = document.getElementById('giscus-limit-style');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [showAllComments]);

  return (
    <section id="interactive" className={cn(
      // Layout and spacing
      'py-20 px-4 sm:px-6 lg:px-8',
      // Background
      'bg-gradient-to-b from-white to-gray-50',
      'dark:from-black dark:to-gray-900'
    )}>
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
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

        {/* Interactive Cards Grid */}
        <div className={cn(
          // Layout
          'grid grid-cols-1 md:grid-cols-2 gap-6 mb-12'
        )}>
          {/* Visitors Card */}
          <div className={cn(
            // Layout and spacing
            'p-6 rounded-lg',
            // Borders and shadows
            'border border-gray-200 dark:border-gray-800',
            'shadow-sm hover:shadow-md',
            // Background
            'bg-white dark:bg-gray-900',
            // Transitions
            'transition-all duration-200'
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

          {/* Engagement Card */}
          <div className={cn(
            // Layout and spacing
            'p-6 rounded-lg',
            // Borders and shadows
            'border border-gray-200 dark:border-gray-800',
            'shadow-sm hover:shadow-md',
            // Background
            'bg-white dark:bg-gray-900',
            // Transitions
            'transition-all duration-200'
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

        {/* Giscus Comments Section */}
        <div className={cn(
          // Layout and spacing
          'rounded-lg p-6 sm:p-8',
          // Background
          'bg-white dark:bg-gray-900',
          // Borders and shadows
          'border border-gray-200 dark:border-gray-800',
          'shadow-sm',
          // Animation
          'animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200'
        )}>
          <div ref={commentsRef} className="giscus-container" />
          
          {/* Show All Comments Button */}
          {!showAllComments && (
            <div className={cn(
              // Layout
              'mt-6 text-center'
            )}>
              <Button
                onClick={() => setShowAllComments(true)}
                variant="outline"
                className={cn(
                  // Layout and spacing
                  'gap-2',
                  // Colors
                  'border-gray-300 dark:border-gray-600',
                  'text-gray-700 dark:text-gray-300',
                  // Hover states
                  'hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                <ChevronDown className="h-4 w-4" />
                Show all comments
              </Button>
            </div>
          )}
        </div>

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

