"use client"

import { useState, useEffect, useCallback } from 'react'
import { Search, X, FileText, Hash, Clock, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

// Dados de exemplo - substituir com busca real
const searchData = {
  articles: [
    { id: 1, title: 'Economia digital chinesa', slug: 'economia-digital-chinesa', category: 'Economia' },
    { id: 2, title: 'Shenzhen: o Silicon Valley', slug: 'shenzhen-silicon-valley', category: 'Tecnologia' },
    { id: 3, title: 'Como a China reinventou o varejo', slug: 'china-reinventou-varejo', category: 'Negócios' },
    { id: 4, title: 'Sistema de crédito social', slug: 'sistema-credito-social', category: 'Sociedade' },
    { id: 5, title: 'Cultura de trabalho 996', slug: 'cultura-trabalho-996', category: 'Cultura' },
  ],
  categories: [
    { name: 'Economia', count: 24 },
    { name: 'Tecnologia', count: 18 },
    { name: 'Negócios', count: 15 },
    { name: 'Sociedade', count: 12 },
    { name: 'Cultura', count: 10 },
  ],
  tags: [
    'Digital', 'Fintech', 'E-commerce', 'IA', '5G', 'Inovação'
  ]
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any>({ articles: [], categories: [], tags: [] })
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    // Carregar buscas recentes do localStorage
    const recent = localStorage.getItem('recentSearches')
    if (recent) {
      setRecentSearches(JSON.parse(recent))
    }
  }, [])

  useEffect(() => {
    if (query.length > 0) {
      // Simular busca - substituir com busca real
      const filtered = {
        articles: searchData.articles.filter(a => 
          a.title.toLowerCase().includes(query.toLowerCase())
        ),
        categories: searchData.categories.filter(c => 
          c.name.toLowerCase().includes(query.toLowerCase())
        ),
        tags: searchData.tags.filter(t => 
          t.toLowerCase().includes(query.toLowerCase())
        )
      }
      setResults(filtered)
    } else {
      setResults({ articles: [], categories: [], tags: [] })
    }
  }, [query])

  const handleSearch = useCallback((searchTerm: string) => {
    // Salvar busca recente
    const updatedSearches = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5)
    setRecentSearches(updatedSearches)
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
    
    // Navegar para página de busca
    router.push(`/busca?q=${encodeURIComponent(searchTerm)}`)
    onClose()
  }, [recentSearches, router, onClose])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query) {
      handleSearch(query)
    }
    if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-900 shadow-2xl">
          {/* Search Input */}
          <div className="flex items-center border-b border-border-light dark:border-border-dark p-4">
            <Search className="h-5 w-5 text-foreground-secondary mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar artigos, categorias, tags..."
              className="flex-1 bg-transparent outline-none text-lg"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search Results */}
          <div className="max-h-[60vh] overflow-y-auto p-4">
            {query.length === 0 ? (
              <>
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-foreground-secondary mb-3">Buscas Recentes</h3>
                    <div className="space-y-2">
                      {recentSearches.map((search) => (
                        <button
                          key={search}
                          onClick={() => {
                            setQuery(search)
                            handleSearch(search)
                          }}
                          className="flex items-center w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-left"
                        >
                          <Clock className="h-4 w-4 text-foreground-secondary mr-3" />
                          <span>{search}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Links */}
                <div>
                  <h3 className="text-sm font-medium text-foreground-secondary mb-3">Links Rápidos</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {searchData.categories.slice(0, 4).map((category) => (
                      <button
                        key={category.name}
                        onClick={() => {
                          router.push(`/categorias/${category.name.toLowerCase()}`)
                          onClose()
                        }}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm text-foreground-secondary">{category.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Articles */}
                {results.articles.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-foreground-secondary mb-3">Artigos</h3>
                    <div className="space-y-2">
                      {results.articles.map((article: any) => (
                        <button
                          key={article.id}
                          onClick={() => {
                            router.push(`/artigos/${article.slug}`)
                            onClose()
                          }}
                          className="flex items-center w-full p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-left group"
                        >
                          <FileText className="h-5 w-5 text-foreground-secondary mr-3" />
                          <div className="flex-1">
                            <p className="font-medium group-hover:text-accent-red transition-colors">{article.title}</p>
                            <p className="text-sm text-foreground-secondary">{article.category}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-foreground-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories */}
                {results.categories.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-foreground-secondary mb-3">Categorias</h3>
                    <div className="flex flex-wrap gap-2">
                      {results.categories.map((category: any) => (
                        <button
                          key={category.name}
                          onClick={() => {
                            router.push(`/categorias/${category.name.toLowerCase()}`)
                            onClose()
                          }}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-accent-red hover:text-white rounded-full text-sm transition-colors"
                        >
                          {category.name} ({category.count})
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {results.tags.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground-secondary mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {results.tags.map((tag: string) => (
                        <button
                          key={tag}
                          onClick={() => {
                            router.push(`/tags/${tag.toLowerCase()}`)
                            onClose()
                          }}
                          className="flex items-center px-3 py-1 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-sm transition-colors"
                        >
                          <Hash className="h-3 w-3 mr-1" />
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {results.articles.length === 0 && results.categories.length === 0 && results.tags.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-foreground-secondary">Nenhum resultado encontrado para "{query}"</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {query && (
            <div className="border-t border-border-light dark:border-border-dark p-4">
              <button
                onClick={() => handleSearch(query)}
                className="w-full text-center text-sm text-accent-red hover:text-accent-hover transition-colors"
              >
                Ver todos os resultados para "{query}"
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
