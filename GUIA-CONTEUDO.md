# Guia para Publicar Conteúdo - China Daily Marketing

## 📝 Como Adicionar Novos Artigos

### Método 1: Arquivos Markdown (Recomendado para começar)

1. **Criar arquivo na pasta `content/articles/`:**
   ```
   content/articles/seu-artigo.md
   ```

2. **Formato do arquivo:**
   ```markdown
   ---
   title: "Título do Seu Artigo"
   slug: "titulo-do-seu-artigo"
   excerpt: "Resumo do artigo em 1-2 frases"
   category: "Marketing Digital" # ou "E-commerce", "Social Media", "Estratégia"
   tags: ["WeChat", "Douyin", "Xiaohongshu"] # máximo 5 tags
   image: "/images/articles/seu-artigo.jpg"
   readingTime: 8 # minutos estimados
   publishedAt: "2024-01-15"
   author: "Seu Nome"
   featured: false # true para artigo em destaque
   ---

   # Título do Artigo

   Seu conteúdo aqui em Markdown...

   ## Subtítulo

   Mais conteúdo...
   ```

3. **Adicionar imagem:**
   - Colocar em `public/images/articles/`
   - Usar formato: `nome-do-artigo.jpg`
   - Tamanho recomendado: 1200x630px

### Método 2: Integração com Contentful (Futuro)

Para quando quiser escalar, podemos integrar com Contentful para:
- Interface visual de edição
- Colaboração em equipe
- Agendamento de posts
- Versionamento

## 📊 Categorias Sugeridas

- **Marketing Digital**: WeChat, Douyin, Xiaohongshu
- **E-commerce**: Tmall, Taobao, JD.com
- **Social Media**: Influenciadores, KOLs, Livestreaming
- **Estratégia**: Entrada no mercado, localização
- **Tecnologia**: Super apps, pagamentos digitais
- **Cultura**: Comportamento do consumidor chinês

## 🏷️ Tags Populares

- WeChat, Douyin, Xiaohongshu, Tmall, Taobao
- KOL, Livestreaming, Social Commerce
- Digital Marketing, E-commerce, Fintech
- Consumer Behavior, Localization

## 📸 Diretrizes de Imagens

### Artigos:
- **Tamanho**: 1200x630px (formato landscape)
- **Formato**: JPG ou PNG
- **Qualidade**: Alta resolução, mas otimizada (<500KB)
- **Estilo**: Profissional, cores que combinem com o tema

### Recursos Premium:
- **Capa**: 800x600px
- **Preview**: 400x300px
- **Ícones**: 64x64px para tipos de arquivo

## 🚀 Workflow de Publicação

1. **Escrever conteúdo** em Markdown
2. **Adicionar imagens** na pasta correta
3. **Testar localmente**: `npm run dev`
4. **Commit e push**: Git automaticamente
5. **Deploy**: Vercel publica automaticamente

## 📈 SEO e Performance

### Títulos:
- Máximo 60 caracteres
- Incluir palavra-chave principal
- Ser atrativo e clicável

### Excerpts:
- 150-160 caracteres
- Resumir o valor do artigo
- Incluir call-to-action sutil

### Conteúdo:
- Mínimo 800 palavras
- Usar subtítulos (H2, H3)
- Incluir listas e bullet points
- Adicionar links internos

## 📧 Materiais Premium

Para e-books e recursos:

1. **Criar arquivo** em `content/resources/`
2. **Upload do PDF** em `public/downloads/`
3. **Configurar email gate** no arquivo

Exemplo:
```markdown
---
title: "Guia Completo: Marketing no WeChat"
type: "ebook"
pages: 45
category: "Marketing Digital"
downloadUrl: "/downloads/guia-wechat-marketing.pdf"
previewImage: "/images/resources/guia-wechat.jpg"
---
```

## 🔄 Atualizações Futuras

Quando quiser evoluir o sistema:

1. **CMS Integration**: Contentful ou Sanity
2. **Admin Panel**: Interface web para edição
3. **Analytics**: Tracking detalhado de performance
4. **Comments**: Sistema de comentários
5. **Newsletter**: Automação de email marketing

## 📞 Suporte

Para dúvidas sobre publicação de conteúdo:
- Consulte este guia
- Teste sempre localmente primeiro
- Use o formato Markdown padrão
- Mantenha consistência nas categorias e tags
