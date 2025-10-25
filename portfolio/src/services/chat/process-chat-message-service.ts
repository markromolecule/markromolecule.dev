import { postChatMessage, type PostChatMessageData } from '@/data/gemini/post-chat-message';

// TODO: Service layer for processing chat messages
// Payload for service
export type ProcessChatMessageServiceArgs = PostChatMessageData;

export type ProcessChatMessageServiceResult = {
    response: string;
    success: boolean;
    error?: string;
};

// service funct to process chat message
export async function processChatMessageService(
    args: ProcessChatMessageServiceArgs): Promise<ProcessChatMessageServiceResult> {
  try {
    return await postChatMessage(args);

  } catch (error) {

    console.error('chat service error:', error);

    return {
        response: 'trouble connecting',
        success: false,
        error: error instanceof Error ? error.message : 'unknown error',
    };
  }
};