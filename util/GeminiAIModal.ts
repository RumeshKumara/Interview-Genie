import { GoogleGenAI } from "@google/genai"; // Fixed incorrect import

// Initialize GoogleGenAI instance
const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

// Define and export chatSession
export const chatSession = {
  sendMessage: async (prompt: string) => {
    const config = {
      thinkingConfig: {
        thinkingBudget: 0,
      },
      responseMimeType: "text/plain",
    };
    const model = "gemini-1.5-flash";
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];

    try {
      const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
      });

      let responseText = "";
      for await (const chunk of response) {
        responseText += chunk.text;
      }

      return { response: { text: () => responseText } };
    } catch (error) {
      console.error("Error generating content:", error);
      throw new Error("Failed to fetch AI response");
    }
  },
};