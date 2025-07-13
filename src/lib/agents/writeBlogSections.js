import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: false,
});

/**
 * Generates a detailed blog post in HTML format with 1000–2000 words.
 * @param {string} title
 * @param {string} tone
 * @returns {object} { html, wordCount }
 */
export async function writeBlogSections(title, tone) {
  try {
    const systemPrompt = `You are an expert tech blogger. 
Write long-form, structured HTML blog content with the following:

- Length: At least 1000 words, ideally around 1500–2000 words
- Tone: ${tone}
- HTML format: <h2>, <p>, <ul>, <strong>, etc.
- No <html> or <body> tags, just the content
- Use storytelling, analogies, examples to enrich the content

Structure the content like:
<h2>Introduction</h2>
<p>150-250 word engaging intro</p>

<h2>Main Body</h2>
<p>Several rich paragraphs, including examples and detailed subtopics</p>
<ul><li>Use bullet lists if needed</li></ul>

<h2>Conclusion</h2>
<p>Summarize and offer a call to action or reflection</p>
You must:
- Use <h2>, <p>, <ul>, <strong>, etc.
- Structure the blog with <h2>Introduction</h2>, <h2>Main Body</h2>, <h2>Conclusion</h2>
- Follow the tone: ${tone}
- Add examples, storytelling, improved structure and transitions
- Minimum length: 1000 words
- Ideal length: 1500–2000 words
- Output must NOT include <html> or <body> tags — only the content
- do not use words like main body, introduction, conclusion, etc. instead use the meaningful and creative titles for it with proper html tags and style. Make sure to add br after each section.
`;

    const userPrompt = `Write a full-length blog post on the topic: "${title}".`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      temperature: 0.7,
      max_tokens: 4096, // Allow max length possible
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });

    const html = response.choices[0].message.content.trim();
    
    if (!html) {
      throw new Error('Failed to generate blog content - received empty response');
    }
    
    const wordCount = estimateWordCount(html);
    if (wordCount < 100) {
      throw new Error(`Generated blog content is too short (${wordCount} words) - expected at least 1000 words`);
    }
    
    return {
      html,
      wordCount,
    };
  } catch (error) {
    console.error('Blog generation failed:', error);
    // Throw the error instead of returning empty content
    throw new Error(`Failed to write blog sections: ${error.message}`);
  }
}

function estimateWordCount(html) {
  const text = html.replace(/<[^>]*>/g, ''); // strip tags
  return text.trim().split(/\s+/).length;
}
