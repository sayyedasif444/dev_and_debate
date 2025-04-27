import { Metadata } from 'next';
import BlogContent from '@/components/blog/BlogContent';

export const metadata: Metadata = {
  title: 'Blog | Dev & Debate',
  description: "Explore our thoughts on development, design, movies, board games, and technology. Stories and insights that inspire, educate, and entertain.",
  keywords: 'tech blog, development blog, movie reviews, board games, coding tutorials, dev&debate blog, tech insights',
};

export default function BlogPage() {
  return <BlogContent />;
} 