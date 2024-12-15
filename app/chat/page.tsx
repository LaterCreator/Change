'use client';

import React, { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message: string) => {
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: message }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setMessages((prevMessages) => [...prevMessages, { sender: 'claude', text: data.reply }]);
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { sender: 'claude', text: 'Sorry, something went wrong.' }]);
    } finally {
      setUserInput('');
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      sendMessage(userInput);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-4xl font-bold">Chat with Claude</h1>

      <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <div
              className={`inline-block p-2 rounded-md ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-center text-gray-500">Claude is thinking...</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="flex-1 p-2 border rounded-md"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          disabled={loading}
          className="p-2 bg-blue-500 text-white rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  );
}
