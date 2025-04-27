import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Dev & Debate',
  description: 'Connect with Dev & Debate: Schedule a call or send us a message to kickstart your digital journey. Build, learn, and grow with experts who care.',
  keywords: 'contact dev and debate, schedule call, digital development services, web development contact, tech mentorship contact, collaboration opportunities',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 