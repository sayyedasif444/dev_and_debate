import type { Metadata } from 'next';
import PolicyLayout from '@/components/policy/PolicyLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy | Dev & Debate',
  description: 'Our privacy policy and data protection practices at Dev & Debate.',
};

export default function PrivacyPolicy() {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      content: (
        <ul className="list-disc list-inside text-gray-300 space-y-3">
          <li className="mb-2">
            <span className="font-medium text-gray-200">Personal Information:</span>
            <br />
            Name, email address, and any information you provide via contact forms, subscriptions, or scheduling.
          </li>
          <li className="mb-2">
            <span className="font-medium text-gray-200">Usage Data:</span>
            <br />
            Analytics about how you use our site, including pages visited, time spent, and interactions made.
          </li>
          <li className="mb-2">
            <span className="font-medium text-gray-200">Cookies & Technologies:</span>
            <br />
            Small data files and similar technologies to enhance your browsing experience and collect usage data.
          </li>
        </ul>
      ),
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">We use your information for the following purposes:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-3">
            <li>To provide and improve our services</li>
            <li>To respond to your inquiries and schedule consultations</li>
            <li>To send updates about new content and services (with your consent)</li>
            <li>To analyze usage patterns and enhance user experience</li>
            <li>To maintain the security of our platform</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'your-choices',
      title: 'Your Rights & Choices',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">You have several rights regarding your personal data:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-3">
            <li>Access and receive a copy of your data</li>
            <li>Correct or update your information</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
            <li>Disable cookies through browser settings</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'data-security',
      title: 'Data Security',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            We implement robust security measures to protect your information:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-3">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and updates</li>
            <li>Access controls and authentication measures</li>
            <li>Employee training on data protection</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'contact',
      title: 'Contact Us',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            If you have questions about your data or this policy, please reach out:
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
            <p className="text-gray-300">
              Email:{' '}
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
      title="Privacy Policy"
      description="We respect your privacy and are committed to protecting your personal information. Learn how we collect, use, and safeguard your data."
      effectiveDate="April 27, 2025"
      sections={sections}
    />
  );
} 