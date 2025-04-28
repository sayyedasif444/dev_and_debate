import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import ClientLayout from '@/components/layout/ClientLayout'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Dev & Debate | Build, Learn, and Grow Your Digital Presence',
  description: 'Discover Dev & Debate — where coding, creativity, and collaboration meet. Build your digital presence, learn new skills, and explore creative ideas.',
  keywords: 'web development, digital presence, coding mentorship, build websites, portfolio development, learning coding, creative tech, Dev and Debate',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-black text-white antialiased ${dmSans.variable}`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
