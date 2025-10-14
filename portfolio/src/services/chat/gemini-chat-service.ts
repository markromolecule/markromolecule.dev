export type GeminiChatServiceArgs = {
  message: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
};

export type GeminiChatServiceResult = {
  response: string;
  success: boolean;
  error?: string;
};

export async function geminiChatService({
  message,
  conversationHistory = [],
}: {
  message: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}): Promise<GeminiChatServiceResult> {
  try {
    // Call our secure serverless API endpoint instead of Gemini directly
    // This keeps the API key secret on the server
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationHistory,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API error: ${response.status} - ${errorData.error || response.statusText}`);
    }

    const data = await response.json();

    if (!data.response) {
      throw new Error('No response from API');
    }

    return {
      response: data.response,
      success: true,
    };
  } catch (error) {
    console.error('Chat Service Error:', error);
    return {
      response: "I'm having trouble connecting right now. Please try again later.",
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
