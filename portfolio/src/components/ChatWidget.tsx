import { useState } from 'react';
import { useChatStore } from '@/stores/use-chat-store';
import { useSendChatMessageMutation, type ChatMessageResponse } from '@/hooks/query/gemini/use-send-chat-message-mutation';
import { ChatHeader } from './chat/ChatHeader';
import { ChatMessages } from './chat/ChatMessages';
import { ChatInput } from './chat/ChatInput';
import { ChatToggle } from './chat/ChatToggle';

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
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <div className="absolute -top-6 right-2 text-2xl transform rotate-12 pointer-events-none">
        👑
      </div>

      <div className="w-[calc(100vw-2rem)] max-w-80 sm:w-80 sm:max-w-96 h-[500px] max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-in slide-in-from-bottom-4 duration-300">
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