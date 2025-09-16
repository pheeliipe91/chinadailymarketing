import { NextResponse } from 'next/server'

// In-memory storage for demo purposes
// In production, use a database like PostgreSQL, MongoDB, etc.
const articleStats = new Map<string, {
  views: number
  ratings: number[]
  likes: number
  dislikes: number
  shares: number
  lastViewed: Date
}>()

// Initialize with some sample data
const initializeSampleData = () => {
  if (articleStats.size === 0) {
    articleStats.set('marketing-digital-china-2024', {
      views: 2847,
      ratings: [5, 4, 5, 4, 5, 5, 4, 5, 4, 5],
      likes: 89,
      dislikes: 3,
      shares: 45,
      lastViewed: new Date('2024-01-30')
    })
    
    articleStats.set('wechat-mini-programs-guia', {
      views: 1923,
      ratings: [4, 5, 4, 5, 5, 4, 5, 4],
      likes: 67,
      dislikes: 2,
      shares: 32,
      lastViewed: new Date('2024-01-29')
    })
    
    articleStats.set('kols-influencers-china', {
      views: 1654,
      ratings: [5, 5, 4, 5, 4, 5, 5],
      likes: 54,
      dislikes: 1,
      shares: 28,
      lastViewed: new Date('2024-01-28')
    })
    
    articleStats.set('ecommerce-tmall-estrategias', {
      views: 1432,
      ratings: [4, 4, 5, 4, 5, 4],
      likes: 43,
      dislikes: 2,
      shares: 21,
      lastViewed: new Date('2024-01-27')
    })
    
    articleStats.set('douyin-tiktok-marketing', {
      views: 1287,
      ratings: [5, 4, 5, 5, 4, 5],
      likes: 38,
      dislikes: 1,
      shares: 19,
      lastViewed: new Date('2024-01-26')
    })
  }
}

function calculatePopularityScore(stats: {
  views: number
  ratings: number[]
  likes: number
  dislikes: number
  shares: number
  lastViewed: Date
}): number {
  const avgRating = stats.ratings.length > 0 
    ? stats.ratings.reduce((sum, rating) => sum + rating, 0) / stats.ratings.length 
    : 0
  
  const engagementRate = (stats.likes + stats.shares) / Math.max(stats.views, 1)
  const likeRatio = stats.likes / Math.max(stats.likes + stats.dislikes, 1)
  
  // Recency factor (newer articles get slight boost)
  const daysSinceViewed = (Date.now() - stats.lastViewed.getTime()) / (1000 * 60 * 60 * 24)
  const recencyFactor = Math.max(0.5, 1 - (daysSinceViewed / 30)) // Decay over 30 days
  
  // Weighted popularity score
  const score = (
    stats.views * 0.3 +
    avgRating * 200 * 0.25 +
    engagementRate * 1000 * 0.2 +
    likeRatio * 100 * 0.15 +
    stats.shares * 10 * 0.1
  ) * recencyFactor
  
  return Math.round(score)
}

export async function GET() {
  try {
    initializeSampleData()
    
    // Calculate popularity scores for all articles
    const popularityData = Array.from(articleStats.entries()).map(([slug, stats]) => {
      const avgRating = stats.ratings.length > 0 
        ? stats.ratings.reduce((sum, rating) => sum + rating, 0) / stats.ratings.length 
        : 0
      
      return {
        slug,
        views: stats.views,
        averageRating: Number(avgRating.toFixed(1)),
        totalRatings: stats.ratings.length,
        likes: stats.likes,
        dislikes: stats.dislikes,
        shares: stats.shares,
        popularityScore: calculatePopularityScore(stats),
        lastViewed: stats.lastViewed.toISOString()
      }
    })
    
    // Sort by popularity score
    popularityData.sort((a, b) => b.popularityScore - a.popularityScore)
    
    return NextResponse.json({
      articles: popularityData,
      totalArticles: popularityData.length,
      lastUpdated: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Error getting popular articles:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar artigos populares' },
      { status: 500 }
    )
  }
}

// Endpoint to track article view
export async function POST(request: Request) {
  try {
    const { slug, action } = await request.json()
    
    if (!slug || !action) {
      return NextResponse.json(
        { error: 'Slug e action são obrigatórios' },
        { status: 400 }
      )
    }
    
    initializeSampleData()
    
    // Get or create article stats
    let stats = articleStats.get(slug)
    if (!stats) {
      stats = {
        views: 0,
        ratings: [],
        likes: 0,
        dislikes: 0,
        shares: 0,
        lastViewed: new Date()
      }
    }
    
    // Update based on action
    switch (action) {
      case 'view':
        stats.views++
        stats.lastViewed = new Date()
        break
      case 'share':
        stats.shares++
        break
      default:
        return NextResponse.json(
          { error: 'Action inválida' },
          { status: 400 }
        )
    }
    
    articleStats.set(slug, stats)
    
    return NextResponse.json({
      success: true,
      stats: {
        views: stats.views,
        shares: stats.shares,
        popularityScore: calculatePopularityScore(stats)
      }
    })
    
  } catch (error) {
    console.error('Error tracking article action:', error)
    return NextResponse.json(
      { error: 'Erro ao rastrear ação do artigo' },
      { status: 500 }
    )
  }
}
