import { getTrendingTopicFromIdea } from '@/lib/agents/getTrendingTopic';
import { writeBlogSections } from '@/lib/agents/writeBlogSections';
import { evaluateAndRateBlog } from '@/lib/agents/evaluateAndRateBlog';
import { rewriteBlogWithFeedback } from '@/lib/agents/rewriteBlog';
import { generateSearchQuery } from '@/lib/agents/generateImageSearchQuery';
import { findRelevantImages } from '@/lib/agents/findRelevantImages';
import { createJob, updateJobStatus, removeJobFromFirestore, jobExists } from '@/lib/blog-job-manager';

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
    if (!title) {
      throw new Error('Failed to generate blog title');
    }
    console.log(`🔍 Generated title: ${title}`);

    // Step 2: Write initial blog content (40% progress)
    await updateJobStatus(trackingId, 'inprogress', 40, 'Writing initial blog content...');
    let blog = await writeBlogSections(title, tone);
    if (!blog || !blog.html || blog.wordCount < 100) {
      throw new Error(`Failed to write blog content - got ${blog?.wordCount || 0} words`);
    }
    console.log(`✍️ Initial blog written (${blog.wordCount} words)`);

    // Step 3: Evaluate blog (60% progress)
    await updateJobStatus(trackingId, 'inprogress', 60, 'Evaluating blog quality and content...');
    let rating = await evaluateAndRateBlog(blog.html, tone);
    if (!rating || typeof rating.score !== 'number') {
      throw new Error('Failed to evaluate blog quality');
    }
    console.log(`📝 Blog rating: ${rating.score}/10`);

    // Step 4: Rewrite if needed (80% progress)
    if (rating.score < 8 || blog.wordCount < 500) {
      // Check if job still exists before rewriting
      const jobStillExists = await jobExists(trackingId);
      console.log(`🔍 Before rewrite - Job ${trackingId} exists: ${jobStillExists}`);
      
      if (!jobStillExists) {
        throw new Error('Job was removed during blog generation process');
      }
      
      await updateJobStatus(trackingId, 'inprogress', 70, 'Rewriting blog to improve quality...');
      console.log('🔄 Rewriting blog due to low score or short content...');
      
      blog = await rewriteBlogWithFeedback(blog, rating.review, tone, title);
      if (!blog || !blog.html || blog.wordCount < 100) {
        throw new Error(`Failed to rewrite blog - got ${blog?.wordCount || 0} words`);
      }
      
      // Check if job still exists after rewriting
      const jobStillExistsAfterRewrite = await jobExists(trackingId);
      console.log(`🔍 After rewrite - Job ${trackingId} exists: ${jobStillExistsAfterRewrite}`);
      
      if (!jobStillExistsAfterRewrite) {
        throw new Error('Job was removed during blog rewriting process');
      }
      
      rating = await evaluateAndRateBlog(blog.html, tone);
      if (!rating || typeof rating.score !== 'number') {
        throw new Error('Failed to evaluate rewritten blog');
      }
      console.log(`✅ Rewritten blog (${blog.wordCount} words, score: ${rating.score}/10)`);
    } else {
      await updateJobStatus(trackingId, 'inprogress', 70, 'Blog quality is good, skipping rewrite...');
    }

    // Step 5: Generate images (90% progress)
    await updateJobStatus(trackingId, 'inprogress', 90, 'Generating relevant images...');
    const searchQuery = await generateSearchQuery(title, blog.html);
    if (!searchQuery) {
      throw new Error('Failed to generate image search query');
    }
    
    const images = await findRelevantImages(searchQuery);
    if (!images || images.length === 0) {
      throw new Error('Failed to find relevant images');
    }
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
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // Update job status with detailed error information
    await updateJobStatus(trackingId, 'failed', 0, `Blog generation failed: ${error.message}`, { 
      error: error.message,
      errorType: error.name,
      timestamp: new Date().toISOString()
    });
    
    // Re-throw the error to ensure the process stops
    throw error;
  }
}

 