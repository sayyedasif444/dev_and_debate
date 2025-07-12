import React from 'react';
import { Metadata } from 'next';
import ClientBlogPostPage from './ClientBlogPostPage';

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Generate metadata for the page
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    
    return {
      title: `Blog Post | Dev & Debate`,
      description: 'Blog post from Dev & Debate',
    };
  } catch (error: any) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post | Dev & Debate',
      description: 'Blog post from Dev & Debate',
    };
  }
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  try {
    // Return empty array to avoid server-side issues
    return [];
  } catch (error: any) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default function BlogPostPage() {
  // Always use client-side rendering to avoid Firebase Admin SDK buffer errors on Windows
  
  return <ClientBlogPostPage />;
} 