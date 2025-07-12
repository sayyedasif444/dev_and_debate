import { findRelevantImages } from '@/lib/agents/findRelevantImages';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Missing title' });

  const images = await findRelevantImages(title);

  if (!images.length) return res.status(500).json({ error: 'No images found' });

  return res.status(200).json({ images });
}
