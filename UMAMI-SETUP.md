# Umami Analytics Setup Guide

Este guia te ajuda a configurar Umami Analytics no China Daily Marketing blog.

## 🎯 Opções de Setup

### Opção 1: Umami Cloud (Recomendada) ⭐

**Vantagens:**
- Setup em 5 minutos
- 100K page views/mês grátis
- Sem manutenção de servidor
- SSL automático

**Passos:**

1. **Criar conta**
   - Acesse [cloud.umami.is](https://cloud.umami.is)
   - Crie sua conta gratuita

2. **Adicionar website**
   - No dashboard, clique "Add website"
   - Nome: `China Daily Marketing`
   - Domínio: `chinadailymarketing.com` (ou seu domínio)
   - Clique "Save"

3. **Copiar Website ID**
   - Após criar, clique no site
   - Copie o "Website ID" (formato: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)

4. **Configurar no projeto**
   ```bash
   # No seu .env.local, adicione:
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=seu_website_id_aqui
   NEXT_PUBLIC_UMAMI_SRC=https://cloud.umami.is/script.js
   ```

5. **Testar**
   ```bash
   npm run dev
   # Acesse localhost:3000 e verifique se o script carrega
   ```

### Opção 2: Self-hosted com Docker

**Vantagens:**
- Controle total dos dados
- Sem limites de page views
- Customização completa

**Requisitos:**
- VPS (DigitalOcean, AWS, etc.)
- Docker e Docker Compose
- Domínio próprio

**Passos:**

1. **Setup do servidor**
   ```bash
   # No seu VPS
   git clone https://github.com/umami-software/umami.git
   cd umami
   ```

2. **Configurar banco de dados**
   ```bash
   # Criar .env
   echo "DATABASE_URL=postgresql://umami:password@db:5432/umami" > .env
   ```

3. **Deploy com Docker**
   ```bash
   docker compose up -d
   ```

4. **Configurar domínio**
   - Apontar seu subdomínio (ex: analytics.seusite.com) para o VPS
   - Configurar SSL com Nginx/Caddy

5. **Configurar no projeto**
   ```bash
   # No seu .env.local
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=seu_website_id_aqui
   NEXT_PUBLIC_UMAMI_SRC=https://analytics.seusite.com/script.js
   ```

## 🔧 Configuração no Next.js

O projeto já está configurado! Os arquivos criados:

### 1. Componente Analytics
`/components/analytics/umami-analytics.tsx`
- Carrega o script do Umami
- Hook para tracking manual

### 2. Integração no Layout
`/app/layout.tsx`
- Script carregado automaticamente
- Condicional baseado nas env vars

### 3. Variáveis de Ambiente
`.env.example` atualizado com:
```env
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your_website_id_here
NEXT_PUBLIC_UMAMI_SRC=https://cloud.umami.is/script.js
```

## 📊 Tracking Avançado

### Eventos Customizados

```tsx
import { useUmami } from '@/components/analytics/umami-analytics'

function NewsletterForm() {
  const { track } = useUmami()
  
  const handleSubmit = () => {
    track('newsletter-signup', { source: 'homepage' })
  }
}
```

### Eventos Úteis para o Blog

```tsx
// Download de material premium
track('premium-download', { resource: 'guia-wechat' })

// Leitura de artigo
track('article-read', { title: 'WeChat vs WhatsApp', category: 'tecnologia' })

// Interesse em mentoria
track('deep-dive-interest', { source: 'homepage' })

// Compartilhamento
track('article-share', { platform: 'linkedin', article: slug })
```

## 🚀 Próximos Passos

1. **Escolha sua opção** (Cloud ou Self-hosted)
2. **Configure as variáveis** no `.env.local`
3. **Teste o tracking** acessando o site
4. **Monitore no dashboard** do Umami

## 🔒 Privacidade

Umami é GDPR compliant:
- Não usa cookies
- Não coleta dados pessoais
- IPs são anonimizados
- Dados ficam no seu controle

## 💡 Dicas

- **Cloud**: Ideal para começar rápido
- **Self-hosted**: Para controle total e volumes altos
- **Migração**: Você pode migrar de Cloud para Self-hosted depois
- **Backup**: Configure backups regulares se usar self-hosted

## 📞 Suporte

- Documentação: [umami.is/docs](https://umami.is/docs)
- GitHub: [github.com/umami-software/umami](https://github.com/umami-software/umami)
- Discord: Comunidade ativa para suporte
