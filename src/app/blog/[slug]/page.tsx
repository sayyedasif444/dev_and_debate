import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, blogPosts } from '@/components/blog/data/blogData';
import BlogPostContent from '@/components/blog/BlogPostContent';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

// Generate metadata for the page
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Dev & Debate',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: `${post.title} | Dev & Debate Blog`,
    description: post.excerpt,
    keywords: `${post.category}, blog, article, dev&debate, ${post.title}`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  
  // If post doesn't exist, show 404 page
  if (!post) {
    notFound();
  }
  
  return <BlogPostContent post={post} />;
} 