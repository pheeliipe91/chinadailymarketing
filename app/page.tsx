import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'
import { ArticleCard } from '@/components/ui/article-card'
import { ArrowRight, Sparkles, TrendingUp, Users, Globe, BookOpen, Eye, Clock, Calendar, Star, CheckCircle, BarChart3, MessageSquare, Share2, Bookmark } from 'lucide-react'
import Link from 'next/link'
import { getAllArticles } from '@/lib/contentful'
import { formatDate } from '@/lib/utils'

// Função para buscar artigos do Contentful
async function getArticles() {
  try {
    const articles = await getAllArticles()
    return articles.map(article => ({
      title: article.fields.title,
      excerpt: article.fields.excerpt,
      slug: article.fields.slug,
      image: article.fields.featuredImage?.fields?.file?.url 
        ? `https:${article.fields.featuredImage.fields.file.url}`
        : '/images/default-article.jpg',
      category: article.fields.category,
      readingTime: article.fields.readingTime,
      date: article.fields.publishedAt,
      featured: article.fields.featured || false
    }))
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

const stats = [
  { label: "Leitores mensais", value: "12.5K+", icon: Users },
  { label: "Artigos publicados", value: "150+", icon: BookOpen },
  { label: "Anos na China", value: "5+", icon: Globe },
  { label: "Taxa de engajamento", value: "94%", icon: TrendingUp },
]

const categories = [
  { name: "Economia", icon: TrendingUp, count: 24, color: "from-blue-500 to-cyan-500", description: "Análises do mercado chinês" },
  { name: "Tecnologia", icon: Sparkles, count: 18, color: "from-purple-500 to-pink-500", description: "Inovações e tendências tech" },
  { name: "Cultura", icon: BookOpen, count: 15, color: "from-orange-500 to-red-500", description: "Sociedade e comportamento" },
]

const recentActivity = [
  { type: "article", title: "WeChat Pay vs Alipay: A batalha dos pagamentos", time: "2h atrás", engagement: "127 leituras" },
  { type: "update", title: "Novo curso sobre Metaso disponível", time: "1 dia atrás", engagement: "89 inscrições" },
  { type: "podcast", title: "Episódio #3 em produção", time: "3 dias atrás", engagement: "234 interessados" },
]

export default async function HomePage() {
  const articles = await getArticles()
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Reader First */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-red/10 text-accent-red text-sm font-medium mb-6">
                <div className="w-2 h-2 bg-accent-red rounded-full mr-2 animate-pulse"></div>
                Ao vivo de Shanghai
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Insights reais da
                <span className="block text-gradient">China que importa</span>
              </h1>
              
              <p className="text-xl text-foreground-secondary dark:text-foreground-dark-secondary mb-8 leading-relaxed">
                Sou Phelipe, moro em Shanghai há 5 anos e compartilho o que realmente acontece 
                no mercado chinês. Sem teorias, apenas experiências práticas de quem vive aqui.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/artigos" className="btn-primary inline-flex items-center justify-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Ler Últimos Insights
                </Link>
                <Link href="/sobre" className="btn-secondary inline-flex items-center justify-center">
                  <Users className="mr-2 h-5 w-5" />
                  Minha História
                </Link>
              </div>
              
              {/* Social Proof */}
              <div className="flex items-center space-x-6 text-sm text-foreground-secondary">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>4.9/5 avaliação dos leitores</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>12.5K+ leitores mensais</span>
                </div>
              </div>
            </div>
            
            {/* Stats Card */}
            <div className="lg:col-span-5 mt-8 lg:mt-0">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-accent-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-accent-red" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Direto da China</h3>
                  <p className="text-foreground-secondary">Insights baseados em vivência real</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Icon className="h-6 w-6 text-accent-red mx-auto mb-2" />
                        <div className="text-2xl font-bold text-accent-red">{stat.value}</div>
                        <div className="text-xs text-foreground-secondary">{stat.label}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article - Hero Style */}
      {articles.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-8">
              <h2 className="text-sm font-semibold text-accent-red uppercase tracking-wide mb-2">Artigo em Destaque</h2>
              <p className="text-lg text-foreground-secondary">O insight mais recente e relevante</p>
            </div>
            
            <Link href={`/artigos/${articles[0].slug}`} className="group block">
              <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto">
                    <img 
                      src={articles[0].image} 
                      alt={articles[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-accent-red text-white px-3 py-1 rounded-full text-sm font-medium">
                      {articles[0].category}
                    </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center text-sm text-foreground-secondary mb-4">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{articles[0].readingTime} min de leitura</span>
                      <span className="mx-2">•</span>
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(articles[0].date)}</span>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-accent-red transition-colors">
                      {articles[0].title}
                    </h3>
                    
                    <p className="text-foreground-secondary mb-6 leading-relaxed">
                      {articles[0].excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-accent-red font-medium">
                        <span>Ler artigo completo</span>
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-foreground-secondary">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          <span>2.3K</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>47</span>
                        </div>
                        <div className="flex items-center">
                          <Share2 className="h-4 w-4 mr-1" />
                          <span>89</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Latest Articles Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Últimos Insights</h2>
              <p className="text-foreground-secondary">
                Conteúdo fresco sobre o que está acontecendo na China
              </p>
            </div>
            <Link 
              href="/artigos" 
              className="hidden md:flex items-center text-accent-red hover:text-accent-hover transition-colors font-medium"
            >
              Ver todos os artigos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1, 7).map((article, index) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
          
          <div className="text-center mt-12 md:hidden">
            <Link href="/artigos" className="btn-secondary inline-flex items-center">
              Ver todos os artigos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories with Enhanced Design */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore por Tema</h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Conteúdo organizado pelas principais áreas que impactam negócios e vida na China
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.name}
                  href={`/categorias/${category.name.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-2xl p-8 bg-white dark:bg-gray-900 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="h-12 w-12 text-accent-red" />
                      <div className="text-right">
                        <div className="text-2xl font-bold text-accent-red">{category.count}</div>
                        <div className="text-xs text-foreground-secondary">artigos</div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent-red transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-foreground-secondary mb-4 text-sm">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center text-accent-red font-medium text-sm">
                      <span>Explorar categoria</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recent Activity & Engagement */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <BarChart3 className="h-6 w-6 text-accent-red mr-3" />
                Atividade Recente
              </h2>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="w-2 h-2 bg-accent-red rounded-full mr-4"></div>
                    <div className="flex-1">
                      <h4 className="font-medium">{activity.title}</h4>
                      <div className="flex items-center text-sm text-foreground-secondary mt-1">
                        <span>{activity.time}</span>
                        <span className="mx-2">•</span>
                        <span>{activity.engagement}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Learning Resources */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Aprenda Comigo</h2>
              
              <div className="space-y-4">
                <Link href="/biblioteca" className="group flex items-center p-6 bg-white dark:bg-gray-900 rounded-xl hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 bg-accent-red/10 rounded-lg flex items-center justify-center mr-4">
                    <BookOpen className="h-6 w-6 text-accent-red" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold group-hover:text-accent-red transition-colors">Cursos Práticos</h3>
                    <p className="text-sm text-foreground-secondary">Ferramentas que uso no dia a dia</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-accent-red group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link href="/podcasts" className="group flex items-center p-6 bg-white dark:bg-gray-900 rounded-xl hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 bg-accent-red/10 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-accent-red text-xl">🎙️</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold group-hover:text-accent-red transition-colors">Podcasts</h3>
                    <p className="text-sm text-foreground-secondary">Conversas sobre vida na China</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-accent-red group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link href="/deep-dive" className="group flex items-center p-6 bg-gradient-to-r from-accent-red to-orange-500 rounded-xl hover:shadow-lg transition-all text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Projeto Mergulho</h3>
                    <p className="text-sm text-white/90">Mentoria intensiva</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 bg-accent-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="h-8 w-8 text-accent-red" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Fique por Dentro</h2>
            <p className="text-lg text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Toda semana compartilho insights frescos sobre o que está acontecendo por aqui. 
              Sem spam, só conteúdo que realmente importa.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Quero Receber
              </button>
            </form>
            
            <div className="flex items-center justify-center mt-6 text-sm text-foreground-secondary">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>12.5K+ profissionais já recebem</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
