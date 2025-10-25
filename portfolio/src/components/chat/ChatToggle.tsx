import { Button } from '@/components/ui/button';
import { useChatStore } from '@/stores/use-chat-store';
import { cn } from '@/lib/utils';

export function ChatToggle() {
  const { toggleChat } = useChatStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 sm:bottom-6 sm:right-6">
      <div className="absolute -top-6 right-2 text-2xl transform rotate-12 pointer-events-none">
        👑
      </div>
      <Button
        onClick={toggleChat}
        className={cn(
          'bg-white dark:bg-gray-800 text-black dark:text-white border border-black dark:border-gray-600',
          'px-4 py-2 rounded-lg shadow-sm',
          'hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200',
          'font-medium text-sm'
        )}
      >
        Chat with Joseph
      </Button>
    </div>
  );
}