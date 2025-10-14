import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Send, Bot, User } from 'lucide-react';
import { useChatStore } from '@/stores/use-chat-store';
import { geminiChatService } from '@/services/chat/gemini-chat-service';
import { cn } from '@/lib/utils';

export function ChatWidget() {
  const [inputText, setInputText] = useState('');
  
  const {
    messages,
    isOpen,
    isLoading,
    error,
    addMessage,
    toggleChat,
    setLoading,
    setError,
  } = useChatStore();

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      text: inputText,
      isUser: true,
    };

    addMessage(userMessage);
    setInputText('');
    setLoading(true);
    setError(null);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.isUser ? 'user' as const : 'assistant' as const,
        content: msg.text,
      }));

      const result = await geminiChatService({
        message: inputText,
        conversationHistory,
      });

      if (result.success) {
        addMessage({
          text: result.response,
          isUser: false,
        });
      } else {
        setError(result.error || 'Failed to get response');
        addMessage({
          text: result.response,
          isUser: false,
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      addMessage({
        text: "I'm having trouble connecting right now. Please try again later.",
        isUser: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <div className={cn(
          // Base layout and dimensions - responsive sizing
          'w-80 sm:w-96 h-[500px] flex flex-col',
          // Borders and shadows
          'bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700',
          // Animation
          'animate-in slide-in-from-bottom-4 duration-300',
          // Positioning to prevent overlap
          'max-h-[calc(100vh-3rem)] max-w-[calc(100vw-3rem)]',
          // Mobile positioning
          'sm:bottom-6 sm:right-6'
        )}>
          {/* Header */}
          <div className={cn(
            // Layout and spacing
            'flex items-center justify-between p-4',
            // Borders
            'border-b border-gray-200 dark:border-gray-700',
            // Background - neutral black
            'bg-black text-white rounded-t-lg'
          )}>
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <h3 className="font-semibold">Joseph</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleChat}
              className={cn(
                // Colors
                'text-white hover:bg-white/20',
                // Sizing
                'h-8 w-8 p-0'
              )}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className={cn(
            // Layout and spacing
            'flex-1 overflow-y-auto p-4 space-y-4',
            // Background
            'bg-gray-50 dark:bg-gray-800'
          )}>
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
                    // Base styles
                    'max-w-[80%] p-3 rounded-lg',
                    // Layout
                    'flex items-start gap-2',
                    // Conditional styling with dark mode support
                    message.isUser
                      ? cn(
                          // User message styles - black background
                          'bg-black text-white',
                          'flex-row-reverse'
                        )
                      : cn(
                          // AI message styles - adapts to theme
                          'bg-white dark:bg-gray-700 text-black dark:text-white',
                          'border border-black dark:border-gray-600'
                        )
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
                <div className={cn(
                  // Base styles with dark mode support
                  'bg-white dark:bg-gray-700 p-3 rounded-lg',
                  'border border-black dark:border-gray-600',
                  // Layout
                  'flex items-center gap-2',
                  // Text color
                  'text-black dark:text-white'
                )}>
                  <Bot className="h-4 w-4" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce"></div>
                    <div 
                      className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" 
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div 
                      className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" 
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className={cn(
                // Base styles with dark mode support
                'bg-white dark:bg-gray-700 border border-black dark:border-gray-600',
                'p-3 rounded-lg text-sm text-black dark:text-white'
              )}>
                {error}
              </div>
            )}
          </div>

          {/* Input */}
          <div className={cn(
            // Layout and spacing
            'flex gap-2 p-4',
            // Borders with dark mode support
            'border-t border-gray-300 dark:border-gray-700',
            // Background with dark mode support
            'bg-white dark:bg-gray-800'
          )}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Joseph's work..."
              disabled={isLoading}
              className={cn(
                // Base styles
                'flex-1 px-3 py-2 text-sm',
                // Borders and corners with dark mode
                'border border-gray-300 dark:border-gray-600 rounded-lg',
                // Background and text with dark mode
                'bg-white dark:bg-gray-700 text-black dark:text-white',
                // Placeholder color
                'placeholder:text-gray-500 dark:placeholder:text-gray-400',
                // Focus states with dark mode
                'focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent',
                // Disabled state
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              size="sm"
              className={cn(
                // Base styles
                'px-3 py-2',
                // Colors with dark mode support
                'bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black',
                // Disabled state
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          className={cn(
            // Base styles with dark mode support
            'bg-white dark:bg-gray-800 text-black dark:text-white border border-black dark:border-gray-600',
            'px-4 py-2 rounded-lg shadow-sm',
            // Hover effects with dark mode
            'hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200',
            // Typography
            'font-medium text-sm'
          )}
        >
          Chat with Joseph
        </Button>
      )}
    </div>
  );
}
