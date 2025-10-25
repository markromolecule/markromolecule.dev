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
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // For development, return a mock response when API is not available
    if (error instanceof Error && error.message.includes('404')) {
      return {
        response: "I'm Joseph's AI assistant! I can help you learn about his skills, projects, and experience. However, the chat API is not currently available in development mode. Please check the server configuration.",
        success: true,
      };
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