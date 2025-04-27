'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from './data/blogData';

interface BlogPostContentProps {
  post: BlogPost;
}

// Comment interface
interface Comment {
  id: string;
  name: string;
  email: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
}

export default function BlogPostContent({ post }: BlogPostContentProps): JSX.Element {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // State for likes
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42); // Start with a random number
  
  // State for comments
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      avatar: '/images/blog/avatar-1.webp',
      content: 'This was such an insightful read! I especially loved the section about implementing the design patterns.',
      date: '2 days ago',
      likes: 7
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@example.com',
      avatar: '/images/blog/avatar-2.webp',
      content: "Great article! I've been looking for a clear explanation on this topic for a while. Would love to see a follow-up piece diving deeper into specific use cases.",
      date: '5 days ago',
      likes: 4
    }
  ]);
  
  // Form state
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  // Handle like button click
  const handleLikeClick = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
      
      // Show animation effect
      const likeButton = document.getElementById('likeButton');
      if (likeButton) {
        likeButton.classList.add('animate-ping-once');
        setTimeout(() => {
          likeButton.classList.remove('animate-ping-once');
        }, 700);
      }
    }
    setLiked(!liked);
  };
  
  // Handle comment form changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCommentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle comment form submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newComment: Comment = {
        id: Date.now().toString(),
        name: commentForm.name,
        email: commentForm.email,
        avatar: '/images/blog/avatar-3.webp', // Default avatar
        content: commentForm.content,
        date: 'Just now',
        likes: 0
      };
      
      setComments(prev => [newComment, ...prev]);
      setCommentForm({
        name: '',
        email: '',
        content: ''
      });
      setIsSubmitting(false);
      setShowThankYou(true);
      
      // Hide thank you message after 3 seconds
      setTimeout(() => {
        setShowThankYou(false);
      }, 3000);
    }, 1000);
  };
  
  // Like a comment
  const handleCommentLike = (commentId: string) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 } 
          : comment
      )
    );
  };

  return (
    <section className="py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15] 
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[80px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2] 
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary/50 rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-blue-400/50 rounded-full"
          animate={{ y: [0, 20, 0] }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl overflow-hidden"
        >
          {/* Header Image */}
          <div className="relative w-full h-72 md:h-96 overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/90"></div>
            
            {/* Category badge */}
            <div className="absolute top-6 left-6">
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium bg-blue-500/30 backdrop-blur-sm border border-blue-400/30 rounded-full text-white">
                {post.category}
              </span>
            </div>
            
            {/* Back button */}
            <Link
              href="/blog"
              className="absolute top-6 right-6 flex items-center px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full text-white text-sm hover:bg-black/60 transition-colors border border-white/10 hover:border-white/20"
            >
              <svg 
                className="w-4 h-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to blog
            </Link>
          </div>
          
          <div className="px-6 py-8 md:p-10">
            {/* Publication date */}
            <div className="inline-block mb-4 px-4 py-1 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full">
              <span className="text-sm font-medium text-primary">{post.publishedAt}</span>
            </div>
            
            {/* Post title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {post.title}
            </h1>
            
            {/* Author info */}
            <div className="flex items-center mb-8 pb-8 border-b border-white/10">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-4">
                <p className="font-medium text-white">{post.author.name}</p>
                <p className="text-sm text-gray-400">{post.author.role}</p>
              </div>
            </div>
            
            {/* Post content */}
            <div className="prose prose-invert prose-lg max-w-none">
              {/* Display the excerpt if content is not available */}
              <p className="text-lg text-gray-300 mb-6">{post.excerpt}</p>
              
              {/* If there's actual content, render it, otherwise show a placeholder */}
              <div className="space-y-6 text-gray-300">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius faucibus massa sollicitudin amet augue. Nibh metus a semper purus mauris duis. Lorem eu neque, tristique quis duis. Nibh scelerisque ac adipiscing velit non nulla in amet pellentesque.
                </p>
                <p>
                  Sit turpis pretium eget maecenas. Vestibulum dolor mattis consectetur eget commodo vitae. Amet pellentesque sit pulvinar lorem mi a, euismod risus rhoncus. Elementum ullamcorper nec, habitasse vulputate. Eget dictum quis est sed egestas tellus, a lectus. Quam ullamcorper in fringilla arcu aliquet fames arcu.
                </p>
                
                <blockquote className="border-l-4 border-primary pl-4 py-3 my-8 italic bg-primary/5 rounded-r-lg p-4">
                  "Technology is best when it brings people together."
                  <footer className="mt-2 text-sm">- Matt Mullenweg</footer>
                </blockquote>
                
                <p>
                  Diam nunc lacus lacus aliquam turpis enim. Eget hac velit est euismod lacus, amet semper semper ultrices amet. Ut viverra at ultricies lactam diam. Volutpat est eget egestas ultrices nunc, sagittis. Semper amet aenean amet placerat facilisi.
                </p>
              </div>
            </div>
            
            {/* Like section with animation */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="flex items-center justify-center gap-6">
                <motion.button
                  id="likeButton"
                  onClick={handleLikeClick}
                  className={`flex flex-col items-center transition-all duration-300 ${liked ? 'text-primary' : 'text-white/70 hover:text-primary'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={liked ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <svg className="w-8 h-8" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </motion.div>
                  <span className="mt-1 text-sm font-medium">{likeCount} likes</span>
                </motion.button>
                
                <div className="h-10 w-px bg-white/10"></div>
                
                <motion.button
                  onClick={() => setShowShareTooltip(!showShareTooltip)}
                  className="relative flex flex-col items-center text-white/70 hover:text-primary transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span className="mt-1 text-sm font-medium">Share</span>
                  
                  <AnimatePresence>
                    {showShareTooltip && (
                      <motion.div 
                        className="absolute top-full mt-2 bg-black/90 backdrop-blur-md rounded-lg p-3 flex gap-2 border border-white/10 shadow-xl z-10"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {/* Social share buttons */}
                        <a href="#" className="rounded-full bg-blue-500/20 p-2 hover:bg-blue-500/40 transition-colors">
                          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                          </svg>
                        </a>
                        <a href="#" className="rounded-full bg-blue-700/20 p-2 hover:bg-blue-700/40 transition-colors">
                          <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                          </svg>
                        </a>
                        <a href="#" className="rounded-full bg-blue-600/20 p-2 hover:bg-blue-600/40 transition-colors">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                          </svg>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
            
            {/* Comments section */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-2xl font-bold text-white mb-8">Comments ({comments.length})</h3>
              
              {/* Comment form */}
              <div className="mb-10 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <h4 className="text-lg font-medium text-white mb-4">Leave a comment</h4>
                
                <AnimatePresence>
                  {showThankYou ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center mb-6"
                    >
                      <p className="text-primary">Thank you for your comment!</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleCommentSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Name <span className="text-primary">*</span></label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={commentForm.name}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email <span className="text-primary">*</span></label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={commentForm.email}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="content" className="block text-sm font-medium text-white mb-1">Comment <span className="text-primary">*</span></label>
                        <textarea
                          id="content"
                          name="content"
                          rows={4}
                          required
                          value={commentForm.content}
                          onChange={handleFormChange}
                          className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                        ></textarea>
                      </div>
                      <div className="text-right">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 ml-auto disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Submitting...
                            </>
                          ) : (
                            <>
                              Post Comment
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Comments list */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-primary/20">
                          <Image 
                            src={comment.avatar || '/images/default-avatar.png'} 
                            alt={comment.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <h5 className="font-medium text-white">{comment.name}</h5>
                          <p className="text-xs text-gray-400">{comment.date}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCommentLike(comment.id)}
                        className="flex items-center text-white/60 hover:text-primary transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        <span className="text-xs">{comment.likes}</span>
                      </button>
                    </div>
                    <p className="text-gray-300">{comment.content}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Back to top button */}
        <div className="flex justify-center mt-12">
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 px-5 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Back to top
          </motion.button>
        </div>
      </div>
    </section>
  );
} 