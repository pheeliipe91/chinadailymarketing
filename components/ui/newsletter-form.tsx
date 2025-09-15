"use client"

import { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NewsletterFormProps {
  variant?: 'default' | 'inline' | 'hero'
}

export function NewsletterForm({ variant = 'default' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    // Simulação de envio - substituir com integração real do Resend
    setTimeout(() => {
      setStatus('success')
      setMessage('Obrigado por se inscrever! Verifique seu email para confirmar.')
      setEmail('')
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    }, 1000)
  }

  if (variant === 'inline') {
    return (
      <div className="bg-gradient-to-r from-accent-red/10 to-orange-500/10 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Receba insights exclusivos</h3>
            <p className="text-foreground-secondary dark:text-foreground-dark-secondary">
              Análises semanais sobre economia e tecnologia chinesa
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex-1 w-full md:max-w-md">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="flex-1 px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background dark:bg-background focus:outline-none focus:ring-2 focus:ring-accent-red"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary whitespace-nowrap"
              >
                {status === 'loading' ? 'Enviando...' : 'Inscrever'}
              </button>
            </div>
            {status === 'success' && (
              <p className="mt-2 text-sm text-green-600 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      "rounded-2xl p-8",
      variant === 'hero' ? "bg-transparent" : "bg-white dark:bg-gray-900 shadow-xl"
    )}>
      <div className="text-center mb-6">
        <Mail className="h-12 w-12 text-accent-red mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Newsletter China Insights</h3>
        <p className="text-foreground-secondary dark:text-foreground-dark-secondary">
          Receba análises exclusivas sobre a China moderna direto no seu email
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu melhor email"
          required
          className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-background dark:bg-background focus:outline-none focus:ring-2 focus:ring-accent-red"
        />
        
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full btn-primary"
        >
          {status === 'loading' ? 'Inscrevendo...' : 'Quero receber insights'}
        </button>
        
        {status === 'success' && (
          <p className="text-sm text-green-600 text-center flex items-center justify-center">
            <CheckCircle className="h-4 w-4 mr-1" />
            {message}
          </p>
        )}
        
        <p className="text-xs text-center text-foreground-secondary dark:text-foreground-dark-secondary">
          Respeitamos sua privacidade. Cancele quando quiser.
        </p>
      </form>
    </div>
  )
}
