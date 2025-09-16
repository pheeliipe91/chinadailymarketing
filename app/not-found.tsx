import Link from 'next/link'
import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* 404 with Chinese character */}
          <div className="mb-8">
            <span className="text-9xl font-bold text-gradient">404</span>
            <p className="text-2xl font-bold mt-4">
              页面未找到 <span className="text-foreground-secondary">/ Página não encontrada</span>
            </p>
          </div>

          {/* Message */}
          <p className="text-lg text-foreground-secondary dark:text-foreground-dark-secondary mb-8 max-w-md mx-auto">
            Parece que você se perdeu na Grande Muralha Digital. 
            A página que você procura não existe ou foi movida.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="btn-primary inline-flex items-center justify-center"
            >
              <Home className="mr-2 h-5 w-5" />
              Voltar ao Início
            </Link>
            
            <Link 
              href="/artigos" 
              className="btn-secondary inline-flex items-center justify-center"
            >
              <Search className="mr-2 h-5 w-5" />
              Explorar Artigos
            </Link>
          </div>

          {/* Suggestions */}
          <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl max-w-lg mx-auto">
            <h3 className="font-semibold mb-4">Páginas populares:</h3>
            <div className="space-y-2 text-left">
              <Link 
                href="/artigos/economia-digital-chinesa" 
                className="block p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <p className="font-medium text-accent-red">Economia Digital Chinesa</p>
                <p className="text-sm text-foreground-secondary">Análise do ecossistema digital</p>
              </Link>
              
              <Link 
                href="/cursos" 
                className="block p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <p className="font-medium text-accent-red">Cursos Premium</p>
                <p className="text-sm text-foreground-secondary">E-books e materiais gratuitos</p>
              </Link>
              
              <Link 
                href="/sobre" 
                className="block p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <p className="font-medium text-accent-red">Sobre Nós</p>
                <p className="text-sm text-foreground-secondary">Conheça nossa missão</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
