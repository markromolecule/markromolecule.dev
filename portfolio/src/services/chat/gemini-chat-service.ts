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
    // In development, use direct API call. In production, use secure serverless function
    const isDevelopment = import.meta.env.DEV;

    if (isDevelopment) {
      // Development: Call Gemini API directly from browser
      return await callGeminiDirectly({ message, conversationHistory });
    } else {
      // Production: Use secure serverless API endpoint
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
    }
  } catch (error) {
    console.error('Chat Service Error:', error);
    return {
      response: "I'm having trouble connecting right now. Please try again later.",
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Helper function for development: calls Gemini API directly
async function callGeminiDirectly({
  message,
  conversationHistory,
}: {
  message: string;
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
}): Promise<GeminiChatServiceResult> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY not configured for development. Please add it to your .env file.');
  }

  const systemPrompt = `You are Joseph's AI assistant for his portfolio website. Help visitors learn about Joseph's skills, projects, and experience as a developer. 

Key information about Joseph:
- Full-stack developer specializing in React, TypeScript, Node.js
- Certified in database management (Pearson IT Specialist)
- Experienced with modern web technologies and mobile development
- Passionate about building reliable and scalable applications
- Available for new opportunities and collaborations

Contact Information:
- Email: livadomc@gmail.com
- GitHub: https://github.com/markromolecule
- LinkedIn: https://www.linkedin.com/in/mark-joseph-livado-01945b331/
- Instagram: https://instagram.com/josephcstro_

When visitors ask about contacting Joseph or want to connect, provide the relevant contact information. Be helpful and encourage professional connections.

Response Guidelines:
- Be conversational and friendly
- Provide specific details when asked about skills or projects
- Always offer contact information when appropriate
- Keep responses concise but informative
- Use a professional yet approachable tone
- If asked about collaboration or job opportunities, be enthusiastic and provide contact details
- IMPORTANT: Do NOT use markdown formatting (no asterisks, bold, or other markdown syntax)
- Use plain text only - no **bold** or *italic* formatting
- Format contact information as simple lists without markdown

Keep responses helpful, professional, and focused on Joseph's work and expertise. If asked about topics not related to Joseph's portfolio, politely redirect the conversation back to his professional background.`;

  const conversationContext = [
    { role: 'user', content: systemPrompt },
    ...conversationHistory,
    { role: 'user', content: message }
  ];

  const contents = conversationContext.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!aiResponse) {
    throw new Error('No response from Gemini API');
  }

  return {
    response: aiResponse,
    success: true,
  };
}
