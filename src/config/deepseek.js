import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "<OPENROUTER_API_KEY>",
  defaultHeaders: {
    "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
  },
});
async function main() {
  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
    messages: [
      {
        role: "user",
        content: "What is the meaning of life?",
      },
    ],
  });

  console.log(completion.choices[0].message);
}

main();

export default async function runDeepSeek(history, newPrompt, callback) {
  try {
    // Replace with actual DeepSeek API call
    // This is a mock implementation for demonstration
    const response = await mockDeepSeekAPI(newPrompt);

    // Simulate streaming response
    for (let i = 0; i < response.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      callback(response[i]);
    }

    return response;
  } catch (error) {
    error.source = "deepseek";
    throw error;
  }
}

// Mock API response - replace with real API integration
async function mockDeepSeekAPI(prompt) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const responses = {
        "react vs angular": `### DeepSeek-R1 Analysis: React vs Angular
        
**Key Differences Summary:**

| Feature        | React                 | Angular               |
|----------------|-----------------------|-----------------------|
| **Type**       | Library              | Framework            |
| **Architecture**| Component-based      | Component-based      |
| **Language**   | JavaScript (JSX)     | TypeScript           |
| **Learning**   | Moderate             | Steeper curve        |
| **Data Flow**  | Unidirectional       | Bidirectional        |
| **DOM**        | Virtual DOM          | Real DOM             |
| **State Mgmt** | External libraries   | Built-in services    |

**DeepSeek Recommendations:**
1. Choose React for:
   - Flexible, lightweight solutions
   - Large ecosystem integrations
   - Progressive enhancement

2. Choose Angular for:
   - Enterprise-scale applications
   - Full-stack TypeScript projects
   - Built-in solutions (routing, forms, etc.)

**Performance Note:** React's virtual DOM typically outperforms Angular in update-heavy applications.`,
      };

      resolve(responses[prompt.toLowerCase()] || `DeepSeek-R1: ${prompt}`);
    }, 500);
  });
}
