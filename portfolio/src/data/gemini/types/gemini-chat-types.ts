// Payload type for postChatMessage function
export type PostChatMessageData = {
    message: string;
    conversationHistory?: Array<{ 
        role: 'user' | 'system' | 'assistant'; content: string 
    }>;
};

// Response type from postChatMessage function
export type PostChatMessageResponse = {
    response: string;
    success: boolean;
    error?: string;
};

// Type for Gemini API error response
export type GeminiApiErrorData = {
  error?: {
    message?: string;
    code?: string;
  };
  [key: string]: unknown;
}

// Type for Gemini API response structure
export type GeminiApiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  [key: string]: unknown;
}