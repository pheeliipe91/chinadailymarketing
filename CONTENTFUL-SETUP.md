# Configuração do Contentful CMS - China Daily Marketing

## 🚀 Passo a Passo para Configurar o Contentful

### 1. Criar Conta no Contentful

1. Acesse [contentful.com](https://www.contentful.com)
2. Clique em "Start building for free"
3. Crie sua conta (pode usar Google/GitHub)
4. Escolha "I'm new to Contentful"

### 2. Criar Space (Espaço)

1. No dashboard, clique em "Create space"
2. Nome: **China Daily Marketing**
3. Escolha "Free" plan
4. Confirme criação

### 3. Configurar Content Models

#### Model 1: Article (Artigo)

**Campos necessários:**

1. **Title** (Short text)
   - Field ID: `title`
   - Required: Yes
   - Help text: "Título do artigo (máx 60 caracteres para SEO)"

2. **Slug** (Short text)
   - Field ID: `slug`
   - Required: Yes
   - Unique: Yes
   - Help text: "URL amigável (ex: wechat-marketing-guia)"

3. **Excerpt** (Long text)
   - Field ID: `excerpt`
   - Required: Yes
   - Help text: "Resumo do artigo (150-160 caracteres)"

4. **Content** (Rich text)
   - Field ID: `content`
   - Required: Yes
   - Help text: "Conteúdo principal do artigo"

5. **Featured Image** (Media)
   - Field ID: `featuredImage`
   - Required: Yes
   - Help text: "Imagem principal (1200x630px recomendado)"

6. **Category** (Short text)
   - Field ID: `category`
   - Required: Yes
   - Help text: "Marketing Digital, E-commerce, Social Media, etc."

7. **Tags** (Short text, list)
   - Field ID: `tags`
   - Required: No
   - Help text: "Tags separadas por vírgula (máx 5)"

8. **Reading Time** (Integer)
   - Field ID: `readingTime`
   - Required: Yes
   - Help text: "Tempo estimado de leitura em minutos"

9. **Published At** (Date & time)
   - Field ID: `publishedAt`
   - Required: Yes
   - Help text: "Data e hora de publicação"

10. **Author** (Reference - Author)
    - Field ID: `author`
    - Required: Yes
    - Help text: "Autor do artigo"

11. **Featured** (Boolean)
    - Field ID: `featured`
    - Required: No
    - Help text: "Marcar como artigo em destaque"

12. **SEO Title** (Short text)
    - Field ID: `seoTitle`
    - Required: No
    - Help text: "Título para SEO (se diferente do título principal)"

13. **SEO Description** (Long text)
    - Field ID: `seoDescription`
    - Required: No
    - Help text: "Descrição para SEO (máx 160 caracteres)"

#### Model 2: Resource (Recurso Premium)

**Campos necessários:**

1. **Title** (Short text)
   - Field ID: `title`
   - Required: Yes
   - Help text: "Nome do guia/e-book (ex: Guia Completo de WeChat Marketing)"

2. **Slug** (Short text)
   - Field ID: `slug`
   - Required: Yes
   - Unique: Yes
   - Help text: "URL amigável (ex: guia-wechat-marketing)"

3. **Description** (Long text)
   - Field ID: `description`
   - Required: Yes
   - Help text: "Descrição detalhada do recurso (200-300 caracteres)"

4. **Cover Image** (Media)
   - Field ID: `coverImage`
   - Required: Yes
   - Help text: "Capa do guia/e-book (800x600px recomendado)"

5. **File** (Media)
   - Field ID: `file`
   - Required: Yes
   - Help text: "Arquivo PDF do guia/e-book"

6. **Category** (Short text)
   - Field ID: `category`
   - Required: Yes
   - Help text: "E-books, Guias, Templates, Checklists, etc."

7. **Tags** (Short text, list)
   - Field ID: `tags`
   - Required: No
   - Help text: "Tags para categorização"

8. **Pages Count** (Integer)
   - Field ID: `pagesCount`
   - Required: Yes
   - Help text: "Número de páginas do documento"

9. **File Size** (Short text)
   - Field ID: `fileSize`
   - Required: Yes
   - Help text: "Tamanho do arquivo (ex: 2.5 MB)"

10. **Preview Content** (Rich text)
    - Field ID: `previewContent`
    - Required: No
    - Help text: "Prévia do conteúdo para mostrar antes do download"

11. **Is Featured** (Boolean)
    - Field ID: `isFeatured`
    - Required: No
    - Default: false
    - Help text: "Destacar na página principal"

12. **Published At** (Date & time)
    - Field ID: `publishedAt`
    - Required: Yes
    - Help text: "Data de publicação do recurso"

#### Model 3: Author (Autor)

**Campos necessários:**

1. **Name** (Short text)
   - Field ID: `name`
   - Required: Yes

2. **Bio** (Long text)
   - Field ID: `bio`
   - Required: Yes
   - Help text: "Biografia do autor"

3. **Avatar** (Media)
   - Field ID: `avatar`
   - Required: No
   - Help text: "Foto do autor (400x400px recomendado)"

### 4. Obter Chaves de API

1. Vá em **Settings > API keys**
2. Clique em "Add API key"
3. Nome: "China Daily Marketing - Production"
4. Copie as seguintes chaves:
   - **Space ID**
   - **Content Delivery API - access token**
   - **Content Preview API - access token**

### 5. Configurar Variáveis de Ambiente

Adicione no arquivo `.env.local`:

```env
# Contentful CMS
CONTENTFUL_SPACE_ID="seu_space_id_aqui"
CONTENTFUL_ACCESS_TOKEN="seu_access_token_aqui"
CONTENTFUL_PREVIEW_TOKEN="seu_preview_token_aqui"
```

### 6. Criar Conteúdo de Exemplo

#### Primeiro Autor:
- **Name**: "China Daily Marketing"
- **Bio**: "Especialistas em marketing digital para o mercado chinês"

#### Primeiro Artigo:
- **Title**: "WeChat Marketing: Como Conquistar 1.3 Bilhão de Usuários"
- **Slug**: "wechat-marketing-guia-completo"
- **Category**: "Marketing Digital"
- **Tags**: "WeChat, Social Media, Mini Programs"
- **Featured**: true

## 🎯 Vantagens do Contentful

### Para Você:
- ✅ **Interface visual** para escrever artigos
- ✅ **Preview** antes de publicar
- ✅ **Agendamento** de posts
- ✅ **Versionamento** de conteúdo
- ✅ **Colaboração** em equipe
- ✅ **Backup automático**

### Para o Blog:
- ✅ **API automática** - conteúdo aparece instantaneamente
- ✅ **CDN global** - imagens otimizadas
- ✅ **Cache inteligente** - performance máxima
- ✅ **Webhooks** - atualizações em tempo real

## 📝 Como Usar Após Configuração

1. **Escrever artigo**: Interface visual do Contentful
2. **Adicionar imagens**: Upload direto na plataforma
3. **Preview**: Ver como ficará no blog
4. **Publicar**: Conteúdo aparece automaticamente no site
5. **Editar**: Mudanças refletem instantaneamente

## 🔄 Workflow Diário

1. **Login no Contentful** → app.contentful.com
2. **Content > Add entry > Article**
3. **Preencher campos** → Título, conteúdo, imagem, etc.
4. **Preview** → Ver resultado
5. **Publish** → Artigo vai ao ar automaticamente

## 📞 Próximos Passos

Após configurar o Contentful:

1. ✅ Criar os content models
2. ✅ Adicionar as chaves no `.env.local`
3. ✅ Criar primeiro autor e artigo
4. ✅ Testar a integração
5. ✅ Começar a produzir conteúdo!

## 🆘 Suporte

Se tiver dúvidas durante a configuração:
- Documentação: [contentful.com/developers/docs](https://www.contentful.com/developers/docs/)
- Suporte: help@contentful.com
- Comunidade: [contentful.com/community](https://www.contentful.com/community/)
