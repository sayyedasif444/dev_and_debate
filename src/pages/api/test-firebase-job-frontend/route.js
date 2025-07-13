import { createJob, getJobStatus, getAllJobs } from '@/lib/blog-job-manager';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET method is allowed.' });
  }

  try {
    // Test 1: Create a test job
    const testJob = {
      trackingId: `test_frontend_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      topic: 'Test Frontend Job',
      settings: { tone: 'professional', length: 'medium' },
      status: 'init',
      message: 'Test job created from frontend',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      progress: 0,
      title: null,
      content: null,
      images: null,
      rating: null
    };

    const createSuccess = await createJob(testJob);
    
    if (!createSuccess) {
      return res.status(500).json({
        error: 'Failed to create test job',
        step: 'create'
      });
    }

    // Test 2: Get the specific job
    const retrievedJob = await getJobStatus(testJob.trackingId);
    
    if (retrievedJob.error) {
      return res.status(500).json({
        error: 'Failed to retrieve test job',
        step: 'retrieve',
        details: retrievedJob.error
      });
    }

    // Test 3: Get all jobs
    const allJobs = await getAllJobs();
    
    return res.status(200).json({
      success: true,
      message: 'Firebase job operations working correctly',
      createdJob: testJob,
      retrievedJob: retrievedJob,
      totalJobs: allJobs.length,
      allJobs: allJobs.slice(0, 5) // Return first 5 jobs for debugging
    });

  } catch (error) {
    console.error('Firebase job test error:', error);
    return res.status(500).json({
      error: 'Firebase job test failed',
      details: error.message,
      stack: error.stack
    });
  }
} 