// runDeepSeek.js
import OpenAI from "openai";

// WARNING: Exposing API keys in the browser is NOT safe for production!
// For demos or local development only.
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
});

/**
 * Streams a DeepSeek AI response via OpenRouter.
 * @param {Array} history - Array of previous chat messages (role/content).
 * @param {string} newPrompt - The user's new prompt.
 * @param {function} callback - Called with each streamed chunk of text.
 * @returns {Promise<string>} - Resolves to the full response.
 */
export default async function runDeepSeek(history, newPrompt, callback) {
  try {
    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free", // Correct model ID for DeepSeek on OpenRouter
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
