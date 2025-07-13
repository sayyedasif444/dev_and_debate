import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateSearchQuery(topic, paragraph) {
  try {
    const prompt = `Given the blog topic "${topic}" and this paragraph: "${paragraph}", suggest a short search keyword (max 4 words) to find relevant blog images.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 20,
    });

    const searchQuery = response.choices[0].message.content.trim();
    
    if (!searchQuery) {
      throw new Error('Failed to generate image search query - received empty response');
    }
    
    return searchQuery;
  } catch (error) {
    console.error('❌ Image search query generation failed:', error);
    throw new Error(`Failed to generate image search query: ${error.message}`);
  }
}
