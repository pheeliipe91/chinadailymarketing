import { Download, FileText, Eye, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PremiumCardProps {
  id: string
  title: string
  description: string
  type: string
  pages: number
  downloads: number
  category: string
  tags: string[]
  preview: string
  badge?: string | null
  new?: boolean
  onDownload: () => void
}

export function PremiumCard({
  title,
  description,
  type,
  pages,
  downloads,
  category,
  tags,
  preview,
  badge,
  new: isNew,
  onDownload
}: PremiumCardProps) {
  const getTypeIcon = () => {
    switch (type) {
      case 'ebook':
        return '📚'
      case 'report':
        return '📊'
      case 'guide':
        return '📖'
      case 'case-study':
        return '💼'
      case 'whitepaper':
        return '📄'
      case 'template':
        return '📝'
      default:
        return '📁'
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-border-light dark:border-border-dark hover:shadow-2xl transition-all duration-300">
      {/* Badge */}
      {(badge || isNew) && (
        <div className="absolute top-4 left-4 z-10">
          <span className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
            isNew ? "bg-green-500 text-white" : 
            badge === 'Popular' ? "bg-accent-red text-white" :
            badge === 'Exclusivo' ? "bg-purple-500 text-white" :
            "bg-gray-800 text-white"
          )}>
            {badge || 'Novo'}
          </span>
        </div>
      )}

      {/* Preview Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
        <img 
          src={preview} 
          alt={title}
          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Type Icon */}
        <div className="absolute bottom-4 right-4 text-4xl">
          {getTypeIcon()}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-accent-red uppercase tracking-wider">
            {category}
          </span>
          <span className="text-xs text-foreground-secondary dark:text-foreground-dark-secondary">
            {pages} páginas
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-accent-red transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-foreground-secondary dark:text-foreground-dark-secondary line-clamp-2 mb-4">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border-light dark:border-border-dark">
          <div className="flex items-center space-x-3 text-xs text-foreground-secondary dark:text-foreground-dark-secondary">
            <span className="flex items-center">
              <Download className="h-3 w-3 mr-1" />
              {downloads.toLocaleString()}
            </span>
            <span className="flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              Preview
            </span>
          </div>
          
          <button
            onClick={onDownload}
            className="inline-flex items-center px-4 py-2 bg-accent-red text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-colors"
          >
            <Download className="h-4 w-4 mr-1" />
            Baixar
          </button>
        </div>
      </div>
    </div>
  )
}
