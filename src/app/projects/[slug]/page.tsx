import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import ProjectPageClient from './ProjectPageClient';

// Project data - in a real app, this would come from a database or API
const projectsData = {
  'quicklaunch': {
    name: 'QuickLaunch – Portfolio Starter Pack',
    tagline: 'Launch your digital presence in hours, not weeks',
    description: 'QuickLaunch is a ready-to-deploy portfolio system for freelancers and small businesses who need to establish their online presence quickly without sacrificing quality or customization.',
    challenge: 'Many creators and freelancers struggle to set up professional websites that accurately represent their work. Traditional website builders are too generic, while custom development is time-consuming and expensive.',
    solution: 'We created QuickLaunch as a middle-ground solution - professional-grade templates specifically designed for portfolios, with smart customization options that require zero coding knowledge.',
    image: '/images/projects/quicklaunch.jpg',
    gallery: [
      '/images/projects/quicklaunch-1.jpg',
      '/images/projects/quicklaunch-2.jpg',
      '/images/projects/quicklaunch-3.jpg'
    ],
    results: [
      '73% reduction in time to launch compared to custom builds',
      '89% of users successfully launched within 24 hours',
      '4.8/5 average user satisfaction rating',
      'Used by over 3,000 freelancers and small agencies'
    ],
    techStack: ['Next.js', 'TailwindCSS', 'Framer Motion', 'Vercel'],
    features: [
      'Pre-built themes optimized for different industries',
      'Content management system with visual editor',
      'Contact forms with spam protection',
      'Analytics dashboard',
      'SEO optimization tools',
      'Mobile-responsive layouts'
    ],
    testimonial: {
      quote: "QuickLaunch let me create a stunning portfolio in just one evening. I had a client meeting the next day, and they were blown away by how professional my site looked.",
      author: "Shoaib Shaikh",
      title: "Founder, Adorn Media"
    },
    callToAction: 'Try QuickLaunch',
    ctaLink: '/projects/quicklaunch/demo'
  },
  'devmetrics': {
    name: 'DevMetrics Dashboard',
    tagline: 'Track your growth as a developer with real metrics',
    description: 'DevMetrics is an interactive analytics platform that helps developers track their performance, growth, and learning metrics across projects and time periods.',
    challenge: 'Developers often lack clear visibility into their own progress and performance. While they track metrics for their applications, they rarely have effective systems to track their own growth and productivity.',
    solution: 'DevMetrics offers a comprehensive dashboard that integrates with GitHub, GitLab, VS Code, and other developer tools to automatically generate insights on coding patterns, skill development, and productivity trends.',
    image: '/images/projects/devmetrics.jpg',
    gallery: [
      '/images/projects/devmetrics-1.jpg',
      '/images/projects/devmetrics-2.jpg',
      '/images/projects/devmetrics-3.jpg'
    ],
    results: [
      'Over 5,000 active users in the first three months',
      '42% average increase in productivity reported by users',
      'Featured in multiple developer conferences',
      'Adopted by 3 coding bootcamps for student tracking'
    ],
    techStack: ['React', 'D3.js', 'Firebase', 'TypeScript'],
    features: [
      'GitHub and GitLab integration',
      'Code complexity analysis',
      'Language and framework usage tracking',
      'Productivity patterns',
      'Learning recommendation engine',
      'Team performance comparisons'
    ],
    testimonial: {
      quote: "DevMetrics showed me that I was spending too much time debugging and not enough time planning. After adjusting my approach based on the insights, my productivity increased significantly.",
      author: "Huzefa",
      title: "Lead Developer, Darbar Webs"
    },
    callToAction: 'Explore DevMetrics',
    ctaLink: '/projects/devmetrics/demo'
  },
  'creatorspace': {
    name: 'CreatorSpace Community',
    tagline: 'Connect, collaborate, and grow with fellow creators',
    description: 'CreatorSpace is a collaborative platform where creators can connect, share their work, receive feedback, and collaborate on projects across various creative disciplines.',
    challenge: 'Independent creators often work in isolation, missing out on valuable feedback, collaboration opportunities, and community support that could elevate their work and mental wellbeing.',
    solution: 'We built CreatorSpace as a dedicated platform for creators to showcase their work, connect with others in their field, receive structured feedback, and find collaboration opportunities - all in a supportive, growth-focused environment.',
    image: '/images/projects/creatorspace.jpg',
    gallery: [
      '/images/projects/creatorspace-1.jpg',
      '/images/projects/creatorspace-2.jpg',
      '/images/projects/creatorspace-3.jpg'
    ],
    results: [
      'Community of 12,000+ active creators',
      '350+ successful collaborations formed through the platform',
      '78% of users report improved quality of work due to community feedback',
      'Featured in Creative Bloq and other industry publications'
    ],
    techStack: ['Vue.js', 'Node.js', 'MongoDB', 'AWS'],
    features: [
      'Customizable portfolio profiles',
      'Structured feedback system',
      'Collaboration matchmaking',
      'Project showcase galleries',
      'Industry events calendar',
      'Learning resources library'
    ],
    testimonial: {
      quote: "The feedback I've received on CreatorSpace has transformed my work. I've connected with collaborators I never would have met otherwise, and found a supportive community that keeps me motivated.",
      author: "Satyam",
      title: "Founder, Platform Commons"
    },
    callToAction: 'Join CreatorSpace',
    ctaLink: '/projects/creatorspace/join'
  }
};

// Required for static export - generate static params for all known projects
export async function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug: slug,
  }));
}

// Required for static export
export const dynamic = 'force-static';
export const revalidate = false;

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const projectData = projectsData[slug as keyof typeof projectsData];

  if (!projectData) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo and Branding */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo-main.png"
                alt="Dev & Debate"
                width={100}
                height={35}
                className="h-8 w-auto"
                priority
              />
              <span className="text-xl font-bold text-white">
                Dev & Debate
              </span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-red-500 mb-4">Project Not Found</h1>
          <p className="text-xl text-gray-400 mb-8">Sorry, we couldn't find the project you're looking for.</p>
          <Link
            href="/our-work"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore Our Projects
          </Link>
        </div>
      </div>
    );
  }

  return <ProjectPageClient projectData={projectData} />;
} 