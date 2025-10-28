import { GEMINI_API_CONFIG } from "@/lib/gemini-config";
import { type PostChatMessageData, type PostChatMessageResponse, } from "./types/gemini-chat-types";
import { handleGeminiApiResponse } from "./utils/gemini-api-errors";
import { transformConversationToGeminiFormat, extractGeminiResponse, validateDevelopmentConfig } from "./utils/gemini-data-utils";

export async function postChatMessage(
  args: PostChatMessageData
): Promise<PostChatMessageResponse> {
    const isDevelopment = import.meta.env.DEV;
    
    if (isDevelopment) {
        return await callGeminiDirectly(args);
    } return await callGeminiViaServerlessAPI(args);
}

async function callGeminiViaServerlessAPI(
  args: PostChatMessageData
): Promise<PostChatMessageResponse> {
  const { message, conversationHistory } = args;

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
    response: data.response || "",
    success: data.success ?? true,
    error: data.error,
  };
}

async function callGeminiDirectly(
  args: PostChatMessageData
): Promise<PostChatMessageResponse> {
  // Validate configuration
  const apiKey = validateDevelopmentConfig();

  // Transform data using utility
  const contents = transformConversationToGeminiFormat(args);

  // Make API request
  const response = await fetch(`${GEMINI_API_CONFIG.baseUrl}?key=${apiKey}`, {
    method: "POST",
    headers: GEMINI_API_CONFIG.header,
    body: JSON.stringify({ contents }),
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
    success: true,
  };
}
