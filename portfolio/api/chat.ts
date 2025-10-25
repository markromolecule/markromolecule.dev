// TODO: API Handler for Gemini Chat Messages
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { processChatMessageService } from '../src/services/chat/process-chat-message-service';

type RequestBody = {
  message: string;
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory }: RequestBody = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'invalid message format',
      })
    }

    const result = await processChatMessageService({
      message,
      conversationHistory,
    });
    return res.status(200).json(result);
  } catch (error) {
    
    console.error('api error:', error);
    
    return res.status(500).json({
      response: 'trouble connecting to server',
      success: false,
      error: error instanceof Error ? error.message : 'unknown error',
    });
  }
}
