'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import {
  updateBlogLikes,
  addBlogComment,
  likeComment,
  Comment,
} from '@/lib/blog-api-simple';

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
  isFallback?: boolean;
  likes?: number;
  comments?: Comment[];
}

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({
  post,
}: BlogPostContentProps): JSX.Element {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // State for image loading
  const [imageError, setImageError] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  // State for likes and comments
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    content: '',
  });

  // Debug logging
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get reading time
  const getReadingTime = (wordCount?: number) => {
    if (!wordCount) return '5 min read';
    const wordsPerMinute = 200;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Handle like/unlike
  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      const action = likes > (post.likes || 0) ? 'unlike' : 'like';
      const result = await updateBlogLikes(post.id, action);

      if (result.success && result.likes !== undefined) {
        setLikes(result.likes);
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    } finally {
      setIsLiking(false);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      isCommenting ||
      !commentForm.name ||
      !commentForm.email ||
      !commentForm.content
    )
      return;

    setIsCommenting(true);
    try {
      const result = await addBlogComment(post.id, {
        name: commentForm.name,
        email: commentForm.email,
        content: commentForm.content,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          commentForm.name
        )}&background=random`,
      });

      if (result.success && result.comment) {
        setComments([result.comment, ...comments]);
        setCommentForm({ name: '', email: '', content: '' });
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsCommenting(false);
    }
  };

  // Handle comment like
  const handleCommentLike = async (commentId: string) => {
    try {
      const result = await likeComment(post.id, commentId);
      if (result.success) {
        setComments(
          comments.map((comment) =>
            comment.id === commentId
              ? { ...comment, likes: comment.likes + 1 }
              : comment
          )
        );
      }
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  return (
    <section className='py-24 lg:py-32 bg-black relative overflow-hidden'>
      {/* Enhanced Background decoration */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <motion.div
          className='absolute -top-20 -right-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]'
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[80px]'
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className='absolute top-1/4 left-1/4 w-4 h-4 bg-primary/50 rounded-full'
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute bottom-1/3 right-1/3 w-3 h-3 bg-blue-400/50 rounded-full'
          animate={{ y: [0, 20, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl overflow-hidden'
        >
          {/* Header Image */}
          <div className='relative w-full h-72 md:h-96 overflow-hidden'>
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className='object-cover transition-transform duration-700 hover:scale-105'
              priority
            />
            <div className='absolute inset-0 bg-gradient-to-b from-black/30 to-black/90'></div>

            {/* Category badge */}
            <div className='absolute top-6 left-6'>
              <span className='inline-flex items-center px-4 py-2 text-sm font-medium bg-blue-500/30 backdrop-blur-sm border border-blue-400/30 rounded-full text-white'>
                {post.category}
              </span>
            </div>

            {/* Back button */}
            <Link
              href='/blog'
              className='absolute top-6 right-6 flex items-center px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full text-white text-sm hover:bg-black/60 transition-colors border border-white/10 hover:border-white/20'
            >
              <svg
                className='w-4 h-4 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10 19l-7-7m0 0l7-7m-7 7h18'
                />
              </svg>
              Back to blog
            </Link>
          </div>

          {/* Content */}
          <div className='p-8 md:p-12'>
            {/* Breadcrumb */}
            <nav className='flex items-center space-x-2 text-sm text-gray-400 mb-6'>
              <Link href='/' className='hover:text-white transition-colors'>
                Home
              </Link>
              <span>/</span>
              <Link href='/blog' className='hover:text-white transition-colors'>
                Blog
              </Link>
              <span>/</span>
              <span className='text-white'>{post.title}</span>
            </nav>

            {/* Fallback Message */}
            {post.isFallback && (
              <div className='mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg'>
                <div className='flex items-center gap-2 text-yellow-400'>
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='font-medium'>Database Connection Issue</span>
                </div>
                <p className='text-yellow-300 text-sm mt-1'>
                  The actual blog post could not be loaded due to database
                  connection issues. You're seeing sample content. Please try
                  again later.
                </p>
              </div>
            )}

            {/* Article Header */}
            <header className='mb-8 '>
              <div className='flex items-center gap-4 text-sm text-gray-400 mb-4'>
                <span className='bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium'>
                  {post.category}
                </span>
                <span>{formatDate(post.publishedAt)}</span>
                <span>{getReadingTime(post.wordCount)}</span>
              </div>

              <h1 className='text-3xl md:text-4xl font-bold text-white mb-6 leading-tight'>
                {post.title}
              </h1>
              {/* Author Info */}
              <div className='flex items-center gap-4 mb-8 pb-8 border-b border-white/10'>
                <div className='w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-white'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div>
                  <p className='text-white font-medium'>Admin</p>
                  <p className='text-gray-400 text-sm'>Author</p>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <article className='prose prose-invert prose-lg max-w-none mb-12'>
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className='text-gray-300 leading-relaxed'
              />
            </article>

            {/* Likes Section */}
            <div className='flex items-center justify-between py-8 border-t border-gray-800'>
              {/* Like Button - Left */}
              <button
                onClick={handleLike}
                disabled={isLiking}
                className={`relative flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-300 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 ${
                  likes > (post.likes || 0)
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                    : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
                }`}
              >
                <svg
                  className={`w-6 h-6 ${
                    likes > (post.likes || 0)
                      ? 'text-red-400'
                      : 'text-gray-400'
                  }`}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                    clipRule='evenodd'
                  />
                </svg>
                <span className='font-medium'>
                  {likes} {likes === 1 ? 'Like' : 'Likes'}
                </span>
                {isLiking && (
                  <svg
                    className='w-4 h-4 animate-spin'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                )}
              </button>
              {/* Share Button - Right */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    setShowShareTooltip(true);
                    setTimeout(() => setShowShareTooltip(false), 2000);
                  }
                }}
                className='relative flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-300 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z'
                  ></path>
                </svg>
                <span>Share</span>
                {showShareTooltip && (
                  <span className='absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded'>
                    Link copied!
                  </span>
                )}
              </button>
            </div>

            {/* Comments Section */}
            <div className='border-t border-gray-800 pt-8'>
              <h3 className='text-2xl font-bold text-white mb-6'>
                Comments ({comments.length})
              </h3>

              {/* Comment Form */}
              <form
                onSubmit={handleCommentSubmit}
                className='mb-8 p-6 bg-white/5 rounded-lg border border-white/10'
              >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                  <input
                    type='text'
                    placeholder='Your name'
                    value={commentForm.name}
                    onChange={(e) =>
                      setCommentForm({ ...commentForm, name: e.target.value })
                    }
                    className='px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary'
                    required
                  />
                  <input
                    type='email'
                    placeholder='Your email'
                    value={commentForm.email}
                    onChange={(e) =>
                      setCommentForm({ ...commentForm, email: e.target.value })
                    }
                    className='px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary'
                    required
                  />
                </div>
                <textarea
                  placeholder='Write your comment...'
                  value={commentForm.content}
                  onChange={(e) =>
                    setCommentForm({ ...commentForm, content: e.target.value })
                  }
                  rows={4}
                  className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none'
                  required
                />
                <button
                  type='submit'
                  disabled={isCommenting}
                  className='mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isCommenting ? 'Posting...' : 'Post Comment'}
                </button>
              </form>

              {/* Comments List */}
              <div className='space-y-6'>
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className='p-6 bg-white/5 rounded-lg border border-white/10'
                  >
                    <div className='flex items-start gap-4'>
                      <img
                        src={comment.avatar}
                        alt={comment.name}
                        className='w-12 h-12 rounded-full'
                      />
                      <div className='flex-1'>
                        <div className='flex items-center justify-between mb-2'>
                          <h4 className='font-medium text-white'>
                            {comment.name}
                          </h4>
                          <span className='text-sm text-gray-400'>
                            {formatDate(comment.created_at)}
                          </span>
                        </div>
                        <p className='text-gray-300 mb-1'>{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {comments.length === 0 && (
                  <div className='text-center py-8 text-gray-400'>
                    <p>No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
