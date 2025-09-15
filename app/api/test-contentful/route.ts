import { NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/contentful'

export async function GET() {
  try {
    console.log('Testing Contentful connection...')
    
    // Test the connection
    const articles = await getAllArticles()
    
    return NextResponse.json({
      success: true,
      message: 'Contentful connected successfully!',
      articlesCount: articles.length,
      articles: articles.map(article => ({
        title: article.fields.title,
        slug: article.fields.slug,
        category: article.fields.category,
        publishedAt: article.fields.publishedAt
      }))
    })
  } catch (error) {
    console.error('Contentful connection error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to connect to Contentful'
    }, { status: 500 })
  }
}
