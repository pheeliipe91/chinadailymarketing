import { notFound } from 'next/navigation'
import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'
import { ArticleCard } from '@/components/ui/article-card'
import { RichTextRenderer } from '@/components/ui/rich-text-renderer'
import { ShareButtons } from '@/components/ui/share-buttons'
import { ArticleRating } from '@/components/ui/article-rating'
import { ArticleViewTracker } from '@/components/ui/article-view-tracker'
import { Clock, Calendar, User, ArrowLeft, Bookmark } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { getArticleBySlug, getRelatedArticles } from '@/lib/contentful'

// Função para buscar artigo do Contentful
async function getArticle(slug: string) {
  try {
    const article = await getArticleBySlug(slug)
    if (!article) return null
    
    return {
      title: article.fields.title,
      excerpt: article.fields.excerpt,
      content: article.fields.content,
      image: article.fields.featuredImage?.fields?.file?.url 
        ? `https:${article.fields.featuredImage.fields.file.url}`
        : '/images/default-article.jpg',
      category: article.fields.category,
      readingTime: article.fields.readingTime,
      date: article.fields.publishedAt,
      author: {
        name: article.fields.author?.fields?.name || 'China Daily Marketing',
        bio: article.fields.author?.fields?.bio || 'Especialistas em marketing digital para o mercado chinês',
        avatar: article.fields.author?.fields?.avatar?.fields?.file?.url 
          ? `https:${article.fields.author.fields.avatar.fields.file.url}`
          : '/images/default-avatar.jpg'
      },
      tags: Array.isArray(article.fields.tags) ? article.fields.tags : [],
      seoTitle: article.fields.seoTitle,
      seoDescription: article.fields.seoDescription,
      isContentful: true
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

// Dados de fallback para artigos estáticos
const staticArticles = {
  'economia-digital-chinesa': {
    title: "A Economia Digital Chinesa: Como a China Reinventou o Comércio",
    excerpt: "Análise profunda de como a China se tornou líder mundial em economia digital, desde pagamentos móveis até super apps.",
    content: `
      <h2>A Revolução Digital Chinesa</h2>
      <p>A China não apenas adotou a tecnologia digital - ela a reinventou. Em menos de duas décadas, o país transformou-se de uma economia predominantemente agrícola em uma potência digital que define tendências globais.</p>
      
      <h3>Os Pilares da Transformação</h3>
      <p>Três elementos foram fundamentais para essa revolução:</p>
      <ul>
        <li><strong>Super Apps:</strong> WeChat, Alipay e outros aplicativos que integram múltiplos serviços</li>
        <li><strong>Pagamentos Móveis:</strong> Uma sociedade quase sem dinheiro físico</li>
        <li><strong>E-commerce Integrado:</strong> Plataformas que vão além da simples venda online</li>
      </ul>
      
      <h3>O Ecossistema WeChat</h3>
      <p>O WeChat exemplifica perfeitamente a abordagem chinesa à tecnologia. Mais que um aplicativo de mensagens, é uma plataforma completa que permite:</p>
      <ul>
        <li>Comunicação pessoal e profissional</li>
        <li>Pagamentos e transferências</li>
        <li>Compras online e offline</li>
        <li>Serviços governamentais</li>
        <li>Entretenimento e mídia social</li>
      </ul>
      
      <h3>Impacto Global</h3>
      <p>As inovações chinesas em economia digital estão influenciando mercados ao redor do mundo. Conceitos como live commerce, social commerce e super apps estão sendo adaptados globalmente.</p>
      
      <h2>Lições para o Mercado Global</h2>
      <p>A experiência chinesa oferece insights valiosos para empresas e governos que buscam acelerar sua transformação digital:</p>
      
      <h3>1. Integração é Fundamental</h3>
      <p>O sucesso dos super apps chineses demonstra o valor de criar ecossistemas integrados em vez de aplicativos isolados.</p>
      
      <h3>2. Mobile-First é Essencial</h3>
      <p>A China saltou diretamente para soluções móveis, evitando a infraestrutura legada que limita outros mercados.</p>
      
      <h3>3. Parcerias Público-Privadas</h3>
      <p>A colaboração entre governo e setor privado foi crucial para criar um ambiente propício à inovação.</p>
      
      <h2>O Futuro da Economia Digital</h2>
      <p>Olhando para o futuro, a China continua na vanguarda com investimentos em:</p>
      <ul>
        <li>Inteligência Artificial aplicada ao comércio</li>
        <li>Blockchain para transparência e segurança</li>
        <li>IoT (Internet das Coisas) para experiências conectadas</li>
        <li>5G para velocidade e conectividade aprimoradas</li>
      </ul>
      
      <p>A economia digital chinesa não é apenas uma história de sucesso tecnológico - é um modelo de como a inovação pode transformar sociedades inteiras. Para empresas globais, entender e adaptar essas lições pode ser a chave para o sucesso no mundo digital.</p>
    `,
    image: "/images/economia-digital.jpg",
    category: "Economia",
    readingTime: 12,
    date: "2024-01-15",
    author: {
      name: "Dr. Li Wei",
      bio: "Especialista em economia digital chinesa com 15 anos de experiência em análise de mercados asiáticos.",
      avatar: "/images/authors/li-wei.jpg"
    },
    tags: ["Economia Digital", "WeChat", "Fintech", "Super Apps", "China"],
    seoTitle: undefined,
    seoDescription: undefined,
    isContentful: false
  },
  'shenzhen-silicon-valley': {
    title: "Shenzhen: o Silicon Valley que o ocidente ignora",
    excerpt: "A cidade que transformou-se de vila de pescadores em metrópole tecnológica.",
    content: `
      <h2>Shenzhen: A História de Uma Metrópole Tecnológica</h2>
      <p>Shenzhen, uma cidade localizada na província de Guangdong, na China, é frequentemente chamada de "Silicon Valley do Vale do Silício" devido ao seu rápido crescimento como um centro de tecnologia e inovação.</p>
      
      <h3>De Vila de Pescadores a Metrópole</h3>
      <p>Até a década de 1980, Shenzhen era uma pequena vila de pescadores com uma população de apenas 30.000 habitantes. No entanto, com a implementação das políticas de reforma e abertura da China, a cidade começou a se transformar rapidamente.</p>
      
      <h3>O Desenvolvimento de Shenzhen</h3>
      <p>A cidade se tornou uma Zona Econômica Especial (ZEE) em 1980, o que permitiu que ela atraísse investimentos estrangeiros e se tornasse um centro de manufatura. Com o tempo, Shenzhen se desenvolveu em uma metrópole tecnológica, com empresas como a Huawei, a ZTE e a Tencent se estabelecendo na cidade.</p>
      
      <h3>A Indústria de Tecnologia de Shenzhen</h3>
      <p>A indústria de tecnologia de Shenzhen é diversificada e inclui setores como a eletrônica, a informática, a biotecnologia e a nanotecnologia. A cidade é também um centro de inovação, com muitas startups e incubadoras de empresas.</p>
      
      <h3>O Futuro de Shenzhen</h3>
      <p>Shenzhen continua a se desenvolver como um centro de tecnologia e inovação. A cidade está investindo pesadamente em infraestrutura, incluindo a construção de um novo aeroporto e a expansão do seu sistema de metrô.</p>
      
      <p>Além disso, Shenzhen está se tornando um centro de inteligência artificial, com muitas empresas de IA se estabelecendo na cidade. A cidade também está investindo em educação e treinamento, com a criação de programas de formação em tecnologia e inovação.</p>
    `,
    image: "/images/shenzhen.jpg",
    category: "Tecnologia",
    readingTime: 10,
    date: "2024-01-12",
    author: {
      name: "Dr. Li Wei",
      bio: "Especialista em tecnologia e inovação com 10 anos de experiência em análise de mercados asiáticos.",
      avatar: "/images/authors/li-wei.jpg"
    },
    tags: ["Shenzhen", "Tecnologia", "Inovação", "China"],
    seoTitle: undefined,
    seoDescription: undefined,
    isContentful: false
  },
  'china-reinventou-varejo': {
    title: "Como a China Reinventou o Varejo",
    excerpt: "Experiências de compra que misturam online e offline de forma revolucionária.",
    content: `
      <h2>A Revolução do Varejo na China</h2>
      <p>A China está revolucionando o varejo, misturando online e offline de forma inovadora. As lojas físicas estão se tornando experiências imersivas, enquanto as plataformas de e-commerce estão se tornando mais sofisticadas.</p>
      
      <h3>O Conceito de "New Retail"</h3>
      <p>O conceito de "New Retail" foi popularizado pelo empresário chinês Jack Ma, fundador da Alibaba. Ele defende que as lojas físicas devem ser experiências imersivas, que combinem a tecnologia com a interação humana.</p>
      
      <h3>As Lojas Físicas como Experiências</h3>
      <p>As lojas físicas na China estão se tornando experiências imersivas, com a utilização de tecnologias como a realidade aumentada e a inteligência artificial. Os clientes podem experimentar produtos de forma interativa, e as lojas podem coletar dados sobre o comportamento dos clientes.</p>
      
      <h3>As Plataformas de E-commerce</h3>
      <p>As plataformas de e-commerce na China estão se tornando mais sofisticadas, com a utilização de tecnologias como a inteligência artificial e o aprendizado de máquina. As plataformas podem personalizar as ofertas para os clientes, e os clientes podem fazer compras de forma rápida e fácil.</p>
      
      <h3>O Futuro do Varejo na China</h3>
      <p>O futuro do varejo na China é promissor, com a continuação da inovação e da experimentação. As lojas físicas e as plataformas de e-commerce continuarão a se desenvolver, e os clientes continuarão a ter experiências de compra inovadoras.</p>
    `,
    image: "/images/varejo.jpg",
    category: "Negócios",
    readingTime: 12,
    date: "2024-01-10",
    author: {
      name: "Dr. Li Wei",
      bio: "Especialista em varejo e marketing com 10 anos de experiência em análise de mercados asiáticos.",
      avatar: "/images/authors/li-wei.jpg"
    },
    tags: ["Varejo", "E-commerce", "Inovação", "China"],
    seoTitle: undefined,
    seoDescription: undefined,
    isContentful: false
  },
  'sistema-credito-social': {
    title: "O Sistema de Crédito Social: Mitos e Realidades",
    excerpt: "Separando fatos de ficção sobre um dos sistemas mais controversos.",
    content: `
      <h2>O Sistema de Crédito Social: Uma Introdução</h2>
      <p>O sistema de crédito social é um sistema de avaliação de crédito que é utilizado na China. Ele é baseado na ideia de que os cidadãos devem ser recompensados por seu comportamento social e econômico.</p>
      
      <h3>Como Funciona o Sistema de Crédito Social</h3>
      <p>O sistema de crédito social é baseado na coleta de dados sobre o comportamento dos cidadãos. Esses dados são utilizados para calcular um score de crédito, que é utilizado para determinar a confiabilidade de um indivíduo.</p>
      
      <h3>Mitos e Realidades sobre o Sistema de Crédito Social</h3>
      <p>Existem muitos mitos e realidades sobre o sistema de crédito social. Alguns dos mitos incluem a ideia de que o sistema é utilizado para controlar a população, ou que é uma forma de vigilância em massa.</p>
      
      <h3>A Realidade do Sistema de Crédito Social</h3>
      <p>A realidade do sistema de crédito social é que ele é um sistema de avaliação de crédito que é utilizado para determinar a confiabilidade de um indivíduo. Ele é baseado na coleta de dados sobre o comportamento dos cidadãos, e é utilizado para recompensar os indivíduos que têm um comportamento social e econômico responsável.</p>
      
      <h3>O Futuro do Sistema de Crédito Social</h3>
      <p>O futuro do sistema de crédito social é incerto. Alguns especialistas acreditam que o sistema será utilizado de forma mais ampla, enquanto outros acreditam que ele será abandonado devido às críticas.</p>
    `,
    image: "/images/credito-social.jpg",
    category: "Sociedade",
    readingTime: 15,
    date: "2024-01-08",
    author: {
      name: "Dr. Li Wei",
      bio: "Especialista em sistemas de crédito social com 10 anos de experiência em análise de mercados asiáticos.",
      avatar: "/images/authors/li-wei.jpg"
    },
    tags: ["Sistema de Crédito Social", "China", "Economia", "Sociedade"],
    seoTitle: undefined,
    seoDescription: undefined,
    isContentful: false
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  // Primeiro tenta buscar do Contentful
  let article = await getArticle(params.slug)
  
  // Se não encontrar no Contentful, tenta nos dados estáticos
  if (!article) {
    const staticArticle = staticArticles[params.slug as keyof typeof staticArticles]
    if (staticArticle) {
      article = staticArticle as any // Type assertion for static articles with string content
    }
  }
  
  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ArticleViewTracker articleSlug={params.slug} />
      
      <article className="pt-20">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/artigos"
            className="inline-flex items-center text-sm text-foreground-secondary hover:text-foreground-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para artigos
          </Link>
        </div>

        {/* Article Header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category & Date */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-red text-white">
              {article.category}
            </span>
            <time className="text-sm text-foreground-secondary dark:text-foreground-dark-secondary">
              {formatDate(article.date)}
            </time>
            <span className="flex items-center text-sm text-foreground-secondary dark:text-foreground-dark-secondary">
              <Clock className="h-4 w-4 mr-1" />
              {article.readingTime} min de leitura
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-foreground-secondary dark:text-foreground-dark-secondary mb-8">
            {article.excerpt}
          </p>

          {/* Author */}
          <div className="flex items-center justify-between pb-8 border-b border-border-light dark:border-border-dark">
            <div className="flex items-center space-x-4">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">{article.author.name}</p>
                <p className="text-sm text-foreground-secondary dark:text-foreground-dark-secondary">
                  Autor
                </p>
              </div>
            </div>
            
            {/* Share buttons */}
            <div className="flex items-center space-x-2">
              <ShareButtons 
                url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://chinadailymarketing.com'}/artigos/${params.slug}`}
                title={article.title}
                description={article.excerpt}
              />
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-[400px] md:h-[600px] my-12">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="mx-auto max-w-prose-narrow px-4 sm:px-6 lg:px-8 mt-16">
          {article.isContentful ? (
            <RichTextRenderer content={article.content} />
          ) : (
            <div 
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: article.content as unknown as string }}
            />
          )}
        </div>

        {/* Tags */}
        <div className="mx-auto max-w-prose-narrow px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex flex-wrap gap-2">
            {Array.isArray(article.tags) && article.tags.map((tag: string) => (
              <Link
                key={tag}
                href={`/tags/${tag.toLowerCase().replace(' ', '-')}`}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="mx-auto max-w-prose-narrow px-4 sm:px-6 lg:px-8 mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl">
          <div className="flex items-start space-x-4">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              width={64}
              height={64}
              className="rounded-full flex-shrink-0"
            />
            <div>
              <h3 className="font-semibold mb-2">{article.author.name}</h3>
              <p className="text-sm text-foreground-secondary dark:text-foreground-dark-secondary">
                {article.author.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Article Rating */}
        <div className="mx-auto max-w-prose-narrow px-4 sm:px-6 lg:px-8 mt-16">
          <ArticleRating articleSlug={params.slug} />
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold mb-8">Artigos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center text-foreground-secondary py-8">
              <p>Artigos relacionados em breve...</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
