// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});
const config = {
  responseMimeType: 'text/plain',
};
const model = 'gemini-1.5-flash';

export const chatSession = {
  sendMessage: async (prompt: string) => {
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];
    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });
    return response;
  },
};
