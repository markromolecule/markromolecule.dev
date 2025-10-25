// TODO: Post Function to send chat message to Gemini API
import { GEMINI_API_CONFIG, SYSTEM_PROMPT } from "@/lib/gemini-config";

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

export async function postChatMessage(args: PostChatMessageData): Promise<PostChatMessageResponse> {
    const { message, conversationHistory = [] } = args;
    
    // Check if running in development mode
    const isDevelopment = import.meta.env.DEV;
    if (isDevelopment) { 
        // Development: Call Gemini API directly from browser
        return await callGeminiDirectly({ message, conversationHistory });
    }
    
    // Production: Use secure serverless API endpoint
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message,
            conversationHistory,
        }),
    });

    // Handle non-OK responses
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
}

async function callGeminiDirectly(args: PostChatMessageData): Promise<PostChatMessageResponse> {
    const { message, conversationHistory = [] } = args;
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // Ensure API key is available
    if (!apiKey) {
        throw new Error('VITE_GEMINI_API_KEY not configured for development. Please add it to your .env file.');
    }

    // Prepare conversation context
    const conversationContext = [
        { role: 'system', parts: [{ text: SYSTEM_PROMPT }] }, 
        ...conversationHistory.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }],
        })),
        { role: 'user', parts: [{ text: message }] },
    ];

    // Map conversation context to API request format
    const contents = conversationContext.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: msg.parts,
    }));

    // Make request to Gemini API
    const response = await fetch(`${GEMINI_API_CONFIG.baseUrl}?key=${apiKey}`, {
        method: 'POST',
        headers: GEMINI_API_CONFIG.header,
        body: JSON.stringify({ contents }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    // Parse response from Gemini API
    const data = await response.json();
    const apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!apiResponse) {
        throw new Error('No response from Gemini API'); 
    }

    return {
        response: apiResponse,
        success: true,
    };
}