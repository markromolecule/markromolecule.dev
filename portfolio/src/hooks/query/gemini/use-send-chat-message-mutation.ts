import { type MutationOptions, useMutation } from '@tanstack/react-query';
import { postChatMessage, type PostChatMessageData, type PostChatMessageResponse } from '@/data/gemini/post-chat-message';

export type ChatMessageData = PostChatMessageData;
export type ChatMessageResponse = PostChatMessageResponse;

export type UseSendChatMessageMutationArgs = MutationOptions<
  ChatMessageResponse,
  Error,
  ChatMessageData
>;

export function useSendChatMessageMutation(args: UseSendChatMessageMutationArgs = {}) {
  return useMutation({
    ...args,
    mutationFn: postChatMessage,
    onError: (error: Error, variables: ChatMessageData, context, meta) => {
      console.error('chat mutation error:', error);
      if (args?.onError) return args.onError(error, variables, context, meta);
    },
  });
}