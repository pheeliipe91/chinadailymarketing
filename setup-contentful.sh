#!/bin/bash

# Script para configurar Contentful API

echo "Configurando Contentful CMS..."

# Verificar se .env.local existe
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ Arquivo .env.local criado"
fi

echo ""
echo "📝 Por favor, adicione suas chaves do Contentful no arquivo .env.local:"
echo ""
echo "CONTENTFUL_SPACE_ID=\"seu_space_id_da_imagem\""
echo "CONTENTFUL_ACCESS_TOKEN=\"seu_content_delivery_api_token\""
echo "CONTENTFUL_PREVIEW_TOKEN=\"seu_content_preview_api_token\""
echo ""
echo "⚠️  Copie as chaves exatas da tela do Contentful que você mostrou"
echo ""
echo "Após adicionar as chaves:"
echo "1. Salve o arquivo .env.local"
echo "2. Reinicie o servidor: npm run dev"
echo "3. O blog estará conectado ao Contentful!"
