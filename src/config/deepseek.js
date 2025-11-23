import OpenAI from "openai";


const openai = new OpenAI({
 baseURL: "https://openrouter.ai/api/v1",
 apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
 dangerouslyAllowBrowser: true,
});


export default async function runDeepSeek(history, newPrompt, callback) {
 try {
   const modifiedPrompt = `Answer "${newPrompt}" in a concise, friendly way. Use relatable analogies or examples when they make things clearer. Keep it conversational, helpful, and light-hearted - no need for lengthy explanations unless absolutely necessary!`;


   const response = await openai.chat.completions.create({
     // UPDATED: Switched from ":free" to the standard V3 model to fix 429/Overload errors
     // You can also use "deepseek/deepseek-r1" if you specifically need the Reasoning model
     model: "deepseek/deepseek-chat",
     messages: [...history, { role: "user", content: modifiedPrompt }],
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
   console.error("DeepSeek API Error:", error); // Added logging for easier debugging
   error.source = "deepseek";
   throw error;
 }
}
