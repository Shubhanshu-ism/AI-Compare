import React, { useContext, useRef, useEffect } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    geminiLoading,
    deepseekLoading,
    input,
    geminiData,
    deepseekData,
    setInput,
  } = useContext(Context);

  const inputRef = useRef(null);
  const geminiRef = useRef(null);
  const deepseekRef = useRef(null);

  // Function to handle sending with immediate input clearing
  const handleSend = () => {
    if (input.trim() && !geminiLoading && !deepseekLoading) {
      const currentInput = input;
      setInput(""); // Clear input immediately
      onSent(currentInput); // Send the stored input value
    }
  };

  // Auto-resize textarea based on content
  const handleInputChange = (e) => {
    setInput(e.target.value);

    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(
        inputRef.current.scrollHeight,
        200
      )}px`;
    }
  };

  useEffect(() => {
    if (!geminiLoading && !deepseekLoading && inputRef.current) {
      inputRef.current.focus();
      // Reset height when clearing input
      if (!input) {
        inputRef.current.style.height = "auto";
      }
    }
  }, [geminiLoading, deepseekLoading, input]);

  useEffect(() => {
    if (geminiRef.current) {
      geminiRef.current.scrollTop = geminiRef.current.scrollHeight;
    }
    if (deepseekRef.current) {
      deepseekRef.current.scrollTop = deepseekRef.current.scrollHeight;
    }
  }, [geminiData, deepseekData, geminiLoading, deepseekLoading]);

  return (
    <div className="main">
      <div className="nav">
        <p>AI Compare</p>
        <img src={assets.user_icon} alt="user" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, User</span>
              </p>
              <p>Compare AI models side-by-side</p>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="user" />
              <div className="user-prompt">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {recentPrompt}
                </ReactMarkdown>
              </div>
            </div>

            <div className="model-comparison">
              {/* Gemini Column */}
              <div className="model-column">
                <div className="model-header">
                  <img src={assets.gemini_icon} alt="gemini" />
                  <span>Gemini</span>
                  {geminiLoading && <div className="pulse-dot"></div>}
                </div>
                <div className="model-data" ref={geminiRef}>
                  {geminiLoading && geminiData === "" ? (
                    <div className="stream-loader">
                      <div className="dot-flashing"></div>
                    </div>
                  ) : (
                    <div className="markdown-response">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {geminiData}
                      </ReactMarkdown>
                      {geminiLoading && (
                        <span className="typing-cursor">|</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="model-column">
                <div className="model-header">
                  <img src={assets.deepseek_icon} alt="deepseek" />
                  <span>DeepSeek</span>
                  {deepseekLoading && <div className="pulse-dot"></div>}
                </div>
                <div className="model-data" ref={deepseekRef}>
                  {deepseekLoading && deepseekData === "" ? (
                    <div className="stream-loader">
                      <div className="dot-flashing"></div>
                    </div>
                  ) : (
                    <div className="markdown-response">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {deepseekData}
                      </ReactMarkdown>
                      {deepseekLoading && (
                        <span className="typing-cursor">|</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <textarea
              ref={inputRef}
              onChange={handleInputChange}
              value={input}
              placeholder="Enter a prompt to compare AI models. Press Cmd/Ctrl + Enter to send message"
              disabled={geminiLoading || deepseekLoading}
              rows={1}
              onKeyDown={(e) => {
                // Trigger on Command+Enter (Mac) or Control+Enter (Windows/Linux)
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault(); // Prevent default Enter behavior
                  handleSend();
                }
                // Allow normal Enter for new lines
              }}
            />
            <div>
              {/* <img src={assets.gallery_icon} alt="gallery" />
              <img src={assets.mic_icon} alt="mic" /> */}
              {input.trim() && !geminiLoading && !deepseekLoading && (
                <img onClick={handleSend} src={assets.send_icon} alt="send" />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Responses may contain inaccuracies. Always verify critical
            information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
