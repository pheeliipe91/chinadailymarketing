import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for demo purposes
// In production, use a database like PostgreSQL, MongoDB, etc.
const ratingsStore = new Map<string, {
  ratings: number[]
  likes: number
  dislikes: number
  userSessions: Map<string, { rating?: number, liked?: boolean }>
}>()

function getUserSession(request: NextRequest): string {
  // Simple session based on IP + User Agent
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  return `${ip}-${userAgent}`.substring(0, 50)
}

function getArticleRating(slug: string) {
  if (!ratingsStore.has(slug)) {
    ratingsStore.set(slug, {
      ratings: [],
      likes: 0,
      dislikes: 0,
      userSessions: new Map()
    })
  }
  return ratingsStore.get(slug)!
}

function calculateAverageRating(ratings: number[]): number {
  if (ratings.length === 0) return 0
  const sum = ratings.reduce((acc, rating) => acc + rating, 0)
  return sum / ratings.length
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const userSession = getUserSession(request)
    const articleData = getArticleRating(slug)
    
    const userRating = articleData.userSessions.get(userSession)
    
    return NextResponse.json({
      averageRating: calculateAverageRating(articleData.ratings),
      totalRatings: articleData.ratings.length,
      likes: articleData.likes,
      dislikes: articleData.dislikes,
      userRating: userRating?.rating,
      userLiked: userRating?.liked
    })
  } catch (error) {
    console.error('Error getting rating:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar avaliação' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const body = await request.json()
    const { rating, like, type } = body
    const userSession = getUserSession(request)
    
    const articleData = getArticleRating(slug)
    const existingUserData = articleData.userSessions.get(userSession) || {}
    
    // Check if user already rated/liked
    if (existingUserData.rating || existingUserData.liked !== undefined) {
      return NextResponse.json(
        { error: 'Você já avaliou este artigo' },
        { status: 400 }
      )
    }
    
    if (type === 'star' && rating) {
      // Validate rating
      if (rating < 1 || rating > 5) {
        return NextResponse.json(
          { error: 'Avaliação deve ser entre 1 e 5 estrelas' },
          { status: 400 }
        )
      }
      
      // Add star rating
      articleData.ratings.push(rating)
      articleData.userSessions.set(userSession, { ...existingUserData, rating })
      
    } else if (type === 'like' && like !== undefined) {
      // Add like/dislike
      if (like) {
        articleData.likes++
      } else {
        articleData.dislikes++
      }
      articleData.userSessions.set(userSession, { ...existingUserData, liked: like })
    } else {
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      )
    }
    
    // Return updated data
    const userRating = articleData.userSessions.get(userSession)
    
    return NextResponse.json({
      averageRating: calculateAverageRating(articleData.ratings),
      totalRatings: articleData.ratings.length,
      likes: articleData.likes,
      dislikes: articleData.dislikes,
      userRating: userRating?.rating,
      userLiked: userRating?.liked
    })
    
  } catch (error) {
    console.error('Error saving rating:', error)
    return NextResponse.json(
      { error: 'Erro ao salvar avaliação' },
      { status: 500 }
    )
  }
}
