"use client";

import { useState } from 'react';

const ChatComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  // Handle sending the message to the backend API
  const handleSendMessage = async () => {
    if (!userInput) return;

    setChatHistory([...chatHistory, `You: ${userInput}`]);  // Display user's message

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: userInput }),
    });

    const data = await response.json();

    if (data.result) {
      setChatHistory((prev) => [...prev, `AI: ${data.result[0]}`]);  // Display AI's response
    } else {
      setChatHistory((prev) => [...prev, "AI: Sorry, I couldn't get an answer."]);
    }
    setUserInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask me anything!"
        className="chat-input"
      />
      <button onClick={handleSendMessage} className="send-btn">
        Send
      </button>
    </div>
  );
};

export default ChatComponent;
