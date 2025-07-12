'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllBlogPosts } from '@/lib/blog-api-simple';
import BlogHero from './BlogHero';
import FeaturedPost from './FeaturedPost';
import BlogList from './BlogList';
import { BlogPost } from '@/lib/blog-api-simple';

// Local interface for transformed blog data
interface TransformedBlogPost extends BlogPost {
  excerpt: string;
  category: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  featured: boolean;
}

export default function BlogContent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [blogPosts, setBlogPosts] = useState<TransformedBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch blogs using the simple API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const blogs = await getAllBlogPosts('published');
        
        
        // Transform data for display
        const transformedBlogs = blogs.map(blog => ({
          ...blog,
          // Add excerpt from content if not already present
          excerpt: blog.excerpt || (blog.content ? blog.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : ''),
          // Add category (using tone as category for now)
          category: blog.category || blog.tone || 'General',
          // Add cover image
          coverImage: blog.coverImage || (blog.images && blog.images.length > 0 ? blog.images[0] : ''),
          // Add author info
          author: {
            name: 'Admin',
            role: 'Author',
            avatar: '/images/blog/author-avatar.jpg'
          },
          // Add published date
          publishedAt: blog.publishedAt || (blog.published_at ? new Date(blog.published_at).toISOString() : new Date(blog.created_at).toISOString()),
          // Mark first blog as featured
          featured: blog.featured || false
        } as TransformedBlogPost));
        
        
        // Mark the first blog as featured if none are marked
        if (transformedBlogs.length > 0 && !transformedBlogs.some(blog => blog.featured)) {
          transformedBlogs[0].featured = true;
        }
        
        setBlogPosts(transformedBlogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to load blogs');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  
  const filteredPosts = blogPosts
    .filter(post => category === 'all' || post.category === category)
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
  const featuredPost = blogPosts.find(post => post.featured);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Disable smooth scrolling temporarily
      const html = document.documentElement;
      const originalStyle = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      
      // Scroll to top
      window.scrollTo(0, 0);
      
      // Re-enable smooth scrolling
      requestAnimationFrame(() => {
        html.style.scrollBehavior = originalStyle;
        setIsLoaded(true);
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Get unique categories from blog posts
  const getCategories = () => {
    const categories = ['all'];
    blogPosts.forEach(post => {
      if (post.category && !categories.includes(post.category)) {
        categories.push(post.category);
      }
    });
    return categories;
  };

  const categories = getCategories().map(cat => ({
    id: cat,
    name: cat === 'all' ? 'All Posts' : cat
  }));

  return (
    <AnimatePresence>
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-b from-black via-black/95 to-dark/95 relative min-h-screen"
        >
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-[30rem] h-[30rem] bg-primary/3 rounded-full blur-[8rem] opacity-70" />
            <div className="absolute bottom-10 right-10 w-[25rem] h-[25rem] bg-blue-500/3 rounded-full blur-[6rem] opacity-60" />
            <div className="absolute top-1/3 right-1/4 w-[20rem] h-[20rem] bg-blue-500/3 rounded-full blur-[5rem] opacity-50" />
          </div>

          <div className="relative z-10">
            <BlogHero />
            
            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
              >
                <FeaturedPost post={featuredPost} loading={loading} />
              </motion.div>
            )}
            
            <section id="articles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12"
              >
                <h2 className="text-3xl font-bold text-white">Latest Articles</h2>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  {/* Search input */}
                  <div className="relative flex-grow max-w-md">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                    />
                    <div className="absolute right-3 top-2.5 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Category filter - mobile dropdown */}
                  <div className="sm:hidden w-full">
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id} className="bg-dark text-white">
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
              
              {/* Category tabs - desktop */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="hidden sm:flex flex-wrap gap-2 mb-8"
              >
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      category === cat.id 
                        ? 'bg-primary text-white' 
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </motion.div>
              
              {/* Use BlogList component */}
              <BlogList posts={filteredPosts} loading={loading} error={error} />
            </section>
          </div>
        </motion.main>
    </AnimatePresence>
  );
} 