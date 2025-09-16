"use client"

import { useState } from 'react'
import { Share2, Twitter, Linkedin, Link2, Facebook, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ShareButtonsProps {
  url?: string
  title?: string
  description?: string
  className?: string
}

export function ShareButtons({ 
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = typeof document !== 'undefined' ? document.title : '',
  description = '',
  className 
}: ShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareOnTwitter = () => {
    const text = `${title} ${description ? '- ' + description : ''}`
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank',
      'width=600,height=400'
    )
    setIsOpen(false)
  }

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank',
      'width=600,height=400'
    )
    setIsOpen(false)
  }

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank',
      'width=600,height=400'
    )
    setIsOpen(false)
  }

  const shareOnWhatsApp = () => {
    const text = `${title} ${url}`
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      '_blank'
    )
    setIsOpen(false)
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      setIsOpen(false)
    } catch (err) {
      console.error('Erro ao copiar link:', err)
    }
  }

  const shareNative = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url
        })
        setIsOpen(false)
      } catch (err) {
        console.error('Erro ao compartilhar:', err)
      }
    }
  }

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => {
          if (typeof navigator !== 'undefined' && 'share' in navigator) {
            shareNative()
          } else {
            setIsOpen(!isOpen)
          }
        }}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Compartilhar"
      >
        <Share2 className="h-5 w-5" />
      </button>

      {isOpen && !(typeof navigator !== 'undefined' && 'share' in navigator) && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Share Menu */}
          <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white dark:bg-gray-900 shadow-lg border border-border-light dark:border-border-dark z-50">
            <div className="p-2">
              <div className="text-sm font-medium text-foreground mb-2 px-2">
                Compartilhar artigo
              </div>
              
              <button
                onClick={shareOnTwitter}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded flex items-center transition-colors"
              >
                <Twitter className="h-4 w-4 mr-3 text-blue-500" />
                Twitter
              </button>
              
              <button
                onClick={shareOnLinkedIn}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded flex items-center transition-colors"
              >
                <Linkedin className="h-4 w-4 mr-3 text-blue-600" />
                LinkedIn
              </button>
              
              <button
                onClick={shareOnFacebook}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded flex items-center transition-colors"
              >
                <Facebook className="h-4 w-4 mr-3 text-blue-700" />
                Facebook
              </button>
              
              <button
                onClick={shareOnWhatsApp}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded flex items-center transition-colors"
              >
                <MessageCircle className="h-4 w-4 mr-3 text-green-600" />
                WhatsApp
              </button>
              
              <div className="border-t border-border-light dark:border-border-dark my-2" />
              
              <button
                onClick={copyLink}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded flex items-center transition-colors"
              >
                <Link2 className="h-4 w-4 mr-3 text-gray-600" />
                {copied ? 'Link copiado!' : 'Copiar link'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
