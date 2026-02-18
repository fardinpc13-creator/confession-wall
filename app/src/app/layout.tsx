import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import MiniAppProvider from '@/components/MiniAppProvider'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.vercel.app'
  
  return {
    title: 'Confession Wall | Base',
    description: 'Anonymous confessions on Base blockchain',
    keywords: ['base', 'blockchain', 'confessions', 'anonymous', 'web3'],
    openGraph: {
      title: 'Confession Wall',
      description: 'Share anonymous confessions on Base',
      type: 'website',
      url: baseUrl,
      images: [{
        url: `${baseUrl}/preview.png`,
        width: 1200,
        height: 630,
        alt: 'Confession Wall'
      }]
    },
    other: {
      'fc:miniapp': 'true',
      'fc:miniapp:name': 'Confession Wall',
      'fc:miniapp:icon': `${baseUrl}/icon.png`,
      'fc:miniapp:manifest': `${baseUrl}/.well-known/farcaster.json`
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <MiniAppProvider>
          <Providers>{children}</Providers>
        </MiniAppProvider>
      </body>
    </html>
  )
}
