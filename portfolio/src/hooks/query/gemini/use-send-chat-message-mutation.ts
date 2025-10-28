import { type MutationOptions, useMutation } from '@tanstack/react-query';
import { postChatMessage } from '@/data/gemini/post-chat-message';
import { type PostChatMessageData, type PostChatMessageResponse } from '@/data/gemini/types/gemini-chat-types';

// Re-export the imported types for easier reference and consistent naming
export type ChatMessageData = PostChatMessageData;
export type ChatMessageResponse = PostChatMessageResponse;

// Define the argument type for the custom mutation hook
export type UseSendChatMessageMutationArgs = MutationOptions<
  ChatMessageResponse,
  Error,
  ChatMessageData
>;

// Custom React hook for sending chat messages using React Query's useMutation
export function useSendChatMessageMutation(args: UseSendChatMessageMutationArgs = {}) {
  return useMutation({
    ...args,
    mutationFn: postChatMessage,
    onError: (error: Error, variables: ChatMessageData, context, meta) => {
      console.error('Chat mutation error:', error);

      // Call provided error handler if exists
      if (args?.onError) {
        return args.onError(error, variables, context, meta);
      }
    },
  });
}