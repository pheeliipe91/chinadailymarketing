"use client"

import { useState } from 'react'
import { CheckCircle, Loader2, Mail, AlertCircle } from 'lucide-react'

interface NewsletterSignupProps {
  className?: string
  placeholder?: string
  buttonText?: string
}

export function NewsletterSignup({ 
  className = "", 
  placeholder = "Seu melhor email",
  buttonText = "Quero Receber"
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Por favor, insira um email válido')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Inscrição realizada com sucesso! Verifique seu email.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Erro ao processar inscrição. Tente novamente.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Erro de conexão. Tente novamente.')
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex items-center justify-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 ${className}`}>
        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
        <span className="text-green-700 dark:text-green-300 font-medium">
          {message}
        </span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            disabled={status === 'loading'}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent bg-white dark:bg-gray-800 text-foreground-primary dark:text-foreground-dark-primary placeholder-foreground-secondary dark:placeholder-foreground-dark-secondary disabled:opacity-50"
          />
        </div>
        <button 
          type="submit" 
          disabled={status === 'loading' || !email}
          className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              {buttonText}
            </>
          )}
        </button>
      </div>
      
      {status === 'error' && (
        <div className="flex items-center text-red-600 dark:text-red-400 text-sm">
          <AlertCircle className="h-4 w-4 mr-2" />
          {message}
        </div>
      )}
    </form>
  )
}
