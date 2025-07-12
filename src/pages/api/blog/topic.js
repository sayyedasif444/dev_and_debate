// pages/api/blog/topic.js
import { getTrendingTopicFromIdea } from '@/lib/agents/getTrendingTopic';

export default async function handler(req, res) {


  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { idea } = req.body;

  if (!idea) {
    return res.status(400).json({ error: 'Missing idea' });
  }

  try {
    const topic = await getTrendingTopicFromIdea(idea);

    if (!topic) {
      return res.status(500).json({ error: 'Failed to generate topic' });
    }

    return res.status(200).json({ topic });
  } catch (error) {
    return res.status(500).json({ 
      error: 'Failed to generate topic',
      details: error.message,
      stack: error.stack
    });
  }
}
