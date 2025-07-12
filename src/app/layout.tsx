import './globals.css'
import { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import ClientLayout from '@/components/layout/ClientLayout'
import GlobalErrorHandler from '@/components/layout/GlobalErrorHandler'

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
  icons: {
    icon: [
      { url: '/images/logo-main.png', sizes: 'any' },
      { url: '/images/logo-main.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/images/logo-main.png',
  },
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
      <head>
        <link rel="icon" href="/images/logo-main.png" sizes="any" />
        <link rel="icon" href="/images/logo-main.png" type="image/png" />
        <link rel="shortcut icon" href="/images/logo-main.png" />
        <link rel="apple-touch-icon" href="/images/logo-main.png" />
      </head>
      <body 
        className={`min-h-screen bg-black text-white antialiased ${dmSans.variable}`}
        suppressHydrationWarning={true}
      >
        <GlobalErrorHandler />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
