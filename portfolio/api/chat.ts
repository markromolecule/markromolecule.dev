import { GoogleGenAI } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get API key from server-side environment
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'Gemini API key not configured on server' 
      });
    }

    // Initialize Google Generative AI client
    const ai = new GoogleGenAI({
      apiKey: apiKey,
    });

    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
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

    // Build the conversation context
    const conversationContext = [
      { role: 'user', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    // Convert to the format expected by the SDK
    const contents = conversationContext.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    if (!response.text) {
      throw new Error('No response from Gemini API');
    }

    return res.status(200).json({
      response: response.text,
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
