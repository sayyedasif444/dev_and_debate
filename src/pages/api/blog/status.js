import { getJobStatus, getAllJobs } from '@/lib/blog-job-manager';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET method is allowed.' });
  }

  const { trackingId } = req.query;

  try {
    if (trackingId) {
      // Get specific job status
      const job = await getJobStatus(trackingId);
      
      if (job.error) {
        return res.status(404).json({ error: job.error });
      }

      return res.status(200).json({
        success: true,
        job
      });
    } else {
      // Get all jobs
      const jobs = await getAllJobs();
      
      return res.status(200).json({
        success: true,
        jobs,
        total: jobs.length
      });
    }

  } catch (error) {
    console.error('❌ Failed to get job status:', error);
    return res.status(500).json({ 
      error: 'Failed to get job status.',
      details: error.message 
    });
  }
} 