import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface DeepDiveInterestData {
  name: string
  email: string
  phone: string
  company: string
  experience: string
  goals: string
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\(\)\s\-\+\d]{10,}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

async function sendInterestEmail(data: DeepDiveInterestData, retryCount = 0): Promise<boolean> {
  try {
    console.log(`Tentativa ${retryCount + 1} de envio de email para ${data.email}`)
    
    const experienceLabels: Record<string, string> = {
      junior: 'Júnior (0-2 anos)',
      pleno: 'Pleno (2-5 anos)',
      senior: 'Sênior (5-8 anos)',
      especialista: 'Especialista (8+ anos)',
      lideranca: 'Liderança'
    }

    // Email para o interessado
    const userEmailResult = await resend.emails.send({
      from: 'Phelipe Xavier <phelipe@chinadailymarketing.com>',
      to: [data.email],
      replyTo: 'phelipe@chinadailymarketing.com',
      subject: 'Deep Dive - Interesse Registrado! 🎯',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Deep Dive - Interesse Registrado</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <div style="text-align: center; margin-bottom: 40px;">
            <div style="background: linear-gradient(135deg, #dc2626, #ea580c); color: white; width: 80px; height: 80px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 32px; font-weight: bold; margin-bottom: 20px;">
              射中
            </div>
            <h1 style="color: #dc2626; margin: 0; font-size: 28px;">China Daily Marketing</h1>
          </div>

          <div style="background: #f8fafc; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
            <h2 style="color: #1f2937; margin-top: 0;">Olá, ${data.name}! 👋</h2>
            
            <p style="font-size: 18px; color: #374151;">
              Que incrível receber seu interesse no <strong>Deep Dive</strong>! 
            </p>
            
            <p style="color: #6b7280;">
              Recebi suas informações e estou muito animado para conhecer mais sobre seus objetivos profissionais. 
              A mentoria Deep Dive foi criada exatamente para profissionais como você, que querem se tornar 
              <strong>insiders</strong> do marketing oriental e atuar de forma mais estratégica na carreira.
            </p>
          </div>

          <div style="background: white; border: 2px solid #fef2f2; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
            <h3 style="color: #dc2626; margin-top: 0; display: flex; align-items: center;">
              🎯 Próximos Passos
            </h3>
            
            <div style="margin-bottom: 20px;">
              <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                <div style="background: #dc2626; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 12px; flex-shrink: 0;">1</div>
                <div>
                  <strong>Análise do seu perfil</strong><br>
                  <span style="color: #6b7280; font-size: 14px;">Vou revisar suas informações e objetivos profissionais</span>
                </div>
              </div>
              
              <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                <div style="background: #dc2626; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 12px; flex-shrink: 0;">2</div>
                <div>
                  <strong>Call de alinhamento</strong><br>
                  <span style="color: #6b7280; font-size: 14px;">Conversa para estruturar seus OKRs personalizados</span>
                </div>
              </div>
              
              <div style="display: flex; align-items: flex-start;">
                <div style="background: #dc2626; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 12px; flex-shrink: 0;">3</div>
                <div>
                  <strong>Início da jornada</strong><br>
                  <span style="color: #6b7280; font-size: 14px;">Deep Dive com foco em resultados e crescimento</span>
                </div>
              </div>
            </div>
          </div>

          <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin-bottom: 30px;">
            <p style="margin: 0; color: #0c4a6e; font-style: italic;">
              "Transformo profissionais de marketing em estrategistas orientais, combinando metodologias 
              comprovadas com insights dos maiores cases da Ásia."
            </p>
            <p style="margin: 10px 0 0 0; font-weight: bold; color: #0c4a6e;">
              — Phelipe Xavier
            </p>
          </div>

          <div style="text-align: center; margin: 40px 0;">
            <p style="color: #6b7280; margin-bottom: 20px;">
              Entrarei em contato em breve para alinharmos sua jornada no Deep Dive!
            </p>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
              <p style="color: #9ca3af; font-size: 14px; margin: 0;">
                China Daily Marketing<br>
                <a href="https://chinadailymarketing.com" style="color: #dc2626;">chinadailymarketing.com</a>
              </p>
            </div>
          </div>

        </body>
        </html>
      `
    })

    // Email de notificação para o Phelipe
    const adminEmailResult = await resend.emails.send({
      from: 'Deep Dive <noreply@chinadailymarketing.com>',
      to: ['phelipe@gogrowth.me'],
      replyTo: data.email,
      subject: `🎯 Novo interesse Deep Dive - ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Novo Interesse Deep Dive</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <div style="background: linear-gradient(135deg, #dc2626, #ea580c); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 24px;">🎯 Novo Interesse Deep Dive</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Um novo profissional demonstrou interesse na mentoria</p>
          </div>

          <div style="background: #f8fafc; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
            <h2 style="color: #1f2937; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
              Informações do Interessado
            </h2>
            
            <div style="display: grid; gap: 15px;">
              <div>
                <strong style="color: #374151;">Nome:</strong><br>
                <span style="color: #6b7280;">${data.name}</span>
              </div>
              
              <div>
                <strong style="color: #374151;">Email:</strong><br>
                <a href="mailto:${data.email}" style="color: #dc2626;">${data.email}</a>
              </div>
              
              <div>
                <strong style="color: #374151;">Telefone:</strong><br>
                <a href="tel:${data.phone}" style="color: #dc2626;">${data.phone}</a>
              </div>
              
              <div>
                <strong style="color: #374151;">Empresa:</strong><br>
                <span style="color: #6b7280;">${data.company || 'Não informado'}</span>
              </div>
              
              <div>
                <strong style="color: #374151;">Nível de Experiência:</strong><br>
                <span style="color: #6b7280;">${experienceLabels[data.experience] || data.experience}</span>
              </div>
            </div>
          </div>

          <div style="background: white; border: 2px solid #fef2f2; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
            <h3 style="color: #dc2626; margin-top: 0;">📝 Objetivos Profissionais</h3>
            <p style="color: #374151; white-space: pre-line; background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626;">
              ${data.goals}
            </p>
          </div>

          <div style="text-align: center; background: #f0f9ff; padding: 20px; border-radius: 12px;">
            <p style="color: #0c4a6e; margin: 0;">
              <strong>Próximo passo:</strong> Entre em contato para alinhar a jornada no Deep Dive! 🚀
            </p>
          </div>

        </body>
        </html>
      `
    })

    console.log('Emails enviados com sucesso:', {
      userEmail: userEmailResult.data?.id,
      adminEmail: adminEmailResult.data?.id
    })

    return true
  } catch (error) {
    console.error(`Erro no envio de email (tentativa ${retryCount + 1}):`, error)
    
    if (retryCount < 2) {
      console.log(`Tentando novamente em 2 segundos...`)
      await new Promise(resolve => setTimeout(resolve, 2000))
      return sendInterestEmail(data, retryCount + 1)
    }
    
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, experience, goals }: DeepDiveInterestData = body

    // Validações
    if (!name || !email || !phone || !experience || !goals) {
      return NextResponse.json(
        { error: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Telefone inválido' },
        { status: 400 }
      )
    }

    if (goals.length < 20) {
      return NextResponse.json(
        { error: 'Por favor, descreva seus objetivos com mais detalhes (mínimo 20 caracteres)' },
        { status: 400 }
      )
    }

    const validExperiences = ['junior', 'pleno', 'senior', 'especialista', 'lideranca']
    if (!validExperiences.includes(experience)) {
      return NextResponse.json(
        { error: 'Nível de experiência inválido' },
        { status: 400 }
      )
    }

    console.log('Processando interesse Deep Dive:', { name, email, company, experience })

    // Enviar emails
    const emailSent = await sendInterestEmail({
      name,
      email,
      phone,
      company,
      experience,
      goals
    })

    if (!emailSent) {
      console.error('Falha ao enviar emails após 3 tentativas')
      return NextResponse.json(
        { error: 'Erro interno do servidor. Tente novamente.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Interesse registrado com sucesso! Phelipe entrará em contato em breve.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erro na API deep-dive-interest:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
