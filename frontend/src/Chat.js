import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I assist you today?",
      sender: "bot",
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [gradientPosition, setGradientPosition] = useState(0);

  // Animate background gradient
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPosition((prev) => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      sender: "user",
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage("");

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: inputMessage,
      });

      const botResponse = {
        text: response.data.reply || "Sorry, I didn't understand that.",
        sender: "bot",
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Server error. Try again later.",
          sender: "bot",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }
  };

  return (
    <div
      className="chat-container"
      style={{
        background: `linear-gradient(${gradientPosition}deg, 
          #667eea 0%, 
          #764ba2 20%, 
          #6B73FF 40%, 
          #000DFF 60%, 
          #0087FF 80%, 
          #00BFFF 100%)`,
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
      }}
    >
      <div className="chat-glass">
        <div className="chat-header">
          <h2>Financial Assistant</h2>
          <div className="status-indicator">
            <span className="pulse"></span>
            Online
          </div>
        </div>

        <div className="chat-window">
          <div className="message-list">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}-message`}>
                <div className="message-content">
                  <p>{msg.text}</p>
                  <span className="message-time">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form className="message-input-area" onSubmit={sendMessage}>
          <input
            type="text"
            className="message-input"
            placeholder="Ask about financial markets..."
            value={inputMessage}
            onChange={handleMessageChange}
          />
          <button type="submit" className="send-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
