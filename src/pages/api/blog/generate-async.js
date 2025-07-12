import { getTrendingTopicFromIdea } from '@/lib/agents/getTrendingTopic';
import { writeBlogSections } from '@/lib/agents/writeBlogSections';
import { evaluateAndRateBlog } from '@/lib/agents/evaluateAndRateBlog';
import { rewriteBlogWithFeedback } from '@/lib/agents/rewriteBlog';
import { generateSearchQuery } from '@/lib/agents/generateImageSearchQuery';
import { findRelevantImages } from '@/lib/agents/findRelevantImages';
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

  const { idea, tone } = req.body;

  if (!idea || !tone) {
    return res.status(400).json({ error: 'Missing idea or tone.' });
  }

  try {
    // Generate tracking ID
    const trackingId = `blog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Initialize job with status
    const initialJob = {
      trackingId,
      idea,
      tone,
      status: 'init',
      message: 'Initializing blog generation...',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      progress: 0,
      title: null,
      content: null,
      images: null,
      rating: null
    };

    // Store initial job in file
    const jobs = loadJobs();
    jobs[trackingId] = initialJob;
    saveJobs(jobs);

    console.log(`🚀 Created job ${trackingId} for idea: ${idea}`);

    // Start async processing (don't await)
    processBlogGeneration(trackingId, idea, tone);

    // Return tracking ID immediately
    return res.status(200).json({
      success: true,
      trackingId,
      message: 'Blog generation started',
      status: 'init'
    });

  } catch (error) {
    console.error('❌ Failed to create blog generation job:', error);
    return res.status(500).json({ 
      error: 'Failed to create blog generation job.',
      details: error.message 
    });
  }
}

// Async blog generation function
async function processBlogGeneration(trackingId, idea, tone) {
  try {
    // Update status to in-progress
    await updateJobStatus(trackingId, 'inprogress', 10, 'Starting blog generation process...');
    console.log(`🔄 Starting blog generation for ${trackingId}`);

    // Step 1: Get trending topic (20% progress)
    await updateJobStatus(trackingId, 'inprogress', 20, 'Generating trending topic and title...');
    const title = await getTrendingTopicFromIdea(idea);
    console.log(`🔍 Generated title: ${title}`);

    // Step 2: Write initial blog content (40% progress)
    await updateJobStatus(trackingId, 'inprogress', 40, 'Writing initial blog content...');
    let blog = await writeBlogSections(title, tone);
    console.log(`✍️ Initial blog written (${blog.wordCount} words)`);

    // Step 3: Evaluate blog (60% progress)
    await updateJobStatus(trackingId, 'inprogress', 60, 'Evaluating blog quality and content...');
    let rating = await evaluateAndRateBlog(blog.html, tone);
    console.log(`📝 Blog rating: ${rating.score}/10`);

    // Step 4: Rewrite if needed (80% progress)
    if (rating.score < 8 || blog.wordCount < 500) {
      await updateJobStatus(trackingId, 'inprogress', 70, 'Rewriting blog to improve quality...');
      console.log('🔄 Rewriting blog due to low score or short content...');
      blog = await rewriteBlogWithFeedback(blog, rating.review, tone, title);
      rating = await evaluateAndRateBlog(blog.html, tone);
      console.log(`✅ Rewritten blog (${blog.wordCount} words, score: ${rating.score}/10)`);
    } else {
      await updateJobStatus(trackingId, 'inprogress', 70, 'Blog quality is good, skipping rewrite...');
    }

    // Step 5: Generate images (90% progress)
    await updateJobStatus(trackingId, 'inprogress', 90, 'Generating relevant images...');
    const searchQuery = await generateSearchQuery(title, blog.html);
    const images = await findRelevantImages(searchQuery);
    console.log(`🖼️ Generated ${images.length} images`);

    // Step 6: Complete (100% progress)
    await updateJobStatus(trackingId, 'completed', 100, 'Blog generation completed successfully!', {
      title,
      content: blog.html,
      wordCount: blog.wordCount,
      images,
      rating
    });

    console.log(`✅ Blog generation completed for ${trackingId}`);

  } catch (error) {
    console.error(`❌ Blog generation failed for ${trackingId}:`, error);
    await updateJobStatus(trackingId, 'failed', 0, `Blog generation failed: ${error.message}`, { error: error.message });
  }
}

// Helper function to update job status in file
async function updateJobStatus(trackingId, status, progress, message, data = {}) {
  try {
    const jobs = loadJobs();
    if (jobs[trackingId]) {
      jobs[trackingId] = {
        ...jobs[trackingId],
        status,
        progress,
        message,
        updatedAt: new Date().toISOString(),
        ...data
      };
      saveJobs(jobs);
      console.log(`📊 Job ${trackingId}: ${status} (${progress}%) - ${message}`);
      
      // Remove completed or failed jobs after a delay
      if (status === 'completed' || status === 'failed') {
        setTimeout(() => {
          removeJobFromFile(trackingId);
        }, 30000); // Remove after 30 seconds
      }
    }
  } catch (error) {
    console.error(`❌ Failed to update job status for ${trackingId}:`, error);
  }
}

// Helper function to remove job from file
const removeJobFromFile = (trackingId) => {
  try {
    const jobs = loadJobs();
    if (jobs[trackingId]) {
      delete jobs[trackingId];
      saveJobs(jobs);
      console.log(`🗑️ Removed completed job ${trackingId} from file`);
    }
  } catch (error) {
    console.error(`❌ Failed to remove job ${trackingId} from file:`, error);
  }
};

// API endpoint to get job status
export async function getJobStatus(trackingId) {
  try {
    const jobs = loadJobs();
    const job = jobs[trackingId];
    
    if (!job) {
      return { error: 'Job not found' };
    }
    
    return job;
  } catch (error) {
    console.error('❌ Error getting job status:', error);
    return { error: 'Failed to get job status' };
  }
}

// API endpoint to get all jobs
export async function getAllJobs() {
  try {
    const jobs = loadJobs();
    const jobsArray = Object.values(jobs);
    
    // Sort by creation date (newest first)
    return jobsArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error('❌ Error getting all jobs:', error);
    return [];
  }
} 