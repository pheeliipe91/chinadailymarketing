import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend('re_at2DiXnY_6WHjGXfLyrLDLW5xfDgzW8SC')

export async function POST(request: NextRequest) {
  try {
    const { email, name, resourceSlug } = await request.json()

    // Validação básica
    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Buscar informações do recurso dinamicamente do Contentful
    let resourceTitle = 'Guia Premium sobre China'
    let resourceDescription = 'Conteúdo exclusivo para profissionais que querem dominar o mercado chinês'
    
    if (resourceSlug) {
      try {
        // Importar função do Contentful
        const { getResourceBySlug } = await import('@/lib/contentful')
        const resource = await getResourceBySlug(resourceSlug)
        
        if (resource) {
          resourceTitle = resource.fields.title
          resourceDescription = resource.fields.description
          console.log(`📚 Recurso encontrado no Contentful: ${resourceTitle}`)
        } else {
          console.log(`⚠️ Recurso não encontrado no Contentful para slug: ${resourceSlug}`)
          // Fallback para títulos conhecidos
          const resourceTitles: { [key: string]: string } = {
            'guia-wechat-marketing': 'Guia Completo de Marketing no WeChat',
            'checklist-mercado-chines': 'Checklist: Entrada no Mercado Chinês'
          }
          resourceTitle = resourceTitles[resourceSlug] || resourceTitle
        }
      } catch (error) {
        console.error('❌ Erro ao buscar recurso do Contentful:', error)
        // Usar fallback em caso de erro
        const resourceTitles: { [key: string]: string } = {
          'guia-wechat-marketing': 'Guia Completo de Marketing no WeChat',
          'checklist-mercado-chines': 'Checklist: Entrada no Mercado Chinês'
        }
        resourceTitle = resourceTitles[resourceSlug] || resourceTitle
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'

    // Template HTML do email
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Seu Guia Premium está Pronto!</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #FF453A 0%, #FF6B35 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
              China Daily Marketing
            </h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
              Seu guia premium está pronto para download!
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 20px;">
            
            <!-- Greeting -->
            <div style="margin-bottom: 30px;">
              <h2 style="color: #1a1a1a; margin: 0 0 15px 0; font-size: 24px;">
                ${name ? `Olá, ${name}!` : 'Olá!'}
              </h2>
              <p style="color: #666; margin: 0; font-size: 16px;">
                Obrigado por se inscrever no China Daily Marketing. Seu guia premium está pronto para download.
              </p>
            </div>

            <!-- Resource Info -->
            <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #FF453A;">
              <h3 style="color: #1a1a1a; margin: 0 0 10px 0; font-size: 20px;">
                📚 ${resourceTitle}
              </h3>
              <p style="color: #666; margin: 0; font-size: 14px;">
                ${resourceDescription}
              </p>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 40px 0;">
              <a href="${baseUrl}/cursos" 
                 style="display: inline-block; background: linear-gradient(135deg, #FF453A 0%, #FF6B35 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(255, 69, 58, 0.3);">
                🚀 Acessar Cursos Premium
              </a>
            </div>

            <!-- Additional Value -->
            <div style="background-color: #fff8f0; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
              <h4 style="color: #1a1a1a; margin: 0 0 15px 0; font-size: 18px;">
                🎯 O que você vai encontrar:
              </h4>
              <ul style="color: #666; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Estratégias práticas testadas no mercado chinês</li>
                <li style="margin-bottom: 8px;">Cases reais de empresas que tiveram sucesso na China</li>
                <li style="margin-bottom: 8px;">Insights exclusivos sobre cultura e negócios chineses</li>
                <li style="margin-bottom: 8px;">Templates e checklists prontos para usar</li>
              </ul>
            </div>

            <!-- Personal Message -->
            <div style="border-top: 2px solid #f0f0f0; padding-top: 30px; margin-top: 30px;">
              <p style="color: #666; margin: 0 0 20px 0; font-size: 16px; font-style: italic;">
                "A China representa uma das maiores oportunidades de negócios do século XXI. 
                Este material foi criado para ajudar você a navegar neste mercado complexo e fascinante."
              </p>
              
              <div style="margin-top: 25px;">
                <p style="margin: 0; color: #1a1a1a; font-weight: bold; font-size: 16px;">
                  Phelipe Xavier
                </p>
                <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">
                  Founder, China Daily Marketing
                </p>
                <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">
                  📧 phelipe@chinadailymarketing.com
                </p>
              </div>
            </div>

          </div>

          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 30px 20px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="color: #666; margin: 0 0 15px 0; font-size: 14px;">
              <strong>China Daily Marketing</strong><br>
              Insights exclusivos sobre o mercado chinês
            </p>
            
            <div style="margin: 20px 0;">
              <a href="https://chinadailymarketing.com" style="color: #FF453A; text-decoration: none; margin: 0 15px;">Website</a>
              <a href="https://chinadailymarketing.com/artigos" style="color: #FF453A; text-decoration: none; margin: 0 15px;">Blog</a>
              <a href="https://chinadailymarketing.com/cursos" style="color: #FF453A; text-decoration: none; margin: 0 15px;">Cursos</a>
            </div>
            
            <p style="color: #999; margin: 15px 0 0 0; font-size: 12px;">
              Você está recebendo este email porque se inscreveu para receber nossos materiais premium.<br>
              <a href="#" style="color: #999;">Cancelar inscrição</a> | 
              <a href="https://chinadailymarketing.com/privacidade" style="color: #999;">Política de Privacidade</a>
            </p>
          </div>

        </div>
      </body>
      </html>
    `

    console.log('🧪 Enviando email para:', email)
    console.log('📧 Título do recurso:', resourceTitle)
    console.log('📝 Descrição do recurso:', resourceDescription)

    // Enviar email via Resend com retry em caso de falha
    let emailData, emailError
    let retryCount = 0
    const maxRetries = 3

    while (retryCount < maxRetries) {
      try {
        const result = await resend.emails.send({
          from: 'Phelipe Xavier <phelipe@chinadailymarketing.com>',
          to: [email],
          subject: resourceSlug 
            ? `Seu guia "${resourceTitle}" está pronto para download!`
            : 'Bem-vindo ao China Daily Marketing!',
          html: htmlTemplate,
          replyTo: 'phelipe@chinadailymarketing.com'
        })

        emailData = result.data
        emailError = result.error
        
        if (!emailError) {
          console.log('✅ Email enviado com sucesso:', emailData)
          break
        }
        
        retryCount++
        console.log(`⚠️ Tentativa ${retryCount} falhou, tentando novamente...`)
        
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount))
        }
        
      } catch (error) {
        console.error(`❌ Erro na tentativa ${retryCount + 1}:`, error)
        retryCount++
        
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount))
        } else {
          emailError = error
        }
      }
    }

    if (emailError) {
      console.error('❌ Erro final ao enviar email após', maxRetries, 'tentativas:', emailError)
      return NextResponse.json(
        { 
          error: 'Erro ao enviar email após múltiplas tentativas. Tente novamente.',
          details: emailError 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Email enviado com sucesso!',
      emailId: emailData?.id
    })

  } catch (error) {
    console.error('💥 Erro na API subscribe:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
