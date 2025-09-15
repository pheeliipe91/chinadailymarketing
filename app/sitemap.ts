import { MetadataRoute } from 'next'

// Dados de exemplo - substituir com dados reais do CMS
const articles = [
  'economia-digital-chinesa',
  'shenzhen-silicon-valley',
  'china-reinventou-varejo',
  'sistema-credito-social',
  'cultura-trabalho-996',
  'belt-road-digital',
  'wechat-super-app',
  'carros-eletricos-chineses'
]

const categories = [
  'economia',
  'tecnologia',
  'negocios',
  'sociedade',
  'cultura',
  'geopolitica'
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chinainsights.com.br'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/artigos`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biblioteca`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]
  
  // Article pages
  const articlePages = articles.map((slug) => ({
    url: `${baseUrl}/artigos/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  // Category pages
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/categorias/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  return [...staticPages, ...articlePages, ...categoryPages]
}
