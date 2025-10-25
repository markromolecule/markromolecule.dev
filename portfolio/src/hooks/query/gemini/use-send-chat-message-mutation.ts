// TODO: Implement gemini chat message posting

import { type MutationOptions, useMutation } from '@tanstack/react-query';

export type ChatMessageData = {
  message: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
};

export type ChatMessageResponse = {
  response: string;
  success: boolean;
  error?: string;
};

// Function to call your API route
async function sendChatMessage(data: ChatMessageData): Promise<ChatMessageResponse> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Handle different error scenarios
      if (response.status === 404) {
        return {
          response: "Hi! I'm Joseph's AI assistant. The chat API is currently not available in development mode. In the deployed version, I can help you learn about Joseph's skills, projects, and experience as a developer. Feel free to explore the portfolio in the meantime!",
          success: true,
        };
      }
      
      if (response.status === 500) {
        return {
          response: "I'm experiencing some technical difficulties right now. This might be due to API configuration issues. Please try again later or contact Joseph directly at livadomc@gmail.com for immediate assistance.",
          success: false,
          error: 'Server error - please check API configuration and environment variables',
        };
      }
      
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // Handle network errors or other fetch failures
    if (error instanceof Error) {
      if (error.message.includes('404') || error.message.includes('fetch')) {
        return {
          response: "Hi! I'm Joseph's AI assistant. The chat API is currently not available in development mode. In the deployed version, I can help you learn about Joseph's skills, projects, and experience as a developer. Feel free to explore the portfolio in the meantime!",
          success: true,
        };
      }
    }
    throw error;
  }
}

export type UseSendChatMessageMutationArgs = MutationOptions<
  ChatMessageResponse,
  Error,
  ChatMessageData
>;

export function useSendChatMessageMutation(
  args: UseSendChatMessageMutationArgs = {}) {

  return useMutation({
    ...args,
    mutationFn: sendChatMessage,
    onError: (error: Error, variables: ChatMessageData, context, meta) => {
      console.error('chat mutation error:', error);
      args.onError?.(error, variables, context, meta);
    }
  });
}