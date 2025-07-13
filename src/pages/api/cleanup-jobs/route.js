// pages/api/cleanup-jobs/route.js
import { cleanupOldJobs, cleanupJobsByStatus, getCleanupStats } from '@/lib/cleanup-old-jobs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed.' });
  }

  try {
    const { type = 'all', dryRun = false } = req.body;

    console.log(`🧹 Cleanup request received - Type: ${type}, Dry Run: ${dryRun}`);

    // Get stats before cleanup
    const statsBefore = await getCleanupStats();
    console.log('📊 Stats before cleanup:', statsBefore);

    let result;

    if (dryRun) {
      // Dry run - just return stats without deleting
      result = {
        dryRun: true,
        message: 'Dry run completed - no jobs were deleted',
        stats: statsBefore,
        wouldDelete: statsBefore.old
      };
    } else {
      // Actual cleanup
      if (type === 'status') {
        result = await cleanupJobsByStatus();
      } else {
        result = await cleanupOldJobs();
      }

      // Get stats after cleanup
      const statsAfter = await getCleanupStats();
      result.statsBefore = statsBefore;
      result.statsAfter = statsAfter;
    }

    console.log('✅ Cleanup completed:', result);

    return res.status(200).json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('❌ Cleanup failed:', error);
    return res.status(500).json({
      error: 'Cleanup failed',
      message: error.message
    });
  }
} 