import { getTrendingTopicFromIdea } from '@/lib/agents/getTrendingTopic';
import { writeBlogSections } from '@/lib/agents/writeBlogSections'; // new HTML version
import { evaluateAndRateBlog } from '@/lib/agents/evaluateAndRateBlog';
import { rewriteBlogWithFeedback } from '@/lib/agents/rewriteBlog'; // new HTML rewrite version
import { generateSearchQuery } from '@/lib/agents/generateImageSearchQuery';
import { findRelevantImages } from '@/lib/agents/findRelevantImages';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed.' });
  }

  const { idea, tone } = req.body;

  if (!idea || !tone) {
    return res.status(400).json({ error: 'Missing idea or tone.' });
  }

  try {
    // Step 1: Get trending topic based on the idea
    const title = await getTrendingTopicFromIdea(idea);

    // Step 2: Write the blog content in HTML format
    let blog = await writeBlogSections(title, tone);

    // Step 3: Evaluate the blog
    let rating = await evaluateAndRateBlog(blog.html, tone);

    // Step 4: Rewrite blog if score is low or word count is too short
    if (rating.score < 8 || blog.wordCount < 1000) {
      blog = await rewriteBlogWithFeedback(blog, rating.review, tone, title);

      // Re-evaluate
      rating = await evaluateAndRateBlog(blog.html, tone);
    }

    // Step 5: Generate image search query
    const searchQuery = await generateSearchQuery(title, blog.html);
    const images = await findRelevantImages(searchQuery);

    // Final response
    return res.status(200).json({
      title,
      html: blog.html,
      wordCount: blog.wordCount,
      images,
      rating,
    });

  } catch (error) {
    return res.status(500).json({ error: 'Failed to generate blog.' });
  }
}
