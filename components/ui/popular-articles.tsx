"use client"

import { useState, useEffect } from 'react'
import { TrendingUp, Eye, Star, Share2, Clock } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface PopularArticle {
  slug: string
  views: number
  averageRating: number
  totalRatings: number
  likes: number
  shares: number
  popularityScore: number
}

interface PopularArticlesProps {
  limit?: number
  className?: string
}

export function PopularArticles({ limit = 5, className }: PopularArticlesProps) {
  const [articles, setArticles] = useState<PopularArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPopularArticles()
  }, [])

  const loadPopularArticles = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/popular-articles')
      
      if (!response.ok) {
        throw new Error('Erro ao carregar artigos populares')
      }
      
      const data = await response.json()
      setArticles(data.articles.slice(0, limit))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  const trackShare = async (slug: string) => {
    try {
      await fetch('/api/popular-articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug, action: 'share' }),
      })
    } catch (error) {
      console.error('Erro ao rastrear compartilhamento:', error)
    }
  }

  if (loading) {
    return (
      <div className={cn("space-y-4", className)}>
        {Array.from({ length: limit }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn("text-center py-8", className)}>
        <p className="text-foreground-secondary">
          Erro ao carregar artigos populares
        </p>
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="h-5 w-5 text-accent-red" />
        <h3 className="text-lg font-semibold">Artigos Mais Populares</h3>
      </div>

      {articles.map((article, index) => (
        <div
          key={article.slug}
          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          {/* Ranking Number */}
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-red/10 flex items-center justify-center">
            <span className="text-sm font-bold text-accent-red">
              {index + 1}
            </span>
          </div>

          {/* Article Info */}
          <div className="flex-1 min-w-0">
            <Link
              href={`/artigos/${article.slug}`}
              className="block group"
              onClick={() => trackShare(article.slug)}
            >
              <h4 className="font-medium text-sm group-hover:text-accent-red transition-colors line-clamp-2 mb-2">
                {getArticleTitle(article.slug)}
              </h4>
              
              <div className="flex items-center space-x-4 text-xs text-foreground-secondary">
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{formatNumber(article.views)}</span>
                </div>
                
                {article.totalRatings > 0 && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span>{article.averageRating}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-1">
                  <Share2 className="h-3 w-3" />
                  <span>{article.shares}</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Popularity Score Badge */}
          <div className="flex-shrink-0">
            <div className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs rounded-full">
              {formatNumber(article.popularityScore)}
            </div>
          </div>
        </div>
      ))}

      <Link
        href="/artigos"
        className="block text-center text-sm text-accent-red hover:text-accent-red/80 transition-colors mt-4"
      >
        Ver todos os artigos →
      </Link>
    </div>
  )
}

// Helper function to get article title by slug
function getArticleTitle(slug: string): string {
  const titles: Record<string, string> = {
    'marketing-digital-china-2024': 'Marketing Digital na China: Tendências 2024',
    'wechat-mini-programs-guia': 'WeChat Mini Programs: Guia Completo',
    'kols-influencers-china': 'KOLs e Influencers na China: Como Escolher',
    'ecommerce-tmall-estrategias': 'E-commerce na China: Estratégias para Tmall',
    'douyin-tiktok-marketing': 'Douyin vs TikTok: Marketing na China'
  }
  
  return titles[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

// Helper function to format numbers
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}
