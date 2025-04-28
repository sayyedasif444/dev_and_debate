import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Dev & Debate',
  description: 'Learn about Dev & Debate — our mission, values, and the team behind our innovative approach to digital development and learning.',
  keywords: 'about Dev and Debate, our mission, team values, digital development, learning community, tech innovation, our story',
};

export default function AboutLayout({
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