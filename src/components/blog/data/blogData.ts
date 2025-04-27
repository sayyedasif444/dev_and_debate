export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
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
}

// Sample authors
const authors = {
  john: {
    name: "John Doe",
    role: "Lead Developer",
    avatar: "/images/blog/hs-image-2.webp"
  },
  jane: {
    name: "Jane Smith",
    role: "UI/UX Designer",
    avatar: "/images/blog/hs-image-2.webp"
  },
  alex: {
    name: "Alex Johnson",
    role: "AI Specialist",
    avatar: "/images/blog/hs-image-2.webp"
  },
  sophia: {
    name: "Sophia Chen",
    role: "Performance Engineer",
    avatar: "/images/blog/hs-image-2.webp"
  },
  marcus: {
    name: "Marcus Williams",
    role: "UX Specialist",
    avatar: "/images/blog/hs-image-2.webp"
  },
  priya: {
    name: "Priya Patel",
    role: "Cloud Architect",
    avatar: "/images/blog/hs-image-2.webp"
  },
  jordan: {
    name: "Jordan Lee",
    role: "Frontend Developer",
    avatar: "/images/blog/hs-image-2.webp"
  }
};

// Sample blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development: AI-Powered Interfaces',
    slug: 'future-web-development-ai-interfaces',
    excerpt: 'Explore how artificial intelligence is revolutionizing the way we build and interact with web applications.',
    content: 'Full content here...',
    category: 'Technology',
    coverImage: '/images/hs-image-2.webp',
    author: {
      name: authors.alex.name,
      role: authors.alex.role,
      avatar: authors.alex.avatar
    },
    publishedAt: '2023-11-15',
    featured: true
  },
  {
    id: '2',
    title: 'Optimizing React Performance: Advanced Techniques',
    slug: 'optimizing-react-performance-advanced',
    excerpt: 'Learn advanced optimization strategies to make your React applications lightning fast.',
    content: 'Full content here...',
    category: 'Development',
    coverImage: '/images/hs-image-1.webp',
    author: {
      name: authors.sophia.name,
      role: authors.sophia.role,
      avatar: authors.sophia.avatar
    },
    publishedAt: '2023-10-28'
  },
  {
    id: '3',
    title: 'Designing for Accessibility: A Comprehensive Guide',
    slug: 'designing-accessibility-comprehensive-guide',
    excerpt: 'A deep dive into creating inclusive web experiences that work for everyone.',
    content: 'Full content here...',
    category: 'Design',
    coverImage: '/images/hs-image-2.webp',
    author: {
      name: authors.marcus.name,
      role: authors.marcus.role,
      avatar: authors.marcus.avatar
    },
    publishedAt: '2023-10-12',
    featured: true
  },
  {
    id: '4',
    title: 'The Rise of Edge Computing in Modern Web Architecture',
    slug: 'edge-computing-modern-web-architecture',
    excerpt: 'Discover how edge computing is changing the landscape of web application deployment.',
    content: 'Full content here...',
    category: 'Technology',
    coverImage: '/images/hs-image-1.webp',
    author: {
      name: authors.priya.name,
      role: authors.priya.role,
      avatar: authors.priya.avatar
    },
    publishedAt: '2023-09-20'
  },
  {
    id: '5',
    title: 'CSS Grid vs. Flexbox: When to Use What',
    slug: 'css-grid-vs-flexbox-when-to-use',
    excerpt: 'A practical comparison of CSS layout methods with real-world use cases and examples.',
    content: 'Full content here...',
    category: 'Development',
    coverImage: '/images/hs-image-2.webp',
    author: {
      name: authors.jordan.name,
      role: authors.jordan.role,
      avatar: authors.jordan.avatar
    },
    publishedAt: '2023-09-05',
    featured: true
  },
  {
    id: '6',
    title: 'Building Scalable Microservices with Node.js',
    slug: 'building-scalable-microservices-nodejs',
    excerpt: 'A guide to creating maintainable and scalable microservice architectures using Node.js and modern tools.',
    content: 'Full content here...',
    category: 'Development',
    coverImage: '/images/hs-image-1.webp',
    author: {
      name: authors.john.name,
      role: authors.john.role,
      avatar: authors.john.avatar
    },
    publishedAt: '2023-08-22'
  },
  {
    id: '7',
    title: 'The Psychology of User Experience Design',
    slug: 'psychology-user-experience-design',
    excerpt: 'Understand how psychological principles can enhance your UX design and create more engaging digital experiences.',
    content: 'Full content here...',
    category: 'Design',
    coverImage: '/images/hs-image-2.webp',
    author: {
      name: authors.jane.name,
      role: authors.jane.role,
      avatar: authors.jane.avatar
    },
    publishedAt: '2023-08-15',
    featured: true
  },
  {
    id: '8',
    title: 'Blockchain Beyond Cryptocurrency: Real-World Applications',
    slug: 'blockchain-beyond-cryptocurrency',
    excerpt: 'Exploring how blockchain technology is being used in various industries beyond just cryptocurrency.',
    content: 'Full content here...',
    category: 'Technology',
    coverImage: '/images/hs-image-1.webp',
    author: {
      name: authors.alex.name,
      role: authors.alex.role,
      avatar: authors.alex.avatar
    },
    publishedAt: '2023-07-28'
  }
];

export const categories = [
  'All',
  'Technology',
  'Development',
  'Design',
  'Business',
  'Marketing'
];

// Helper function to get featured posts
export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

// Helper function to get a post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Helper function to get related posts
export const getRelatedPosts = (currentPostId: string, limit = 3): BlogPost[] => {
  return blogPosts
    .filter(post => post.id !== currentPostId)
    .slice(0, limit);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  if (category.toLowerCase() === 'all') {
    return blogPosts;
  }
  return blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
};

export const searchPosts = (query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.category.toLowerCase().includes(lowercaseQuery)
  );
}; 