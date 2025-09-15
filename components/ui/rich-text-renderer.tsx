import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document, BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import Image from 'next/image'
import Link from 'next/link'

interface RichTextRendererProps {
  content: Document
  className?: string
}

const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: any) => <strong className="font-semibold">{text}</strong>,
    [MARKS.ITALIC]: (text: any) => <em className="italic">{text}</em>,
    [MARKS.CODE]: (text: any) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">
        {text}
      </code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="mb-6 text-lg leading-relaxed text-foreground-secondary dark:text-foreground-dark-secondary">
        {children}
      </p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: any) => (
      <h1 className="text-4xl md:text-5xl font-bold mb-8 mt-12 text-foreground-primary dark:text-foreground-dark-primary">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <h2 className="text-3xl md:text-4xl font-bold mb-6 mt-10 text-foreground-primary dark:text-foreground-dark-primary">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className="text-2xl md:text-3xl font-bold mb-4 mt-8 text-foreground-primary dark:text-foreground-dark-primary">
        {children}
      </h3>
    ),
    [BLOCKS.HEADING_4]: (node: any, children: any) => (
      <h4 className="text-xl md:text-2xl font-bold mb-4 mt-6 text-foreground-primary dark:text-foreground-dark-primary">
        {children}
      </h4>
    ),
    [BLOCKS.HEADING_5]: (node: any, children: any) => (
      <h5 className="text-lg md:text-xl font-bold mb-3 mt-6 text-foreground-primary dark:text-foreground-dark-primary">
        {children}
      </h5>
    ),
    [BLOCKS.HEADING_6]: (node: any, children: any) => (
      <h6 className="text-base md:text-lg font-bold mb-3 mt-4 text-foreground-primary dark:text-foreground-dark-primary">
        {children}
      </h6>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="mb-6 space-y-2 list-disc list-inside text-foreground-secondary dark:text-foreground-dark-secondary">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="mb-6 space-y-2 list-decimal list-inside text-foreground-secondary dark:text-foreground-dark-secondary">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
      <li className="mb-2">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node: any, children: any) => (
      <blockquote className="border-l-4 border-accent-red pl-6 py-4 mb-6 bg-gray-50 dark:bg-gray-900/50 italic text-lg">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => (
      <hr className="my-8 border-t border-border-light dark:border-border-dark" />
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, title } = node.data.target.fields
      const imageUrl = file.url.startsWith('//') ? `https:${file.url}` : file.url
      
      return (
        <div className="my-8">
          <Image
            src={imageUrl}
            alt={title || 'Imagem do artigo'}
            width={file.details.image.width}
            height={file.details.image.height}
            className="rounded-lg shadow-lg w-full h-auto"
          />
          {title && (
            <p className="text-sm text-center text-foreground-secondary dark:text-foreground-dark-secondary mt-2 italic">
              {title}
            </p>
          )}
        </div>
      )
    },
    [INLINES.HYPERLINK]: (node: any, children: any) => {
      const { uri } = node.data
      const isExternal = uri.startsWith('http')
      
      if (isExternal) {
        return (
          <a
            href={uri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-red hover:text-accent-hover underline transition-colors"
          >
            {children}
          </a>
        )
      }
      
      return (
        <Link
          href={uri}
          className="text-accent-red hover:text-accent-hover underline transition-colors"
        >
          {children}
        </Link>
      )
    },
    [INLINES.ENTRY_HYPERLINK]: (node: any, children: any) => {
      // Handle internal content links
      const entry = node.data.target
      if (entry.sys.contentType?.sys.id === 'article') {
        return (
          <Link
            href={`/artigos/${entry.fields.slug}`}
            className="text-accent-red hover:text-accent-hover underline transition-colors"
          >
            {children}
          </Link>
        )
      }
      return <span>{children}</span>
    },
  },
}

export function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      {documentToReactComponents(content, renderOptions)}
    </div>
  )
}
