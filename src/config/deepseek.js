// runDeepSeek.js
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default async function runDeepSeek(history, newPrompt, callback) {
  try {
    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free", 
      messages: [...history, { role: "user", content: newPrompt }],
      stream: true,
    });

    let fullResponse = "";

    for await (const chunk of response) {
      const chunkText = chunk.choices?.[0]?.delta?.content || "";
      fullResponse += chunkText;
      if (callback) callback(chunkText);
    }

    return fullResponse;
  } catch (error) {
    error.source = "deepseek";
    throw error;
  }
}
