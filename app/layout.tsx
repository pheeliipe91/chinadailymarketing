import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'China Insights - Análises Profundas sobre a China Moderna',
  description: 'Blog especializado em economia, tecnologia e cultura chinesa. Conteúdo aprofundado e diferenciado sobre o gigante asiático.',
  keywords: 'China, economia chinesa, tecnologia, Shenzhen, cultura chinesa, negócios China',
  authors: [{ name: 'China Insights' }],
  creator: 'China Insights',
  publisher: 'China Insights',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'China Insights - Análises Profundas sobre a China Moderna',
    description: 'Blog especializado em economia, tecnologia e cultura chinesa.',
    url: 'https://chinainsights.com.br',
    siteName: 'China Insights',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'China Insights',
    description: 'Blog especializado em economia, tecnologia e cultura chinesa.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
