import { HfInference } from '@huggingface/inference';
import { NextRequest, NextResponse } from 'next/server';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request JSON body
    const { message } = await request.json();

    // Use the textGeneration method for response
    const response = await hf.textGeneration({
      model: 'facebook/blenderbot-400M-distill',
      inputs: message,
    });

    // Send the generated response back as JSON
    return NextResponse.json({
      response: response.generated_text
    });
  } catch (error) {
    // Log and handle errors gracefully
    console.error('Hugging Face API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' }, 
      { status: 500 }
    );
  }
}
