"use client"

import { useState, useEffect } from 'react'
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ArticleRatingProps {
  articleSlug: string
  className?: string
}

interface RatingData {
  averageRating: number
  totalRatings: number
  likes: number
  dislikes: number
  userRating?: number
  userLiked?: boolean
}

export function ArticleRating({ articleSlug, className }: ArticleRatingProps) {
  const [rating, setRating] = useState<RatingData>({
    averageRating: 0,
    totalRatings: 0,
    likes: 0,
    dislikes: 0
  })
  const [hoveredStar, setHoveredStar] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasRated, setHasRated] = useState(false)

  useEffect(() => {
    loadRating()
  }, [articleSlug])

  const loadRating = async () => {
    try {
      const response = await fetch(`/api/ratings/${articleSlug}`)
      if (response.ok) {
        const data = await response.json()
        setRating(data)
        setHasRated(!!data.userRating || !!data.userLiked)
      }
    } catch (error) {
      console.error('Erro ao carregar avaliação:', error)
    }
  }

  const submitRating = async (stars: number) => {
    if (isSubmitting || hasRated) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/ratings/${articleSlug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: stars, type: 'star' }),
      })

      if (response.ok) {
        const data = await response.json()
        setRating(data)
        setHasRated(true)
      }
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const submitLike = async (isLike: boolean) => {
    if (isSubmitting || hasRated) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/ratings/${articleSlug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ like: isLike, type: 'like' }),
      })

      if (response.ok) {
        const data = await response.json()
        setRating(data)
        setHasRated(true)
      }
    } catch (error) {
      console.error('Erro ao enviar like:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6", className)}>
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">
          {hasRated ? 'Obrigado pela sua avaliação!' : 'O que achou deste artigo?'}
        </h3>

        {/* Star Rating */}
        <div className="flex justify-center items-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => !hasRated && submitRating(star)}
              onMouseEnter={() => !hasRated && setHoveredStar(star)}
              onMouseLeave={() => !hasRated && setHoveredStar(0)}
              disabled={hasRated || isSubmitting}
              className={cn(
                "p-1 transition-colors",
                hasRated || isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
              )}
            >
              <Star
                className={cn(
                  "h-8 w-8 transition-colors",
                  (hoveredStar >= star || (rating.userRating && rating.userRating >= star) || (!hasRated && !hoveredStar && rating.averageRating >= star))
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300 dark:text-gray-600"
                )}
              />
            </button>
          ))}
        </div>

        {/* Rating Stats */}
        {rating.totalRatings > 0 && (
          <div className="text-sm text-foreground-secondary mb-4">
            <div className="flex items-center justify-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium">{rating.averageRating.toFixed(1)}</span>
              <span>({rating.totalRatings} avaliações)</span>
            </div>
          </div>
        )}

        {/* Like/Dislike Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => submitLike(true)}
            disabled={hasRated || isSubmitting}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
              hasRated || isSubmitting 
                ? "cursor-not-allowed opacity-50" 
                : "hover:bg-green-100 dark:hover:bg-green-900/20",
              rating.userLiked === true && "bg-green-100 dark:bg-green-900/20 text-green-600"
            )}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{rating.likes}</span>
          </button>

          <button
            onClick={() => submitLike(false)}
            disabled={hasRated || isSubmitting}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
              hasRated || isSubmitting 
                ? "cursor-not-allowed opacity-50" 
                : "hover:bg-red-100 dark:hover:bg-red-900/20",
              rating.userLiked === false && "bg-red-100 dark:bg-red-900/20 text-red-600"
            )}
          >
            <ThumbsDown className="h-4 w-4" />
            <span>{rating.dislikes}</span>
          </button>
        </div>

        {hasRated && (
          <p className="text-sm text-foreground-secondary mt-4">
            Sua avaliação nos ajuda a melhorar o conteúdo
          </p>
        )}
      </div>
    </div>
  )
}
