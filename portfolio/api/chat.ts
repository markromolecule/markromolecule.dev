import type { VercelRequest, VercelResponse } from '@vercel/node';

type ConversationMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type RequestBody = {
  message: string;
  conversationHistory?: ConversationMessage[];
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory = [] } = req.body as RequestBody;

    // Validate request
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get API key from environment (server-side only, not exposed to browser)
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('GEMINI_API_KEY not configured');
      return res.status(500).json({ 
        error: 'Server configuration error. Please contact the administrator.' 
      });
    }

    // System prompt for the AI assistant
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

    // Build the conversation context
    const conversationContext = [
      { role: 'user', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    // Convert to the format expected by Gemini API
    const contents = conversationContext.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Call Gemini API from the server
    const geminiResponse = await fetch(
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

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json().catch(() => ({}));
      console.error('Gemini API error:', geminiResponse.status, errorData);
      return res.status(geminiResponse.status).json({ 
        error: `AI service error: ${errorData.error?.message || geminiResponse.statusText}` 
      });
    }

    const data = await geminiResponse.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      console.error('No response from Gemini API');
      return res.status(500).json({ error: 'No response from AI service' });
    }

    // Return successful response
    return res.status(200).json({
      response: aiResponse,
      success: true,
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return res.status(500).json({
      response: "I'm having trouble connecting right now. Please try again later.",
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

