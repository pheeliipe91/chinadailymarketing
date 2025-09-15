import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'
import { ArticleCard } from '@/components/ui/article-card'
import { Search, Filter, TrendingUp, Clock, Calendar, MapPin, Eye } from 'lucide-react'
import { getAllArticles } from '@/lib/contentful'
import { ArtigosClient } from './artigos-client'

// Função para buscar artigos do Contentful
async function getArticles() {
  try {
    const articles = await getAllArticles()
    const contentfulArticles = articles.map(article => ({
      title: article.fields.title,
      excerpt: article.fields.excerpt,
      slug: article.fields.slug,
      image: article.fields.featuredImage?.fields?.file?.url 
        ? `https:${article.fields.featuredImage.fields.file.url}`
        : '/images/default-article.jpg',
      category: article.fields.category,
      readingTime: article.fields.readingTime,
      date: article.fields.publishedAt
    }))
    
    // Retorna apenas artigos do Contentful
    return contentfulArticles
  } catch (error) {
    console.error('Error fetching articles:', error)
    // Retorna array vazio se não conseguir buscar do Contentful
    return []
  }
}


const categories = [
  "Todos",
  "Economia",
  "Tecnologia",
  "Negócios",
  "Sociedade",
  "Cultura",
  "Geopolítica"
]

const sortOptions = [
  { value: 'recent', label: 'Mais Recentes', icon: Calendar },
  { value: 'popular', label: 'Mais Populares', icon: TrendingUp },
  { value: 'reading-time', label: 'Tempo de Leitura', icon: Clock }
]

export default async function ArtigosPage() {
  const articles = await getArticles()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Personal & Authentic */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-red/10 text-accent-red text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-accent-red rounded-full mr-2 animate-pulse"></div>
              Insights direto de Shanghai
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Meus <span className="text-gradient">Insights</span>
            </h1>
            
            <p className="text-xl text-foreground-secondary dark:text-foreground-dark-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
              Cada artigo nasce da minha vivência diária em Shanghai. Sem teoria, apenas experiências reais 
              de quem vive na China há 5 anos.
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-foreground-secondary">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Escrito em Shanghai</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                <span>{articles.length} insights publicados</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Atualizado semanalmente</span>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-accent-red mb-1">5+</div>
              <div className="text-sm text-foreground-secondary">Anos vivendo aqui</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-accent-red mb-1">12.5K+</div>
              <div className="text-sm text-foreground-secondary">Leitores mensais</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-accent-red mb-1">94%</div>
              <div className="text-sm text-foreground-secondary">Taxa de engajamento</div>
            </div>
          </div>
        </div>
      </section>

      <ArtigosClient articles={articles} />

      <Footer />
    </div>
  )
}
