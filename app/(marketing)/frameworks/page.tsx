"use client"

import { useState } from 'react'
import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'
import { Download, FileText, Star, Eye, Calendar, Users, CheckCircle, Filter } from 'lucide-react'

interface Framework {
  id: string
  title: string
  description: string
  category: string
  downloadUrl: string
  fileSize: string
  downloads: number
  rating: number
  lastUpdated: string
  preview?: string
  tags: string[]
}

const frameworks: Framework[] = [
  {
    id: 'wechat-marketing-framework',
    title: 'Framework de Marketing no WeChat',
    description: 'Guia completo para estruturar campanhas de marketing no WeChat, incluindo estratégias para Mini Programs, Moments e Official Accounts.',
    category: 'Marketing Digital',
    downloadUrl: '#',
    fileSize: '2.4 MB',
    downloads: 1247,
    rating: 4.9,
    lastUpdated: '2024-01-15',
    tags: ['WeChat', 'Marketing', 'Social Media', 'Mini Programs']
  },
  {
    id: 'kol-selection-framework',
    title: 'Framework de Seleção de KOLs',
    description: 'Metodologia para identificar, avaliar e selecionar Key Opinion Leaders ideais para sua marca no mercado chinês.',
    category: 'Influencer Marketing',
    downloadUrl: '#',
    fileSize: '1.8 MB',
    downloads: 892,
    rating: 4.8,
    lastUpdated: '2024-01-20',
    tags: ['KOLs', 'Influencers', 'Seleção', 'ROI']
  },
  {
    id: 'market-research-framework',
    title: 'Framework de Pesquisa de Mercado China',
    description: 'Estrutura completa para conduzir pesquisas de mercado eficazes na China, usando ferramentas locais e metodologias adaptadas.',
    category: 'Pesquisa',
    downloadUrl: '#',
    fileSize: '3.1 MB',
    downloads: 654,
    rating: 4.7,
    lastUpdated: '2024-01-25',
    tags: ['Pesquisa', 'Mercado', 'Metaso', 'Análise']
  },
  {
    id: 'ecommerce-strategy-framework',
    title: 'Framework de E-commerce na China',
    description: 'Guia estratégico para lançar e escalar operações de e-commerce nas principais plataformas chinesas como Tmall e JD.',
    category: 'E-commerce',
    downloadUrl: '#',
    fileSize: '2.7 MB',
    downloads: 1089,
    rating: 4.8,
    lastUpdated: '2024-01-30',
    tags: ['E-commerce', 'Tmall', 'JD', 'Estratégia']
  }
]

const categories = [
  'Todos',
  'Marketing Digital',
  'Influencer Marketing', 
  'Pesquisa',
  'E-commerce',
  'Estratégia'
]

export default function FrameworksPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  const filteredFrameworks = frameworks.filter(framework => 
    selectedCategory === 'Todos' || framework.category === selectedCategory
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent-red/5 to-orange-500/5">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-red/10 mb-6">
              <FileText className="h-8 w-8 text-accent-red" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="text-gradient">Frameworks</span> Práticos
            </h1>
            <p className="text-xl text-foreground-secondary dark:text-foreground-dark-secondary max-w-3xl mx-auto mb-8">
              Frameworks testados e validados para marketing e negócios na China. 
              Estruturas práticas desenvolvidas com base em experiência real no mercado chinês.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary inline-flex items-center">
                <Download className="mr-2 h-5 w-5" />
                Frameworks
              </button>
              <button className="btn-secondary inline-flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Ver Todos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-border-light dark:border-border-dark">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">{frameworks.length}</div>
              <div className="text-foreground-secondary dark:text-foreground-dark-secondary">Frameworks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">3.2k+</div>
              <div className="text-foreground-secondary dark:text-foreground-dark-secondary">Downloads</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">4.8</div>
              <div className="text-foreground-secondary dark:text-foreground-dark-secondary">Avaliação</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">100%</div>
              <div className="text-foreground-secondary dark:text-foreground-dark-secondary">Gratuito</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-border-light dark:border-border-dark">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Categorias</h2>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-foreground-secondary" />
              <span className="text-sm text-foreground-secondary">Filtrar por categoria</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-accent-red text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frameworks Disponíveis</h2>
            <p className="text-xl text-foreground-secondary dark:text-foreground-dark-secondary">
              Estruturas práticas testadas no mercado chinês
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFrameworks.map((framework) => (
              <div key={framework.id} className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border-light dark:border-border-dark hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent-red/10">
                    <FileText className="h-6 w-6 text-accent-red" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{framework.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{framework.title}</h3>
                <p className="text-foreground-secondary dark:text-foreground-dark-secondary mb-4 line-clamp-3">
                  {framework.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-foreground-secondary dark:text-foreground-dark-secondary rounded-full text-sm">
                    {framework.category}
                  </span>
                  <span className="text-sm text-foreground-secondary">{framework.fileSize}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {framework.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-accent-red/10 text-accent-red rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-foreground-secondary">
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {framework.downloads}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(framework.lastUpdated).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  
                  <button className="btn-primary-sm inline-flex items-center">
                    <Download className="mr-1 h-4 w-4" />
                    Baixar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent-red/5 to-orange-500/5">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-red/10 mb-6">
            <CheckCircle className="h-8 w-8 text-accent-red" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Frameworks Testados na Prática
          </h2>
          <p className="text-xl text-foreground-secondary dark:text-foreground-dark-secondary mb-8 max-w-2xl mx-auto">
            Todos os frameworks foram desenvolvidos e testados em projetos reais no mercado chinês. 
            Estruturas práticas que você pode implementar imediatamente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary inline-flex items-center">
              <Download className="mr-2 h-5 w-5" />
              Baixar Todos os Frameworks
            </button>
            <button className="btn-secondary inline-flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Falar com Especialista
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
