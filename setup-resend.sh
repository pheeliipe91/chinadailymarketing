#!/bin/bash

# Script para configurar Resend API

echo "Configurando Resend API..."

# Criar .env.local se não existir
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ Arquivo .env.local criado"
fi

# Adicionar Resend API Key
echo "" >> .env.local
echo "# Resend API Configuration" >> .env.local
echo "RESEND_API_KEY=\"re_FvfX8L4W_BzSJTzxtmzw36KZmw4GaEHFQ\"" >> .env.local
echo "RESEND_FROM_EMAIL=\"noreply@chinainsights.com.br\"" >> .env.local

echo "✅ Resend API configurada com sucesso!"
echo "⚠️  IMPORTANTE: Não compartilhe sua API key publicamente!"
echo ""
echo "Reinicie o servidor para aplicar as mudanças:"
echo "npm run dev"
