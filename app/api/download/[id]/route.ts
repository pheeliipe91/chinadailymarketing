import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  // Simulação - em produção, validar o usuário e buscar o arquivo real
  const resources: Record<string, string> = {
    'ebook-economia-digital': '/downloads/economia-digital-china.pdf',
    'report-tech-2024': '/downloads/tech-trends-2024.pdf',
    'guia-negocios': '/downloads/guia-negocios-china.pdf',
    'case-studies-retail': '/downloads/case-studies-retail.pdf',
    'whitepaper-ai': '/downloads/ai-china-whitepaper.pdf',
    'template-pitch': '/downloads/pitch-deck-template.pptx',
  }

  const resourceUrl = resources[id]

  if (!resourceUrl) {
    return NextResponse.json(
      { error: 'Resource not found' },
      { status: 404 }
    )
  }

  // Em produção, redirecionar para o arquivo real ou servir o arquivo
  return NextResponse.json({
    success: true,
    downloadUrl: resourceUrl,
    message: 'Download autorizado'
  })
}
