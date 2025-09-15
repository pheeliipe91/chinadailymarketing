#!/bin/bash

# Configurar Contentful com as chaves fornecidas

echo "Configurando Contentful CMS com suas chaves..."

# Adicionar as chaves ao .env.local
echo "" >> .env.local
echo "# Contentful CMS Configuration" >> .env.local
echo "CONTENTFUL_SPACE_ID=\"7cbmnzvbm9aw\"" >> .env.local
echo "CONTENTFUL_ACCESS_TOKEN=\"-iuTdh8EhQGlwxoE7In-zF9kQZcMyqhoqVZT1d0Kz1o\"" >> .env.local
echo "CONTENTFUL_PREVIEW_TOKEN=\"1T_PEf62084Al2Z33ruc5ve0hwjLYNdbaHTU6iZsd1k\"" >> .env.local

echo "✅ Contentful configurado com sucesso!"
echo ""
echo "Chaves adicionadas:"
echo "- Space ID: 7cbmnzvbm9aw"
echo "- Content Delivery API: configurado"
echo "- Content Preview API: configurado"
echo ""
echo "🚀 Próximos passos:"
echo "1. Reinicie o servidor: npm run dev"
echo "2. Crie conteúdo no Contentful"
echo "3. Veja aparecer automaticamente no blog!"
