'use client';

import { useState } from 'react';
import { updateBlogLikes, addBlogComment, likeComment } from '@/lib/blog-api-simple';

export default function TestLikesComments() {
  const [blogId, setBlogId] = useState('1');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testLike = async () => {
    setLoading(true);
    try {
      const res = await updateBlogLikes(blogId, 'like');
      setResult(res);
    } catch (error: any) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testUnlike = async () => {
    setLoading(true);
    try {
      const res = await updateBlogLikes(blogId, 'unlike');
      setResult(res);
    } catch (error: any) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testAddComment = async () => {
    setLoading(true);
    try {
      const res = await addBlogComment(blogId, {
        name: 'Test User',
        email: 'test@example.com',
        content: 'This is a test comment!',
        avatar: 'https://ui-avatars.com/api/?name=Test+User&background=random'
      });
      setResult(res);
    } catch (error: any) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Likes & Comments API</h1>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Blog ID:</label>
            <input
              type="text"
              value={blogId}
              onChange={(e) => setBlogId(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={testLike}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              Test Like
            </button>
            
            <button
              onClick={testUnlike}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              Test Unlike
            </button>
            
            <button
              onClick={testAddComment}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Test Add Comment
            </button>
          </div>

          {result && (
            <div className="p-4 bg-white/10 rounded-lg">
              <h3 className="font-medium mb-2">Result:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}