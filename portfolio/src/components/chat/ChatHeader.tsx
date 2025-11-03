import { Button } from '@/components/ui/button';
import { X, Bot } from 'lucide-react';
import { useChatStore } from '@/stores/gemini/use-chat-store';
import { cn } from '@/lib/utils';

export function ChatHeader() {
  const { toggleChat } = useChatStore();

  return (
    // Header container
    <div className={cn(
      'flex items-center justify-between p-4',
      'border-b border-gray-200 dark:border-gray-700',
      'bg-black text-white rounded-t-lg'
    )}>
      {/* User avatar and name */}
      <div className="flex items-center gap-2">
        <Bot className="h-5 w-5" />
        <h3 className="font-semibold">Joseph</h3>
      </div>
      {/* Close button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleChat}
        className="text-white hover:bg-white/20 h-8 w-8 p-0"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}