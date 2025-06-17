import { createContext, useState, useEffect } from "react";
import runGemini from "../config/gemini";
import runDeepSeek from "../config/deepseek";

export const Context = createContext();

const ContextProvider = (props) => {
  // Load from localStorage
  const [prevPrompts, setPrevPrompts] = useState(() => {
    const saved = localStorage.getItem("prevPrompts");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);

  // Gemini states
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [geminiData, setGeminiData] = useState("");

  // DeepSeek states
  const [deepseekLoading, setDeepseekLoading] = useState(false);
  const [deepseekData, setDeepseekData] = useState("");

  const [conversationHistory, setConversationHistory] = useState(() => {
    const saved = localStorage.getItem("conversationHistory");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("prevPrompts", JSON.stringify(prevPrompts));
    localStorage.setItem(
      "conversationHistory",
      JSON.stringify(conversationHistory)
    );
  }, [prevPrompts, conversationHistory]);

  const newChat = () => {
    setConversationHistory([]);
    setGeminiLoading(false);
    setDeepseekLoading(false);
    setShowResult(false);
    setGeminiData("");
    setDeepseekData("");
    setRecentPrompt("");
    setInput("");
  };

  // const onSent = async (prompt) => {
  //   const currentPrompt = prompt || input;
  //   if (!currentPrompt.trim()) return;

  //   // Reset states
  //   setGeminiData("");
  //   setDeepseekData("");
  //   setGeminiLoading(true);
  //   setDeepseekLoading(true);
  //   setShowResult(true);
  //   setRecentPrompt(currentPrompt);

  //   try {
  //     const newHistory = [...conversationHistory];

  //     // Add user message
  //     newHistory.push({
  //       role: "user",
  //       parts: [{ text: currentPrompt }],
  //     });

  //     // Run both models in parallel
  //     await Promise.all([
  //       runGemini(newHistory, currentPrompt, (token) =>
  //         setGeminiData((prev) => prev + token)
  //       ).then((fullResponse) => {
  //         newHistory.push({
  //           role: "model-gemini",
  //           parts: [{ text: fullResponse }],
  //         });
  //       }),

  //       runDeepSeek(newHistory, currentPrompt, (token) =>
  //         setDeepseekData((prev) => prev + token)
  //       ).then((fullResponse) => {
  //         newHistory.push({
  //           role: "model-deepseek",
  //           parts: [{ text: fullResponse }],
  //         });
  //       }),
  //     ]);

  //     setConversationHistory(newHistory);

  //     // Add to recent prompts
  //     if (!prompt) {
  //       setPrevPrompts((prev) => [...prev, currentPrompt]);
  //     }
  //   } catch (error) {
  //     console.error("API Error:", error);
  //     if (error.source === "gemini") {
  //       setGeminiData("⚠️ Gemini Error: " + error.message);
  //     } else {
  //       setDeepseekData("⚠️ DeepSeek Error: " + error.message);
  //     }
  //   } finally {
  //     setGeminiLoading(false);
  //     setDeepseekLoading(false);
  //     setInput("");
  //   }
  // };
  const onSent = async (prompt) => {
    const currentPrompt = prompt || input;
    if (!currentPrompt.trim()) return;

    // Reset states
    setGeminiData("");
    setDeepseekData("");
    setGeminiLoading(true);
    setDeepseekLoading(true);
    setShowResult(true);
    setRecentPrompt(currentPrompt);

    const newHistory = [...conversationHistory];
    newHistory.push({
      role: "user",
      parts: [{ text: currentPrompt }],
    });

    // Run models independently, not in Promise.all()
    runGemini(newHistory, currentPrompt, (token) =>
      setGeminiData((prev) => prev + token)
    )
      .then((fullResponse) => {
        setGeminiLoading(false);
        // Update history for Gemini when complete
      })
      .catch((error) => {
        setGeminiLoading(false);
        setGeminiData("⚠️ Gemini Error: " + error.message);
      });

    runDeepSeek(newHistory, currentPrompt, (token) =>
      setDeepseekData((prev) => prev + token)
    )
      .then((fullResponse) => {
        setDeepseekLoading(false);
        // Update history for DeepSeek when complete
      })
      .catch((error) => {
        setDeepseekLoading(false);
        setDeepseekData("⚠️ DeepSeek Error: " + error.message);
      });

    setInput("");
  };
  
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    recentPrompt,
    showResult,
    geminiLoading,
    deepseekLoading,
    input,
    geminiData,
    deepseekData,
    setInput,
    newChat,
    conversationHistory,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
