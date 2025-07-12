'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBlogPostBySlug, BlogPost } from '@/lib/blog-api-simple';

interface BlogDetailProps {
  slug: string;
}

export default function BlogDetail({ slug }: BlogDetailProps) {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch blog post on component mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const blogData = await getBlogPostBySlug(slug);
          
        if (blogData) {
          setBlog(blogData);
        } else {
          setError('Blog post not found');
        }
      } catch (error) {
        console.error('❌ Error fetching blog:', error);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-lg">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error || 'Blog post not found'}</p>
          <Link 
            href="/blog"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <Link href="/blog" className="text-blue-300 hover:text-blue-200">
                ← Back to Blog
              </Link>
            </nav>
            
            {/* Category */}
            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full mb-4">
              {blog.tone}
            </span>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm">
              <span>By {blog.created_by}</span>
              <span>{blog.wordCount} words</span>
              <span>{new Date(blog.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Blog Content */}
          <article className="prose prose-invert prose-lg max-w-none">
            <div 
              className="space-y-6"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>
          
          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-gray-400 text-sm">
                <p>Published on {new Date(blog.created_at).toLocaleDateString()}</p>
                <p>Last updated on {new Date(blog.updated_at).toLocaleDateString()}</p>
              </div>
              
              <Link 
                href="/blog"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 