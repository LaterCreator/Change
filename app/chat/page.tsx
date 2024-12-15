'use client';

import { useState } from 'react';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) return; // Avoid sending empty messages
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response || 'No response');
    } catch (error) {
      console.error('Submission error:', error);
      setResponse('Failed to get response');
    }

    setMessage(''); // Clear input field after submission
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent newline
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Questions? I have answers!</h1>

        <form 
          onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} 
          className="space-y-4"
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your message"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition-colors duration-300 ${
              loading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {response && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-bold text-gray-700 mb-2">Response:</h2>
            <p className="text-gray-600">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
