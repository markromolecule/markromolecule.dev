import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useGiscus } from '@/hooks/giscus/use-giscus';
import { useGiscusStyles } from '@/hooks/giscus/use-giscus-styles';

interface GiscusCommentProps {
  showAllComments: boolean;
  onToggleComments: () => void;
}

export function GiscusComment({ 
  showAllComments, onToggleComments }: GiscusCommentProps) {
  
    // Initialize Giscus comments
  const { commentsRef } = useGiscus();
  useGiscusStyles(showAllComments);

  return (
    <div 
      className={cn(
        // Layout and spacing
        'rounded-lg p-6 sm:p-8',
        // Background
        'bg-white dark:bg-gray-900',
        // Borders and shadows
        'border border-gray-200 dark:border-gray-800',
        'shadow-sm',
        // Animation - using only fade to avoid transform issues
        'animate-in fade-in duration-700 delay-200',
        // Ensure no overflow issues and proper stacking
        'overflow-visible relative z-10'
      )}
      style={{
        transform: 'none !important',
        willChange: 'auto'
      }}
    >
      <div 
        ref={commentsRef} 
        className="giscus-container" 
        style={{ 
          minHeight: '200px',
          width: '100%',
          maxWidth: '100%',
          position: 'relative',
          zIndex: 10,
          margin: 0,
          padding: 0,
          transform: 'none',
          boxSizing: 'border-box'
        }} 
      />
      
      {/* Show All/Less Comments Button */}
      <div className={cn(
        // Layout
        'mt-6 text-center'
      )}>
        {!showAllComments ? (
          <Button
            onClick={onToggleComments}
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
        ) : (
          <Button
            onClick={onToggleComments}
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
            <ChevronUp className="h-4 w-4" />
            Show less
          </Button>
        )}
      </div>
    </div>
  );
}