"use client"

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { 
  BookOpen, 
  Minus, 
  Plus, 
  Sun, 
  Moon, 
  ChevronUp,
  Share2,
  Twitter,
  Linkedin,
  Link2
} from 'lucide-react'
import { useTheme } from 'next-themes'

interface ArticleReaderProps {
  content: string
}

export function ArticleReader({ content }: ArticleReaderProps) {
  const [fontSize, setFontSize] = useState(16)
  const [readingMode, setReadingMode] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showTableOfContents, setShowTableOfContents] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrollTop = window.scrollY
      const scrollPercentage = (scrollTop / documentHeight) * 100
      
      setProgress(scrollPercentage)
      setShowScrollTop(scrollTop > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const increaseFontSize = () => {
    if (fontSize < 24) setFontSize(fontSize + 2)
  }

  const decreaseFontSize = () => {
    if (fontSize > 12) setFontSize(fontSize - 2)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const shareOnTwitter = () => {
    const url = window.location.href
    const text = document.title
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
  }

  const shareOnLinkedIn = () => {
    const url = window.location.href
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Extract headings for table of contents
  const extractHeadings = (html: string) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const headings = doc.querySelectorAll('h2')
    return Array.from(headings).map((heading, index) => ({
      id: `heading-${index}`,
      text: heading.textContent || '',
      level: 2
    }))
  }

  const headings = extractHeadings(content)

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <div 
          className="h-full bg-accent-red transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Reading Controls */}
      <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-sm border-b border-border-light dark:border-border-dark">
        <div className="mx-auto max-w-prose-narrow px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Font Size Controls */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-foreground-secondary mr-2">Tamanho:</span>
              <button
                onClick={decreaseFontSize}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Diminuir fonte"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-sm w-8 text-center">{fontSize}</span>
              <button
                onClick={increaseFontSize}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Aumentar fonte"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Reading Mode & Theme */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setReadingMode(!readingMode)}
                className={cn(
                  "p-2 rounded transition-colors",
                  readingMode 
                    ? "bg-accent-red text-white" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                aria-label="Modo leitura"
              >
                <BookOpen className="h-4 w-4" />
              </button>
              
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Alternar tema"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </button>
              )}

              {/* Share Menu */}
              <div className="relative group">
                <button
                  className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Compartilhar"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-900 shadow-lg border border-border-light dark:border-border-dark opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button
                    onClick={shareOnTwitter}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center"
                  >
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </button>
                  <button
                    onClick={shareOnLinkedIn}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center"
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </button>
                  <button
                    onClick={copyLink}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center"
                  >
                    <Link2 className="h-4 w-4 mr-2" />
                    {copied ? 'Copiado!' : 'Copiar link'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative">
        {/* Table of Contents - Desktop */}
        {headings.length > 0 && !readingMode && (
          <aside className="hidden xl:block absolute left-0 top-8 w-64 -ml-72">
            <div className="sticky top-32 p-4 rounded-lg border border-border-light dark:border-border-dark">
              <h3 className="font-semibold mb-3 text-sm">Neste artigo</h3>
              <nav className="space-y-2">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className="block text-sm text-foreground-secondary hover:text-accent-red transition-colors"
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Article Content */}
        <div 
          className={cn(
            "mx-auto px-4 sm:px-6 lg:px-8 prose-custom",
            readingMode ? "max-w-prose-narrow" : "max-w-prose-narrow"
          )}
          style={{ fontSize: `${fontSize}px` }}
        >
          <div 
            dangerouslySetInnerHTML={{ __html: content }}
            className={cn(
              "prose prose-lg dark:prose-invert",
              "prose-headings:font-bold prose-headings:tracking-tight",
              "prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6",
              "prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4",
              "prose-p:leading-relaxed prose-p:mb-6",
              "prose-a:text-accent-red prose-a:no-underline hover:prose-a:underline",
              "prose-blockquote:border-l-4 prose-blockquote:border-accent-red prose-blockquote:pl-4 prose-blockquote:italic",
              "prose-img:rounded-xl prose-img:shadow-xl",
              "prose-code:text-accent-red prose-code:bg-accent-red/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
              readingMode && "reading-mode"
            )}
          />
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-accent-red text-white rounded-full shadow-lg hover:bg-accent-hover transition-all transform hover:scale-110"
          aria-label="Voltar ao topo"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      {/* Reading Mode Styles */}
      {readingMode && (
        <style jsx global>{`
          .reading-mode {
            max-width: 680px;
            margin: 0 auto;
          }
          
          header,
          footer,
          aside,
          .related-articles {
            opacity: 0.3;
            pointer-events: none;
          }
        `}</style>
      )}
    </>
  )
}
