import { type MutationOptions, useMutation } from '@tanstack/react-query';
import { postChatMessage, type PostChatMessageData, type PostChatMessageResponse } from '@/data/gemini/post-chat-message';

// Re-export the imported types for easier reference and consistent naming
export type ChatMessageData = PostChatMessageData;
export type ChatMessageResponse = PostChatMessageResponse;

// Define the argument type for the custom mutation hook
// This ensures the mutation uses the proper types for input, output, and error handling
export type UseSendChatMessageMutationArgs = MutationOptions<
  ChatMessageResponse,
  Error,
  ChatMessageData
>;

// Custom React hook for sending chat messages using React Query's useMutation
export function useSendChatMessageMutation(args: UseSendChatMessageMutationArgs = {}) {
  return useMutation({
    ...args,
     // The function responsible for executing the API request
    mutationFn: postChatMessage,
    onError: (error: Error, variables: ChatMessageData, context, meta) => {
      console.error('chat mutation error:', error);
      if (args?.onError) 
        return args.onError(error, variables, context, meta);
    },
  });
}