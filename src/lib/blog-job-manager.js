import { db } from '@/lib/firebase-server';
import { doc, setDoc, getDoc, getDocs, collection, query, orderBy, deleteDoc } from 'firebase/firestore';

// Firebase collection name for jobs
const JOBS_COLLECTION = 'blog-jobs';

// Helper function to update job status in Firestore
export const updateJobStatus = async (trackingId, status, progress, message, data = {}, autoCleanup = false) => {
  try {
    const jobRef = doc(db, JOBS_COLLECTION, trackingId);
    const jobDoc = await getDoc(jobRef);
    
    if (jobDoc.exists()) {
      const currentData = jobDoc.data();
      await setDoc(jobRef, {
        ...currentData,
        status,
        progress,
        message,
        updatedAt: new Date().toISOString(),
        ...data
      });
      console.log(`📊 Job ${trackingId}: ${status} (${progress}%) - ${message}`);
      
      // DISABLED: Auto-cleanup is now completely disabled to prevent job loss
      // Jobs will only be removed through manual cleanup or explicit deletion
      if (false && autoCleanup && (status === 'completed' || status === 'failed')) {
        console.log(`⚠️ Auto-cleanup disabled for job ${trackingId}`);
        // setTimeout(async () => {
        //   await removeJobFromFirestore(trackingId);
        // }, 24 * 60 * 60 * 1000); // Remove after 24 hours
      }
    } else {
      console.error(`❌ Job ${trackingId} not found during status update`);
    }
  } catch (error) {
    console.error(`❌ Failed to update job status for ${trackingId}:`, error);
  }
};

// Helper function to remove job from Firestore
export const removeJobFromFirestore = async (trackingId) => {
  try {
    console.log(`⚠️ Attempting to remove job ${trackingId} from Firestore`);
    const jobRef = doc(db, JOBS_COLLECTION, trackingId);
    const jobDoc = await getDoc(jobRef);
    
    if (jobDoc.exists()) {
      await deleteDoc(jobRef);
      console.log(`🗑️ Removed job ${trackingId} from Firestore`);
    } else {
      console.log(`⚠️ Job ${trackingId} not found for removal`);
    }
  } catch (error) {
    console.error(`❌ Failed to remove job ${trackingId} from Firestore:`, error);
  }
};

// Helper function to check if job exists
export const jobExists = async (trackingId) => {
  try {
    const jobRef = doc(db, JOBS_COLLECTION, trackingId);
    const jobDoc = await getDoc(jobRef);
    return jobDoc.exists();
  } catch (error) {
    console.error(`❌ Error checking if job ${trackingId} exists:`, error);
    return false;
  }
};

// Helper function for status checking
export const getJobStatus = async (trackingId) => {
  try {
    const jobRef = doc(db, JOBS_COLLECTION, trackingId);
    const jobDoc = await getDoc(jobRef);
    
    if (!jobDoc.exists()) {
      return { error: 'Job not found' };
    }
    
    return jobDoc.data();
  } catch (error) {
    console.error('❌ Error getting job status:', error);
    return { error: 'Failed to get job status' };
  }
};

// Helper function for getting all jobs
export const getAllJobs = async () => {
  try {
    const jobsRef = collection(db, JOBS_COLLECTION);
    const q = query(jobsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const jobs = [];
    querySnapshot.forEach((doc) => {
      jobs.push(doc.data());
    });
    
    return jobs;
  } catch (error) {
    console.error('❌ Error getting all jobs:', error);
    return [];
  }
};

// Helper function to create a new job
export const createJob = async (jobData) => {
  try {
    const jobRef = doc(db, JOBS_COLLECTION, jobData.trackingId);
    await setDoc(jobRef, jobData);
    console.log(`🚀 Created job ${jobData.trackingId} in Firestore`);
    return true;
  } catch (error) {
    console.error('❌ Error creating job:', error);
    return false;
  }
};

// Helper function to manually clean up old jobs (older than specified hours)
export const cleanupOldJobs = async (hoursOld = 24) => {
  try {
    const jobs = await getAllJobs();
    const cutoffTime = new Date(Date.now() - (hoursOld * 60 * 60 * 1000));
    let removedCount = 0;
    
    for (const job of jobs) {
      const jobTime = new Date(job.updatedAt || job.createdAt);
      if (jobTime < cutoffTime && (job.status === 'completed' || job.status === 'failed')) {
        await removeJobFromFirestore(job.trackingId);
        removedCount++;
      }
    }
    
    console.log(`🧹 Cleaned up ${removedCount} old jobs (older than ${hoursOld} hours)`);
    return removedCount;
  } catch (error) {
    console.error('❌ Error cleaning up old jobs:', error);
    return 0;
  }
}; 