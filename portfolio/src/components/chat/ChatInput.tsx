import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
}

export function ChatInput({ inputText, setInputText, onSendMessage, isLoading }: ChatInputProps) {
  return (
    <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-md rounded-b-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSendMessage();
        }}
        className="flex gap-2"
      >
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 px-3 py-2 text-sm rounded-md bg-black/20 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !inputText.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}