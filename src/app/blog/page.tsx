import React from 'react';
import { Metadata } from 'next';
import BlogHero from '@/components/blog/BlogHero';
import BlogList from '@/components/blog/BlogList';
import FeaturedPost from '@/components/blog/FeaturedPost';
import BlogContent from '@/components/blog/BlogContent';

export const metadata: Metadata = {
  title: 'Blog | Dev & Debate',
  description: 'Explore our latest insights on development, design, technology and more. Discover cutting-edge articles and expert perspectives.',
  keywords: 'blog, articles, development, design, technology, insights, dev&debate',
  openGraph: {
    title: 'Blog | Dev & Debate',
    description: 'Explore our latest insights on development, design, technology and more.',
    type: 'website',
    url: 'https://devanddebate.com/blog',
  },
};

export default function BlogPage() {
  // Always use client-side rendering to avoid Firebase Admin SDK buffer errors on Windows
  
  return <BlogContent />;
} 