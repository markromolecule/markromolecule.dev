// TODO: API Handler for Gemini Chat Messages
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { processChatMessageService } from '../src/services/chat/process-chat-message-service';
import type { ProcessChatMessageServiceArgs } from '../src/services/chat/process-chat-message-service';

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
    const rawBody = req.body;
    let parsedBody: Partial<RequestBody> = {};

    if (!rawBody) {
      // Try to parse raw text body if available on the request
      const r = req as unknown as { rawBody?: string; bodyRaw?: string };
      const txt = r.rawBody || r.bodyRaw || '';

      if (typeof txt === 'string' && txt.trim()) {
        try {
          parsedBody = JSON.parse(txt);
        } catch {
          // ignore - im just debugging here
        }
      }
    } else if (typeof rawBody === 'string') {
      try {
        parsedBody = JSON.parse(rawBody);
      } catch {
        // ignore - debugging again
      }
    } else {
      parsedBody = rawBody as Partial<RequestBody>;
    }

    const message = parsedBody.message;
    const conversationHistory = parsedBody.conversationHistory || [];

    if (!message || typeof message !== 'string') {
      console.warn('Invalid request body for /api/chat:', parsedBody);
      return res.status(400).json({ error: 'invalid message format' });
    }

  const args: ProcessChatMessageServiceArgs = { message, conversationHistory } as ProcessChatMessageServiceArgs;
  const result = await processChatMessageService(args);
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
