import { Metadata } from 'next';
import ServicesContent from '@/components/services/ServicesContent';

export const metadata: Metadata = {
  title: 'Services | Dev & Debate',
  description: "Build, design, and grow with Dev & Debate. We offer web development, mobile apps, branding, digital marketing, mentorship, and creative insights — helping you turn ideas into reality with clarity and innovation.",
  keywords: 'web development, mobile app development, software solutions, design, digital marketing, mentorship, creative reviews, developer tools',
};

export default function ServicesPage() {
  return <ServicesContent />;
} 