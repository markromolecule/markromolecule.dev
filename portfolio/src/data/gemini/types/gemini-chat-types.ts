// TODO: Refactor to use shared constants
import { GEMINI_API_CONSTANTS, RESPONSE_KEYS } from "@/data/constants/gemini-api-constants"; 

// Payload type for postChatMessage function
export type PostChatMessageData = {
    message: string;
    conversationHistory?: Array<{ 
        role: typeof GEMINI_API_CONSTANTS.ROLES.USER | 
              typeof GEMINI_API_CONSTANTS.ROLES.ASSISTANT | 
              typeof GEMINI_API_CONSTANTS.ROLES.SYSTEM;
        content: string;
    }>;
};

// Response type from postChatMessage function
export type PostChatMessageResponse = {
    [RESPONSE_KEYS.RESPONSE]: string;
    [RESPONSE_KEYS.SUCCESS]: boolean;
    [RESPONSE_KEYS.ERROR]?: string;
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