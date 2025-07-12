'use client';

import Navbar from '@/components/layout/Navbar'
import ScrollToTop from '@/components/layout/ScrollToTop'
import Footer from '@/components/Footer'
import ClientWrapper from '@/components/layout/ClientWrapper'
import ChatBubble from '@/components/chat/ChatBubble'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientWrapper>
      <Navbar />
      {children}
      <Footer />
      <ScrollToTop />
      <ChatBubble />
    </ClientWrapper>
  )
} 