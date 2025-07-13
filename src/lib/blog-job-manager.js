import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, getDocs, collection, query, orderBy, deleteDoc } from 'firebase/firestore';

// Firebase collection name for jobs
const JOBS_COLLECTION = 'blog-jobs';

// Helper function to update job status in Firestore
export const updateJobStatus = async (trackingId, status, progress, message, data = {}) => {
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
      
      // Remove completed or failed jobs after a delay
      if (status === 'completed' || status === 'failed') {
        setTimeout(async () => {
          await removeJobFromFirestore(trackingId);
        }, 30000); // Remove after 30 seconds
      }
    }
  } catch (error) {
    console.error(`❌ Failed to update job status for ${trackingId}:`, error);
  }
};

// Helper function to remove job from Firestore
export const removeJobFromFirestore = async (trackingId) => {
  try {
    const jobRef = doc(db, JOBS_COLLECTION, trackingId);
    await deleteDoc(jobRef);
    console.log(`🗑️ Removed completed job ${trackingId} from Firestore`);
  } catch (error) {
    console.error(`❌ Failed to remove job ${trackingId} from Firestore:`, error);
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