"use client"

import { useState } from 'react'
import { Mail, CheckCircle, AlertCircle, Loader2, Users, TrendingUp, Globe, Zap } from 'lucide-react'

export function NewsletterClient() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, company }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setEmail('')
        setName('')
        setCompany('')
      } else {
        setError(data.error || 'Erro ao processar inscrição')
      }
    } catch (error) {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const benefits = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Análises Semanais",
      description: "Insights profundos sobre tendências do mercado chinês e oportunidades emergentes"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Estratégias Digitais",
      description: "Táticas comprovadas para WeChat, Weibo, Tmall e outras plataformas chinesas"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Acesso Antecipado",
      description: "Seja o primeiro a receber nossos guias premium e estudos de caso exclusivos"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Comunidade Exclusiva",
      description: "Conecte-se com outros profissionais que estão conquistando o mercado chinês"
    }
  ]

  const stats = [
    { number: "5.000+", label: "Profissionais inscritos" },
    { number: "98%", label: "Taxa de abertura" },
    { number: "150+", label: "Empresas atendidas" },
    { number: "3 anos", label: "De experiência" }
  ]

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🎉 Inscrição Confirmada!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Bem-vindo à comunidade China Daily Marketing! Verifique seu email para confirmar a inscrição.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                O que acontece agora?
              </h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent-red rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Verifique sua caixa de entrada (e spam) para o email de boas-vindas
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent-red rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Receba sua primeira newsletter na próxima segunda-feira
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent-red rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Explore nossa biblioteca premium de guias sobre o mercado chinês
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <a
                  href="/biblioteca"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>🚀 Explorar Biblioteca Premium</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 mb-8 shadow-lg">
              <Mail className="h-5 w-5 text-accent-red" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Newsletter Semanal</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Domine o Mercado
              <span className="block text-gradient">Chinês</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Receba análises exclusivas, estratégias comprovadas e insights sobre WeChat, e-commerce e 
              tendências que estão moldando o maior mercado digital do mundo.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-accent-red mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Form */}
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Junte-se a 5.000+ Profissionais
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Nome da empresa"
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
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Processando...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="h-5 w-5" />
                        <span>Inscrever-se Gratuitamente</span>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Ao se inscrever, você concorda com nossa{' '}
                    <a href="/privacidade" className="text-accent-red hover:underline">
                      Política de Privacidade
                    </a>
                    . Cancele a qualquer momento.
                  </p>
                </form>
              </div>

              {/* Benefits */}
              <div className="bg-gray-50 dark:bg-gray-900 p-8 lg:p-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  O que você receberá:
                </h3>
                
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent-red/10 rounded-lg flex items-center justify-center">
                        <div className="text-accent-red">
                          {benefit.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-accent-red to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">PX</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Phelipe Xavier</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Founder</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    "Compartilho semanalmente os insights mais valiosos que aprendi ajudando empresas 
                    a conquistarem o mercado chinês."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
