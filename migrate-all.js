const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Mapeamento de todas as seções e suas subpáginas
const estrutura = {
  'cadastros': ['agencia', 'empresas', 'usuarios'],
  'integracoes-bancarias': ['integra', 'integra-bb', 'inter-01', 'inter-02'],
  'notas-fiscais': ['sieg', 'upload-nfe', 'upload-nfse'],
  'comprovantes': ['banco-do-brasil', 'bradesco', 'caixa', 'credcrea', 'inter', 'itau', 'santander', 'sicoob', 'sicredi', 'unicred', 'upload-comprovantes'],
  'extratos': ['banco-brasil', 'bradesco', 'caixa', 'credcrea', 'inter', 'itau', 'santander', 'sicoob', 'sicredi', 'unicred', 'upload-de-extratos'],
  'planilhas': ['upload-planilha'],
  'concilia': ['modulo-basico', 'modulo-premium', 'recebimento-cielo', 'recebimento-rede', 'recebimento-stone'],
  'regras': ['criacao-regras'],
  'registro': ['associacao-conta-contabil', 'entendendo-registro', 'transferencias-bancarias'],
  'ticket': ['gerar-ticket', 'responder-ticket', 'finalizar-ticket'],
  'exportacao': ['baixa-nfe-dominio', 'exportacao-alterdata', 'exportacao-calima', 'exportacao-contabit', 'exportacao-contmatic', 'exportacao-dominio', 'exportacao-fortes', 'exportacao-iob', 'exportacao-mastermaq', 'exportacao-netspeed', 'exportacao-prosoft', 'exportacao-questor', 'exportacao-questor-cloud', 'exportacao-sci-unico', 'exportacao-sci-visual', 'exportacao-tron'],
  'edicao-avancada': ['edicao-avancada-nfse', 'edicao-avancada-nfe']
};

const baseDir = 'C:/Users/supor/Documents/central_de_ajuda_edit';
const srcDir = path.join(baseDir, 'src/app/entities');

console.log('=== INICIANDO MIGRAÇÃO COMPLETA ===\n');

// Passo 1: Criar estrutura de diretórios
console.log('Passo 1: Criando diretórios...');
Object.keys(estrutura).forEach(secao => {
  const secaoPath = path.join(srcDir, secao);
  if (!fs.existsSync(secaoPath)) {
    fs.mkdirSync(secaoPath, { recursive: true });
    console.log(`✓ Criado: ${secao}/`);
  }
});

console.log('\n=== ANÁLISE COMPLETA ===\n');
let totalComponentes = 0;

Object.keys(estrutura).forEach(secao => {
  const componentes = [secao, ...estrutura[secao]];
  totalComponentes += componentes.length;
  console.log(`${secao}: ${componentes.length} componentes`);
});

console.log(`\n📊 TOTAL: ${totalComponentes} componentes a criar\n`);
console.log('Pressione qualquer tecla para continuar...');
