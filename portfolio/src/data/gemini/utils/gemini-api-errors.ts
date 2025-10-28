// ----------------------------
// Error Handling Utilities
// ----------------------------
import {type GeminiApiErrorData } from "../types/gemini-chat-types";
import { GEMINI_API_CONSTANTS } from "@/data/constants/gemini-api-constants";

// Creates standardized error messages for Gemini API failures
export function createGeminiApiError(
  status: number,
  errorMessage: string
): Error {
  if (status === 401) {
    return new Error(GEMINI_API_CONSTANTS.ERRORS.UNAUTHORIZED);
  }
  if (status === 403) {
    return new Error(GEMINI_API_CONSTANTS.ERRORS.FORBIDDEN);
  }
  if (status === 429) {
    return new Error(GEMINI_API_CONSTANTS.ERRORS.RATE_LIMIT);
  }
  if (status >= 500) {
    return new Error(
      GEMINI_API_CONSTANTS.ERRORS.SERVER_ERROR
    );
  }
  const message = errorMessage;
  return new Error(`Gemini API Error (Status ${status}): ${message}`);
}

// Handles Gemini API response errors
export function handleGeminiApiResponse(response: Response, errorData?: GeminiApiErrorData): void {
    if (!response.ok) 
    {
        const errorMessage = errorData?.error?.message || response.statusText;
        throw createGeminiApiError(response.status, errorMessage);
    }
}

// Creates error for missing API configuration
export function createConfigurationError(message: string): Error {
    return new Error(`${GEMINI_API_CONSTANTS.ERRORS.CONFIGURATION_ERROR}: ${message}`);
}

// Creates error for invalid API response
export function createInvalidResponseError(message: string): Error {
    return new Error(`${GEMINI_API_CONSTANTS.ERRORS.INVALID_RESPONSE}: ${message}`);
}