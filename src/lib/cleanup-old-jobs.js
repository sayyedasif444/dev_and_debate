// lib/cleanup-old-jobs.js
import { db } from './firebase-server';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

/**
 * Cleanup script to remove old job data from Firebase
 * Removes jobs that haven't been updated in the last 24 hours
 */
export async function cleanupOldJobs() {
  try {
    console.log('🧹 Starting cleanup of old jobs...');
    
    if (!db) {
      throw new Error('Firebase database not initialized');
    }
    
    // Calculate timestamp for 24 hours ago
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    
    console.log(`🗑️ Looking for jobs older than: ${twentyFourHoursAgo.toISOString()}`);
    
    // Query for jobs that haven't been updated in the last 24 hours
    const jobsRef = collection(db, 'blog-jobs');
    const q = query(
      jobsRef,
      where('updatedAt', '<', twentyFourHoursAgo.toISOString())
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('✅ No old jobs found to clean up');
      return { deleted: 0, message: 'No old jobs found' };
    }
    
    console.log(`📋 Found ${querySnapshot.size} old jobs to delete`);
    
    const deletePromises = [];
    const deletedJobs = [];
    
    querySnapshot.forEach((doc) => {
      const jobData = doc.data();
      deletedJobs.push({
        trackingId: jobData.trackingId,
        status: jobData.status,
        updatedAt: jobData.updatedAt
      });
      
      deletePromises.push(deleteDoc(doc.ref));
    });
    
    // Delete all old jobs
    await Promise.all(deletePromises);
    
    console.log(`✅ Successfully deleted ${deletedJobs.length} old jobs`);
    console.log('Deleted jobs:', deletedJobs.map(job => `${job.trackingId} (${job.status})`));
    
    return {
      deleted: deletedJobs.length,
      message: `Successfully deleted ${deletedJobs.length} old jobs`,
      deletedJobs
    };
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    throw new Error(`Cleanup failed: ${error.message}`);
  }
}

/**
 * Cleanup script with more specific criteria
 * Removes jobs based on status and age
 */
export async function cleanupJobsByStatus() {
  try {
    console.log('🧹 Starting status-based cleanup...');
    
    if (!db) {
      throw new Error('Firebase database not initialized');
    }
    
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    
    const jobsRef = collection(db, 'blog-jobs');
    
    // Clean up completed jobs older than 24 hours
    const completedQuery = query(
      jobsRef,
      where('status', '==', 'completed'),
      where('updatedAt', '<', twentyFourHoursAgo.toISOString())
    );
    
    // Clean up failed jobs older than 24 hours
    const failedQuery = query(
      jobsRef,
      where('status', '==', 'failed'),
      where('updatedAt', '<', twentyFourHoursAgo.toISOString())
    );
    
    // Clean up abandoned jobs (inprogress for more than 24 hours)
    const abandonedQuery = query(
      jobsRef,
      where('status', '==', 'inprogress'),
      where('updatedAt', '<', twentyFourHoursAgo.toISOString())
    );
    
    const [completedSnapshot, failedSnapshot, abandonedSnapshot] = await Promise.all([
      getDocs(completedQuery),
      getDocs(failedQuery),
      getDocs(abandonedQuery)
    ]);
    
    const totalJobs = completedSnapshot.size + failedSnapshot.size + abandonedSnapshot.size;
    
    if (totalJobs === 0) {
      console.log('✅ No old jobs found to clean up');
      return { deleted: 0, message: 'No old jobs found' };
    }
    
    console.log(`📋 Found ${totalJobs} old jobs to delete:`);
    console.log(`  - Completed: ${completedSnapshot.size}`);
    console.log(`  - Failed: ${failedSnapshot.size}`);
    console.log(`  - Abandoned: ${abandonedSnapshot.size}`);
    
    const deletePromises = [];
    const deletedJobs = [];
    
    // Delete completed jobs
    completedSnapshot.forEach((doc) => {
      const jobData = doc.data();
      deletedJobs.push({
        trackingId: jobData.trackingId,
        status: 'completed',
        updatedAt: jobData.updatedAt
      });
      deletePromises.push(deleteDoc(doc.ref));
    });
    
    // Delete failed jobs
    failedSnapshot.forEach((doc) => {
      const jobData = doc.data();
      deletedJobs.push({
        trackingId: jobData.trackingId,
        status: 'failed',
        updatedAt: jobData.updatedAt
      });
      deletePromises.push(deleteDoc(doc.ref));
    });
    
    // Delete abandoned jobs
    abandonedSnapshot.forEach((doc) => {
      const jobData = doc.data();
      deletedJobs.push({
        trackingId: jobData.trackingId,
        status: 'abandoned',
        updatedAt: jobData.updatedAt
      });
      deletePromises.push(deleteDoc(doc.ref));
    });
    
    // Delete all old jobs
    await Promise.all(deletePromises);
    
    console.log(`✅ Successfully deleted ${deletedJobs.length} old jobs`);
    
    return {
      deleted: deletedJobs.length,
      message: `Successfully deleted ${deletedJobs.length} old jobs`,
      breakdown: {
        completed: completedSnapshot.size,
        failed: failedSnapshot.size,
        abandoned: abandonedSnapshot.size
      },
      deletedJobs
    };
    
  } catch (error) {
    console.error('❌ Error during status-based cleanup:', error);
    throw new Error(`Status-based cleanup failed: ${error.message}`);
  }
}

/**
 * Get cleanup statistics
 */
export async function getCleanupStats() {
  try {
    if (!db) {
      throw new Error('Firebase database not initialized');
    }
    
    const jobsRef = collection(db, 'blog-jobs');
    const snapshot = await getDocs(jobsRef);
    
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const stats = {
      total: 0,
      old: 0,
      byStatus: {
        init: 0,
        inprogress: 0,
        completed: 0,
        failed: 0
      },
      oldByStatus: {
        init: 0,
        inprogress: 0,
        completed: 0,
        failed: 0
      }
    };
    
    snapshot.forEach((doc) => {
      const jobData = doc.data();
      stats.total++;
      stats.byStatus[jobData.status] = (stats.byStatus[jobData.status] || 0) + 1;
      
      const updatedAt = new Date(jobData.updatedAt);
      if (updatedAt < twentyFourHoursAgo) {
        stats.old++;
        stats.oldByStatus[jobData.status] = (stats.oldByStatus[jobData.status] || 0) + 1;
      }
    });
    
    return stats;
  } catch (error) {
    console.error('❌ Error getting cleanup stats:', error);
    throw new Error(`Failed to get cleanup stats: ${error.message}`);
  }
} 