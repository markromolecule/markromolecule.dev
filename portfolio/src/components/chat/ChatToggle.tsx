import { Button } from '@/components/ui/button';
import { useChatStore } from '@/stores/gemini/use-chat-store';
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
          'px-5 py-3 rounded-full font-medium text-sm',
          'bg-background/80 backdrop-blur-md border border-white/10 text-foreground',
          'hover:bg-blue-500/10 hover:border-blue-500/20 hover:text-blue-400 transition-all duration-300',
          'shadow-lg shadow-black/20'
        )}
      >
        Chat with Joseph
      </Button>
    </div>
  );
}