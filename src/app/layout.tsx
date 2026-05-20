import type { Metadata } from 'next'
import './globals.css'
import 'highlight.js/styles/github-dark.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.flamingo-client.com/landing'),
  title: 'Flamingo - Modern API Client',
  description: 'Flamingo is a modern, lightning-fast API client for developers. Craft requests, inspect responses, and streamline your API workflow.',
  openGraph: {
    title: 'Flamingo - Modern API Client',
    description: 'A lightning-fast API client for developers. Free, open source, and offline-first.',
    images: [{ url: '/og.png', width: 1200, height: 731 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flamingo - Modern API Client',
    description: 'A lightning-fast API client for developers. Free, open source, and offline-first.',
    images: ['/og.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400..700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
