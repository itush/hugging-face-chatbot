import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Set the model name here:
    const modelName = 'google/gemma-2-2b-it';

    // Hugging Face Inference API URL:
    const apiUrl = `https://api-inference.huggingface.co/models/${modelName}`;

    // Make a POST request to Hugging Face API:
    const response = await axios.post(
      apiUrl,
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // The response is usually an array of generated texts
    const generatedText = Array.isArray(response.data) && response.data.length > 0
      ? response.data[0].generated_text
      : 'No response from model';

    console.log("Hugging Face response:", generatedText);

    return NextResponse.json({ reply: generatedText });

  } catch (error) {
    console.error("Error fetching response from Hugging Face:", error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
