import { writeBlogSections } from '@/lib/agents/writeBlogSections';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { title, tone } = req.body;
  if (!title || !tone) return res.status(400).json({ error: 'Missing title or tone' });

  const blog = await writeBlogSections(title, tone);

  if (!blog.html) return res.status(500).json({ error: 'Failed to generate blog' });

  return res.status(200).json(blog);
}
