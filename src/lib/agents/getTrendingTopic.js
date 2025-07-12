// lib/agents/getTrendingTopic.js
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: false
});

/**
 * Convert a user idea into a trending blog topic.
 * @param {string} idea - e.g. "AI in education"
 * @returns {string} - e.g. "How AI is Reshaping Classrooms in 2025"
 */
export async function getTrendingTopicFromIdea(idea) {
  
  try {
    const prompt = `You're a blog title strategist. Given the raw idea: "${idea}", generate a catchy and trending blog title that feels fresh and aligns with current online trends. Do not use hashtags or dates unless needed.`;
    
    

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      temperature: 0.8,
      max_tokens: 60,
    });

    
    const title = completion.choices[0].message.content.trim();
    
    
    return title;
  } catch (error) {
    console.error('💥 Error in getTrendingTopicFromIdea:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    if (error.response) {
      console.error('OpenAI API response error:', error.response.data);
    }
    
    return null;
  }
}
