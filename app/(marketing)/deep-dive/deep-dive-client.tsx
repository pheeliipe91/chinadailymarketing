"use client"

import { useState } from 'react'
import { 
  Target, 
  Users, 
  Calendar, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Mail, 
  Phone, 
  Loader2,
  AlertCircle,
  TrendingUp,
  Lightbulb,
  Award,
  Clock,
  UserCheck,
  Building2,
  Briefcase,
  Send
} from 'lucide-react'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  position: string
  experience: string
  teamSize: string
  challenges: string
  goals: string
  motivation: string
}

export function DeepDiveClient() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    experience: '',
    teamSize: '',
    challenges: '',
    goals: '',
    motivation: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const testimonials = [
    {
      name: "Mayara da Silva Barbosa",
      role: "Analista de Marketing Pleno/Sênior",
      content: "Phelipe, a sua liderança teve um impacto fundamental no meu crescimento e amadurecimento profissional dentro do marketing. A forma como você utilizava metodologias e frameworks para estruturar as estratégias e ações foi essencial para o meu desenvolvimento.",
      highlight: "Aprendi que as entregas e resultados são importantes, mas é preciso criar relacionamento com as outras áreas do negócio e stakeholders."
    },
    {
      name: "Leonardo Gama",
      role: "Analista de Marketing de Conteúdo",
      content: "Sem dúvida trabalhar com você fez com que eu visse o que é ser um gestor realmente. A transparência é algo realmente muito forte e presente em sua gestão.",
      highlight: "Senti que a minha carreira profissional como pessoa era mais importante para você do que qualquer outra coisa."
    },
    {
      name: "Daniel Ferreira",
      role: "Analista de Marketing e Growth",
      content: "Phelipe me ensinou a ter uma liderança humana. Foi a liderança mais humanizada que tive em minha carreira, que se importa com resultados e métricas, mas sobretudo com nossa saúde mental.",
      highlight: "A liderança do Phelipe me fez evoluir tecnicamente e me estimulou a pensar estrategicamente, não apenas operar."
    }
  ]

  const benefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Liderança Estratégica",
      description: "Desenvolva visão estratégica e capacidade de tomar decisões de alto impacto"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Gestão de Pessoas",
      description: "Aprenda a liderar equipes com transparência, empatia e foco em resultados"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Growth Mindset",
      description: "Cultive mentalidade de crescimento e capacidade de adaptação a desafios"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Desenvolvimento Pessoal",
      description: "Evolua como profissional e pessoa, com autoconhecimento e propósito claro"
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/deep-dive-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          position: '',
          experience: '',
          teamSize: '',
          challenges: '',
          goals: '',
          motivation: ''
        })
      } else {
        setError(data.error || 'Erro ao enviar formulário')
      }
    } catch (error) {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🎉 Aplicação Enviada!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Obrigado por demonstrar interesse no Projeto Mergulho! Phelipe entrará em contato em breve para alinharmos sua jornada.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Próximos Passos
              </h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent-red rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Análise do seu perfil e objetivos profissionais
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent-red rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Call de alinhamento para estruturar seus OKRs personalizados
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent-red rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Início da jornada Projeto Mergulho com foco em resultados
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-red/5 to-orange-500/5" />
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 mb-8 shadow-lg">
              <UserCheck className="h-5 w-5 text-accent-red" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Programa Seletivo</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Projeto Mergulho
              <span className="block text-gradient">Liderança em Marketing</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Programa seletivo de mentoria para profissionais de marketing que querem 
              <strong> evoluir como líderes</strong>. Apenas 10 vagas disponíveis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Calendar className="h-5 w-5" />
                <span>4 meses</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Clock className="h-5 w-5" />
                <span>1 call por semana</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Users className="h-5 w-5" />
                <span>Apenas 10 vagas</span>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 mb-16">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                <span className="font-semibold text-amber-800 dark:text-amber-200">Processo Seletivo</span>
              </div>
              <p className="text-amber-700 dark:text-amber-300">
                Esta é uma aplicação, não uma inscrição. Nem todos os candidatos serão aprovados. 
                A seleção é feita de maneira estratégica e criteriosa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Phelipe Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Sobre Phelipe Xavier
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Líder experiente com histórico comprovado de desenvolvimento de talentos
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-accent-red to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">PX</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Phelipe Xavier</h3>
                    <p className="text-gray-600 dark:text-gray-400">Founder, China Daily Marketing</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Building2 className="h-5 w-5 text-accent-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Experiência Executiva</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        +8 anos liderando equipes de marketing e growth em startups e scale-ups
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-accent-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Desenvolvimento de Talentos</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Mentorou +50 profissionais, com 85% promovidos a posições de liderança
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-5 w-5 text-accent-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Resultados Comprovados</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Liderou equipes que geraram +R$50M em receita através de estratégias de growth
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Briefcase className="h-5 w-5 text-accent-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Metodologia Própria</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Desenvolveu frameworks únicos para liderança humanizada e growth sustentável
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-accent-red/10 to-orange-500/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Filosofia de Liderança
                </h3>
                <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic mb-6">
                  "Acredito que a liderança verdadeira não está em comandar, mas em capacitar. 
                  Meu papel é criar um ambiente onde cada pessoa pode descobrir e desenvolver 
                  seu potencial máximo, sempre com transparência, empatia e foco em resultados."
                </blockquote>
                <p className="text-gray-600 dark:text-gray-400">
                  — Phelipe Xavier
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                  <div className="text-3xl font-bold text-accent-red mb-2">+50</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Profissionais Mentorados</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                  <div className="text-3xl font-bold text-accent-red mb-2">85%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Taxa de Promoção</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                  <div className="text-3xl font-bold text-accent-red mb-2">8+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Anos de Liderança</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                  <div className="text-3xl font-bold text-accent-red mb-2">R$50M+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Receita Gerada</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              O que você vai desenvolver
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Competências essenciais para se tornar um líder em marketing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-accent-red/10 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-accent-red">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              O que dizem sobre o Phelipe
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Depoimentos reais de profissionais que transformaram suas carreiras
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  "{testimonial.highlight}"
                </blockquote>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  {testimonial.content.slice(0, 200)}...
                </p>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-accent-red to-orange-500 px-8 py-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Estrutura do Programa
              </h2>
              <p className="text-xl text-white/90">
                Investimento único para transformação profissional
              </p>
            </div>
            
            <div className="px-8 py-12">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  R$ 5.700
                  <span className="text-2xl text-gray-500 dark:text-gray-400">/programa</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Pagamento único para 4 meses de mentoria
                </p>
              </div>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">4 meses de mentoria intensiva</div>
                    <div className="text-gray-600 dark:text-gray-400">Acesso direto ao Phelipe por 16 semanas</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">16 sessões de 1 hora</div>
                    <div className="text-gray-600 dark:text-gray-400">1 call semanal focada em seus desafios específicos</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Comunidade exclusiva</div>
                    <div className="text-gray-600 dark:text-gray-400">Acesso à comunidade privada dos 10 selecionados</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Material exclusivo</div>
                    <div className="text-gray-600 dark:text-gray-400">Frameworks, templates e metodologias desenvolvidas pelo Phelipe</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Certificado de conclusão</div>
                    <div className="text-gray-600 dark:text-gray-400">Certificado oficial ao completar o programa</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Users className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <span className="font-semibold text-red-800 dark:text-red-200">Vagas Limitadas</span>
                </div>
                <p className="text-red-700 dark:text-red-300 text-sm">
                  Apenas 10 profissionais serão selecionados para esta turma
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Candidate-se ao Programa
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Preencha a aplicação detalhada. Apenas candidatos qualificados serão selecionados.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 inline-block">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>Processo seletivo:</strong> Análise de aplicação → Entrevista → Seleção final
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Empresa atual *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Nome da empresa"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cargo atual *
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Seu cargo atual"
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nível de experiência *
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Selecione seu nível</option>
                    <option value="junior">Júnior (0-2 anos)</option>
                    <option value="pleno">Pleno (2-5 anos)</option>
                    <option value="senior">Sênior (5-8 anos)</option>
                    <option value="especialista">Especialista (8+ anos)</option>
                    <option value="lideranca">Liderança</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tamanho da equipe que você lidera ou pretende liderar *
                </label>
                <select
                  id="teamSize"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Selecione o tamanho</option>
                  <option value="nenhuma">Não lidero equipe ainda</option>
                  <option value="1-3">1-3 pessoas</option>
                  <option value="4-10">4-10 pessoas</option>
                  <option value="11-20">11-20 pessoas</option>
                  <option value="20+">Mais de 20 pessoas</option>
                </select>
              </div>

              <div>
                <label htmlFor="challenges" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Principais desafios atuais em liderança *
                </label>
                <textarea
                  id="challenges"
                  name="challenges"
                  value={formData.challenges}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Descreva seus principais desafios em liderança e gestão de pessoas..."
                />
              </div>

              <div>
                <label htmlFor="goals" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Objetivos profissionais *
                </label>
                <textarea
                  id="goals"
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Onde você quer chegar profissionalmente nos próximos 2-3 anos?"
                />
              </div>

              <div>
                <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Por que você quer participar deste programa? *
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="O que te motiva a se candidatar para este programa de mentoria?"
                />
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-accent-red to-orange-500 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-accent-red/90 hover:to-orange-500/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Enviando aplicação...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Enviar Aplicação</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Ao enviar, você concorda com o processo seletivo. Nem todas as aplicações serão aprovadas.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
