import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
}

export function ChatInput({ inputText, setInputText, onSendMessage, isLoading }: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="flex gap-2 p-4 border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask about Joseph's work..."
        disabled={isLoading}
        className={cn(
          'flex-1 px-3 py-2 text-sm',
          'border border-gray-300 dark:border-gray-600 rounded-lg',
          'bg-white dark:bg-gray-700 text-black dark:text-white',
          'placeholder:text-gray-500 dark:placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      />
      <Button
        onClick={onSendMessage}
        disabled={!inputText.trim() || isLoading}
        size="sm"
        className="px-3 py-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}