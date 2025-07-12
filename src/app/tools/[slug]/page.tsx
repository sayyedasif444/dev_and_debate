import Link from 'next/link';
import Image from 'next/image';
import ToolPageClient from './ToolPageClient';

// Tool data - in a real app, this would come from a database or API
const toolsData = {
  'code-snippets': {
    name: 'Code Snippets Manager',
    subtitle: 'Store, Organize, and Reuse Your Best Code',
    description: 'The Code Snippets Manager allows developers to save and organize code snippets for quick reuse. Stop reinventing the wheel or searching for that piece of code you wrote months ago.',
    image: '/images/tools/code-snippets.jpg',
    features: [
      'One-click saving from any IDE or browser',
      'Intelligent tagging and categorization',
      'Search by language, tag, or content',
      'Syntax highlighting for over 40 languages',
      'Share snippets with team members',
      'Cloud sync across all your devices'
    ],
    useCases: [
      'Save commonly used functions for quick reuse',
      'Build a personal library of coding solutions',
      'Share useful code with team members',
      'Track your coding patterns over time'
    ],
    callToAction: 'Start Saving Snippets',
    ctaLink: '/tools/code-snippets/app'
  },
  'pm-templates': {
    name: 'Project Management Templates',
    subtitle: 'Ready-Made Templates to Streamline Your Workflow',
    description: 'Our Project Management Templates provide pre-built frameworks for Agile, Scrum, and other methodologies. Get your projects up and running in minutes instead of days.',
    image: '/images/tools/pm-templates.jpg',
    features: [
      'Templates for Agile, Scrum, Kanban, and more',
      'Customizable boards and workflows',
      'Pre-populated tasks and milestones',
      'Integration with popular PM tools',
      'Collaboration features for teams',
      'Export to various formats'
    ],
    useCases: [
      'Quickly set up new project frameworks',
      'Standardize processes across multiple projects',
      'Onboard new team members faster',
      'Adapt established methodologies to your needs'
    ],
    callToAction: 'Browse Templates',
    ctaLink: '/tools/pm-templates/gallery'
  },
  'seo-audit': {
    name: 'SEO Audit Helper',
    subtitle: 'Identify and Fix SEO Issues in Minutes',
    description: 'Our SEO Audit tool scans your website and identifies potential SEO issues and opportunities. Get actionable insights and recommendations to improve your search rankings.',
    image: '/images/tools/seo-audit.jpg',
    features: [
      'Comprehensive site scan and analysis',
      'Keyword optimization suggestions',
      'Meta tag and content evaluation',
      'Backlink analysis',
      'Mobile-friendliness check',
      'Page speed performance insights'
    ],
    useCases: [
      'Regular SEO health checks for your website',
      'Identify areas for improvement before a launch',
      'Track progress after implementing changes',
      'Competitive analysis against other sites'
    ],
    callToAction: 'Start Free Scan',
    ctaLink: '/tools/seo-audit/scan'
  },
  'content-ideas': {
    name: 'Content Idea Generator',
    subtitle: 'Never Run Out of Content Ideas Again',
    description: 'The Content Idea Generator uses AI to help you brainstorm engaging topics for blog posts, social media, videos, and more. Break through creative blocks and keep your content fresh.',
    image: '/images/tools/content-ideas.jpg',
    features: [
      'AI-powered topic suggestion engine',
      'Industry-specific content recommendations',
      'Trending topic identification',
      'Title variations and optimization',
      'Content calendar integration',
      'Audience engagement predictions'
    ],
    useCases: [
      'Plan your content calendar for months ahead',
      'Find fresh angles on popular topics',
      'Discover untapped content opportunities in your niche',
      'Generate ideas tailored to different platforms'
    ],
    callToAction: 'Generate Ideas Now',
    ctaLink: '/tools/content-ideas/generator'
  },
  'portfolio-builder': {
    name: 'Portfolio Builder Mini-App',
    subtitle: 'Create a Stunning Portfolio Without Coding',
    description: 'Our Portfolio Builder lets you create a professional portfolio website without writing a single line of code. Choose from beautiful templates, customize to your liking, and publish in minutes.',
    image: '/images/tools/portfolio-builder.jpg',
    features: [
      'Drag-and-drop interface',
      'Professional templates for different industries',
      'Customizable colors, fonts, and layouts',
      'Mobile-responsive design',
      'Built-in SEO optimization',
      'One-click deployment'
    ],
    useCases: [
      'Create a professional online presence',
      'Showcase your work to potential clients',
      'Build a digital resume for job applications',
      'Launch a personal brand online'
    ],
    callToAction: 'Start Building',
    ctaLink: '/tools/portfolio-builder/app'
  },
  'code-review': {
    name: 'Code Review Assistant',
    subtitle: 'Improve Your Code Quality Automatically',
    description: 'The Code Review Assistant analyzes your code to find potential bugs, security issues, and adherence to best practices. Get suggestions for improvements before you commit.',
    image: '/images/tools/code-review.jpg',
    features: [
      'Static code analysis for multiple languages',
      'Security vulnerability detection',
      'Style guide enforcement',
      'Performance optimization suggestions',
      'Integration with GitHub, GitLab, and Bitbucket',
      'CI/CD pipeline compatibility'
    ],
    useCases: [
      'Pre-commit code quality checks',
      'Team-wide code standard enforcement',
      'Learning best practices through suggestions',
      'Identifying security risks before deployment'
    ],
    callToAction: 'Analyze Your Code',
    ctaLink: '/tools/code-review/analyzer'
  }
};

// Required for static export - generate static params for all known tools
export async function generateStaticParams() {
  return Object.keys(toolsData).map((slug) => ({
    slug: slug,
  }));
}

// Required for static export
export const dynamic = 'force-static';
export const revalidate = false;

export default function ToolPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const toolData = toolsData[slug as keyof typeof toolsData];

  if (!toolData) {
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
          
          <h1 className="text-3xl font-bold text-red-500 mb-4">Tool Not Found</h1>
          <p className="text-xl text-gray-400 mb-8">Sorry, we couldn't find the tool you're looking for.</p>
          <Link
            href="/tools"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore Our Tools
          </Link>
        </div>
      </div>
    );
  }

  return <ToolPageClient toolData={toolData} />;
} 