import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse the request to get the message sent by the client
    const { message } = await req.json();

    // Validate the message content
    if (!message || message.trim() === '') {
      return NextResponse.json({ reply: 'Please provide a valid message.' });
    }

    // Call Claude's API endpoint
    const response = await axios.post(
      'https://api.anthropic.com/v1/completions',  // Claude's completions endpoint
      {
        prompt: message,  // The prompt text sent from the user
        model: 'claude-1', // You may need to adjust the model based on what's available in your plan
        max_tokens: 150,   // Adjust this based on how long you want the reply to be
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLAUDE_API_KEY}`, // API Key from .env.local
          'Content-Type': 'application/json',
        },
      }
    );

    // Check if the API returns valid data
    if (response.data && response.data.choices && response.data.choices.length > 0) {
      // Extract the response text from Claude's API
      const reply = response.data.choices[0].text;
      return NextResponse.json({ reply });
    } else {
      // Log the error if no choices are found
      console.error('Error: No valid response choices found.');
      return NextResponse.json({
        reply: 'No valid response from the API. Please try again later.',
      });
    }
    
  } catch (error) {
    // Log any errors from the request or processing
    console.error('Error with Claude API request:', error);
    return NextResponse.json({
      reply: 'Error processing your request. Please try again later.',
    });
  }
}
