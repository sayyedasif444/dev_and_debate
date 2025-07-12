import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

// Assuming OpenAI is already configured in the project
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a professional blog writer. Write engaging, well-researched blog posts that are informative and easy to read. Include a catchy title."
        },
        {
          role: "user",
          content: `Write a blog post about: ${topic}. Format the response as JSON with 'title' and 'content' fields. The content should be in HTML format with appropriate tags (p, h2, ul, etc.).`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response);
    } catch (e) {
      console.error('Failed to parse OpenAI response:', e);
      throw new Error('Invalid response format from OpenAI');
    }

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error('Error generating blog:', error);
    return NextResponse.json(
      { error: 'Failed to generate blog post' },
      { status: 500 }
    );
  }
} 