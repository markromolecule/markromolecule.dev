import { SYSTEM_PROMPT } from "@/lib/gemini-config";
import { type PostChatMessageData, type GeminiApiResponse } from "../types/gemini-chat-types";
import { GEMINI_API_CONSTANTS, GEMINI_ENV_CONSTANTS } from "@/data/constants/gemini-api-constants";

// Utilities for Gemini data processing
export function transformConversationToGeminiFormat(args: PostChatMessageData) {
  const { message, conversationHistory = [] } = args;

  const conversationContext = [
    {
      role: GEMINI_API_CONSTANTS.ROLES.SYSTEM,
      parts: [{ text: SYSTEM_PROMPT }],
    },
    ...conversationHistory.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    })),
    {
      role: GEMINI_API_CONSTANTS.ROLES.USER,
      parts: [{ text: message }],
    },
  ];

  return conversationContext.map((msg) => ({
    role: msg.role === 
      GEMINI_API_CONSTANTS.ROLES.ASSISTANT ? 
      GEMINI_API_CONSTANTS.ROLES.MODEL : 
      GEMINI_API_CONSTANTS.ROLES.USER,
    parts: msg.parts,
  }));
}

// Extracts relevant data from Gemini API response
export function extractGeminiResponse(data: GeminiApiResponse): string{
    const apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if(!apiResponse) {
        throw new Error(GEMINI_API_CONSTANTS.ERRORS.INVALID_RESPONSE_ERROR);
    }

    return apiResponse;
}

// Validates development environment configuration for Gemini API usage
export function validateDevelopmentConfig(): string {
    const apiKey = import.meta.env[GEMINI_ENV_CONSTANTS.DEVELOPMENT_API_KEY_VAR];

    if(!apiKey) {
        throw new Error(GEMINI_API_CONSTANTS.ERRORS.MISSING_API_KEY);
    }

    return apiKey;
}