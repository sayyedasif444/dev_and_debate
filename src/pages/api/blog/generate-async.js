import { getTrendingTopicFromIdea } from '@/lib/agents/getTrendingTopic';
import { writeBlogSections } from '@/lib/agents/writeBlogSections';
import { evaluateAndRateBlog } from '@/lib/agents/evaluateAndRateBlog';
import { rewriteBlogWithFeedback } from '@/lib/agents/rewriteBlog';
import { generateSearchQuery } from '@/lib/agents/generateImageSearchQuery';
import { findRelevantImages } from '@/lib/agents/findRelevantImages';
import { createJob, updateJobStatus, removeJobFromFirestore } from '@/lib/blog-job-manager';

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

    // Store initial job in Firestore
    await createJob(initialJob);

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

// API endpoint to get job status
export async function getJobStatus(trackingId) {
  try {
    const { getJobStatus: getJobStatusFromFirebase } = await import('@/lib/blog-job-manager');
    return await getJobStatusFromFirebase(trackingId);
  } catch (error) {
    console.error('❌ Error getting job status:', error);
    return { error: 'Failed to get job status' };
  }
}

// API endpoint to get all jobs
export async function getAllJobs() {
  try {
    const { getAllJobs: getAllJobsFromFirebase } = await import('@/lib/blog-job-manager');
    return await getAllJobsFromFirebase();
  } catch (error) {
    console.error('❌ Error getting all jobs:', error);
    return [];
  }
} 