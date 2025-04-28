import './globals.css'
import { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import ClientLayout from '@/components/layout/ClientLayout'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://devanddebate.com'),
  title: {
    template: '%s | Dev & Debate',
    default: 'Dev & Debate - Digital Development & Learning Community'
  },
  description: 'Dev & Debate is a digital development and learning community focused on innovative solutions and knowledge sharing.',
  openGraph: {
    title: 'Dev & Debate - Digital Development & Learning Community',
    description: 'Dev & Debate is a digital development and learning community focused on innovative solutions and knowledge sharing.',
    url: 'https://devanddebate.com',
    siteName: 'Dev & Debate',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dev & Debate',
    description: 'Digital Development & Learning Community',
    creator: '@devanddebate',
  },
  robots: {
    index: true,
    follow: true,
  },
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
