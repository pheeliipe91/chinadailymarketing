import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { WebVitals } from '@/components/providers/web-vitals'
import { UmamiAnalytics } from '@/components/analytics/umami-analytics'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'China Daily Marketing - Insights Reais de Shanghai',
  description: 'Insights autênticos sobre o mercado chinês por Phelipe Xavier, que vive em Shanghai há 5 anos. Conteúdo prático sobre economia, tecnologia e negócios na China.',
  keywords: 'China, marketing China, Shanghai, economia chinesa, tecnologia, negócios China, KOLs, Metaso, mercado chinês',
  authors: [{ name: 'Phelipe Xavier' }],
  creator: 'Phelipe Xavier',
  publisher: 'China Daily Marketing',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'China Daily Marketing - Insights Reais de Shanghai',
    description: 'Insights autênticos sobre o mercado chinês por Phelipe Xavier, que vive em Shanghai há 5 anos.',
    url: 'https://chinadailymarketing.com',
    siteName: 'China Daily Marketing',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'China Daily Marketing',
    description: 'Insights autênticos sobre o mercado chinês por Phelipe Xavier, que vive em Shanghai há 5 anos.',
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
          <WebVitals />
          {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
            <UmamiAnalytics
              websiteId={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
              src={process.env.NEXT_PUBLIC_UMAMI_SRC}
            />
          )}
        </ThemeProvider>
      </body>
    </html>
  )
}
