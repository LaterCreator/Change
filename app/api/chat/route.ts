import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

// Initialize OpenAI (or your preferred AI service)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Define your sources here (you can expand this)
const SOURCES = [
  { 
    type: 'text', 
    content: 'Your company information goes here...' 
  },
  { 
    type: 'document', 
    path: '/path/to/your/document.txt' 
  }
];

export async function POST(req: NextRequest) {
  try {
    const { messages, sources = [] } = await req.json();

    // Combine static and dynamic sources
    const combinedSources = [...SOURCES, ...sources];

    // Prepare context from sources
    const sourceContext = combinedSources
      .map(source => 
        source.type === 'text' ? source.content : 
        source.type === 'document' ? `Document source: ${source.path}` : ''
      )
      .join('\n\n');

    // Prepare messages for AI
    const formattedMessages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: `You are a helpful assistant. Use the following sources as context for your responses:\n${sourceContext}`
      },
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    // Call OpenAI (or your preferred AI service)
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: formattedMessages,
      max_tokens: 300
    });

    const aiMessage = response.choices[0].message.content || 'No response generated.';

    return NextResponse.json({ 
      message: aiMessage,
      sources: combinedSources 
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' }, 
      { status: 500 }
    );
  }
}