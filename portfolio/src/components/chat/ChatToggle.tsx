import { Button } from '@/components/ui/button';
import { useChatStore } from '@/stores/use-chat-store';
import { cn } from '@/lib/utils';

export function ChatToggle() {
  const { toggleChat } = useChatStore();

  return (
    <div className={cn(
      // Base positioning (mobile)
      'fixed bottom-4 right-4 z-50',
      // Small screens and up
      'sm:bottom-6 sm:right-6',
      // Medium screens (iPad/Tablet)
      'md:bottom-6 md:right-6',
      // Large screens
      'lg:bottom-8 lg:right-8'
    )}>
      <div className="absolute -top-6 right-2 text-2xl transform rotate-12 pointer-events-none">
        👑
      </div>
      <Button
        onClick={toggleChat}
        className={cn(
          'px-4 py-2 rounded-lg shadow-sm font-medium text-sm',
          'bg-white border border-black text-black',
          'hover:bg-black hover:text-white transition-all duration-200',
          'dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-white dark:hover:text-black'
        )}
      >
        Chat with Joseph
      </Button>
    </div>
  );
}