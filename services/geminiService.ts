import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are the AI assistant for UnitSync, a hospital operations software platform.
Your goal is to answer potential client questions clearly and professionally, encouraging them to book a demo.

Key Information about UnitSync:
- It is a "Control Tower" for mid-sized public hospitals.
- It moves operations from reactive to predictive.
- It integrates with existing EHR/ERP systems (does not replace them).
- Key features: Patient Flow Prediction, Staffing by Competency, Admin Automation.
- Target Audience: Hospital Administrators, Department Heads.
- Tone: Professional, trustworthy, innovative, concise.

If asked about pricing, mention it is optimized for public sector budgets and suggest booking a demo for a quote.
If asked about technical details, emphasize security (HIPAA/GDPR) and ease of integration.
`;

export const sendMessageToGemini = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API Key not found");
      return "I'm currently running in demo mode without a live brain. Please configure the API Key to chat with me!";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Convert history to format expected by Chat (although we are doing single turns here for simplicity in this stateless service, 
    // strictly keeping a chat session is better).
    // Let's use a fresh chat session for each request to ensure simple state management in the UI component,
    // but pass the context manually if needed. For this simple widget, a single generation is often enough, 
    // but we will use the chat model.
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    // In a real app, we would maintain the chat history object properly.
    // Here we just send the new message.
    const result = await chat.sendMessage({ message });
    return result.text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I'm having trouble connecting to the server right now. Please try again later.";
  }
};