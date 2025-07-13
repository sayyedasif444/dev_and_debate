import { getAllJobs, removeJobFromFirestore } from '@/lib/blog-job-manager';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed.' });
  }

  try {
    const jobs = await getAllJobs();
    const initialCount = jobs.length;
    
    // Remove completed and failed jobs
    const currentTime = new Date();
    let removedCount = 0;
    
    for (const job of jobs) {
      const jobTime = new Date(job.updatedAt || job.createdAt);
      const hoursSinceUpdate = (currentTime - jobTime) / (1000 * 60 * 60);
      
      // Remove jobs that are:
      // 1. Completed/failed and more than 1 hour old
      if ((job.status === 'completed' || job.status === 'failed') && hoursSinceUpdate >= 1) {
        await removeJobFromFirestore(job.trackingId);
        removedCount++;
      }
    }
    
    const finalCount = initialCount - removedCount;
    
    return res.status(200).json({
      success: true,
      message: `Cleanup completed`,
      removed: removedCount,
      remaining: finalCount,
      total: initialCount
    });

  } catch (error) {
    console.error('❌ Cleanup failed:', error);
    return res.status(500).json({ 
      error: 'Cleanup failed',
      details: error.message 
    });
  }
} 