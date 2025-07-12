'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BlogPostContent from '@/components/blog/BlogPostContent';
import { getBlogPostBySlug } from '@/lib/blog-api-simple';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  featured?: boolean;
  tone?: string;
  wordCount?: number;
  images?: string[];
  published_at?: any;
  created_at?: any;
  created_by?: string;
  status?: string;
  likes?: number;
  comments?: any[];
}

export default function ClientBlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) {
        setError('No slug provided');
        setLoading(false);
        return;
      }

      try {
        const blogPost = await getBlogPostBySlug(slug);
        
        if (!blogPost) {
          setError('Blog post not found');
          setLoading(false);
          return;
        }
        
        // Transform the blog data to match the expected format
        const transformedPost: BlogPost = {
          id: blogPost.id,
          title: blogPost.title,
          content: blogPost.content,
          slug: blogPost.slug,
          tone: blogPost.tone,
          wordCount: blogPost.wordCount,
          images: blogPost.images || [],
          published_at: blogPost.published_at,
          created_at: blogPost.created_at,
          created_by: blogPost.created_by,
          // Add excerpt from content
          excerpt: blogPost.excerpt || (blogPost.content ? blogPost.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : ''),
          // Add category (using tone as category for now)
          category: blogPost.category || blogPost.tone || 'General',
          // Add cover image
          coverImage: blogPost.coverImage || (blogPost.images && blogPost.images.length > 0 ? blogPost.images[0] : ''),
          // Add author info
          author: blogPost.author || {
            name: 'Admin',
            role: 'Author',
            avatar: '/images/blog/hs-image-2.webp'
          },
          // Add published date
          publishedAt: blogPost.publishedAt || (blogPost.published_at?.toDate?.()?.toISOString() || blogPost.created_at?.toDate?.()?.toISOString() || new Date().toISOString()),
          // Add likes and comments
          likes: blogPost.likes || 0,
          comments: blogPost.comments || []
        };
        
        setPost(transformedPost);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('Failed to load blog post');
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-300 mt-4">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">Error loading blog post</p>
          <p className="text-gray-400">{error || 'Blog post not found'}</p>
        </div>
      </div>
    );
  }

  return <BlogPostContent post={post} />;
} 