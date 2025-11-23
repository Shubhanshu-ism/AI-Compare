import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);

async function runGemini(history, newPrompt, callback) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { maxOutputTokens: 4000 },
    });

    const chat = model.startChat({
      history: history.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: msg.parts,
      })),
    });
    const modifiedPrompt = `Answer "${newPrompt}" in a concise, friendly way. Use relatable analogies or examples when they make things clearer. Keep it conversational, helpful, and light-hearted - no need for lengthy explanations unless absolutely necessary!`;

    const result = await chat.sendMessageStream(modifiedPrompt);
    let fullResponse = "";

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullResponse += chunkText;
      callback(chunkText);
    }

    return fullResponse;
  } catch (error) {
    error.source = "gemini";
    throw error;
  }
}

export default runGemini;
