import axios from 'axios';

export async function POST(req: Request) {
  try {
    const body = await req.json();  // Parse the request body
    const userInput = body.input;   // Extract input text from the body

    const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

    if (!HUGGINGFACE_API_KEY) {
      return Response.json({ error: "API key is missing" }, { status: 500 });
    }

    // Set up the API request to Hugging Face
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/gpt2',  // Use a model of your choice
      { inputs: userInput },  // Input text to the model
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        },
      }
    );

    // Return the generated text from the model as the response
    return Response.json({ result: response.data });
  } catch (error) {
    console.error("Hugging Face API Error:", error);
    return Response.json({ error: "Failed to generate text" }, { status: 500 });
  }
}
