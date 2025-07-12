import { evaluateAndRateBlog } from '@/lib/agents/evaluateAndRateBlog';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { para1, para2, para3, tone } = req.body;

  if (!para1 || !para2 || !para3 || !tone) {
    return res.status(400).json({ error: 'Missing paragraph(s) or tone' });
  }

  const blogText = [para1, para2, para3].join('\n\n');
  const rating = await evaluateAndRateBlog(blogText, tone);

  return res.status(200).json(rating);
}
