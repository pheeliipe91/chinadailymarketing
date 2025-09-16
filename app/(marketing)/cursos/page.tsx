"use client"

import { useState } from 'react'
import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'
import { Star, Clock, Play, Users, CheckCircle, Shield, Award, Headphones, Globe, Video } from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  price: number
  duration: string
  lessons: number
  students: string
  rating: number
  preview: string
  badge?: string
  highlights: string[]
}

interface CourseFeature {
  title: string
  description: string
  icon: any
}

const courses: Course[] = [
  {
    id: 'metaso-research',
    title: 'Metaso: Pesquisas Profundas na China',
    description: 'Domine a ferramenta de pesquisa mais poderosa da China e encontre insights únicos para seus projetos.',
    price: 1297,
    duration: '4h 30min',
    lessons: 12,
    students: '150+ alunos',
    rating: 4.9,
    preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    badge: 'Mais Vendido',
    highlights: [
      'Técnicas avançadas de pesquisa no Metaso',
      'Como encontrar dados exclusivos sobre empresas chinesas',
      'Análise de tendências e comportamento do consumidor',
      'Ferramentas complementares para pesquisa profunda',
      'Cases práticos de pesquisas bem-sucedidas',
      'Automação de coleta de dados'
    ]
  },
  {
    id: 'kols-china',
    title: 'KOLs: Influenciadores na China',
    description: 'Aprenda a identificar, avaliar e trabalhar com Key Opinion Leaders no mercado chinês.',
    price: 1297,
    duration: '3h 45min',
    lessons: 10,
    students: '89+ alunos',
    rating: 4.8,
    preview: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80',
    badge: 'Novo',
    highlights: [
      'Identificação de KOLs relevantes para sua marca',
      'Análise de performance e engajamento',
      'Negociação e gestão de parcerias',
      'Métricas e ROI de campanhas com influenciadores',
      'Plataformas e ferramentas de monitoramento',
      'Estratégias de ativação de KOLs'
    ]
  }
]

const courseFeatures: CourseFeature[] = [
  {
    title: 'Aulas em Vídeo',
    description: 'Conteúdo em alta qualidade com explicações passo a passo',
    icon: Video
  },
  {
    title: 'Certificado',
    description: 'Certificado de conclusão reconhecido no mercado',
    icon: Award
  },
  {
    title: 'Suporte',
    description: 'Tire suas dúvidas diretamente com o instrutor',
    icon: Headphones
  },
  {
    title: 'Acesso Vitalício',
    description: 'Assista quantas vezes quiser, quando quiser',
    icon: Globe
  }
]

export default function CursosPage() {
  const [enrollmentStatus, setEnrollmentStatus] = useState<{[key: string]: 'idle' | 'loading' | 'success' | 'error'}>({})

  const handleEnrollment = async (course: Course) => {
    setEnrollmentStatus(prev => ({ ...prev, [course.id]: 'loading' }))
    
    try {
      // Simular processo de inscrição
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Aqui seria integrado com sistema de pagamento
      console.log('Inscrevendo no curso:', course.title)
      alert(`Redirecionando para pagamento do curso: ${course.title}\nValor: R$ ${course.price.toLocaleString('pt-BR')}`)
      
      setEnrollmentStatus(prev => ({ ...prev, [course.id]: 'success' }))
    } catch (error) {
      console.error('Erro na inscrição:', error)
      setEnrollmentStatus(prev => ({ ...prev, [course.id]: 'error' }))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent-red/5 to-orange-500/5">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-red/10 mb-6">
              <Play className="h-8 w-8 text-accent-red" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Cursos <span className="text-gradient">Especializados</span>
            </h1>
            <p className="text-xl text-foreground-secondary dark:text-foreground-dark-secondary max-w-3xl mx-auto">
              Cursos práticos e aprofundados sobre ferramentas e estratégias essenciais para atuar no mercado chinês. 
              Aprenda com quem realmente entende a China.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-border-light dark:border-border-dark">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-accent-red">{courses.length}</p>
              <p className="text-sm text-foreground-secondary dark:text-foreground-dark-secondary">Cursos Disponíveis</p>
            </div>
            <div>
              <p className="text-3xl font-bold">156+</p>
              <p className="text-sm text-foreground-secondary dark:text-foreground-dark-secondary">Alunos Ativos</p>
            </div>
            <div>
              <p className="text-3xl font-bold">4.8★</p>
              <p className="text-sm text-foreground-secondary dark:text-foreground-dark-secondary">Avaliação Média</p>
            </div>
            <div>
              <p className="text-3xl font-bold">7 dias</p>
              <p className="text-sm text-foreground-secondary dark:text-foreground-dark-secondary">Garantia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">O que você recebe</h2>
            <p className="text-lg text-foreground-secondary dark:text-foreground-dark-secondary">
              Cada curso inclui tudo que você precisa para dominar o assunto
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courseFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-red/10 mb-4">
                    <Icon className="h-6 w-6 text-accent-red" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-foreground-secondary dark:text-foreground-dark-secondary">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Cursos Disponíveis</h2>
            <p className="text-lg text-foreground-secondary dark:text-foreground-dark-secondary">
              Escolha o curso que mais se adequa aos seus objetivos profissionais
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* Course Image */}
                <div className="relative h-48 bg-gradient-to-br from-accent-red/10 to-orange-500/10">
                  <img 
                    src={course.preview} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {course.badge && (
                    <div className="absolute top-4 left-4 bg-accent-red text-white px-3 py-1 rounded-full text-sm font-medium">
                      {course.badge}
                    </div>
                  )}
                </div>
                
                {/* Course Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-foreground-secondary">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Play className="h-4 w-4" />
                        <span>{course.lessons} aulas</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
                  <p className="text-foreground-secondary dark:text-foreground-dark-secondary mb-6">
                    {course.description}
                  </p>
                  
                  {/* Course Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">O que você vai aprender:</h4>
                    <ul className="space-y-2">
                      {course.highlights.slice(0, 3).map((highlight, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-accent-red">
                        R$ {course.price.toLocaleString('pt-BR')}
                      </div>
                      <div className="text-sm text-foreground-secondary">
                        Pagamento único
                      </div>
                    </div>
                    <button 
                      onClick={() => handleEnrollment(course)}
                      className="bg-accent-red hover:bg-accent-red/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Inscrever-se
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-6">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Garantia de 7 dias</h2>
              <p className="text-lg text-foreground-secondary dark:text-foreground-dark-secondary mb-8">
                Não ficou satisfeito? Devolvemos 100% do seu dinheiro em até 7 dias após a compra, 
                sem perguntas e sem burocracia.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-accent-red mb-2">7 dias</div>
                  <div className="text-sm text-foreground-secondary">Para solicitar reembolso</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent-red mb-2">100%</div>
                  <div className="text-sm text-foreground-secondary">Do valor devolvido</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent-red mb-2">1h</div>
                  <div className="text-sm text-foreground-secondary">Mentoria bônus inclusa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  )
}
