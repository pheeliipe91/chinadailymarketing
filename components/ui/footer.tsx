import Link from 'next/link'
import { Mail, Linkedin, Twitter, Github } from 'lucide-react'

const footerLinks = {
  conteudo: [
    { name: 'Artigos', href: '/artigos' },
    { name: 'Cursos Premium', href: '/cursos' },
    { name: 'Newsletter', href: '/newsletter' },
  ],
  sobre: [
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Contato', href: '/contato' },
    { name: 'Parcerias', href: '/parcerias' },
  ],
  legal: [
    { name: 'Privacidade', href: '/privacidade' },
    { name: 'Termos', href: '/termos' },
    { name: 'Cookies', href: '/cookies' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-background border-t border-border-light dark:border-border-dark">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-gradient">射中</span>
              <span className="text-xl font-bold">China Daily Marketing</span>
            </div>
            <p className="text-sm text-foreground-secondary dark:text-foreground-dark-secondary mt-2">
              Estratégias de marketing digital e insights sobre o mercado chinês para empresas globais.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="mailto:contato@chinainsights.com.br"
                className="text-foreground-secondary hover:text-accent-red transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                className="text-foreground-secondary hover:text-accent-red transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                className="text-foreground-secondary hover:text-accent-red transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                className="text-foreground-secondary hover:text-accent-red transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Conteúdo</h3>
            <ul className="space-y-3">
              {footerLinks.conteudo.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-secondary hover:text-accent-red transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Sobre</h3>
            <ul className="space-y-3">
              {footerLinks.sobre.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-secondary hover:text-accent-red transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-secondary hover:text-accent-red transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-light dark:border-border-dark">
          <p className="text-center text-sm text-foreground-secondary dark:text-foreground-dark-secondary">
            © {new Date().getFullYear()} China Insights. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
