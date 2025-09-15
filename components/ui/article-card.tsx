import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'

interface ArticleCardProps {
  title: string
  excerpt: string
  slug: string
  image: string
  category: string
  readingTime: number
  date: string
  featured?: boolean
}

export function ArticleCard({
  title,
  excerpt,
  slug,
  image,
  category,
  readingTime,
  date,
  featured = false
}: ArticleCardProps) {
  return (
    <Link href={`/artigos/${slug}`}>
      <article className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
        <div className="relative overflow-hidden h-48">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-red text-white">
              {category}
            </span>
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-accent-red transition-colors">
            {title}
          </h3>
          
          <p className="text-sm text-foreground-secondary dark:text-foreground-dark-secondary line-clamp-3 mb-4 flex-1">
            {excerpt}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center space-x-4 text-sm text-foreground-secondary dark:text-foreground-dark-secondary">
              <time dateTime={date}>{formatDate(date)}</time>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {readingTime} min
              </span>
            </div>
            
            <ArrowRight className="h-5 w-5 text-accent-red opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </article>
    </Link>
  )
}
