import { Bot, User } from 'lucide-react';
import { useChatStore } from '@/stores/gemini/use-chat-store';
import { cn } from '@/lib/utils';

export function ChatMessages() {
  const { messages, isLoading, error } = useChatStore();

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            'flex',
            message.isUser ? 'justify-end' : 'justify-start'
          )}
        >
          <div
            className={cn(
              'max-w-[80%] p-3 rounded-lg flex items-start gap-2',
              message.isUser
                ? 'bg-black text-white flex-row-reverse'
                : 'bg-white dark:bg-gray-700 text-black dark:text-white border border-black dark:border-gray-600'
            )}
          >
            {!message.isUser && <Bot className="h-4 w-4 mt-1 flex-shrink-0" />}
            {message.isUser && <User className="h-4 w-4 mt-1 flex-shrink-0" />}
            <p className="text-sm break-words whitespace-pre-wrap">{message.text}</p>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-black dark:border-gray-600 flex items-center gap-2 text-black dark:text-white">
            <Bot className="h-4 w-4" />
            <div className="flex space-x-1">
              <div key="dot-1" className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce"></div>
              <div key="dot-2" className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div key="dot-3" className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-white dark:bg-gray-700 border border-black dark:border-gray-600 p-3 rounded-lg text-sm text-black dark:text-white">
          {error}
        </div>
      )}
    </div>
  );
}