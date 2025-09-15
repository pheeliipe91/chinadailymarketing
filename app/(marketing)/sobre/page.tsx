import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'
import { Award, Globe, Users, Zap, Target, Heart } from 'lucide-react'
import Image from 'next/image'

const timeline = [
  {
    year: '2018',
    title: 'Primeira Viagem à China',
    description: 'Descoberta de um mundo completamente diferente do retratado pela mídia ocidental.'
  },
  {
    year: '2019',
    title: 'Mudança para Shenzhen',
    description: 'Imersão total no ecossistema tecnológico mais dinâmico do mundo.'
  },
  {
    year: '2020',
    title: 'Início do China Insights',
    description: 'Criação do blog para compartilhar conhecimento real sobre a China moderna.'
  },
  {
    year: '2022',
    title: 'Expansão do Conteúdo',
    description: 'Lançamento da biblioteca premium com materiais aprofundados.'
  },
  {
    year: '2024',
    title: 'Comunidade Global',
    description: 'Mais de 50.000 leitores mensais em 30 países diferentes.'
  }
]

const values = [
  {
    icon: Target,
    title: 'Precisão',
    description: 'Informações verificadas e análises baseadas em dados reais.'
  },
  {
    icon: Globe,
    title: 'Perspectiva Global',
    description: 'Conectando o conhecimento oriental com a visão ocidental.'
  },
  {
    icon: Heart,
    title: 'Paixão',
    description: 'Genuíno interesse em compartilhar a verdadeira China.'
  }
]

const stats = [
  { number: '5+', label: 'Anos de Experiência' },
  { number: '200+', label: 'Artigos Publicados' },
  { number: '50K+', label: 'Leitores Mensais' },
  { number: '30+', label: 'Países Alcançados' }
]

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-red/5 to-orange-500/5" />
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Sobre o <span className="text-gradient">China Insights</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground-secondary dark:text-foreground-dark-secondary max-w-3xl mx-auto">
              Desmistificando a China moderna através de análises profundas e experiências reais
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Nossa Missão</h2>
              <p className="text-lg text-foreground-secondary dark:text-foreground-dark-secondary mb-6">
                O China Insights nasceu da necessidade de preencher uma lacuna crítica: a falta de informação 
                qualificada e imparcial sobre a China moderna no mundo lusófono.
              </p>
              <p className="text-lg text-foreground-secondary dark:text-foreground-dark-secondary mb-6">
                Após anos vivendo e trabalhando na China, percebemos que a realidade do país é muito mais 
                complexa, dinâmica e fascinante do que os estereótipos sugerem. Nossa missão é trazer essa 
                perspectiva única para profissionais, empresários e entusiastas que querem entender de verdade 
                o que está acontecendo no gigante asiático.
              </p>
              <p className="text-lg text-foreground-secondary dark:text-foreground-dark-secondary">
                Combinamos experiência local, análise de dados e uma rede de contatos na China para entregar 
                conteúdo que você não encontra em nenhum outro lugar em português.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1508804052814-cd3ba865a116?w=800&q=80"
                alt="Shanghai skyline"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossa Jornada</h2>
            <p className="text-lg text-foreground-secondary dark:text-foreground-dark-secondary">
              De uma curiosidade pessoal a uma plataforma de conhecimento
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-accent-red to-orange-500" />
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={item.year} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="flex-1" />
                  <div className="relative z-10 flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-900 border-4 border-accent-red rounded-full">
                    <span className="text-sm font-bold">{item.year}</span>
                  </div>
                  <div className="flex-1 px-8">
                    <div className={`p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-foreground-secondary dark:text-foreground-dark-secondary">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Valores</h2>
            <p className="text-lg text-foreground-secondary dark:text-foreground-dark-secondary">
              Princípios que guiam nosso trabalho
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-red/10 mb-4">
                    <Icon className="h-8 w-8 text-accent-red" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-foreground-secondary dark:text-foreground-dark-secondary">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-accent-red to-orange-500">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</p>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossa Equipe</h2>
            <p className="text-lg text-foreground-secondary dark:text-foreground-dark-secondary">
              Especialistas apaixonados pela China
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
                  alt="Fundador"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">João Silva</h3>
              <p className="text-sm text-accent-red mb-2">Fundador & Editor-Chefe</p>
              <p className="text-sm text-foreground-secondary dark:text-foreground-dark-secondary">
                10+ anos de experiência na China. Especialista em economia digital e inovação.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
                  alt="Analista"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Maria Chen</h3>
              <p className="text-sm text-accent-red mb-2">Analista Sênior</p>
              <p className="text-sm text-foreground-secondary dark:text-foreground-dark-secondary">
                Sino-brasileira, especialista em cultura e negócios China-Brasil.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
                  alt="Tecnologia"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Pedro Wang</h3>
              <p className="text-sm text-accent-red mb-2">Editor de Tecnologia</p>
              <p className="text-sm text-foreground-secondary dark:text-foreground-dark-secondary">
                Ex-engenheiro da Huawei, cobre o ecossistema tech chinês.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Junte-se a nossa comunidade
          </h2>
          <p className="text-lg text-foreground-secondary dark:text-foreground-dark-secondary mb-8">
            Receba análises exclusivas sobre a China moderna toda semana
          </p>
          <button className="btn-primary">
            Inscrever na Newsletter
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
