import { createClient } from 'contentful'
import { Document } from '@contentful/rich-text-types'

// Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

// Preview client for draft content
const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
  host: 'preview.contentful.com',
})

// Types
export interface ContentfulArticle {
  sys: {
    id: string
    createdAt: string
    updatedAt: string
  }
  fields: {
    title: string
    slug: string
    excerpt: string
    content: Document
    featuredImage: {
      fields: {
        file: {
          url: string
          details: {
            image: {
              width: number
              height: number
            }
          }
        }
        title: string
      }
    }
    category: string
    tags: string[]
    readingTime: number
    publishedAt: string
    author: {
      fields: {
        name: string
        bio: string
        avatar?: {
          fields: {
            file: {
              url: string
            }
          }
        }
      }
    }
    featured: boolean
    seoTitle?: string
    seoDescription?: string
  }
}

export interface ContentfulResource {
  sys: {
    id: string
  }
  fields: {
    title: string
    slug: string
    description: string
    coverImage?: {
      fields: {
        file: {
          url: string
          details: {
            size: number
          }
        }
      }
    }
    file?: {
      fields: {
        file: {
          url: string
          fileName: string
          contentType: string
          details: {
            size: number
          }
        }
      }
    }
    category: string
    tags?: string[]
    pagesCount: number
    fileSize: string
    previewContent?: Document
    isFeatured?: boolean
    publishedAt: string
  }
}

// Get all articles
export async function getAllArticles(preview = false): Promise<ContentfulArticle[]> {
  const currentClient = preview ? previewClient : client
  
  const response = await currentClient.getEntries({
    content_type: 'article',
    order: ['-fields.publishedAt'],
    include: 2,
  })

  return response.items as any
}

// Get article by slug
export async function getArticleBySlug(slug: string, preview = false): Promise<ContentfulArticle | null> {
  const currentClient = preview ? previewClient : client
  
  const response = await currentClient.getEntries({
    content_type: 'article',
    'fields.slug': slug,
    include: 2,
  })

  return response.items[0] as any || null
}

// Get featured articles
export async function getFeaturedArticles(limit = 3): Promise<ContentfulArticle[]> {
  const response = await client.getEntries({
    content_type: 'article',
    'fields.featured': true,
    order: ['-fields.publishedAt'],
    limit,
    include: 2,
  })

  return response.items as any
}

// Get articles by category
export async function getArticlesByCategory(category: string): Promise<ContentfulArticle[]> {
  const response = await client.getEntries({
    content_type: 'article',
    'fields.category': category,
    order: ['-fields.publishedAt'],
    include: 2,
  })

  return response.items as any
}

// Get all resources
export async function getAllResources(preview = false): Promise<ContentfulResource[]> {
  const currentClient = preview ? previewClient : client
  
  const response = await currentClient.getEntries({
    content_type: 'resource',
    order: ['-fields.createdAt'],
    include: 2,
  })

  return response.items as any
}

// Get resource by ID
export async function getResourceById(id: string): Promise<ContentfulResource | null> {
  try {
    const response = await client.getEntry(id, { include: 2 })
    return response as any
  } catch (error) {
    return null
  }
}

// Get resource by slug
export async function getResourceBySlug(slug: string, preview = false): Promise<ContentfulResource | null> {
  const currentClient = preview ? previewClient : client
  
  const response = await currentClient.getEntries({
    content_type: 'resource',
    'fields.slug': slug,
    include: 2,
  })

  return response.items[0] as any || null
}

// Get featured resources
export async function getFeaturedResources(preview = false): Promise<ContentfulResource[]> {
  const currentClient = preview ? previewClient : client
  
  const response = await currentClient.getEntries({
    content_type: 'resource',
    'fields.isFeatured': true,
    order: ['-fields.publishedAt'],
    include: 2,
    limit: 6
  })

  return response.items as any
}

// Get resources by category
export async function getResourcesByCategory(category: string, preview = false): Promise<ContentfulResource[]> {
  const currentClient = preview ? previewClient : client
  
  const response = await currentClient.getEntries({
    content_type: 'resource',
    'fields.category': category,
    order: ['-fields.publishedAt'],
    include: 2,
  })

  return response.items as any
}

// Search articles
export async function searchArticles(query: string): Promise<ContentfulArticle[]> {
  const response = await client.getEntries({
    content_type: 'article',
    query,
    include: 2,
  })

  return response.items as any
}

// Get related articles
export async function getRelatedArticles(
  currentSlug: string, 
  category: string, 
  tags: string[], 
  limit = 3
): Promise<ContentfulArticle[]> {
  // First try to get articles from the same category
  const response = await client.getEntries({
    content_type: 'article',
    'fields.category': category,
    'fields.slug[ne]': currentSlug,
    order: ['-fields.publishedAt'],
    limit: limit,
    include: 2,
  })

  let articles = response.items as any

  // If we don't have enough articles, get articles with similar tags
  if (articles.length < limit && tags.length > 0) {
    const tagResponse = await client.getEntries({
      content_type: 'article',
      'fields.tags[in]': tags.join(','),
      'fields.slug[ne]': currentSlug,
      order: ['-fields.publishedAt'],
      limit: limit - articles.length,
      include: 2,
    })

    const tagArticles = tagResponse.items as any
    
    // Merge and deduplicate
    const existingSlugs = articles.map((a: any) => a.fields.slug)
    const newArticles = tagArticles.filter((a: any) => !existingSlugs.includes(a.fields.slug))
    
    articles = [...articles, ...newArticles]
  }

  return articles.slice(0, limit)
}
