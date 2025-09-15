"use client"

import { ArticleCard } from '@/components/ui/article-card'
import { Search, Filter, TrendingUp, Clock, Calendar } from 'lucide-react'
import { useState } from 'react'

interface Article {
  title: string
  excerpt: string
  slug: string
  image: string
  category: string
  readingTime: number
  date: string
}

interface ArtigosClientProps {
  articles: Article[]
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

export function ArtigosClient({ articles }: ArtigosClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [sortBy, setSortBy] = useState('recent')

  // Filter and sort articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'reading-time':
        return a.readingTime - b.readingTime
      default:
        return 0
    }
  })

  return (
    <>
      {/* Search and Filters */}
      <section className="sticky top-16 z-30 py-6 px-4 sm:px-6 lg:px-8 bg-background/95 backdrop-blur-sm border-b border-border-light dark:border-border-dark">
        <div className="mx-auto max-w-7xl">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground-secondary" />
            <input
              type="text"
              placeholder="Buscar artigos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-background dark:bg-background focus:outline-none focus:ring-2 focus:ring-accent-red"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Categories */}
            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-accent-red text-white'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-foreground-secondary" />
              {sortOptions.map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      sortBy === option.value
                        ? 'bg-accent-red/10 text-accent-red'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-3 w-3 mr-1" />
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {sortedArticles.length > 0 ? (
            <>
              <p className="text-sm text-foreground-secondary dark:text-foreground-dark-secondary mb-6">
                {sortedArticles.length} artigos encontrados
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedArticles.map((article) => (
                  <ArticleCard key={article.slug} {...article} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-foreground-secondary dark:text-foreground-dark-secondary mb-4">
                Nenhum artigo encontrado
              </p>
              <p className="text-foreground-secondary dark:text-foreground-dark-secondary">
                Tente ajustar seus filtros ou busca
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Load More */}
      {sortedArticles.length > 0 && (
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <button className="btn-secondary">
              Carregar mais artigos
            </button>
          </div>
        </section>
      )}
    </>
  )
}
