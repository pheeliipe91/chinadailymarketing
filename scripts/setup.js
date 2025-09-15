#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Configurando China Insights Blog...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Criando arquivo .env.local...');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env.local criado! Por favor, configure suas variáveis de ambiente.\n');
  }
}

// Create necessary directories
const directories = [
  'public/downloads',
  'public/images/articles',
  'public/images/resources',
  'content/articles',
  'content/resources'
];

directories.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Diretório criado: ${dir}`);
  }
});

console.log('\n📦 Instalando dependências...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependências instaladas!\n');
} catch (error) {
  console.error('❌ Erro ao instalar dependências:', error.message);
  process.exit(1);
}

// Generate Prisma client
console.log('🔧 Gerando cliente Prisma...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Cliente Prisma gerado!\n');
} catch (error) {
  console.warn('⚠️  Aviso: Não foi possível gerar o cliente Prisma. Configure o DATABASE_URL primeiro.\n');
}

console.log('✨ Setup concluído!\n');
console.log('Próximos passos:');
console.log('1. Configure as variáveis de ambiente em .env.local');
console.log('2. Configure o banco de dados PostgreSQL');
console.log('3. Execute: npm run prisma:push');
console.log('4. Execute: npm run dev');
console.log('\n🎉 Pronto para começar!');
