// TODO: API route to handle chat messages and interact with Gemini API
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GEMINI_API_CONFIG, SYSTEM_PROMPT } from '../src/lib/gemini-config';

type RequestBody = {
  message: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
};

// API route handler for chat messages
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      response: 'Method not allowed',
      success: false,
      error: 'Method not allowed' 
    });
  }

  try {
    console.log('Chat API handler called, method:', req.method);
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not configured');
      return res.status(500).json({
        response: 'Server configuration error',
        success: false,
        error: 'API key not configured',
      });
    }

    console.log('API key found, length:', apiKey.length);

    // Parse request body
    const body = req.body as Partial<RequestBody>;
    const message = body?.message;
    const conversationHistory = body?.conversationHistory || [];

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        response: 'Invalid request',
        success: false,
        error: 'Invalid message format' 
      });
    }

    // Prepare conversation context
    const conversationContext = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      ...conversationHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      })),
      { role: 'user', parts: [{ text: message }] },
    ];

    const contents = conversationContext.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: msg.parts,
    }));

    // Make request to Gemini API
    console.log('Making request to Gemini API...');
    const response = await fetch(
      `${GEMINI_API_CONFIG.baseUrl}?key=${apiKey}`,
      {
        method: 'POST',
        headers: GEMINI_API_CONFIG.header,
        body: JSON.stringify({ contents }),
      }
    );

    console.log('Gemini API response status:', response.status);

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!apiResponse) {
      throw new Error('No response from Gemini API');
    }

    // Successful response
    return res.status(200).json({
      response: apiResponse,
      success: true,
    });

  } catch (error) {
    console.error('API handler error:', error);
    
    // Handles error code 500
    return res.status(500).json({
      response: "I'm having trouble connecting right now. Please try again later.",
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
