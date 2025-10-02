const fs = require('fs');
const path = require('path');

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

function toPascalCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

function createComponent(secao, nome) {
  const componentDir = nome ? path.join(srcDir, secao, nome) : path.join(srcDir, secao);
  const componentName = nome || secao;
  const className = toPascalCase(componentName);

  // Criar diretório
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  // Criar .component.ts
  const tsContent = `import { Component } from '@angular/core';

@Component({
  selector: 'jhi-${componentName}',
  templateUrl: './${componentName}.component.html'
})
export class ${className}Component {}
`;
  fs.writeFileSync(path.join(componentDir, `${componentName}.component.ts`), tsContent);

  // Criar .component.html
  const htmlContent = `<jhi-sidebar></jhi-sidebar>

<div class="hero">
  <h1>${className}</h1>
  <p class="text-primary">Conteúdo será migrado</p>
</div>

<div class="content">
  <div class="section">
    <p>Conteúdo em migração...</p>
  </div>
  <div class="footer">© 2025 Nícolas da Mota Monteiro dos Santos.</div>
</div>
`;
  fs.writeFileSync(path.join(componentDir, `${componentName}.component.html`), htmlContent);

  // Criar .component.scss
  fs.writeFileSync(path.join(componentDir, `${componentName}.component.scss`), '');

  return `${secao}/${nome || ''}`.replace(/\/$/, '');
}

console.log('╔═══════════════════════════════════════════════════════╗');
console.log('║   CRIAÇÃO MANUAL DE COMPONENTES - 75 COMPONENTES     ║');
console.log('╚═══════════════════════════════════════════════════════╝\n');

let created = 0;

Object.keys(estrutura).forEach(secao => {
  console.log(`\n▶ ${secao}:`);

  // Criar componente principal
  createComponent(secao, null);
  console.log(`  ✓ ${secao}`);
  created++;

  // Criar subcomponentes
  estrutura[secao].forEach(sub => {
    createComponent(secao, sub);
    console.log(`  ✓ ${secao}/${sub}`);
    created++;
  });
});

console.log(`\n\n✅ Total criado: ${created} componentes\n`);
