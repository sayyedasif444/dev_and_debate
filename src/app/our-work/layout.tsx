import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work | Dev & Debate',
  description: 'Explore our innovative tools and projects at Dev & Debate. From code snippets to SEO optimization, discover how we help developers build better digital solutions.',
  keywords: 'Dev and Debate tools, our projects, code snippets, SEO optimization, developer tools, digital solutions, our work',
};

export default function OurWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      {children}
    </div>
  );
} 