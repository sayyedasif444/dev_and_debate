import type { Metadata } from 'next';
import PolicyLayout from '@/components/policy/PolicyLayout';

export const metadata: Metadata = {
  title: 'Cookie Policy | Dev & Debate',
  description: 'Learn about how we use cookies and similar technologies on Dev & Debate.',
};

export default function CookiePolicy() {
  const sections = [
    {
      id: 'what-are-cookies',
      title: 'What Are Cookies',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-3">
            <li>Remembering your preferences and settings</li>
            <li>Understanding how you use our website</li>
            <li>Improving our services based on your behavior</li>
            <li>Providing personalized content and features</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'types-of-cookies',
      title: 'Types of Cookies We Use',
      content: (
        <div className="space-y-4">
          <ul className="list-none space-y-6">
            <li>
              <h3 className="text-white font-medium mb-2">Essential Cookies</h3>
              <p className="text-gray-300">Required for the website to function properly. These cannot be disabled.</p>
            </li>
            <li>
              <h3 className="text-white font-medium mb-2">Performance Cookies</h3>
              <p className="text-gray-300">Help us understand how visitors interact with our website by collecting anonymous information.</p>
            </li>
            <li>
              <h3 className="text-white font-medium mb-2">Functionality Cookies</h3>
              <p className="text-gray-300">Remember your preferences and settings to enhance your experience.</p>
            </li>
            <li>
              <h3 className="text-white font-medium mb-2">Marketing Cookies</h3>
              <p className="text-gray-300">Used to deliver relevant advertisements and track their effectiveness.</p>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'managing-cookies',
      title: 'Managing Cookies',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">You can control cookies through your browser settings:</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20 space-y-3">
            <p className="text-gray-300">
              <span className="font-medium text-white">Chrome:</span> Settings → Privacy and Security → Cookies
            </p>
            <p className="text-gray-300">
              <span className="font-medium text-white">Firefox:</span> Options → Privacy & Security → Cookies
            </p>
            <p className="text-gray-300">
              <span className="font-medium text-white">Safari:</span> Preferences → Privacy → Cookies
            </p>
            <p className="text-gray-300">
              <span className="font-medium text-white">Edge:</span> Settings → Privacy & Security → Cookies
            </p>
          </div>
          <p className="text-gray-300 mt-4">
            Note: Blocking certain cookies may impact your experience on our website.
          </p>
        </div>
      ),
    },
    {
      id: 'third-party',
      title: 'Third-Party Cookies',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            We use services from trusted third parties that may also set cookies on your device:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-3">
            <li>Google Analytics (website analytics)</li>
            <li>Stripe (payment processing)</li>
            <li>Social media platforms (sharing features)</li>
          </ul>
          <p className="text-gray-300 mt-4">
            These services have their own privacy policies and cookie settings.
          </p>
        </div>
      ),
    },
    {
      id: 'updates',
      title: 'Updates to This Policy',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            We may update this Cookie Policy to reflect changes in our practices or for legal reasons. We will notify you of any material changes.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
            <p className="text-gray-300">
              Questions about our cookie practices? Contact us at{' '}
              <a href="mailto:privacy@devanddebate.com" className="text-blue-400 hover:text-blue-300">
                privacy@devanddebate.com
              </a>
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <PolicyLayout
      title="Cookie Policy"
      description="We use cookies to enhance your experience. Learn about the types of cookies we use and how you can control them."
      effectiveDate="April 27, 2025"
      sections={sections}
    />
  );
} 