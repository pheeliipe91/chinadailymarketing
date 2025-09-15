import { Metadata } from 'next'
import { DeepDiveClient } from './deep-dive-client'

export const metadata: Metadata = {
  title: 'Projeto Mergulho - Liderança em Marketing | China Daily Marketing',
  description: 'Programa seletivo de mentoria para profissionais de marketing que querem evoluir como líderes. Apenas 10 vagas disponíveis.',
  keywords: 'mentoria liderança, liderança marketing, desenvolvimento liderança, gestão pessoas, phelipe xavier, projeto mergulho',
  openGraph: {
    title: 'Projeto Mergulho - Liderança em Marketing',
    description: 'Programa seletivo de mentoria para profissionais de marketing que querem evoluir como líderes.',
    type: 'website',
  },
}

export default function DeepDivePage() {
  return <DeepDiveClient />
}
