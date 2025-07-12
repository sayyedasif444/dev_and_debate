import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory blog storage (same as main blogs API)
const blogs = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    content: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">
          Next.js is a powerful React framework that makes building full-stack web applications simple and efficient. 
          With features like server-side rendering, static site generation, and API routes, it's the perfect choice for modern web development.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4">Why Choose Next.js?</h2>
        <p class="leading-relaxed">
          Next.js provides an excellent developer experience with features like hot reloading, automatic code splitting, 
          and built-in TypeScript support. It also offers great performance optimizations out of the box.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4">Getting Started</h2>
        <p class="leading-relaxed">
          To get started with Next.js, simply run: <code class="bg-gray-700 px-2 py-1 rounded">npx create-next-app@latest my-app</code>
        </p>
      </div>
    `,
    slug: 'getting-started-with-nextjs',
    tone: 'Technical',
    wordCount: 250,
    status: 'published',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    created_by: 'Admin'
  },
  {
    id: '2',
    title: 'The Future of Web Development',
    content: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">
          Web development is evolving rapidly with new technologies and frameworks emerging constantly. 
          From AI-powered tools to revolutionary frameworks, the landscape is changing faster than ever.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4">AI in Development</h2>
        <p class="leading-relaxed">
          Artificial Intelligence is transforming how we write code. Tools like GitHub Copilot and similar AI assistants 
          are becoming standard in every developer's toolkit, dramatically increasing productivity.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4">Modern Frameworks</h2>
        <p class="leading-relaxed">
          Frameworks like Next.js, React, Vue, and Angular are making it easier than ever to build complex applications 
          with minimal boilerplate code and excellent performance.
        </p>
      </div>
    `,
    slug: 'future-of-web-development',
    tone: 'Professional',
    wordCount: 300,
    status: 'published',
    created_at: '2024-01-10T14:30:00Z',
    updated_at: '2024-01-10T14:30:00Z',
    created_by: 'Admin'
  },
  {
    id: '3',
    title: 'Building Responsive Designs',
    content: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">
          Responsive design is no longer optional - it's essential for modern web applications. 
          With users accessing websites from devices of all sizes, creating flexible layouts is crucial.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4">Mobile-First Approach</h2>
        <p class="leading-relaxed">
          Start designing for mobile devices first, then scale up for larger screens. This approach ensures 
          your application works well on all devices and provides a better user experience.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4">CSS Grid and Flexbox</h2>
        <p class="leading-relaxed">
          Modern CSS features like Grid and Flexbox make it easier than ever to create responsive layouts 
          without relying on complex frameworks or JavaScript.
        </p>
      </div>
    `,
    slug: 'building-responsive-designs',
    tone: 'Educational',
    wordCount: 280,
    status: 'published',
    created_at: '2024-01-05T09:15:00Z',
    updated_at: '2024-01-05T09:15:00Z',
    created_by: 'Admin'
  }
];

// GET - Get a blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    
    // Find blog post by slug
    const blog = blogs.find(blog => blog.slug === slug);
    
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    
    return NextResponse.json({
      success: true,
      blog
    });
    
  } catch (error: any) {
    console.error('❌ Error fetching blog post by slug:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
} 