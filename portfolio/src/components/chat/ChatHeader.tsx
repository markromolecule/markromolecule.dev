import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useChatStore } from '@/stores/gemini/use-chat-store';

export function ChatHeader() {
  const { toggleChat } = useChatStore();

  return (
    <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 backdrop-blur-md rounded-t-2xl">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 ring-2 ring-blue-500/20">
            <img
              src="https://github.com/markromolecule.png"
              alt="Joseph"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
        </div>
        <div>
          <h3 className="font-medium text-foreground">Joseph</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            AI Assistant
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleChat}
        className="h-8 w-8 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}