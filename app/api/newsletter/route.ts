import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, company } = body

    // Validação básica
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Enviar email com Resend
    const { data, error } = await resend.emails.send({
      from: 'Phelipe Xavier <phelipe@chinadailymarketing.com>',
      to: email,
      subject: 'Bem-vindo à Newsletter China Daily Marketing!',
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8f9fa;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #FF453A 0%, #FF6B35 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">射中</h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">China Daily Marketing</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 24px;">
                Bem-vindo à nossa newsletter, ${name || 'leitor'}! 🎉
              </h2>
              
              <p style="color: #333; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
                Obrigado por se inscrever na newsletter do China Daily Marketing. Agora você faz parte de uma comunidade exclusiva de profissionais que querem dominar o mercado chinês.
              </p>

              <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #FF453A;">
                <h3 style="color: #1a1a1a; margin: 0 0 15px 0; font-size: 18px;">📧 O que você receberá:</h3>
                <ul style="color: #666; margin: 0; padding-left: 20px; line-height: 1.8;">
                  <li>Análises semanais sobre o mercado chinês</li>
                  <li>Estratégias de marketing digital para a China</li>
                  <li>Insights sobre WeChat, Weibo e outras plataformas</li>
                  <li>Tendências de e-commerce e consumo</li>
                  <li>Acesso antecipado a guias premium</li>
                </ul>
              </div>

              ${company ? `
              <div style="background-color: #fff3f3; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                <p style="color: #666; margin: 0; font-size: 14px;">
                  <strong>Empresa:</strong> ${company}
                </p>
              </div>
              ` : ''}

              <div style="text-align: center; margin: 40px 0;">
                <a href="https://chinadailymarketing.com" 
                   style="display: inline-block; background: linear-gradient(135deg, #FF453A 0%, #FF6B35 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: bold; font-size: 16px;">
                  🚀 Visitar Site
                </a>
              </div>

              <p style="color: #333; line-height: 1.6; margin-bottom: 30px; font-size: 16px;">
                Estou animado para compartilhar conhecimentos valiosos que vão acelerar seu sucesso no mercado chinês.
              </p>

              <p style="color: #333; margin-bottom: 30px; font-size: 16px;">
                Atenciosamente,<br>
                <strong>Phelipe Xavier</strong><br>
                <span style="color: #666; font-size: 14px;">Founder, China Daily Marketing</span>
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eee;">
              <p style="color: #999; margin: 0; font-size: 12px;">
                <a href="https://chinadailymarketing.com/unsubscribe" style="color: #999;">Cancelar inscrição</a> | 
                <a href="https://chinadailymarketing.com/privacidade" style="color: #999;">Política de Privacidade</a>
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
      replyTo: 'phelipe@chinadailymarketing.com'
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Erro ao enviar email' },
        { status: 500 }
      )
    }

    console.log('Newsletter subscription:', { email, name, company, resendId: data?.id })

    return NextResponse.json({
      success: true,
      message: 'Inscrição realizada com sucesso!'
    })
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json(
      { error: 'Erro ao processar inscrição' },
      { status: 500 }
    )
  }
}
