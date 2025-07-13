import { createJob } from '@/lib/blog-job-manager';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET method is allowed.' });
  }

  try {
    const testJob = {
      trackingId: `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      topic: 'Test Blog Post',
      settings: { tone: 'professional', length: 'medium' },
      status: 'init',
      message: 'Test job created',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      progress: 0,
      title: null,
      content: null,
      images: null,
      rating: null
    };

    const success = await createJob(testJob);
    
    if (success) {
      return res.status(200).json({
        success: true,
        message: 'Test job created successfully in Firebase',
        trackingId: testJob.trackingId,
        job: testJob
      });
    } else {
      return res.status(500).json({
        error: 'Failed to create test job'
      });
    }
  } catch (error) {
    console.error('Test job creation error:', error);
    return res.status(500).json({
      error: 'Test job creation failed',
      details: error.message
    });
  }
} 