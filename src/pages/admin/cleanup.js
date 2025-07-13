import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CleanupPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const triggerCleanup = async (type = 'all', dryRun = false) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/cleanup-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, dryRun }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Cleanup failed');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Job Cleanup Admin</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Dry Run Section */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">Dry Run (Safe)</h2>
              <p className="text-blue-700 mb-4">
                Check what would be deleted without actually deleting anything.
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => triggerCleanup('all', true)}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Running...' : 'Dry Run - All Jobs'}
                </button>
                <button
                  onClick={() => triggerCleanup('status', true)}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Running...' : 'Dry Run - By Status'}
                </button>
              </div>
            </div>

            {/* Actual Cleanup Section */}
            <div className="bg-red-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-red-900 mb-4">Actual Cleanup (Dangerous)</h2>
              <p className="text-red-700 mb-4">
                This will permanently delete old jobs. Use with caution!
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete all old jobs? This action cannot be undone.')) {
                      triggerCleanup('all', false);
                    }
                  }}
                  disabled={loading}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Running...' : 'Delete All Old Jobs'}
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete old jobs by status? This action cannot be undone.')) {
                      triggerCleanup('status', false);
                    }
                  }}
                  disabled={loading}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Running...' : 'Delete By Status'}
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h3 className="text-red-900 font-semibold">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="text-green-900 font-semibold">Cleanup Results</h3>
              <div className="text-green-700 space-y-2">
                <p><strong>Message:</strong> {result.message}</p>
                {result.deleted !== undefined && (
                  <p><strong>Jobs Deleted:</strong> {result.deleted}</p>
                )}
                {result.wouldDelete !== undefined && (
                  <p><strong>Jobs That Would Be Deleted:</strong> {result.wouldDelete}</p>
                )}
                {result.dryRun && (
                  <p><strong>Mode:</strong> Dry Run (No jobs were actually deleted)</p>
                )}
              </div>

              {/* Stats Display */}
              {result.stats && (
                <div className="mt-4">
                  <h4 className="font-semibold text-green-900 mb-2">Current Job Statistics:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Total Jobs:</span> {result.stats.total}
                    </div>
                    <div>
                      <span className="font-medium">Old Jobs:</span> {result.stats.old}
                    </div>
                    <div>
                      <span className="font-medium">Completed:</span> {result.stats.byStatus.completed}
                    </div>
                    <div>
                      <span className="font-medium">Failed:</span> {result.stats.byStatus.failed}
                    </div>
                  </div>
                </div>
              )}

              {/* Before/After Stats */}
              {result.statsBefore && result.statsAfter && (
                <div className="mt-4">
                  <h4 className="font-semibold text-green-900 mb-2">Cleanup Impact:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Before:</span> {result.statsBefore.total} total, {result.statsBefore.old} old
                    </div>
                    <div>
                      <span className="font-medium">After:</span> {result.statsAfter.total} total, {result.statsAfter.old} old
                    </div>
                  </div>
                </div>
              )}

              {/* Deleted Jobs List */}
              {result.deletedJobs && result.deletedJobs.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-green-900 mb-2">Deleted Jobs:</h4>
                  <div className="max-h-40 overflow-y-auto">
                    {result.deletedJobs.map((job, index) => (
                      <div key={index} className="text-xs bg-white p-2 rounded mb-1">
                        <span className="font-mono">{job.trackingId}</span> - {job.status}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Info Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-gray-900 font-semibold mb-2">About Cleanup</h3>
            <div className="text-gray-700 text-sm space-y-1">
              <p>• Jobs older than 24 hours are considered "old"</p>
              <p>• "All Jobs" cleanup removes any job not updated in 24 hours</p>
              <p>• "By Status" cleanup removes completed, failed, and abandoned jobs</p>
              <p>• Abandoned jobs are those stuck in "inprogress" for 24+ hours</p>
              <p>• The cron job runs automatically every day at midnight</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 