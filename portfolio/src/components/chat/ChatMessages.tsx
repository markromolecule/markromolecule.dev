import { useChatStore } from '@/stores/gemini/use-chat-store';
import { cn } from '@/lib/utils';

export function ChatMessages() {
  const { messages, error } = useChatStore();

  return (
    <div
      className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
    >
      <div className="space-y-4">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-white/10 ring-1 ring-blue-500/20">
              <img
                src="https://github.com/markromolecule.png"
                alt="Joseph"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white/5 border border-white/10 text-foreground rounded-2xl rounded-tl-sm px-4 py-3 text-sm max-w-[85%] shadow-sm">
              <p>Hi! I'm Mark's AI assistant. Ask me anything about his projects, skills, or experience! 👋</p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3',
              message.isUser ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            {!message.isUser && (
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-white/10 ring-1 ring-blue-500/20">
                <img
                  src="https://github.com/markromolecule.png"
                  alt="Joseph"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div
              className={cn(
                'rounded-2xl px-4 py-3 text-sm max-w-[85%] shadow-sm',
                message.isUser
                  ? 'bg-blue-600 text-white rounded-tr-sm'
                  : 'bg-white/5 border border-white/10 text-foreground rounded-tl-sm'
              )}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-white dark:bg-gray-700 border border-black dark:border-gray-600 p-3 rounded-lg text-sm text-black dark:text-white">
          {error}
        </div>
      )}
    </div>
  );
}