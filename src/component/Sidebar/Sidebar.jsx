import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    await onSent(prompt);
  };

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="menu"
        />
        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon} alt="new chat" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(item)}
                className="recent-entry"
              >
                <img src={assets.message_icon} alt="message" />
                <p>
                  {item.slice(0, 25)}
                  {item.length > 25 ? "..." : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="help" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="history" />
          {extended && <p>History</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="settings" />
          {extended && <p>Settings</p>}
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
