import fs from 'fs';
import path from 'path';

// File-based storage for blog generation jobs
const JOBS_FILE = path.join(process.cwd(), 'data', 'blog-jobs.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.dirname(JOBS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Load jobs from file
const loadJobs = () => {
  ensureDataDir();
  if (!fs.existsSync(JOBS_FILE)) {
    return {};
  }
  try {
    const data = fs.readFileSync(JOBS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading jobs:', error);
    return {};
  }
};

// Save jobs to file
const saveJobs = (jobs) => {
  ensureDataDir();
  try {
    fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
  } catch (error) {
    console.error('Error saving jobs:', error);
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed.' });
  }

  try {
    const jobs = loadJobs();
    const initialCount = Object.keys(jobs).length;
    
    // Remove completed and failed jobs
    const currentTime = new Date();
    const jobsToKeep = {};
    
    for (const [trackingId, job] of Object.entries(jobs)) {
      const jobTime = new Date(job.updatedAt || job.createdAt);
      const hoursSinceUpdate = (currentTime - jobTime) / (1000 * 60 * 60);
      
      // Keep jobs that are:
      // 1. Still in progress (init, inprogress)
      // 2. Completed/failed but less than 1 hour old
      if (job.status === 'init' || job.status === 'inprogress' || hoursSinceUpdate < 1) {
        jobsToKeep[trackingId] = job;
      }
    }
    
    const finalCount = Object.keys(jobsToKeep).length;
    const removedCount = initialCount - finalCount;
    
    saveJobs(jobsToKeep);
    
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