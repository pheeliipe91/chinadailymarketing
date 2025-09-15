"use client"

import { useState } from 'react'
import { X, Download, Mail, CheckCircle, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmailGateProps {
  isOpen: boolean
  onClose: () => void
  resourceTitle: string
  resourceDescription: string
  resourceId: string
  previewImage?: string
}

export function EmailGate({
  isOpen,
  onClose,
  resourceTitle,
  resourceDescription,
  resourceId,
  previewImage
}: EmailGateProps) {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulação - substituir com integração real
    setTimeout(() => {
      setDownloadUrl(`/api/download/${resourceId}`)
      setStep('success')
      setIsLoading(false)
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-900 shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-8">
            {step === 'form' ? (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-red/10 mb-4">
                    <FileText className="h-8 w-8 text-accent-red" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{resourceTitle}</h2>
                  <p className="text-foreground-secondary dark:text-foreground-dark-secondary">
                    {resourceDescription}
                  </p>
                </div>

                {/* Preview Image */}
                {previewImage && (
                  <div className="mb-6 rounded-lg overflow-hidden border border-border-light dark:border-border-dark">
                    <img 
                      src={previewImage} 
                      alt={resourceTitle}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background dark:bg-background focus:outline-none focus:ring-2 focus:ring-accent-red"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email profissional *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background dark:bg-background focus:outline-none focus:ring-2 focus:ring-accent-red"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Empresa (opcional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background dark:bg-background focus:outline-none focus:ring-2 focus:ring-accent-red"
                      placeholder="Sua empresa"
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="consent" className="text-sm text-foreground-secondary dark:text-foreground-dark-secondary">
                      Concordo em receber comunicações sobre conteúdo relevante e posso cancelar a qualquer momento.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    {isLoading ? (
                      'Processando...'
                    ) : (
                      <>
                        <Mail className="mr-2 h-5 w-5" />
                        Baixar Material Gratuito
                      </>
                    )}
                  </button>
                </form>

                <p className="mt-4 text-xs text-center text-foreground-secondary dark:text-foreground-dark-secondary">
                  Respeitamos sua privacidade. Seus dados estão seguros conosco.
                </p>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Material Liberado!</h2>
                  <p className="text-foreground-secondary dark:text-foreground-dark-secondary mb-6">
                    Seu download está pronto. Também enviamos uma cópia para seu email.
                  </p>
                  
                  <div className="space-y-3">
                    <a
                      href={downloadUrl}
                      download
                      className="w-full btn-primary flex items-center justify-center"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Baixar Agora
                    </a>
                    
                    <button
                      onClick={onClose}
                      className="w-full btn-secondary"
                    >
                      Continuar Navegando
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
