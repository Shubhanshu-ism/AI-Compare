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

  useEffect(() => {
    if (!geminiLoading && !deepseekLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [geminiLoading, deepseekLoading]);

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
              <p>{recentPrompt}</p>
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
                  {geminiLoading ? (
                    <div className="stream-loader">
                      <div className="dot-flashing"></div>
                    </div>
                  ) : (
                    <div className="markdown-response">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {geminiData}
                      </ReactMarkdown>
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
                  {deepseekLoading ? (
                    <div className="stream-loader">
                      <div className="dot-flashing"></div>
                    </div>
                  ) : (
                    <div className="markdown-response">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {deepseekData}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              ref={inputRef}
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt to compare AI models. Press Cmd/Ctrl + Enter to send message"
              disabled={geminiLoading || deepseekLoading}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  input.trim() &&
                  !geminiLoading &&
                  !deepseekLoading
                ) {
                  onSent();
                }
              }}
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery" />
              <img src={assets.mic_icon} alt="mic" />
              {input.trim() && !geminiLoading && !deepseekLoading && (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  alt="send"
                />
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
