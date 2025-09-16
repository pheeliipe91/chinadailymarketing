"use client"

import { useEffect } from 'react'

interface ArticleViewTrackerProps {
  articleSlug: string
}

export function ArticleViewTracker({ articleSlug }: ArticleViewTrackerProps) {
  useEffect(() => {
    // Track article view after a delay to ensure user is actually reading
    const timer = setTimeout(() => {
      trackArticleView(articleSlug)
    }, 3000) // 3 second delay

    return () => clearTimeout(timer)
  }, [articleSlug])

  const trackArticleView = async (slug: string) => {
    try {
      await fetch('/api/popular-articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug, action: 'view' }),
      })
    } catch (error) {
      console.error('Erro ao rastrear visualização:', error)
    }
  }

  // This component doesn't render anything visible
  return null
}
