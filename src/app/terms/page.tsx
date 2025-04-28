import type { Metadata } from 'next';
import PolicyLayout from '@/components/policy/PolicyLayout';

export const metadata: Metadata = {
  title: 'Terms of Service | Dev & Debate',
  description: 'Terms and conditions for using Dev & Debate services and platform.',
};

export default function TermsOfService() {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            By accessing or using Dev & Debate's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
            <p className="text-gray-300">
              If you do not agree with any of these terms, you are prohibited from using or accessing our services.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'services',
      title: 'Services',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Our services include but are not limited to:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-3">
            <li>Web development and digital solutions</li>
            <li>Educational content and resources</li>
            <li>Community features and discussions</li>
            <li>Tools and utilities for developers</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'user-obligations',
      title: 'User Obligations',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">As a user, you agree to:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-3">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Use the services legally and responsibly</li>
            <li>Respect intellectual property rights</li>
            <li>Not engage in unauthorized access or use</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            All content, features, and functionality are owned by Dev & Debate and are protected by international copyright, trademark, and other intellectual property laws.
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-3">
            <li>You may not copy or modify the content without permission</li>
            <li>Our trademarks may not be used without prior written consent</li>
            <li>Your content remains yours, but we have the right to use it for our services</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'limitations',
      title: 'Limitations',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">We reserve the right to:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-3">
            <li>Modify or discontinue services without notice</li>
            <li>Restrict access to services for any reason</li>
            <li>Remove content that violates these terms</li>
            <li>Take legal action for violations</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <PolicyLayout
      title="Terms of Service"
      description="Please read these terms carefully before using our services. These terms govern your use of Dev & Debate's platform and services."
      effectiveDate="April 27, 2025"
      sections={sections}
    />
  );
} 