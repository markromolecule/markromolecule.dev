import { GEMINI_API_CONFIG } from "@/lib/gemini-config";
import { type PostChatMessageData, type PostChatMessageResponse } from "./types/gemini-chat-types";
import { handleGeminiApiResponse } from "./utils/gemini-api-errors";
import { transformConversationToGeminiFormat, extractGeminiResponse, validateDevelopmentConfig, } from "./utils/gemini-data-utils";
import { GEMINI_API_CONSTANTS, GEMINI_ENV_CONSTANTS, GEMINI_HEADER, RESPONSE_KEYS } from "@/data/constants/gemini-api-constants";

// Destructure constants for easier access
const { DEFAULTS, HTTP_METHODS } = GEMINI_API_CONSTANTS;
const { CHAT_ENDPOINT } = GEMINI_ENV_CONSTANTS;
const { RESPONSE, SUCCESS, ERROR } = RESPONSE_KEYS;

// Sends a chat message to the Gemini API and returns the response
export async function postChatMessage( args: PostChatMessageData ): Promise<PostChatMessageResponse> {
  const isDevelopment = import.meta.env.DEV;
  if (isDevelopment) {
    return await callGeminiDirectly(args);
  }
  return await callGeminiViaServerlessAPI(args);
}

// Calls Gemini API via a serverless function
async function callGeminiViaServerlessAPI( args: PostChatMessageData ): Promise<PostChatMessageResponse> {
  const { message, conversationHistory } = args;
  // Make request to serverless API endpoint
  const response = await fetch(CHAT_ENDPOINT, {
    method: HTTP_METHODS.POST,
    headers: GEMINI_HEADER,
    body: JSON.stringify({
      message,
      conversationHistory,
    }),
  });

  // Use standardized error handling
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    handleGeminiApiResponse(response, errorData);
  }

  const data = await response.json();
  return {
    response: data[RESPONSE] || [DEFAULTS.EMPTY_RESPONSE],
    success: data[SUCCESS] ?? [DEFAULTS.SUCCESS],
    error: data[ERROR],
  };
}

async function callGeminiDirectly( args: PostChatMessageData ): Promise<PostChatMessageResponse> {
  // Validate configuration
  const apiKey = validateDevelopmentConfig();
  // Transform data using utility
  const contents = transformConversationToGeminiFormat(args); // Array of message objects (Body)
  // Make API request
  const response = await fetch(`${GEMINI_API_CONFIG.baseUrl}?key=${apiKey}`, {
    method: HTTP_METHODS.POST,
    headers: GEMINI_API_CONFIG.header,
    body: JSON.stringify({ [RESPONSE_KEYS.CONTENTS]: contents }),
  });
  // Handle errors using standardized utility
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    handleGeminiApiResponse(response, errorData);
  }
  // Parse and validate response
  const data = await response.json();
  const apiResponse = extractGeminiResponse(data);
  return {
    response: apiResponse,
    success: DEFAULTS.SUCCESS,
  };
}
