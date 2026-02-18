import { useState } from 'react';
import { useChatStore } from '@/stores/gemini/use-chat-store';
import { useSendChatMessageMutation, type ChatMessageResponse } from '@/hooks/query/gemini/use-send-chat-message-mutation';
import { ChatHeader } from './chat/ChatHeader';
import { ChatMessages } from './chat/ChatMessages';
import { ChatInput } from './chat/ChatInput';
import { ChatToggle } from './chat/ChatToggle';
import { cn } from '@/lib/utils';

export function ChatWidget() {
  const [inputText, setInputText] = useState('');

  const {
    messages,
    isOpen,
    isLoading,
    addMessage,
    setLoading,
    setError,
  } = useChatStore();

  const sendMessageMutation = useSendChatMessageMutation({
    onSuccess: (data: ChatMessageResponse) => {
      if (data.success) {
        addMessage({
          text: data.response,
          isUser: false,
        });
      } else {
        setError(data.error || 'Failed to get response');
        addMessage({
          text: data.response,
          isUser: false,
        });
      }
      setLoading(false);
    },
    onError: (error: Error) => {
      const errorMessage = error.message;
      setError(errorMessage);
      addMessage({
        text: "I'm having trouble connecting right now. Please try again later.",
        isUser: false,
      });
      setLoading(false);
    },
  });

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

    const conversationHistory = messages.map((msg) => ({
      role: msg.isUser ? ('user' as const) : ('assistant' as const),
      content: msg.text,
    }));

    sendMessageMutation.mutate({
      message: inputText,
      conversationHistory,
    });
  };

  if (!isOpen) {
    return <ChatToggle />;
  }

  return (
    <div className={cn(
      // Base positioning (mobile)
      'fixed bottom-4 right-4 z-50',
      // Small screens and up
      'sm:bottom-6 sm:right-6',
      // Medium screens 
      'md:bottom-6 md:right-6',
      // Large screens
      'lg:bottom-8 lg:right-8'
    )}>
      <div className="absolute -top-6 right-2 text-2xl transform rotate-12 pointer-events-none">
        👑
      </div>

      <div className={cn(
        // Base styles (mobile)
        'flex flex-col w-80 h-[500px] bg-background/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10',
        // Small screens (sm) - 640px+
        'sm:w-80 sm:h-[420px]',
        // Medium screens (md) - 768px+
        'md:w-96 md:h-[480px]',
        // Large screens (lg) - 1024px+
        'lg:w-[400px] lg:h-[520px]',
        // Max height constraints for all screens
        'max-h-[calc(100vh-8rem)]',
        // Animation and dark mode
        'animate-in slide-in-from-bottom-4 duration-300'
      )}>
        <ChatHeader />
        <ChatMessages />
        <ChatInput
          inputText={inputText}
          setInputText={setInputText}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}