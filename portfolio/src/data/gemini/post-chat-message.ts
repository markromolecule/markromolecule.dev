import { GEMINI_API_CONFIG, SYSTEM_PROMPT } from "@/lib/gemini-config";

// TODO: Post chat message to Gemini
// Type definition for the request payload
export type PostChatMessageData = {
    message: string;
    conversationHistory?: Array<{ 
        role: 'user' | 'system' | 'assistant'; content: string 
    }>;
};

// Type definition for the response
export type PostChatMessageResponse = {
    response: string;
    success: boolean;
    error?: string;
};

// Function para sa pag post ng message sa Gemini API
export async function postChatMessage(args: PostChatMessageData): Promise<PostChatMessageResponse> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error('hindi defined yung api key');
    }

    /* 
    Build the conversation context 
    1. Start sa system prompt tapos
    2. Previous conversation history (kung meron)
    3. Current user message
    */
    const conversationContext = [
        { role: 'user', content: SYSTEM_PROMPT }, // Start
        ...(args.conversationHistory || []), // Previous history
        { role: 'user', content: args.message }, // Current message
    ];

    const contents = conversationContext.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
    }));

    const response = await fetch(`${GEMINI_API_CONFIG.baseUrl}?key=${apiKey}`, {
        method: 'POST',
        headers: GEMINI_API_CONFIG.header,
        body: JSON.stringify({ contents }),
    });

    // Make HTTP request to Gemini API
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`mali yung api token: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    const apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!apiResponse) {
        throw new Error('Walang response mula sa Gemini API'); 
    }

    return {
        response: apiResponse,
        success: true,
    };
    
}