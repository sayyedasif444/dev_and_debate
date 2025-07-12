import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BlogPost } from '@/lib/blog-api-simple';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Generate deterministic engagement numbers based on post slug to avoid hydration mismatch
  const hash = post.slug.split('').reduce((a: number, b: string) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  const likesCount = Math.abs(hash % 50) + 5;
  const commentsCount = Math.abs(hash % 20) + 1;

  // Get the first image from the images array or use a placeholder
  const coverImage = post.coverImage || (post.images && post.images.length > 0 ? post.images[0] : '/api/placeholder/400/225');
  
  // Format date
  const publishedAt = post.publishedAt ? 
    new Date(post.publishedAt).toLocaleDateString() : 
    new Date(post.created_at).toLocaleDateString();

  // Get excerpt from content
  const excerpt = post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 120) + '...';

  return (
    <article 
      ref={ref}
      className="bg-gradient-to-br from-black/80 to-black rounded-xl overflow-hidden transition-all duration-300 flex flex-col h-full border border-white/10 hover:border-primary/20 group relative backdrop-blur-sm"
    >
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-gradient-to-br from-blue-900/10 to-black/60 border-b border-white/5">
        <Image
          src={coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-blue-500/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium z-10 border border-blue-400/30">
          {post.category || post.tone}
        </div>
        {index === 0 && (
          <div className="absolute top-4 right-4 bg-primary/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium z-10 border border-primary/30 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Featured
          </div>
        )}
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-400">{publishedAt}</span>
          <div className="flex items-center">
            <div className="h-6 w-6 relative rounded-full overflow-hidden mr-2 border border-primary/20 bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm text-gray-300">Admin</span>
          </div>
        </div>
        
        <Link href={`/blog/${post.slug}`} className="block mb-3 group">
          <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-blue-400 transition-all duration-300">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-300/70 mb-5 line-clamp-3 flex-grow">
          {excerpt}
        </p>
        
        <div className="flex justify-between items-center pt-4 mt-1">
          <div className="flex items-center gap-4">
            {/* Likes */}
            <motion.div 
              className="flex items-center text-white/60 hover:text-primary cursor-pointer transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-xs">{post.likes || 0}</span>
            </motion.div>
            
            {/* Comments */}
            <motion.div 
              className="flex items-center text-white/60 hover:text-primary cursor-pointer transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-xs">{post.comments?.length || 0}</span>
            </motion.div>
          </div>
          
          <Link 
            href={`/blog/${post.slug}`}
            className="px-4 py-2 text-sm text-white bg-primary/20 hover:bg-primary/30 rounded-full transition-all duration-300 flex items-center group/link border border-primary/30"
          >
            Read more
            <svg 
              className="w-4 h-4 ml-1 transition-transform duration-300 group-hover/link:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
} 