import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import ScrollToTop from '@/components/layout/ScrollToTop'
import Footer from '@/components/Footer'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Dev & Debate | Build Digital Presence, Learn & Innovate Together',
  description: 'Dev & Debate empowers creators and businesses with tailored learning programs, digital development services, and strategic support. Build, launch, and grow with confidence — plus discover tools and reviews that inspire fresh ideas.',
  keywords: 'build digital presence, website development services, learn coding online, tech mentorship programs, collaborative digital solutions, innovation and tech consulting, storytelling for brands, code learning community, startup tech support services, grow together, collaborative innovation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-black text-white antialiased ${dmSans.variable}`}>
        <Navbar />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}
