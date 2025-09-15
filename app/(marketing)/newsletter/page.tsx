import { Metadata } from 'next'
import { NewsletterClient } from './newsletter-client'

export const metadata: Metadata = {
  title: 'Newsletter | China Daily Marketing',
  description: 'Receba análises exclusivas sobre o mercado chinês, estratégias de marketing digital e insights sobre WeChat, Weibo e e-commerce na China.',
  keywords: ['newsletter', 'china', 'marketing', 'wechat', 'weibo', 'e-commerce', 'insights'],
  openGraph: {
    title: 'Newsletter China Daily Marketing',
    description: 'Análises semanais sobre o mercado chinês para profissionais de marketing',
    type: 'website',
  },
}

export default function NewsletterPage() {
  return <NewsletterClient />
}
