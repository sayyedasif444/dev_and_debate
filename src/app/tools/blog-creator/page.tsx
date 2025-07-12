'use client';

import { useState } from 'react';
import BlogCreationForm from '@/components/blog/BlogCreationForm';
import BackgroundPattern from '@/components/ui/BackgroundPattern';

interface BlogContent {
  title: string;
  content: string;
}

export default function BlogCreatorTool() {
  const [generatedBlog, setGeneratedBlog] = useState<BlogContent | null>(null);
  const [creditsLeft, setCreditsLeft] = useState(2); // Free tier: 2 blogs per day

  const handleBlogGenerated = (blog: BlogContent) => {
    setGeneratedBlog(blog);
    setCreditsLeft(prev => Math.max(0, prev - 1));
  };

  const handleDownload = (format: 'html' | 'pdf') => {
    if (!generatedBlog) return;

    if (format === 'html') {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${generatedBlog.title}</title>
          <meta charset="utf-8">
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 2rem; }
            h1 { color: #1a1a1a; }
            p { color: #333; }
          </style>
        </head>
        <body>
          <h1>${generatedBlog.title}</h1>
          ${generatedBlog.content}
        </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${generatedBlog.title.toLowerCase().replace(/\s+/g, '-')}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // TODO: Implement PDF download
      alert('PDF download coming soon!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative">
      <BackgroundPattern />
      
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Blog Creator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform your ideas into well-written blog posts in seconds. Just describe your topic,
            and let AI do the heavy lifting.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <BlogCreationForm
                onBlogGenerated={handleBlogGenerated}
                creditsLeft={creditsLeft}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              {generatedBlog ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {generatedBlog.title}
                    </h2>
                    <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: generatedBlog.content }} />
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Download Options
                    </h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleDownload('html')}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Download HTML
                      </button>
                      <button
                        onClick={() => handleDownload('pdf')}
                        className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Your generated blog post will appear here
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 